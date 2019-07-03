
//**************** Network Script **********************************//
//*********************************************************************//
// define the classe myNode and myEdge with default values
function myNode (id, x, y) {
	this['id'] = id;
	this['Number of Individuals'] = "";
	this['x'] = x;
	this['y'] = y;
	this['individualsVar'] = "";
	this['Founder'] = "No";
	this['Path'] = "";
	this['Proportion of Male'] = "1";
	this['BV Plot'] = 'Yes';
	this['Sex'] = "Male";
	this['Phenotyping Class'] = "Default PhenoC";
	}
	
function myEdge (fr, to) {
	this['from'] = fr;
	this['to'] = to;
	this['Breeding Type'] = "";
	this['Selection Type'] = "";
	this['Number of Repeat'] = "";
	//this['Selection Proportion'] = "";  -> we do not save it, always calculate from Number of Individuals
	this['Relationship Matrix'] = "";
	this['BVE Method'] = "";
	this['New Mutation Rate'] = "";
	this['New Remutation Rate'] = "";
	this['Number of Rec per M'] = "";
	this['Use Offspring for BVE'] = "";
	this['Time Needed'] = 0;
	this['id'] = fr + '_'+ to;
	// in order to save the parameters that are using variables, should match indivdualsVar_options
	this['useVar'] =[];
	this['Selection Index']="Default Index";
}

// define the classe myGeneral with default values for General information:
function myGeneral () {
	this['Project Name'] = 'New Project';
	this['Species'] = '';
	this['Use Ensembl Map'] = "Yes";
	this['Ensembl Dataset'] = "";
	this['Ensembl Filter'] = "";
	this['Ensembl Filter Values'] = "";
	this['Number of Chromosomes'] = '';
	this['Chromosomes of Equal Length'] = 'Yes';
	this['Time Unit'] = 'weeks';
	this['Use Own Map'] = 'Yes';
	this['Own Map Path'] = '';
	// this['chromo will be filled with myChromo elements later=
	this['Chromosomes Info'] = [];
}

function myTrait (ind){
	this['Trait Name'] = "Pheno " + ind,
	this['Trait Unit'] = "",
	this['Trait Mean'] = Math.round(Math.random()*100),
	this['Trait Std Deviation'] = Math.round(Math.random()*10),
	this['Trait Heritability'] = Math.round(Math.random()*100)/100,
	this['Trait Number of Polygenic Loci'] = Math.round(Math.random()*10000),
	this['Trait Major QTL'] = 0,
	this['Trait Value per Unit'] = 0,
	this['Trait QTL Info'] = []
}

function mySNP (ind){
	this['QTL SNP Number'] = ind,
	this['QTL ID'] = 'QTL'+ind,
	this['QTL BP'] = Math.round(Math.random()*1000000),
	this['QTL Chromosome'] = 1,
	this['QTL Effect AA'] = Math.round(Math.random()*10),
	this['QTL Effect AB'] = Math.round(Math.random()*10),
	this['QTL Effect BB'] = Math.round(Math.random()*10),
	this['QTL Allele Frequency'] = Math.round(Math.random()*100)/100,
	this['QTL Optional Info'] = ''
}

function myVariable (vname){
	this['name'] = vname;
	this['value'] = 0;
}

// define myChromo that will be used to create elements for chromo in myGeneral:
function myChromo (len, md, recomb){
	this['Length'] = len, 
	this['Marker Density'] = md, 
	this['Recombination'] = recomb
}

// returns an array of length len for the correlation matrices:
function myArray(len){
	var a = [];
	for(let i=0; i<len; i++){
		a[i] = {val:0};
	}
	a[len-1].val = 1;
	return a;
}

//********** define a Vue component containing ALL informations ********//
//*** will update DOM automatically if data in Vue component changes ***//
// whenever add a new parameter in node/edge Popup, rememer to change:
// (1) add param to myEdge() or myNode()
// (2) connect to DOM via 'v-model'
var network = null;

// using vis.DataSet will guarantee that the network is binded to the nodes and edges dataset in data_Vue:
var nodes = new vis.DataSet(null);
var edges = new vis.DataSet(null);
var geninfo = new myGeneral();

var data_Vue = new Vue({
	el: '#mainDiv',
	data: {
		// params for general information:
		geninfo: geninfo,
		traitsinfo: [],
		//chromo: [],
		matrix: [],
		matrix2: [],
		
		show_geninfo: true,
		Species_options: ['Chicken', 'Cattle', 'Sheep', 'Pig', 'Maize', 'Other'],
		Time_Unit_options: ['Years', 'Month', 'Weeks', 'Days'],
		show_info:'',
		show_chromo_info: true,
		show_pheno_info: true,
		show_QTL: true,
		show_matrix: true,
		show_matrix2: true,
		show_matrix_element: [],
		selection_index : [{'Name': 'Default Index'}],
		phenotyping_class : [{'Name': 'Default PhenoC'}],
		show_warnings: false,
		warnings: [],
		runned: false,
		genetic_data:'Ens',
		user:'',
		database:[],
		versions:[],
		template_database:[],
		
		// params for nodes and edges:
		nodes: nodes,
		edges: edges,
		active_node:'',
		active_edge:  new myEdge(),
		node_operation: '',
		edge_operation: '',
		Sex_options: ['Male', 'Female', 'Both'],
		node_colors: {'Male':'#9acef4', 'Female':'#f29595', 'Both':'#ddd264'},
		edge_colors: {'Selection':'#7bbb44', 'Reproduction':'#f5a623', 'Aging':'#dba59a', 'Combine':'#5a4f7c', 'Repeat':'#f14235', 'Recombination':'#94db8e', 'Split': '#94db8e'},
		counter_pheno: 0,
		counter_qtl:0,
		
		individualsVar_options: [],
		Breedingtype_options: ['Selection', 'Reproduction', 'Aging', 'Combine', 'Repeat', 'Recombination', 'Split'],
		selectionType_options: ['Phenotypic', 'Random', 'Aging', 'BVE' ],
		RelationshipMatrix_options: ['VanRaden', 'Pedigree'],
		BVEMethod_options: ['Direct Mixed-Model', 'REML-GBLUP', 'BayesA', 'BayesB', 'BayesC', 'RKHS'],
		Cohorts_options: ['Last 2 Generations', 'All', 'Only this cohort', 'Manual select'],
		ensembl_options:{
			Cattle: {Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Illumina BovineSNP50 BeadChip"},
			Chicken: {Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Affymetrix Chicken600K Array"},
			Pig: {Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Axiom Genotyping Array"},
			Sheep: {Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "IlluminaOvineSNP50"},
			Maize: {Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Affymetrix Chicken600K Array"},
			Horse: {Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "IlluminaEquineSNP50 BeadChip"},
			Other: {Dataset: "", Filter:"variation_set_name", Value: ""},
		},
	},
	watch: {
		traitsinfo: function(val){
			var len = val.length;
			var oldlen = Object.keys(this.selection_index[0]).length -1; 
			
			var diff = len - oldlen;
			
			if (diff > 0){
				for(let i=0; i<this.selection_index.length; i++){
					for(let j=this.counter_pheno-diff; j < this.counter_pheno; j++){
						this.selection_index[i]['P'+(j+1)] = 1;
					}
				}	
				for(let i=0; i<this.phenotyping_class.length; i++){
					for(let j=this.counter_pheno-diff; j < this.counter_pheno; j++){
						this.phenotyping_class[i]['P'+(j+1)] = 1;
					}
				}	
			}else if(len ==0){
				this.phenotyping_class = [{Name: "Default PhenoC"}];
				this.selection_index = [{Name: "Default Index"}];
			}
							
		},
		genetic_data: function (val){
			if(val=='Ens'){
				this.geninfo['Use Ensembl Map'] = 'Yes';
				this.geninfo['Use Own Map'] = 'No';
			}
			if(val=='Own'){
				this.geninfo['Use Ensembl Map'] = 'No';
				this.geninfo['Use Own Map'] = 'Yes';
			}
			if(val=='Cus'){
				this.geninfo['Use Ensembl Map'] = 'No';
				this.geninfo['Use Own Map'] = 'No';
			}
		},
		current_equalchrom: function(val){
			this.createChrom();
		}
	},
	computed: {
		current_equalchrom: {
			get: function(){
				return(this.geninfo['Chromosomes of Equal Length']);
			}
		},
		selection_proportion: {
			get: function(){
				ptnode = this.nodes.get(this.active_edge.from)['Number of Individuals'];
				chnode = this.nodes.get(this.active_edge.to)['Number of Individuals'];				
				return Math.round(chnode/ptnode*1000)/1000;
			},
			set: function(selprop){
				ptnode = this.nodes.get(this.active_edge.from)['Number of Individuals'];
				child = this.nodes.get(this.active_edge.to);
				child['Number of Individuals'] = Math.round(ptnode * selprop);
				this.nodes.update(child);
			}
		},
		chromo_display: {
			get: function(){
				return this.geninfo['Chromosomes Info'].slice(0,this.geninfo['Number of Chromosomes']);
			},
		},
		node_color: {
			get: function(){
				return this.node_colors[this.active_node.Sex];
			},
		},
		node_title: {
			get: function(){
				return this.active_node.id + ': '+ this.active_node['Number of Individuals'] + ' Ind';
			},
		},
		edge_title: {
			get: function(){
				if(this.active_edge['Breeding Type'] == 'Repeat'){
					return this.active_edge['Breeding Type'] + ': '+ this.active_edge['Number of Repeat'] + ' times ';
				}else if(this.active_edge['Breeding Type'] == 'Selection'){
					return 'Selection Type: '+ this.active_edge['Selection Type'];
				}else{
					return this.active_edge['Breeding Type'];
				}					
			},
		},
		edge_color: {
			get: function(){
				var col = {};
				col.color = this.edge_colors[this.active_edge['Breeding Type']];
				col.highlight = col.color;
				col.hover = col.color;
				return col;
			},
		},	
	},
	methods: {
		// add a new selection index:
		addSI: function(name){
			if(name){
				var val = name;
			}else{
				var val = document.getElementById("newSI").value;
			}
			for(let i=0; i<this.selection_index.length; i++){
				if(this.selection_index[i].Name == val){
					alert("Selection Index name already exists. Selection Index not created.")
					return;
				}
			}
			if(val == ''){
				alert("Selection Index name must not be empty. Selection Index not created.")
				return;				
			}
			var len = this.traitsinfo.length;
			var mySI = {};
			mySI["Name"] = val;
			for(let i=0; i < len; i++){
				mySI['P'+(i+1)] = 1;
			}
			this.selection_index.push(mySI);	
			document.getElementById("newSI").value='';				
		},		
		addPC: function(name){
			if(name){
				var val = name;
			}else{
				var val = document.getElementById("newPhenoC").value;
			}
			for(let i=0; i<this.phenotyping_class.length; i++){
				if(this.phenotyping_class[i].Name == val){
					alert("PhenoC name already exists. PhenoC not created.")
					return;
				}
			}
			if(val == ''){
				alert("PhenoC name must not be empty. PhenoC not created.")
				return;				
			}
			var len = this.traitsinfo.length;
			var myPC = {};
			myPC["Name"] = val;
			for(let i=0; i < len; i++){
				myPC['P'+(i+1)] = 1;
			}
			this.phenotyping_class.push(myPC);		
			document.getElementById("newPhenoC").value='';			
		},	
		// remove clicked SI, check whether is used somewhere first:
		removeSI: function(si, ind){
			
			var items = this.edges.getIds({
				filter: function (item) {
					return item['Selection Index'] == si.Name;
				}
			});
			
			if(items.length >= 1 ){
				alert("Selection index is still in used by "+items.length+ " edges. Removing not possible!");
				return;
			}
			this.selection_index.splice(ind,1);

		},
		removePC: function(si, ind){
			
			var items = this.nodes.getIds({
				filter: function (item) {
					return item['Phenotyping Class'] == si.Name;
				}
			});
			
			if(items.length >= 1 ){
				alert("Phenotyping Class is still in used by "+items.length+ " nodes. Removing not possible!");
				return;
			}
			this.phenotyping_class.splice(ind,1);

		},	
		// create/remove new Chromosomes on change of the # Chromosomes, depending on 
		// whether new number is greater or smaller --> remove from bottom
		createChrom: function(){
			if(this.geninfo['Chromosomes of Equal Length'] == 'No'){
				this.geninfo['Number of Chromosomes'] = Math.round(Number(this.geninfo['Number of Chromosomes']));
				var val = this.geninfo['Number of Chromosomes'];
				
			}else{
				var val = 1;
			}
			var len = this.geninfo['Chromosomes Info'].length;
			var diff = val - len;
			
			if(diff < 0){
				this.geninfo['Chromosomes Info'].splice(diff);
			}else if (diff > 0){
				while (len < val){
					var newChromo = new myChromo(100,500,1);
					this.geninfo['Chromosomes Info'].push(newChromo);
					len++;
				}
			}	
		},		
		// create/remove new QTL on change of the # QTls, depending on 
		// whether new number is greater or smaller --> remove from bottom
		createQTL: function(ind){
			this.traitsinfo[ind]['Trait Major QTL'] = Math.round(Number(this.traitsinfo[ind]['Trait Major QTL']));
			var val = this.traitsinfo[ind]['Trait Major QTL'];
			var len = this.traitsinfo[ind]['Trait QTL Info'].length;
			var diff = val - len;
			
			if(diff < 0){
				this.traitsinfo[ind]['Trait QTL Info'].splice(diff);
			}else if (diff > 0){
				while (len < val){
					this.counter_qtl++;
					var newSNP = new mySNP(this.counter_qtl);
					this.traitsinfo[ind]['Trait QTL Info'].push(newSNP);
					len++;
				}
			}
			
		},
		// remove clicked QTL 
		removeQTL: function(trait, snp){
			var indT = this.traitsinfo.indexOf(trait);
			var indS = this.traitsinfo[indT]['Trait QTL Info'].indexOf(snp);
			this.traitsinfo[indT]['Trait QTL Info'].splice(indS,1);
			this.traitsinfo[indT]['Trait Major QTL']--;
			
		},
		// add a new Phenotype, then also add correlation matrices:
		addPheno: function(){
			this.counter_pheno++;
			var len = this.traitsinfo.length;
			var new_trait = new myTrait(this.counter_pheno);
			this.traitsinfo.push(new_trait);
			
			this.matrix.push({row: new myArray(len+1)});
			this.matrix2.push({row: new myArray(len+1)});
			this.show_matrix_element.push({show:true});
						
		},
		// remove clicked Phenotype
		removePheno: function(ind){
			var len = this.traitsinfo.length;
			this.traitsinfo.splice(ind,1);
			
			// remove also correlation matrix elements
			// associated with this phenotype
			if(len > 1){
				for(let i=ind+1; i< len; i++){
					this.matrix[i].row.splice(ind,1);
					this.matrix2[i].row.splice(ind,1);
				}
				this.matrix.splice(ind,1);
				this.matrix2.splice(ind,1);
			}else{
				this.matrix = [];
				this.matrix2 = [];
			}
			this.show_matrix_element.splice(ind, 1);
			
			// remove also selection index, phenotyping classes 
			// associated with this phenotype			
			for(let i=0; i<this.selection_index.length; i++){
				delete this.selection_index[i][Object.keys(this.selection_index[i])[ind+1]];
			}	
			for(let i=0; i<this.phenotyping_class.length; i++){
				delete this.phenotyping_class[i][Object.keys(this.phenotyping_class[i])[ind+1]];
			}
		},
		// will create a new Variable for the User:
		createVariable: function(){
			var val = document.getElementById("newVariable").value;
			for(let i=0; i<this.individualsVar_options.length; i++){
				if(this.individualsVar_options[i].name == val){
					alert("Variable name already exists. Variable not created.")
					return;
				}
			}
			if(val == ''){
				alert("Variable name must not be empty. Variable not created.")
				return;				
			}
			var vv = new myVariable(val);
			this.individualsVar_options.push(vv);
			document.getElementById("newVariable").value='';
			
			// prepare edges for the use of variables:
			var items = this.edges.get();
			for(let i=0; i< items.length; i++){
				items[i].useVar.push('');
			}
			this.edges.update(items);
		},
		// will updates all nodes in case of Variable' value is changing:
		updateNodesVar: function(vv){
			var wert = vv.value;
			var items = this.nodes.getIds({
				filter: function (item) {
					return item.individualsVar == vv.name;
				}
			});
			if(items.length >= 1){
				for(ii=0; ii < items.length; ii++){
					this.nodes.update({id: items[ii], 'Number of Individuals': wert, title: items[ii]+':'+wert+' Ind'});
				}
				//network.setData({nodes: this.nodes, edges: this.edges});
			}
		},
		// will updates all edges in case of Variable' value is changing:
		updateEdgesVar: function(vv){
			var wert = vv.value;
			var ind = this.individualsVar_options.indexOf(vv); 
			
			var items = this.edges.get({
				filter: function (item) {
					return item.useVar[ind] != '';
				}
			});
			if(items.length >= 1){
				for(ii=0; ii < items.length; ii++){
					var new_E = {id: items[ii].id};
					new_E[items[ii].useVar[ind]] = wert;
					new_E.title = items[ii].Breedingtype
					//console.log(new_E);
					this.edges.update(new_E);
				}
				//network.setData({nodes: this.nodes, edges: this.edges});
			}
				
		},
		// remove Variable if no Nodes are using it:
		removeVariable: function(vv){
			var wert = vv.value;
			var ind = this.individualsVar_options.indexOf(vv);
			
			var items = this.nodes.getIds({
				filter: function (item) {
					return item.individualsVar == vv.name;
				}
			});
						
			var items2 = this.edges.getIds({
				filter: function (item) {
					return item.useVar[ind] != '';
				}
			});
			
			if(items.length >= 1 | items2.length >= 1){
				alert("Variable ist still in used by "+items.length+ " nodes and "+items2.length+" edges. Removing not possible!");
				return;
			}
			this.individualsVar_options.splice(ind,1);
			
			// prepare edges for the use of variables:
			var items = this.edges.get();
			for(let i=0; i< items.length; i++){
				items[i].useVar.splice(ind, 1);
			}
			this.edges.update(items);
		},
	}
})

//******************************************************************************************//
//**************** own functions required to manually update data_Vue or DOM ***************//


// if we use Variables for the # individuals, we need to update node.individuals:
function updateIndividuals(ivar){
	var item = data_Vue.individualsVar_options.filter(vv => vv.name == ivar)[0];
	if(item != undefined){
		data_Vue.active_node['Number of Individuals'] = item.value;
	}else{
		data_Vue.active_node['Number of Individuals'] = ivar;
	}
}

// if we use Variables for the Edges, we need to update their data according to the variables' value:
function updateVar(param, ivar){
	var ind_old = data_Vue.active_edge.useVar.indexOf(param);
	//console.log(ind_old);
	data_Vue.active_edge.useVar[ind_old] = '';
	
	var item = data_Vue.individualsVar_options.filter(vv => vv.name == ivar)[0];
	if(item != undefined){
		data_Vue.active_edge[param] = item.value;
		data_Vue.active_edge.useVar[data_Vue.individualsVar_options.indexOf(item)] = param;
	}else{
		data_Vue.active_edge[param] = ivar;
	}
}

// if we change Species on Selection, we need to change the default Values:
function updateSpeciesData(value){
	Object.assign(data_Vue.geninfo, genome_default_data[value]);
	//data_Vue.chromo = data_Vue.geninfo['Chromosomes Info'];
	data_Vue.traitsinfo = data_Vue.geninfo['Default Traits'];
	data_Vue.counter_pheno = data_Vue.traitsinfo.length;
	data_Vue.matrix = data_Vue.geninfo['Phenotypic Correlation'];
	data_Vue.matrix2 = data_Vue.geninfo['Genetic Correlation'];
	
	for(let i =0; i< data_Vue.traitsinfo.length; i++){
		data_Vue.show_matrix_element.push({show:true});
	}
	
	//if(data_Vue.traitsinfo.length > 0){
	//	data_Vue.addSI('Default Index');
	//	data_Vue.addPC('Default PhenoC');
	//}
	
	// update Ensembl data
	data_Vue.geninfo['Ensembl Dataset'] = data_Vue.ensembl_options[value].Dataset;
	data_Vue.geninfo['Ensembl Filter'] = data_Vue.ensembl_options[value].Filter;
	data_Vue.geninfo['Ensembl Filter Values'] = data_Vue.ensembl_options[value].Value;
	
	// delete unnessary redundant data:
	delete data_Vue.geninfo['Phenotypic Correlation'];
	delete data_Vue.geninfo['Genetic Correlation'];
	delete data_Vue.geninfo['Default Traits'];
}

// function to export Data into OutputArea:

function exportNetwork() {
	exportArea = document.getElementById('OutputArea');
	exportArea.value = "";
	
	if(data_Vue.geninfo['Chromosomes of Equal Length'] == 'Yes'){
		data_Vue.geninfo["Chromosomes Info"] = data_Vue.chromo_display.slice(0,1);
	}else{
		data_Vue.geninfo["Chromosomes Info"] = data_Vue.chromo_display;
	}
	
	var mat1 = [];
	var mat2 = [];
	var row1;
	var row2;
	for(let i=0; i < data_Vue.traitsinfo.length; i++){
		row1 = [];
		row2 = [];
		for(let j=0; j <= i; j++){
			row1.push(Number(data_Vue.matrix[i].row[j].val));
			row2.push(Number(data_Vue.matrix2[i].row[j].val));
		}
		mat1.push(row1);
		mat2.push(row2);
	}
	
	var Intern = {
		show_matrix_element : data_Vue.show_matrix_element,
		counter_pheno : data_Vue.counter_pheno,
		counter_qtl : data_Vue.counter_qtl,
		individualsVar_options : data_Vue.individualsVar_options,
		genetic_data : data_Vue.genetic_data,
		runned : data_Vue.runned,
	};
	
	var data_to_export = {
		'Nodes': data_Vue.nodes.get(),
		'Edges': data_Vue.edges.get(),
		'Genomic Info': data_Vue.geninfo,
		'Trait Info': data_Vue.traitsinfo,
		'Selection Index': data_Vue.selection_index,
		'Phenotyping Info': data_Vue.phenotyping_class,
		'Phenotypic Correlation': mat1,
		'Genetic Correlation': mat2,
		'Intern': Intern,
	};
	var exportValue = JSON.stringify(data_to_export, undefined, 2);

	exportArea.value = exportValue;

	resizeExportArea();
	
	//delete data_Vue.geninfo["Chromosomes Info"];
	return data_to_export;
	
}

// function to download network:
function downloadNetwork(){
	var jsondata = JSON.stringify(exportNetwork(), undefined, 2);
	var filename = data_Vue.geninfo['Project Name'] ? data_Vue.geninfo['Project Name'] : "File";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsondata));
    element.setAttribute('download', filename+'.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// function to import Data from OutputArea:

function importNetwork() {
	var exportArea = document.getElementById('OutputArea');
	var inputValue = exportArea.value;
	if(inputValue == ''){
		alert("Nothing to import. Please paste the JSON file into the text area.");
		return;
	}
	var inputData = JSON.parse(inputValue);
	
	importNetwork_intern(inputData);
	
}

function importNetwork_intern(inputData) {
		
	data_Vue.nodes = new vis.DataSet(inputData['Nodes']);
	data_Vue.edges = new vis.DataSet(inputData['Edges']);
	data_Vue.geninfo = inputData['Genomic Info'];
	data_Vue.traitsinfo = inputData['Trait Info'];
	data_Vue.selection_index = inputData['Selection Index'];
	
	if(inputData['Phenotyping Info']){
		data_Vue.phenotyping_class = inputData['Phenotyping Info'];
	}else{
		// an older Version of JSON file, maually add phenoC
		data_Vue.phenotyping_class = [{Name: "Default PhenoC"}];
		for(let i=0; i <data_Vue.traitsinfo.length; i++ ){
			data_Vue.phenotyping_class[0]['P'+(i+1)] =1;
		}
	}
	
	data_Vue.show_matrix_element = inputData["Intern"].show_matrix_element;
	data_Vue.counter_pheno = inputData["Intern"].counter_pheno;
	data_Vue.counter_qtl = inputData["Intern"].counter_qtl;
	data_Vue.individualsVar_options = inputData["Intern"].individualsVar_options;
	data_Vue.genetic_data = inputData["Intern"].genetic_data;
	//data_Vue.runned = inputData["Intern"].runned;
	
	var mat1 = inputData['Phenotypic Correlation'];
	var mat2 = inputData['Genetic Correlation'];
	
	var matrix = [];
	var matrix2 = [];
	var row1;
	var row2;
	for(let i=0; i < data_Vue.traitsinfo.length; i++){
		row1 = [];
		row2 = [];
		for(let j=0; j <= i; j++){
			row1.push({val : mat1[i][j]});
			row2.push({val : mat2[i][j]});
		}
		matrix.push({row : row1});
		matrix2.push({row : row2});
	}
	
	data_Vue.matrix = matrix;
	data_Vue.matrix2 = matrix2;
	//data_Vue.chromo = data_Vue.geninfo['Chromosomes Info'];
	
	draw();
	
}

function resizeExportArea() {
	exportArea.style.height = (1 + exportArea.scrollHeight) + "px";
}

// function to save data to database:

function postProject(name, url, jsondata){
	$.ajax
	({
		type: "POST",
		url: url,
		data: {
			name: name,
			jsondata : jsondata,
			versions: JSON.stringify(data_Vue.versions.reverse()),
		},
		success: function (data, msg) {
			updateUser();
			alert("Saving Success!");
			data_Vue.versions = data.reverse();
			document.getElementById("Project_Name").value = data_Vue.geninfo['Project Name'];
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}

function saveProject() {
	var jsondata = JSON.stringify(exportNetwork());
	var name = data_Vue.geninfo['Project Name'];
	
	if(data_Vue.database.filter(obj => obj==name).length > 0){
		//var r = confirm("Project already exists. Do you really want to overwrite the Project: " + name + "?");
		//if(r){
		postProject(name, "/update", jsondata);
		//}
	}else{
		postProject(name, "/save", jsondata);
	}
	
	
}

function saveAsProject() {
	var jsondata = JSON.stringify(exportNetwork());
	var name = document.getElementById("saveAs_name").value;
	
	if(data_Vue.database.filter(obj => obj.name==name).length > 0){
		var r = confirm("Project already exists. Do you really want to overwrite the Project: " + name + "?");
		if(r){
			postProject(name, "/update", jsondata);
		}
	}else{
		postProject(name, "/save", jsondata);
	}
}

// set the path of Own Map file, after map has been uploaded:
function setMapPath(){
	data_Vue.geninfo["Own Map Path"] = "UserMaps/"+data_Vue.user+"_"+document.getElementById('mapFile').files[0].name;
}

function setGenoPath(){
	data_Vue.active_node["Path"] = "UserGenos/"+data_Vue.user+"_"+document.getElementById('genoFile').files[0].name;
}
//******************************************************************************************//
//************************* Network functions **********************************************//

var network_data = data_Vue;

function destroy() {
  if (network !== null) {
	network.destroy();
	network = null;
  }
}

function draw() {
	destroy();

  // create a network
	var container = document.getElementById('mynetwork');
	var options = {
		locale: 'en',
		autoResize: false,
		layout: {
			improvedLayout: false,
		},
		manipulation: {
			addNode: function (data, callback) {
				// creating node:
				data = new myNode("", data.x, data.y);
				data_Vue.show_info = 'node';
				// set default values for DOM:
				data_Vue.active_node = data;
				// filling in the popup DOM elements
				data_Vue.node_operation = "Add Node";
				editNode(data, clearNodePopUp, callback);
			},
			editNode: function (data, callback) {
				// filling in the popup DOM elements
				data_Vue.node_operation = "Edit Node";
				editNode(data, cancelNodeEdit, callback);
			},
			addEdge: function (data, callback) {
				if (typeof data.to === 'object')
					data.to = data.to.id
				if (typeof data.from === 'object')
					data.from = data.from.id
				//creating edge:
				data = new myEdge(data.from, data.to);
				data_Vue.show_info = 'edge';
				// set default values for DOM:
				data_Vue.active_edge = data;
				// calculate Selection Proportion by using number of individuals of parent and offspring nodes:
				data.useVar = Array(data_Vue.individualsVar_options.length).fill('');
				
				if (data.from == data.to) {
					alert("You cannot connect a node to itself.");
					callback(null);
					return;
				}
				data_Vue.edge_operation = "Add Edge";
				editEdgeWithoutDrag(data, callback);
			},
			editEdge: {
				editWithoutDrag: function(data, callback) {
					data_Vue.edge_operation = "Edit Edge";
					editEdgeWithoutDrag(data,callback);
				}
			}
		},
		physics: {enabled: false},
		edges: {
			arrows: {
				to: true,
			},
			chosen: true,
			smooth: {      
				type: "diagonalCross",
				forceDirection: "none",
				roundness: 0.2
			},
			width: 2,
		},
		nodes: {
			shape: 'box',
			shapeProperties: {borderRadius: 0},
		},
		interaction: {
			hover: true,
			hoverConnectedEdges: false,
			selectConnectedEdges: false,			
		},
	};
	network = new vis.Network(container, network_data, options);
	
	network.on("selectNode", function(params){
		data_Vue.show_info = 'node';
		data_Vue.active_node = data_Vue.nodes.get(params.nodes[0]);
		console.log('Active Node is ' + data_Vue.active_node.id);
	})
	network.on("selectEdge", function(params){
		data_Vue.show_info = 'edge';
		data_Vue.active_edge = data_Vue.edges.get(params.edges[0]);
		console.log('Active Edge is ' + data_Vue.active_edge.id);
	})
	network.on("doubleClick", function(params){
		var copy_node = data_Vue.nodes.get(params.nodes[0]);
		var str = Math.round(Math.random() * 10000);
		copy_node.id = copy_node.id + '_Copy' +str;
		copy_node.label = copy_node.label + '_Copy' +str;
		copy_node.x = copy_node.x + 50;
		copy_node.y = copy_node.y + 50;
		data_Vue.nodes.add(copy_node);
		//console.log(document.getElementById("node-individuals").value);
	})
	network.on('dragEnd', function (params) {	
		//console.log(params.nodes);
		if(params.nodes.length > 0 ){
			data_Vue.active_node = data_Vue.nodes.get(params.nodes[0]);
			var positions = network.getPositions(params.nodes[0]);
			data_Vue.active_node.x = positions[params.nodes[0]].x;
			data_Vue.active_node.y = positions[params.nodes[0]].y;
			data_Vue.nodes.update(data_Vue.active_node);
		}
	});
}

function editNode(data, cancelAction, callback) {
	document.getElementById('node-saveButton').onclick = saveNodeData.bind(this, data, callback);
	document.getElementById('node-cancelButton').onclick = cancelAction.bind(this, callback);
	document.getElementById('node-popUp').style.display = 'block';
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
	document.getElementById('node-saveButton').onclick = null;
	document.getElementById('node-cancelButton').onclick = null;
	document.getElementById('node-popUp').style.display = 'none';
}

function cancelNodeEdit(callback) {
	clearNodePopUp();
	callback(null);
}

function addNode_extern(data) {
	data.label = data.id;
	data.color = data_Vue.node_colors[data.Sex];
	data.title = data_Vue.id + ':' + data['Number of Individuals'] + 'Ind';
	if(data['Sex'] != "Both"){
		data['Proportion of Male'] = data.Sex == 'Male' ? 1 : 0;
	}
	if(data_Vue.nodes.get(data.id) != null){
		alert("Node Name already exists! Node cannot be added!")
		return;
	}else{
		data_Vue.nodes.update(data);
	} 
}

function saveNodeData(data, callback) {
	var old_id = data.id;
	data = data_Vue.active_node;
	data.label = data.id;
	data.color = data_Vue.node_color;
	data.title = data_Vue.node_title;
	if(data['Sex'] != "Both"){
		data['Proportion of Male'] = data.Sex == 'Male' ? 1 : 0;
	}
	if(data_Vue.node_operation=='Add Node' && data_Vue.nodes.get(data.id) != null){
		alert("Node Name already exists! Node cannot be added!")
		cancelNodeEdit(callback);
	}else if(data_Vue.node_operation=='Edit Node' && old_id != data.id){
		data_Vue.nodes.add(data);
		data_Vue.nodes.remove(old_id);
		cancelNodeEdit(callback);
	} else {
		clearNodePopUp();
		callback(data);
	}
}

function editEdgeWithoutDrag(data, callback) {
	document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(this, data, callback);
	document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(this,callback);
	document.getElementById('edge-popUp').style.display = 'block';
}

function clearEdgePopUp() {
	document.getElementById('edge-saveButton').onclick = null;
	document.getElementById('edge-cancelButton').onclick = null;
	document.getElementById('edge-popUp').style.display = 'none';
}

function cancelEdgeEdit(callback) {
	clearEdgePopUp();
	callback(null);
}

function addEdge_extern(data) {
	var col = data_Vue.edge_colors[data['Breeding Type']];
	data.color = {color: col, highlight:col, hover:col};
	data.title = data['Breeding Type'];
	data_Vue.edges.update(data);
}

function saveEdgeData(data, callback) {
	data = data_Vue.active_edge;
	data.color = data_Vue.edge_color;
	data.title = data_Vue.edge_title;
	clearEdgePopUp();
	callback(data);
	addServices();
}

function init() {
  draw();
  updateUser();
}

//*************************************************************************************************//
//*********** Functions for running R Simulation ***********************************//
function checkRunTime(){
	var nodes = data_Vue.nodes.get();
	
	var nInd = 0;
	var nF = 0;
	for(let i=0;i < nodes.length; i++){
		if(nodes[i].Founder == 'Yes'){
			nF = nF + parseInt(nodes[i]['Number of Individuals']);
		}
		nInd = nInd + parseInt(nodes[i]['Number of Individuals']);
	}

	var nsnp = data_Vue.geninfo['Chromosomes Info'][0].Length * data_Vue.geninfo['Chromosomes Info'][0].MD;
	var Morgan = data_Vue.geninfo['Chromosomes Info'][0].Length * data_Vue.geninfo['Chromosomes Info'][0].Recombination /100;
	
	var edges = data_Vue.edges.get();
	var nRep = 0;
	var nZucht = 0;
	for(let i=0;i < edges.length; i++){
		if(edges[i]['Breeding Type'] == 'Repeat'){
			nRep = edges[i]['Number of Repeat'];
		}
		if(edges[i]['Breeding Type'] == 'Selection' & edges[i]['Selection Type'] == 'BVE'){
			nZucht++;
		}
	}
	var comptime = nF*nsnp/1000000 + 0.0002*nInd*Morgan;
	return comptime;	
}

function runningR(){
	var jsondata = JSON.stringify(exportNetwork());
	//console.log(jsondata);
	alert("Approx. simulation running time: " + Math.round(checkRunTime()/60*2.6*100)/100 + "minutes.");
	
	$.ajax
	({
		type: "POST",
		url: './Rsim',
		data: {jsondata : jsondata},
		beforeSend: function() {
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			//console.log(data);
			alert("Simulation Finished!");
			data_Vue.runned = true;
			document.getElementById("Rout_Div").innerHTML = data;
		},
		error: function(obj, msg, err) 
		{
			alert(err);
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}


//*************************************************************************************************//
//*********** Functions for plotting results after R Simulation ***********************************//
function boxdata(y, name){
	this.y = y;
	this.name = name;
	this.marker = {color: 'rgba(79, 90, 117, 0.5)'};
	this.type = 'box';
	this.boxpoints = 'Outliers';
	this.boxmean = true;
}

// BVE
function plottingBVE(){
	var file =  data_Vue['geninfo']['Project Name'] + 'BV';
	
	$.ajax
	({
		type: "POST",
		url: './JSON',
		data: {file : file},
		success: function (data, msg) {
			//console.log(data);
			if(data != ''){
				plottingBVE_data(JSON.parse(data));
			}else{
				alert("Failed to plot BVE. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot BVE. Please run the Simulation first!");
		},
		dataType: "text",
	});
}

function plottingBVE_data(data){
	
	var traces = [];
	var keys = Object.keys(data);
	
	for(let j=0; j <data_Vue.traitsinfo.length; j++){
		traces[j] = [];
		for(let i=0; i < keys.length; i++){
			traces[j][i] = new boxdata(data[keys[i]][j], keys[i] )
		}
		
		//var data1 = traces;
		var layout = {
			title : 'BVE Development of ' + data_Vue.traitsinfo[j]['Trait Name'],
			showlegend: false,
			plot_bgcolor: '#FFFFFF',
			};

		Plotly.newPlot(data_Vue.traitsinfo[j]['Trait Name']+'BV', traces[j], layout, {scrollZoom: true});

	}
}

// Kinship
function plottingKS(){
	var file = data_Vue['geninfo']['Project Name'] + 'KS';
	
	$.ajax
	({
		type: "POST",
		url: './JSON',
		data: {file : file},
		success: function (data, msg) {
			//console.log(data);
			if(data != ''){
				plottingKS_data(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		dataType: "text",
	});
}

function plottingKS_data(data){
	
	var traces = [{},{}];
	var titles = ['IBD', 'HBD'];
	
	for(let j=0; j < 2; j++){
		traces[j].y = [];
		traces[j].x = [];
		traces[j].mode = 'scatter';
		traces[j].name =titles[j];
		
		for(let i=0; i < data.length; i++){
			traces[j].y.push(data[i][j+1]);
			traces[j].x.push(data[i][0]);
		}
	}
	
	var data1 = traces;
	var layout = {
		title : 'Kinship Development',
		showlegend: true,
		plot_bgcolor: '#FFFFFF',
		};

	Plotly.newPlot('KS_Div', data1, layout, {scrollZoom: true});
}

function clearResult(){
	document.getElementById("Rout_Div").innerHTML = '';
	Plotly.purge('KS_Div');
	for(let j=0; j< data_Vue.traitsinfo.length; j++){
		Plotly.purge(data_Vue.traitsinfo[j]['Trait Name']+'BV');
	}
	data_Vue.runned=false;
}



var A = [[1,0,0],[0,1,0], [0,0,1]];
//console.log(numeric.eig(A).lambda.x);



//******************* If the User take data from database, then load them here **********/
function updateUser(){
	$.get('/user', function(dat){
		data_Vue.user = dat;
	})

	$.post('/database', function(dat){
		data_Vue.database = dat;
		//console.log(dat);
	})
	
	$.post('/template_database', function(dat){
		data_Vue.template_database = dat;
		//console.log(dat);
	})
}

function loadData(ind){
	if(ind != "New"){
		$.ajax
		({
			type: "POST",
			url: '/loadproject',
			data: {name : ind},
			success: function (data, msg) {
				if(data != ''){
					importNetwork_intern(data[0].json);
					if(data[0].versions.length > 0){
						data_Vue.versions = data[0].versions.reverse();
					}
				}else{
					alert("Loading Data failed. Contact administrator.");
				}
			},
			failure: function(msg) 
			{
				alert("Loading Data failed. Contact administrator.");
			},
		});
	}else{
		location.reload();
	}
}

function loadVersion(ind){
	if(ind != "recent"){
		var json = data_Vue.versions[ind].json;
		//console.log(json);
		importNetwork_intern(json);
	}else{
		var json = data_Vue.versions[0].json;
		//console.log(json);
		importNetwork_intern(json);		
	}
}

function loadTemplate(ind){
	if(ind != "New"){
		var json = data_Vue.template_database[ind].json;
		//console.log(json);
		importNetwork_intern(json);
	}else{
		location.reload();
	}
}

//********** for streaming the R output to client, not implemeneted:

function streamRout(){
	var eventList = document.getElementById("eventRout");
	var evtSource = new EventSource("/Rsim");

	var newElement = document.createElement("li");
	newElement.innerHTML = "Messages:";
	eventList.appendChild(newElement);

	evtSource.onmessage = function(e) {
		console.log("received event");
		console.log(e);
		var newElement = document.createElement("li");

		newElement.innerHTML = "message: " + e.data;
		eventList.appendChild(newElement);
	};      

	evtSource.onerror = function(e) {
		console.log("EventSource failed.");
	};
}


//************* warn the user about unsaved changes, when leaving:
window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = '';
});
