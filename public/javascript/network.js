Vue.component('treeselect', VueTreeselect.Treeselect);
//Vue.component('slider', VueSlider.Slider);
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
	this['Housing Cost Class'] = "Default Housing Cost";
	this['Proportion of genotyped individuals'] = 1;
	this['Genotype generation'] = "Random-sampling";
	this['Genotype generation subpopulation'] = "Population 1"; 
	}
	
function myEdge (fr, to) {
	this['from'] = fr;
	this['to'] = to;
	this['Breeding Type'] = "";
	this['Selection Type'] = "Random";
	this['Number of Repeat'] = "";
	//this['Selection Proportion'] = "";  -> we do not save it, always calculate from Number of Individuals
	this['Relationship Matrix'] = "";
	this['BVE Method'] = "";
	//this['New Mutation Rate'] = "";
	//this['New Remutation Rate'] = "";
	//this['Number of Rec per M'] = "";
	this['Use Offspring for BVE'] = "";
	this['Time Needed'] = 0;
	this['id'] = fr + '_'+ to;
	// in order to save the parameters that are using variables, should match indivdualsVar_options
	this['useVar'] =[];
	this['Selection Index']="Default Index";
	this['Cohorts used in BVE'] = "";
	this['Manuel selected cohorts'] = [];
	this['OGC'] = "No";
	this['Depth of Pedigree'] = "";
	this['Max Offspring'] = "Inf";
}

// define the classe myGeneral with default values for General information:
function myGeneral () {
	this['Project Name'] = '';
	this['Species'] = '';
	this['Use Ensembl Map'] = "Yes";
	this['Ensembl Dataset'] = "";
	this['Max Number of SNPs'] = 5000;
//	this['Ensembl Filter'] = "";
//	this['Ensembl Filter Values'] = "";
	this['Number of Chromosomes'] = '';
	this['Chromosomes of Equal Length'] = 'Yes';
	this['Time Unit'] = 'Weeks';
	this['Use Own Map'] = 'Yes';
	this['Own Map Path'] = '';
	// this['chromo will be filled with myChromo elements later=
	this['Chromosomes Info'] = [];
	this['Upload_CorrFile'] = 'No';
	this['curUserGroup'] = '';
}

function myTrait (ind){
	this['Trait Name'] = "Pheno " + ind,
	this['Trait Unit'] = "",
	this['Trait Mean'] = Math.round(Math.random()*100) +1,
	this['Trait Std Deviation'] = Math.round(Math.random()*10) +1,
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
	this['QTL Effect AA'] = Math.round(Math.random()*10) +1,
	this['QTL Effect AB'] = Math.round(Math.random()*10) +1,
	this['QTL Effect BB'] = Math.round(Math.random()*10) +1,
	this['QTL Allele Frequency'] = Math.round(Math.random()*100)/100,
	this['QTL Optional Info'] = ''
}

function mySNPsub (ind){
	this['QTL SNP Number'] = ind,
	this['QTL ID'] = 'QTL'+ind,
	this['QTL BP'] = Math.round(Math.random()*1000000),
	this['QTL Chromosome'] = 1,
	this['QTL Allele Frequency'] = Math.round(Math.random()*100)/100,
	this['QTL Optional Info'] = ''
}

function myEconomy (){
	this['Fixed Cost'] = 0,
	this['Interest Rate'] = 0,
	this['Genotyping Cost'] = 50,
	this['Animal Housing Costs'] = [{Name: "Default Housing Cost", Cost: 0}, {Name: 'Male individuals', Cost: 2000}, {Name: 'Female individuals', Cost: 3000}]
}

function myCulling (){
	this['culling_reasons'] = []
}

function myPopulation (){
	this['subpopulation_list'] = [{Name: "Population 1", beta1 : 1, beta2: 1, share0: 0, share1: 0, fixed_freq: 0, 'QTL Info': []}]
}

function mySelectionScaling (selection_index){
	var len = selection_index.length;
	var scaling_var = [];
	for(let i=0; i<len; i++){
		scaling_var[i] = {Name: selection_index[i]["Name"], active_scaling: false, miesenberger: false, w_scaling: 'Per Unit'};
	}
	return scaling_var;

}


function myVariable (vname){
	this['name'] = vname;
	this['value'] = 0;
}

// define myChromo that will be used to create elements for chromo in myGeneral:
function myChromo (len, md, recomb){
	this['Length'] = len, 
	this['MD'] = md, 
	this['Recombination'] = recomb
}

// returns an array of length len for the correlation matrices:
function myArray(len){
	var a = [];
	for(let i=0; i<len; i++){
		a[i] = {val:0.01};
	}
	a[len-1].val = 1;
	return a;
}

// returns an object with all parameters, we ned for plotting results:
function myPlottingPar(){
	this['ResQTL_trait'] = "", 
	this['ResQTL_qtl'] = "",
	this['ResQTL_cohorts'] = [],
	this['ResRel_cohorts'] = [],
	this['ResRelbetweenC_cohort1'] = "",
	this['ResRelbetweenC_cohort2'] = "",
	this['ResgMean_cohorts'] = [],
	this['ResgMean_pType'] = "By Repeats",
	this['RespMean_cohorts'] = [],
	this['RespMean_pType'] = "By Repeats",
	this['ResRel_pType'] = "By Repeats",
	this['ResAccBVE_cohorts'] = [],
	this['ResAccBVE_pType'] = "By Repeats"
}

// returns an object with all data for plotting results:
function myPlottingData(){
	this['ResQTL'] = "", 
	this['ResRel'] = "",
	this['ResRelbetweenC'] = "",
	this['ResgMean'] = "",
	this['Summary'] = "",
	this['RespMean'] = "",
	this['ResAccBVE'] = ""
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
		economy: new myEconomy(),
		culling: new myCulling(),
		use_phenotypic_cor: false,
		subpopulation: new myPopulation(),
		matrix: [],
		matrix2: [],
		rlog: true,
		
		show_geninfo: false,
		show_menu: false,
		Species_options: ['Chicken', 'Cattle', 'Sheep', 'Pig', 'Horse', 'Goat', 'Human', 'Maize', 'Other'],
		Time_Unit_options: ['Years', 'Month', 'Weeks', 'Days'],
		true_false_options: ['TRUE', 'FALSE'],
		w_options: ['Per Unit', 'Per Phenotypic SD', 'Per Breeding Value SD'],
		show_info:'',
		show_chromo_info: true,
		show_pheno_info: true,
		show_QTL: true,
		show_matrix: true,
		show_matrix2: true,
		show_matrix_element: [],
		selection_index : [{'Name': 'Default Index'}, {'Name': 'Non'}],
		selection_index_scaling : [{'Name': 'Default Index', 'active_scaling': false, 'miesenberger': false, 'w_scaling': 'Per Unit'}, {'Name': 'Non', 'active_scaling': false, 'miesenberger': false, 'w_scaling': 'Per Unit'}],
		phenotyping_class : [{'Name': 'Default PhenoC', 'Cost of phenotyping': 0.1}, {'Name': 'Not phenotyped', 'Cost of phenotyping': 0.1}],
		show_warnings: false,
		warnings: [],
		runned: false,
		genetic_data:'Ens',
		user:'',
		database:[],
		versions:[],
		template_database:[],
		project_saved: "",
		plottingPar: new myPlottingPar(),
		plottingData: new myPlottingData(),
		Summary: [],
		socket: '',
		curUserGroup:'',
		filename:'',
		
		// params for nodes and edges:
		nodes: nodes,
		edges: edges,
		active_node:'',
		active_edge:  new myEdge(),
		node_operation: '',
		edge_operation: '',
		Sex_options: ['Male', 'Female', 'Both'],
		node_colors: {'Male':'#9acef4', 'Female':'#f29595', 'Both':'#ddd264'},
		edge_colors: {'Selection':'#7bbb44', 'Reproduction':'#f5a623', 'Aging':'#dba59a', 'Combine':'#5a4f7c', 'Repeat':'#f14235', 'Split': '#94db8e', 'Cloning':'#aa76fd', 'Selfing':'#ff90b7', 'DH-Production':'#aa76fd'},
		counter_pheno: 0,
		counter_qtl:0,
		counter_qtl_sub:0,
		
		individualsVar_options: [],
		plottingType: ["By Repeats", "By Cohorts", "By Time"],
		Genotype_generation_options: ["Upload Genotypes", "Random-sampling", "Fully-homozygous", "Fully-heterozygous", "All-B-Allele", "All-A-Allele"],
		Breedingtype_options: ['Selection', 'Reproduction', 'Aging', 'Combine', 'Repeat', 'Split', 'Cloning', 'Selfing', 'DH-Production'],
		selectionType_options: ['Phenotypic', 'Random', 'BVE' ],
		RelationshipMatrix_options: ['VanRaden', 'Pedigree', 'Single Step'],
		BVEMethod_options: ['Direct Mixed-Model', 'REML-GBLUP (EMMREML)', 'REML-GBLUP (rrBLUP)', 'REML-GBLUP (sommer)', 'Multi-trait REML-GBLUP (sommer)', 'BayesA', 'BayesB', 'BayesC', 'RKHS'],
		Cohorts_options: ['Only this cohort', 'Last Generation', 'Last 2 Generations', 'Last 3 Generations', 'All',  'Manual select'],
		ensembl_options:{
			Cattle: [
				{Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Illumina BovineSNP50 BeadChip"},
				{Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Illumina BovineHD BeadChip"},
				{Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Illumina BovineLD BeadChip"},
				{Dataset: "btaurus_snp", Filter:"variation_set_name", Value: "Genotyping chip variations"}
			],
			Chicken: [
				{Dataset: "ggallus_snp", Filter:"variation_set_name", Value: "Affymetrix Chicken600K Array"},
				{Dataset: "ggallus_snp", Filter:"variation_set_name", Value: "Affymetrix Chicken600K Array_subset_diversity"},
				{Dataset: "ggallus_snp", Filter:"variation_set_name", Value: "Affymetrix Chicken600K Array_subset_50k"}
			],
			Pig: [
				{Dataset: "sscrofa_snp", Filter:"variation_set_name", Value: "Axiom Genotyping Array"},
				{Dataset: "sscrofa_snp", Filter:"variation_set_name", Value: "GGP Porcine HD"},
				{Dataset: "sscrofa_snp", Filter:"variation_set_name", Value: "GGP Porcine LD"},
				{Dataset: "sscrofa_snp", Filter:"variation_set_name", Value: "Illumina_PorcineSNP60"}
			],
			Sheep: [
				{Dataset: "oaries_snp", Filter:"variation_set_name", Value: "IlluminaOvineHDSNP"},
				{Dataset: "oaries_snp", Filter:"variation_set_name", Value: "IlluminaOvineSNP50"},
				{Dataset: "oaries_snp", Filter:"variation_set_name", Value: "Genotyping chip variants"}
			],
			Maize: [{Dataset: "", Filter:"variation_set_name", Value: "Affymetrix Axiom Maize Genotyping Array"}],
			Horse: [{Dataset: "ecaballus_snp", Filter:"variation_set_name", Value: "Illumina EquineSNP50 BeadChip"}],
			Goat: [{Dataset: "placeholder", Filter:"placeholder", Value: "Illumina_GoatSNP50"}],
			Human: [
				{Dataset: "placeholder", Filter:"placeholder", Value: "Affy GeneChip500K"},
				{Dataset: "placeholder", Filter:"placeholder", Value: "Illumina_1M-duo"},
				{Dataset: "placeholder", Filter:"placeholder", Value: "Illumina_HumanHap550"}],
			Other: [{Dataset: "", Filter:"variation_set_name", Value: ""}],
		},
	},
	watch: {
		project_saved: function(val){
			console.log(val);
			document.getElementById("save_button").disabled = val;
		},
		traitsinfo: function(val){
			var len = val.length;
			var oldlen = Object.keys(this.selection_index[0]).length -1; 
			
			var diff = len - oldlen;
			
			if (diff > 0){
				for(let i=0; i<this.selection_index.length; i++){
					for(let j=this.counter_pheno-diff; j < this.counter_pheno; j++){
						this.selection_index[i]['P'+(j+1)] = i==1? "0" : 1;
					}
				}	
				for(let i=0; i<this.phenotyping_class.length; i++){
					for(let j=this.counter_pheno-diff; j < this.counter_pheno; j++){
						this.phenotyping_class[i]['P'+(j+1)] = i==1? "0" : 1;
					}
				}	
			}else if(len ==0){
				this.phenotyping_class = [{Name: "Default PhenoC", 'Cost of phenotyping': "0"}, {Name: "Not phenotyped", 'Cost of phenotyping': "0"}];
				this.selection_index = [{Name: "Default Index"}, {Name: 'Non'}];
			}
							
		},
		genetic_data: function (val){
			if(val=='Ens'){
				this.geninfo['Use Ensembl Map'] = 'Yes';
				this.geninfo['Use Own Map'] = 'No';
				this.geninfo['Own Map Path'] = "";
			}
			if(val=='Own'){
				this.geninfo['Use Ensembl Map'] = 'No';
				this.geninfo['Use Own Map'] = 'Yes';
				this.geninfo['Ensembl Dataset'] = "";
				this.geninfo['Number of Chromosomes'] = "";
			}
			if(val=='Cus'){
				this.geninfo['Use Ensembl Map'] = 'No';
				this.geninfo['Use Own Map'] = 'No';
				this.geninfo['Ensembl Dataset'] = "";
			}
		},
		current_equalchrom: function(val){
			this.createChrom();
		},
		combined_length: function(val){
			this.project_saved = false;
		}
	},
	computed: {
		node_manualselect_options: {
			get: function(){
				var data = this.nodes.get()
					.map(function(x){return({id: x.id, label: x.id, children:[
						{id: x.id+":0", label:x.id+":Same Repeat"},
						{id: x.id+":-1", label:x.id+":Previous Repeat"},
						{id: x.id+":-2", label:x.id+":2 Repeats before"},
						{id: x.id+":-3", label:x.id+":3 Repeats before"},
						{id: x.id+":-4", label:x.id+":4 Repeats before"},
						{id: x.id+":-5", label:x.id+":5 Repeats before"},
					]})});
				return(data);
			}
		},
		combined_length: {
			get: function(){
				return(this.traitsinfo.length + this.nodes.length + this.edges.length + this.selection_index.length + this.phenotyping_class.length + this.individualsVar_options.length);
			}
		},
		current_equalchrom: {
			get: function(){
				return(this.geninfo['Chromosomes of Equal Length']);
			}
		},
		selection_proportion: {
			get: function(){
				//console.log(this.active_edge);
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
		// add a new animal housing cost class:
		createHCostClass: function(){
			var val = document.getElementById("newHCostClass").value;
			for(let i=0; i<this.economy['Animal Housing Costs'].length; i++){
				if(this.economy['Animal Housing Costs'].Name == val){
					alert("Animal Housing Costs class name already exists. Animal Housing Costs class not created.")
					return;
				}
			}
			if(val == ''){
				alert("Animal Housing Costs class name must not be empty. Animal Housing Costs class not created.")
				return;				
			}
			var newHC = {Name: val, Cost: 0};
			this.economy['Animal Housing Costs'].push(newHC);	
			document.getElementById("newHCostClass").value='';				
		},	
		createCulling: function(){
			var val = document.getElementById("newCullingClass").value;
			for(let i=0; i<this.culling['culling_reasons'].length; i++){
				if(this.culling['culling_reasons'].Name == val){
					alert("Culling reason already exists. Culling reason is not created.")
					return;
				}
			}
			if(val == ''){
				alert("No name for culling reason entered. No culling reason generated.")
				return;				
			}
			var newCulling = {Name: val, At_age : 0, Relevant_Sex: 'Both', Genetic_index_for_survival: 'Non', Share_death_at_BV1: 0, BV1: 100, Share_death_at_BV2:0, BV2: 110};
			this.culling['culling_reasons'].push(newCulling);	
			document.getElementById("newCullingClass").value='';				
		},	
		createSub: function(){
			var val = document.getElementById("newSubpopulationClass").value;
			for(let i=0; i<this.subpopulation['subpopulation_list'].length; i++){
				if(this.subpopulation['subpopulation_list'].Name == val){
					alert("Subpopulation already exists. Subpopulation is not created.")
					return;
				}
			}
			if(val == ''){
				alert("No name for subpopulation entered. No subpopulation generated.")
				return;				
			}
			var newSub = {Name: val, beta1: 1, beta2: 1, share0: 0, share1: 0, fixed_freq: 0, 'QTL Info': []};
			this.subpopulation['subpopulation_list'].push(newSub);	
			document.getElementById("newSubpopulationClass").value='';				
		},	
		removeHCostClass: function(si, ind){
			
			var items = this.nodes.getIds({
				filter: function (item) {
					return item['Housing Cost Class'] == si.Name;
				}
			});
			
			if(items.length >= 1 ){
				alert("Animal Housing Costs class is still in used by "+items.length+ " nodes. Removing not possible!");
				return;
			}
			this.economy['Animal Housing Costs'].splice(ind,1);

		},
		
		removeCulling: function(si, ind){
			
			this.culling['culling_reasons'].splice(ind,1);

		},
		removeSub: function(si, ind){
			
			this.subpopulation['subpopulation_list'].splice(ind,1);

		},

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
			var len = Object.keys(this.selection_index[0]);
			var mySI = {};
			mySI["Name"] = val;
			for(let i=1; i < len.length; i++){
				mySI[len[i]] = 1;
			}
			var mySIscaling = {};
			mySIscaling["Name"] = val; 
			mySIscaling["active_scaling"] = false; 
			mySIscaling["miesenberger"]=false;
			mySIscaling["w_scaling"]= 'Per Unit';
			this.selection_index.push(mySI);	
			this.selection_index_scaling.push(mySIscaling);
			document.getElementById("newSI").value='';		
		//	document.getElementById("newSIscaling").value='';	 - gives error, and i don't see this is exist in html' so removing(Amudha)		
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
			var len = Object.keys(this.phenotyping_class[0]);
			var myPC = {};
			myPC["Name"] = val;
			myPC["Cost of phenotyping"] = "0";
			for(let i=2; i < len.length; i++){
				myPC[len[i]] = 1;
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
			this.selection_index_scaling.splice(ind,1);

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
		createQTLsub: function(ind){
			this.subpopulation['subpopulation_list'][ind]['fixed_freq'] = Math.round(Number(this.subpopulation['subpopulation_list'][ind]['fixed_freq']));
			var val = this.subpopulation['subpopulation_list'][ind]['fixed_freq'];
			var len = this.subpopulation['subpopulation_list'][ind]['QTL Info'].length;
			var diff = val - len;
			
			if(diff < 0){
				this.subpopulation['subpopulation_list'][ind]['QTL Info'].splice(diff);
			}else if (diff > 0){
				while (len < val){
					this.counter_qtl_sub++;
					var newSNPsub = new mySNPsub(this.counter_qtl_sub);
					this.subpopulation['subpopulation_list'][ind]['QTL Info'].push(newSNPsub);
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
		
		removeQTLsub: function(subpop, trait, snp){
			var indA = this.subpopulation.indexOf(subpop)
			var indT = this.subpopulation[indA].indexOf(trait);
			var indS = this.subpopulation[indA][indT]['QTL Info'].indexOf(snp);
			
			this.subpopulation[indA][indT]['QTL Info'].splice(indS,1);
			this.subpopulation[indA][indT]['fixed_freq']--;

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
				delete this.phenotyping_class[i][Object.keys(this.phenotyping_class[i])[ind+2]];
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
	var item = data_Vue.individualsVar_options.filter(function(vv){ return(vv.name == ivar)})[0];
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
	
	var item = data_Vue.individualsVar_options.filter(function(vv){ return(vv.name == ivar)})[0];
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

	if(data_Vue['Upload_CorrFile'] == 'Yes') {
		var mat1 = data_Vue.mymatrix1;
		var mat2 = data_Vue.mymatrix2; 
	}
	else {
		for(let i=0; i < data_Vue.traitsinfo.length; i++){
			row1 = [];
			row2 = [];
			for(let j=0; j <= i; j++){
				row1.push(data_Vue.matrix[i].row[j].val);
				row2.push(data_Vue.matrix2[i].row[j].val);
			}
			mat1.push(row1);
			mat2.push(row2);
		}
	}
	
	var Intern = {
		show_matrix_element : data_Vue.show_matrix_element,
		counter_pheno : data_Vue.counter_pheno,
		counter_qtl : data_Vue.counter_qtl,
		counter_qtl_sub : data_Vue.counter_qtl_sub,
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
		'Selection Index Scaling': data_Vue.selection_index_scaling,
		'Phenotyping Info': data_Vue.phenotyping_class,
		'Economy': data_Vue.economy,
		'Culling': data_Vue.culling,
		'Subpopulation': data_Vue.subpopulation,
		'Phenotypic Correlation': mat1,
		'PhenotypicResidual': data_Vue.use_phenotypic_cor,
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
	data_Vue.project_saved = false;
	
}

function importNetwork_intern(inputData1) {
	data_Vue.active_edge = new myEdge();
	if(data_Vue.runned){
		clearResult();
	}	
	//console.log(inputData);
	var inputData = JSON.parse(JSON.stringify(inputData1));
	data_Vue.nodes = new vis.DataSet(inputData['Nodes']);
	data_Vue.edges = new vis.DataSet(inputData['Edges']);
	data_Vue.geninfo = inputData['Genomic Info'] ? inputData['Genomic Info'] : new myGeneral();
	data_Vue.traitsinfo = inputData['Trait Info'] ? inputData['Trait Info'] : [];
	data_Vue.selection_index = inputData['Selection Index'];
	if(inputData['PhenotypicResidual']){
		data_Vue.use_phenotypic_cor = inputData['PhenotypicResidual'];
	} else{
		data_Vue.use_phenotypic_cor = false;
	}

	if(inputData['Selection Index Scaling']){
		data_Vue.selection_index_scaling = inputData['Selection Index Scaling'];
	} else{
		data_Vue.selection_index_scaling = new mySelectionScaling(data_Vue.selection_index);
	}

	if(inputData['Economy']){
		data_Vue.economy = inputData['Economy'];
	}else{
		data_Vue.economy = new myEconomy();
	}
	if(inputData['Culling']){
		data_Vue.culling = inputData['Culling'];
	}else{
		data_Vue.culling = new myCulling();
	}
	if(inputData['Subpopulation']){
		data_Vue.subpopulation = inputData['Subpopulation'];
	}else{
		data_Vue.subpopulation = new myPopulation();
	}
	
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
	data_Vue.counter_qtl_sub = inputData["Intern"].counter_qtl_sub;
	data_Vue.individualsVar_options = inputData["Intern"].individualsVar_options;
	data_Vue.genetic_data = inputData["Intern"].genetic_data;
	//data_Vue.runned = inputData["Intern"].runned;
	
	var mat1 = inputData['Phenotypic Correlation'];
	var mat2 = inputData['Genetic Correlation'];
	//console.log(mat1);
	if(mat1.length > 0){		
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
	}else{
		data_Vue.matrix = [];
		data_Vue.matrix2 = [];		
	}
	
	draw();
	console.log("Loading Data successful.");
	data_Vue.project_saved = true;
	
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
			$.post('/database', function(dat){
				data_Vue.database = dat;
				//document.getElementById("Project_Name").value = name; 
			})
			alert("Saving Success!");
			data_Vue.project_saved = true;
			//loadData(name);
			console.log(data);
			data_Vue.versions = data.reverse();
			//document.getElementById("Project_Name").value = name; //data_Vue.geninfo['Project Name'];
			document.getElementById("Version").value = "recent";
			document.getElementById("SaveAs_Div").style.display = 'none';
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}

function saveProject(name) {
	if(!name){
		var name = data_Vue.geninfo['Project Name'];
	}else{
		data_Vue.geninfo['Project Name'] = name;
	}
	var jsondata = JSON.stringify(exportNetwork());
	
	if(data_Vue.versions.length > 10){
		var r = confirm("Only the 10 most recent versions are saved. The oldest version will be deleted. Do you want to proceed? Alternative: Change the Project Name and save to create a new project");
		if(!r) return;
	}
	
	while(data_Vue.versions.length > 10){
		data_Vue.versions.pop();
	}
	
	if(data_Vue.database.filter(function(obj){ return(obj==name)}).length > 0){
		postProject(name, "/update", jsondata);
	}else{
		postProject(name, "/save", jsondata);
	}
}

function deleteProject() {
	var name = data_Vue.geninfo['Project Name'];
	
	if(data_Vue.database.filter(function(x){return(x == name)}).length > 0){
		var r = confirm("The whole project including all older versions will be deleted. Do you want to proceed?");
		if(r){
			$.ajax
			({
				type: "POST",
				url: "/delete",
				data: {
					name: name,
				},
				success: function (msg) {
					//loadData(name);
					console.log("Project deleted.");
					location.reload();
				},
				failure: function(msg) 
				{
					alert('Delete Error!');
				},
			});	
		}
	}
}

function saveProjectAs() {
	document.getElementById("SaveAs_Div").style.display = 'block';
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
			selectConnectedEdges: true,			
		},
	};
	network = new vis.Network(container, network_data, options);
	
	network.on("selectNode", function(params){
		data_Vue.show_info = 'node';
		data_Vue.active_node = data_Vue.nodes.get(params.nodes[0]);
		console.log('Active Node is ' + data_Vue.active_node.id);
	});
	network.on("selectEdge", function(params){
		if(params.nodes.length == 0) data_Vue.show_info = 'edge';
		data_Vue.active_edge = data_Vue.edges.get(params.edges[0]);
		console.log('Active Edge is ' + data_Vue.active_edge.id);
	});
	network.on("doubleClick", function(params){
		var copy_node = data_Vue.nodes.get(params.nodes[0]);
		var str = Math.round(Math.random() * 10000);
		copy_node.id = copy_node.id + '_Copy' +str;
		copy_node.label = copy_node.label + '_Copy' +str;
		copy_node.x = copy_node.x + 50;
		copy_node.y = copy_node.y + 50;
		data_Vue.nodes.add(copy_node);
		//console.log(document.getElementById("node-individuals").value);
	});
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
	// when id is changed, update alle the edges:
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
	var myInd = JSON.stringify(data['Number of Individuals']).replace(/\"/g, "");
	//data.label = data.id+'\n'+myInd;
	data.label = data.id+" ("+myInd+")";
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
		
		// update edges from:
		var items = data_Vue.edges.getIds({
			filter: function (item) {
				return item.from == old_id;
			}
		});
		console.log(items);
		if(items.length >= 1){
			for(ii=0; ii < items.length; ii++){
				data_Vue.edges.update({id: items[ii], from: data.id});
			}
		}
		// update edges to:
		var items = data_Vue.edges.getIds({
			filter: function (item) {
				return item.to == old_id;
			}
		});
		console.log(items);
		if(items.length >= 1){
			for(ii=0; ii < items.length; ii++){
				data_Vue.edges.update({id: items[ii], to: data.id});
			}
		}
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
	// delete unnecessary data:
	if(data['Selection Type'] == "Phenotypic" | data['Selection Type'] == "Random" | data['Selection Type'] == "Aging"){
		var keys = ['Relationship Matrix', 'BVE Method', 'Cohorts used in BVE', 'Depth of Pedigree'];
		for(let i=0; i< keys.length; i++){
			data[keys[i]] = "";
		}
		data['Manuel selected cohorts'] = [];
	}
	clearEdgePopUp();
	callback(data);
	addServices();
}

function init() {
  draw();
  updateUser();
}


//******************* If the User take data from database, then load them here **********/
function updateUser(){
	$.get('/user', function(dat){
		data_Vue.user = dat.username;
		data_Vue.curUserGroup = dat.usergroup;
		data_Vue.geninfo['curUserGroup'] = dat.usergroup;
	})
	
	$.post('/database', function(dat){
		data_Vue.database = dat;
	})
	
	$.post('/template_database', function(dat){
		data_Vue.template_database = dat;
		//console.log(dat);
	})
	data_Vue.project_saved = true;
}


function loadData(ind){
//	console.log(ind);
	if(ind != "Create_New_123456YYYY"){
		$.ajax
		({
			type: "POST",
			url: '/loadproject',
			data: {name : ind},
			success: function (data, msg) {
				if(data != ''){
					//console.log("data original");
					console.log(data);
					data_Vue.filename = data[0].name;
					importNetwork_intern(data[0].json);
					if(data[0].versions.length > 0){
						data_Vue.versions = data[0].versions.reverse();
					}
					//document.getElementById("Project_Name") = ind;
					document.getElementById("Version").value = "recent";
					data_Vue.project_saved = true;
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
	data_Vue.project_saved = true;
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

//************* warn the user about unsaved changes, when leaving:
window.addEventListener('beforeunload', function (e) {
	if(data_Vue.project_saved == false){
		// Cancel the event
		e.preventDefault();
		// Chrome requires returnValue to be set
		e.returnValue = '';
	}
});



function myFunction() {
  document.getElementById("Icon").classList.toggle("change");
  data_Vue.show_menu = !data_Vue.show_menu;
} 


// excel to Array 
var excelToArr = document.getElementById('excelToArray');
if(excelToArr) {
	excelToArr.addEventListener('change', importexcelToArray, false);
}


function importexcelToArray(evt) {   
    var selectedFile = evt.target.files; 
    var excelToArray = new ExcelToArray();
    excelToArray.parseExcel(selectedFile[0]);
 }	

function saveMatrixToProject(name) {
	if(!name){
		var name = data_Vue.geninfo['Project Name'];
	}else{
		data_Vue.geninfo['Project Name'] = name;
	}
	saveProject(name);
	loadData(name);
}

// excel to Array end
