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
	this['Phenotyping Class'] = "Fully phenotyped";
	this['Housing Cost Class'] = "No Housing";
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
	this['BVE Method_solver'] = "Regular Inversion";
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
	this['ogc_target'] = "min.sKin";
	this['ogc_relation'] = "vanRaden";
	this['ogc_constrain1'] = "inactive";
	this['ogc_constrain2'] = "inactive";
	this['ogc_constrain3'] = "inactive";
	this['Depth of Pedigree'] = "";
	this['Max Offspring'] = "Inf";
	this['Max Offspring Pair'] = "Inf";
}

// define the classe myGeneral with default values for General information:
function myGeneral () {
	this['Project Name'] = '';
	this['Species'] = '';
	this['Use Ensembl Map'] = "Yes";
	this['Ensembl Dataset'] = "";
	this['Max Number of SNPs'] = 5000;
	this['number-simulations'] = 1;
	this['number-simulations-parallel'] = 1;
	this['number-simulations-core'] = 1;
	this['advanced'] = false;
	this['advanced_test'] = false;
	this['advanced_ld'] = false;
	this['advanced_history'] = false; 
	this['advanced_litter'] = false; 
	this['advanced_multi'] = false; 
	this['advanced_miraculix'] = true;
	this['advanced_parallel'] = false;
	this['advanced_trait'] = false;
	this['advanced_trait_epi'] = false;
	this['advanced_trait_repeat'] = false;
	this['advanced_trait_maternal'] = false;
	this['advanced_trait_combi'] = false;
	this['advanced_trait_trafo'] = false;
	this['advanced_trait_scaling'] = false;
	this['advanced_culling'] = false;
	this['advanced_sub'] = false;
	this['advanced_eco'] = false;
	this['advanced_box'] = false;
	this['advanced_advanced'] = false;
	this['advanced_user'] = false;
	this['advanced_advanced_geno'] = false; 
	this['advanced_advanced_mating'] = false; 
	this['advanced_advanced_off'] = false; 
	this['advanced_advanced_ogc'] = false; 
	this['advanced_advanced_ratio'] = false; 
	this['advanced_advanced_thres'] = false; 
	this['advanced_advanced_pheno'] = false; 
	this['advanced_advanced_skip'] = false; 
	this['advanced_advanced_reli'] = false; 
	this['advanced_advanced_last'] = false; 
	this['advanced_advanced_del'] = false; 
	this['advanced_advanced_scaling'] = false;
	this['advanced_advanced_copy'] = false;
//	this['Ensembl Filter'] = "";
//	this['Ensembl Filter Values'] = "";
	this['Number of Chromosomes'] = '';
	this['Chromosomes of Equal Length'] = 'Yes';
	this['Time Unit'] = 'Weeks';
	this['mutation_rate'] = '1e-08';
	this['Use Own Map'] = 'Yes';
	this['Own Map Path'] = '';
	// this['chromo will be filled with myChromo elements later=
	this['Chromosomes Info'] = [];
	this['Upload_CorrFile'] = 'No';
	this['curUserGroup'] = '';
	this['Excel_File'] = '';
	this['user']=''
	//this['listOfCohorts_withInfo'] = '';
	this['sharedWith']='';
	this['project_Sharer']='';
	this['majorQTLsyntax'] = "SNP + Chromosome";
	this['slider_value']=0;
}

function myTrait (ind){
	this['Trait Name'] = "Pheno " + ind,
	this['Trait Unit'] = "",
	this['Trait Mean'] = 100,
	this['Trait Std Deviation'] = 10,
	this['Trait Heritability'] = 0.3,
	this['Trait Repeatability'] = "",
	this['Trait Number of Polygenic Loci'] = 1000,
	this['dominant_qtl'] = 0,
	this['qualitative_qtl'] = 0,
	this['quantitative_qtl'] = 0,
	this['additive_equal'] = 0,
	this['dominant_equal'] = 0,
	this['dominant_positive'] = 0,
	this['is_maternal'] = false,
	this['is_paternal'] = false,
	this['is_combi'] = false,
	this['Trait Major QTL'] = 0,
	this['Trait Value per Unit'] = 0,
	this['trafo'] = "function(x){return(x)}",
	this['Trait QTL Info'] = []
}

function mySNP (ind){
	this['QTL SNP Number'] = "",
	this['QTL ID'] = "",
	this['QTL BP'] = "",
	this['QTL Chromosome'] = "",
	this['QTL Effect AA'] = 0,
	this['QTL Effect AB'] = 0,
	this['QTL Effect BB'] = 0,
	this['QTL Allele Frequency'] = 0.5,
	this['QTL Optional Info'] = ''
}

function mySNPsub (ind){
	this['QTL SNP Number'] = "",
	this['QTL ID'] = "",
	this['QTL BP'] = "",
	this['QTL Chromosome'] = "",
	this['QTL Allele Frequency'] = 0.5,
	this['QTL Optional Info'] = ''
}

function myEconomy (){
	this['Fixed Cost'] = 0,
	this['Interest Rate'] = 0,
	this['Genotyping Cost'] = 50,
	this['Animal Housing Costs'] = [{Name: "No Housing", Cost: 0}, {Name: 'Male individuals', Cost: 2000}, {Name: 'Female individuals', Cost: 3000}]
}

function myLitter(){
	this['litter_info'] = [{name: "1", prob : 1}]
}

function myCulling (){
	this['culling_reasons'] = []
}

function myPopulation (){
	this['subpopulation_list'] = [{Name: "Population 1", beta1 : 1, beta2: 1, share0: 0, share1: 0, fixed_freq: 0, nindi: 100, sharef: 0.5, ngen: 0, majorfreq: true, 'QTL Info': []}]
}

function mySelectionScaling (selection_index){
	var len = selection_index.length;
	var scaling_var = [];
	for(var i=0; i<len; i++){
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
	for(var i=0; i<len; i++){
		a[i] = {val:0};
	}
	a[len-1].val = 1;
	return a;
}

// returns an object with all parameters, we need for plotting results:
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
	this['ResAccBVE_pType'] = "By Repeats",
	this['PCA_pType'] = "By Cohorts"
}

// returns an object with all data for plotting results:
function myPlottingData(){
	this['ResQTL'] = "", 
	this['ResRel'] = "",
	this['ResRelbetweenC'] = "",
	this['ResgMean'] = "",
	this['Summary'] = "",
	this['RespMean'] = "",
	this['ResAccBVE'] = "",
	this['confidence'] = false,
	this['legend'] = true,
	this['PCA'] = ""
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
		//params for project tree
		treeModel:null,
		treeData:getMoBPSTreeProject(),
		filter:null,
        treeOptions: {
             propertyNames: {
              text: 'group_Name',
              children: 'Child',
              state: 'options',
             },
            dnd:true,
            checkbox:false,
			parentSelect:false,
        },
		showTree: [],
		editProjectForTree:'',
		groupProjectCnt:'',
				
		// params for general information:
		geninfo: geninfo,
		traitsinfo: [],
		economy: new myEconomy(),
		culling: new myCulling(),
		litter_size: new myLitter(),
		use_phenotypic_cor: false,
		subpopulation: new myPopulation(),
		matrix: [],
		matrix2: [],
		rlog: true,
		cohort_ids : [],
		edge_ids : [],

		show_geninfo: false,
		show_menu: false,
		Species_options: ['Chicken', 'Cattle', 'Sheep', 'Pig', 'Horse', 'Goat', 'Human', 'Maize', 'Wheat', 'Sorghum', 'Salmon', 'Tilapia', 'Other'],
		units_options: ['select node/edge', 'nodes', 'edges'],
		Time_Unit_options: ['Years', 'Month', 'Weeks', 'Days'],
		true_false_options: ['TRUE', 'FALSE'],
		w_options: ['Per Unit', 'Per Phenotypic SD', 'Per Breeding Value SD', 'Per Genomic Value SD'],
		show_info:'',
		show_chromo_info: true,
		show_pheno_info: true,
		show_QTL: true,
		show_matrix: true,
		show_matrix2: true,
		show_matrix_element: [],
		selection_type : ['Phenotype', 'Breeding Value', 'Genomic Value'],
		major_qtl_type: ['SNP + Chromosome', "SNP ID", 'BasePair + Chromosome'],
		selection_index : [{'Name': 'Default Index'}, {'Name': 'Non'}],
		selection_index_scaling : [{'Name': 'Default Index', 'active_scaling': false, 'miesenberger': false, 'w_scaling': 'Per Unit'}, {'Name': 'Non', 'active_scaling': false, 'miesenberger': false, 'w_scaling': 'Per Unit'}],
		phenotyping_class : [{'Name': 'Fully phenotyped', 'Cost of phenotyping': 0}, {'Name': 'Not phenotyped', 'Cost of phenotyping': 0}],
		phenotype_options: ['Own phenotype', 'Avg. offspring phenotype', 'Mean own/offspring phenotype', 'Weighted own/offspring phenotype'],
		show_warnings: true,
		warnings: [],
		runned: false,
		genetic_data:'Ens',
		user:null,
		database:[],
		//database2:[],
		//filter: [],
		versions:[],
		template_database:null,
		project_saved: "",
		plottingPar: new myPlottingPar(),
		plottingData: new myPlottingData(),
		Summary: [],
		socket: '',
		curUserGroup:null,
		filename:'',
		Excel_File_options: ['', 'Genetic', 'Residual', 'both'],
		allNodes:[],
		allNodesforNewEdge:[],
		tempNodeforCohort:'',	
		isCohortNameChanged:'',
		isBrowserSafari:'',
		isDraggableOption:'',
		cohortsList :[],
		cohortsTimeList : [],
		warningsLog:[],
		allDBUsers:null,
		isPrShared:false,
		isSharedExist:'',
		majorvisible : false,
		
		change_type: 'select node/edge',
		change_type1: 'All',
		change_type2: 'All',
		change_type3: 'All',
		change_type4: 'All',
		change_type5: '',		
		change_type7: 'All',		
		change_type8: 'All',
		change_type9: 'Remain unchanged',
		change_type10: '',
		change_type11: 'Remain unchanged',
		change_type12: 'Remain unchanged',
		change_type13: [],
						
		// params for nodes and edges:
		nodes: nodes,
		edges: edges,
		active_node:'',
		active_edge:  new myEdge(),
		node_operation: '',
		edge_operation: '',
		Sex_options: ['Male', 'Female', 'Both', 'Indefinit'],
		Sex_options2: ['Male', 'Female', 'Both'],
		Sex_options3: ['All', 'Male', 'Female', 'Both'],
		node_colors: {'Male':'#9acef4', 'Female':'#f29595', 'Both':'#ddd264'},
		edge_colors: {'Selection':'#7bbb44', 'Reproduction':'#f5a623', 'Aging':'#dba59a', 'Combine':'#5a4f7c', 'Repeat':'#f14235',
							'Split': '#94db8e', 'Cloning':'#9932CC', 'Selfing':'#ff90b7', 'DH-Production':'#aa76fd',
							'Semen-collection': '#483D8B'},
		
		ogc_targets: ['min.sKin', 'max.BV', 'min.BV'], 
		ogc_constrain: ['ub.BV', 'eq.BV', 'lb.BV', 'ub.sKin', 'uniform', 'lb.BV.increase', 'ub.sKin.increase', 'inactive'],
		ogc_uniform: ['male', 'female'],
		counter_pheno: 0,
		counter_qtl:0,
		counter_qtl_sub:0,
		
		individualsVar_options: [],
		plottingType: ["By Repeats", "By Cohorts", "By Time"],
		plottingType2: ["By Repeats", "By Time"],
		plottingType3: ["By Cohorts", "By Sex", "By Time Point"],
		download_data: ["VCF", "Ped", "Map", "Plain Genotypes", "Phenotypes", "Genomic Values", "Est. Breeding Values", "Pedigree"],
		threshold_options: [">", "=", "<", ">=", "<="],
		list_cohorts: [],		
		Genotype_generation_options: ["Upload Genotypes", "Random-sampling", "Fully-homozygous", "Fully-heterozygous", "All-B-Allele", "All-A-Allele"],
		Breedingtype_options: ['Selection', 'Reproduction', 'Aging', 'Combine', 'Repeat', 'Split', 'Cloning', 'Selfing', 'DH-Production', 'Semen-collection'],
		Breedingtype_options2: ['All', 'Selection', 'Reproduction', 'Aging', 'Combine', 'Repeat', 'Split', 'Cloning', 'Selfing', 'DH-Production', 'Semen-collection'],
		selectionType_options: ['Phenotypic', 'Random', 'BVE', 'Pseudo-BVE' ],
		RelationshipMatrix_options: ['VanRaden', 'Pedigree', 'Single Step'],
		RelationshipMatrixOGC_options: ['VanRaden', 'Pedigree'],
		BVEMethod_options: ['Direct Mixed-Model', 'Last BVE', 'REML-GBLUP (EMMREML)', 'REML-GBLUP (rrBLUP)', 'REML-GBLUP (sommer)', 'Marker assisted selection (lm)', 'BayesA (BGLR)', 'BayesB (BGLR)', 'BayesC (BGLR)', 'RKHS (BGLR)', 'BL (BGLR)', 'BRR (BGLR)'],
		BVEMethod_solver: ['Regular Inversion', 'PCG'],
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
			Sorghum: [{Dataset: "", Filter:"variation_set_name", Value: "3k_Sorghum_Bekele"}],
			Wheat: [
				{Dataset: "", Filter:"variation_set_name", Value: "12k_Wheat_Bekele"},
				{Dataset: "", Filter:"variation_set_name", Value: "29k_Wheat_Wen"},
			],
			Horse: [{Dataset: "ecaballus_snp", Filter:"variation_set_name", Value: "Illumina EquineSNP50 BeadChip"}],
			Goat: [{Dataset: "placeholder", Filter:"placeholder", Value: "Illumina_GoatSNP50"}],
			Human: [
				{Dataset: "placeholder", Filter:"placeholder", Value: "Affy GeneChip500K"},
				{Dataset: "placeholder", Filter:"placeholder", Value: "Illumina_1M-duo"},
				{Dataset: "placeholder", Filter:"placeholder", Value: "Illumina_HumanHap550"}],
			Salmon: [
				{Dataset: "", Filter:"variation_set_name", Value: "96k_AtlanticSalmon_male_Tsai"},
				{Dataset: "", Filter:"variation_set_name", Value: "96k_AtlanticSalmon_female_Tsai"},
			],
			Tilapia: [
				{Dataset: "", Filter:"variation_set_name", Value: "68k_NileTilapia_Penaloza"},
			],
			Other: [{Dataset: "", Filter:"variation_set_name", Value: ""}],
		},
	},
	async created() {
		const response3  = await axios.get('/user')
	      .catch(function (error) {
	        if (error.response3) {
	          console.log(error.response3);
	        }
	      })

		this.user = response3.data['username'];
		this.curUserGroup = response3.data['usergroup'];
		this.geninfo['curUserGroup'] = response3.data['usergroup'];
		this.geninfo['user'] = response3.data['username'];

		const response = await axios.post('/database')
	      .catch(function (error) {
	        if (error.response) {
				console.log('errpr');
	          console.log(error.response);
	        }
	      })
		this.database = response.data;		

		const response1  = await axios.post('/template_database')
	      .catch(function (error) {
	        if (error.response1) {
	          console.log(error.response1);
	        }
	      })
		this.template_database = response1.data;

		const response2  = await axios.get('/getAllUsersFromDB')
	      .catch(function (error) {
	        if (error.response2) {
	          console.log(error.response2);
	        }
	      })
		var len = response2.data.length;
		var tzUsers = [];	
	  	for (var i = 0; i < len; i++) {
		    var thisUser = response2.data[i]["_id"];
			  tzUsers.push(thisUser);
		}
		this.allDBUsers = tzUsers;	
		data_Vue.allDBUsers = tzUsers;

		this.project_saved = true;
		localStorage.clear();
	},
	mounted(){
		let externalScript = document.createElement('script')
	    externalScript.setAttribute('src', 'javascript/jszip_excelToArray.js')
    	document.head.appendChild(externalScript)

		let externalScript1 = document.createElement('script')
	    externalScript1.setAttribute('src', 'javascript/xlsx_excelToArray.js')
    	document.head.appendChild(externalScript1)

		let externalScript2 = document.createElement('script')
	    externalScript2.setAttribute('src', 'javascript/excelToArray.js')
    	document.head.appendChild(externalScript2)
	},
	watch: {
		project_saved: function(val){
		//	console.log(val);
			document.getElementById("save_button").disabled = val;
		},
		traitsinfo: function(val){
			var len = val.length;
			var oldlen = Object.keys(this.selection_index[0]).length -1; 
			
			var diff = len - oldlen;
			
			if (diff > 0){
				for(var i=0; i<this.selection_index.length; i++){
					for(var j=this.counter_pheno-diff; j < this.counter_pheno; j++){
						this.selection_index[i]['P'+(j+1)] = i==1? "0" : 1;
					}
				}	
				for(var i=0; i<this.phenotyping_class.length; i++){
					for(var j=this.counter_pheno-diff; j < this.counter_pheno; j++){
						this.phenotyping_class[i]['P'+(j+1)] = i==1? "0" : 1;
					}
				}	
			}else if(len ==0){
				this.phenotyping_class = [{Name: "Fully phenotyped", 'Cost of phenotyping': "0"}, {Name: "Not phenotyped", 'Cost of phenotyping': "0"}];
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
		allNode_manualselect_options: {
			get: function(){
			var data = this.allNodesforNewEdge
					.map(function(x){return({id: x.id, label: x.id, children:[
						{id: x.id+":X", label:x.id},
						{id: x.id+":0", label:x.id+":Same Repeat"},
						{id: x.id+":-1", label:x.id+":Previous Repeat"},
						{id: x.id+":-2", label:x.id+":2 Repeats before"},
						{id: x.id+":-3", label:x.id+":3 Repeats before"},
						{id: x.id+":-4", label:x.id+":4 Repeats before"},
						{id: x.id+":-5", label:x.id+":5 Repeats before"},
						{id: x.id+":-6", label:x.id+":6 Repeats before"},
						{id: x.id+":-7", label:x.id+":7 Repeats before"},
						{id: x.id+":-8", label:x.id+":8 Repeats before"},
					]})});
				return(data);
			}
		},		
		node_manualselect_options: {
			get: function(){
			var data = this.nodes.get()
					.map(function(x){return({id: x.id, label: x.id, children:[
						{id: x.id+":X", label:x.id},
						{id: x.id+":0", label:x.id+":Same Repeat"},
						{id: x.id+":-1", label:x.id+":Previous Repeat"},
						{id: x.id+":-2", label:x.id+":2 Repeats before"},
						{id: x.id+":-3", label:x.id+":3 Repeats before"},
						{id: x.id+":-4", label:x.id+":4 Repeats before"},
						{id: x.id+":-5", label:x.id+":5 Repeats before"},
						{id: x.id+":-6", label:x.id+":6 Repeats before"},
						{id: x.id+":-7", label:x.id+":7 Repeats before"},
						{id: x.id+":-8", label:x.id+":8 Repeats before"},
					]})});
				return(data);
			}
		},		
		updated_manualselect_options:{
			get: function(){
				var data = this.allNodes
					.map(function(x){return({id: x.id, label: x.id, children:[
						{id: x.id+":X", label:x.id},
						{id: x.id+":0", label:x.id+":Same Repeat"},
						{id: x.id+":-1", label:x.id+":Previous Repeat"},
						{id: x.id+":-2", label:x.id+":2 Repeats before"},
						{id: x.id+":-3", label:x.id+":3 Repeats before"},
						{id: x.id+":-4", label:x.id+":4 Repeats before"},
						{id: x.id+":-5", label:x.id+":5 Repeats before"},
						{id: x.id+":-6", label:x.id+":6 Repeats before"},
						{id: x.id+":-7", label:x.id+":7 Repeats before"},
						{id: x.id+":-8", label:x.id+":8 Repeats before"},
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
			logDragStart() {
			},         
			logDragFinish() {
				saveGroupTreeToDB();
	    	},
			editNode(node) {
	            node.startEditing();
				node['states'].dropable = true;		
				node['states'].draggable = true;	
				saveGroupTreeToDB();
	   	    },
			saveNode(node)
			{
				node['states'].dropable = true;		
				node['states'].draggable = true;
				
				saveGroupTreeToDB();
	   	    },
	      	removeNode(node) {
	            if (confirm('Are you sure to remove the folder?')) {
	              node.remove();
				  saveGroupTreeToDB();
	            }				
	      	},
			addChildFolder(node) {
				var nodeName = "New Folder ";
				const subNo = Math.round(Math.random() * 10);
				var localnodeName = nodeName + subNo;	
				node['states'].dropable = true;		
				node['states'].draggable = true;		
				node.prepend(localnodeName);
				// saveGroupTreeToDB();
			},			
			nodeClicked(node){		
				data_Vue.editProjectForTree = node;
				if(node.parent === null) {
					if(isProject(node.text)) {loadDataFromTree(node.text);}
				}
				else {
					loadDataFromTree(node.text);
				}
	    	},
		
		moveMatrix: function(evt) { 
		    if (localStorage.getItem("movetrait") === null) { 
				getMatrix();
			} 
	     	data_Vue.geninfo['Traits moveFrom'] = evt.draggedContext.index;
	     	data_Vue.geninfo['Traits moveTo'] = evt.draggedContext.futureIndex;
		},
		seeChange: function(event) {
			getSI();
			getPC();
			updateMatrices();
			updateSIKeys();
			updatePCKeys();
		},
		onEnd: function(evt) {
		},

		// add a new animal housing cost class:
		createHCostClass: function(){
			var val = document.getElementById("newHCostClass").value;
			for(var i=0; i<this.economy['Animal Housing Costs'].length; i++){
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
			for(var i=0; i<this.culling['culling_reasons'].length; i++){
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
			for(var i=0; i<this.subpopulation['subpopulation_list'].length; i++){
				if(this.subpopulation['subpopulation_list'].Name == val){
					alert("Subpopulation already exists. Subpopulation is not created.")
					return;
				}
			}
			if(val == ''){
				alert("No name for subpopulation entered. No subpopulation generated.")
				return;				
			}
			var newSub = {Name: val, beta1: 1, beta2: 1, share0: 0, share1: 0, fixed_freq: 0, nindi: 100, sharef: 0.5, ngen: 0,  majorfreq: true, 'QTL Info': []};
			this.subpopulation['subpopulation_list'].push(newSub);	
			document.getElementById("newSubpopulationClass").value='';				
		},	
		createSize(){
			var so = 1;
			var new_name = 1;
			
			for(var i=0; i<this.litter_size['litter_info'].length; i++){
				so = so - this.litter_size['litter_info'][i].prob ;
				new_name = Number(this.litter_size['litter_info'][i].name) + 1;
			}
			
			var newSize = {name: new_name, prob: so};
			this.litter_size['litter_info'].push(newSize);
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
		
		removeSize: function(ind){
			this.litter_size['litter_info'].splice(ind,1);
		},

		// add a new selection index:
		addSI: function(name){
			if(name){
				var val = name;
			}else{
				var val = document.getElementById("newSI").value;
			}
			for(var i=0; i<this.selection_index.length; i++){
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
			for(var i=1; i < len.length; i++){
				mySI[len[i]] = 1;
			}
			var mySIscaling = {};
			mySIscaling["Name"] = val; 
			mySIscaling["active_scaling"] = false; 
			mySIscaling["miesenberger"]=false;
			mySIscaling["w_scaling"]= 'Per Genomic Value SD';
			this.selection_index.push(mySI);	
			this.selection_index_scaling.push(mySIscaling);
			document.getElementById("newSI").value='';		
			
		},		
		addPC: function(name){
			if(name){
				var val = name;
			}else{
				var val = document.getElementById("newPhenoC").value;
			}
			for(var i=0; i<this.phenotyping_class.length; i++){
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
			for(var i=2; i < len.length; i++){
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
		
		ExecuteChanges: function(){
			
			var nnodes = 0;

			if(data_Vue.change_type == 'nodes'){
				nodes = data_Vue.nodes.get();
				for(i = 0; i<nodes.length;i++){
				//	console.log(i);
					if((data_Vue.change_type5=="" || data_Vue.change_type5 == nodes[i]['Number of Individuals']) & 
							(data_Vue.change_type4=='All' || data_Vue.change_type4 == nodes[i]['Sex']) & 
							(data_Vue.change_type7=='All' || data_Vue.change_type7 == nodes[i]["Phenotyping Class"]) & 
							(data_Vue.change_type8=='All' || data_Vue.change_type8 == nodes[i]["Housing Cost Class"])){
								
						nnodes++
						
						if(data_Vue.change_type10!=""){
							nodes[i]['Number of Individuals'] = data_Vue.change_type10;
							nodes[i]['individualsVar'] = data_Vue.change_type10;
							nodes[i]['label'] = nodes[i]['id'] + ' (' + data_Vue.change_type10 +')';
							nodes[i]['title'] = nodes[i]['id'] + ': ' + data_Vue.change_type10 ;
						}
						
						if(data_Vue.change_type9!="Remain unchanged"){
							nodes[i]['Sex'] = data_Vue.change_type9;
							if(nodes[i]['Sex']=="Male"){
								nodes[i]['color'] = "#9acef4";
							}
							if(nodes[i]['Sex']=="Female"){
								nodes[i]['color'] = "#f29595";
							}
							if(nodes[i]['Sex']=="Both"){
								nodes[i]['color'] = "#ddd264";
							}
						}
						if(data_Vue.change_type11!="Remain unchanged"){
							nodes[i]['Phenotyping Class'] = data_Vue.change_type11;
						}
						if(data_Vue.change_type12!="Remain unchanged"){
							nodes[i]['Housing Cost Class'] = data_Vue.change_type12;
						}
						

						data_Vue.nodes.update(nodes[i]);
					}
					
					data_Vue.active_node=[];
					
				}
				
			};
			if(data_Vue.change_type=='edges'){
				nodes = data_Vue.nodes.get();
				edges = data_Vue.edges.get();
				for(i = 0; i < edges.length; i++){
					
					for(j=0; j<nodes.length; j++){
						if(edges[i]["from"] == nodes[j]["id"]){
							sex1 = nodes[j]["Sex"];
						}
						if(edges[i]["to"] == nodes[j]["id"]){
							sex2 = nodes[j]["Sex"];
						}
					}
					
					if((data_Vue.change_type1==edges[i]["Breeding Type"] | data_Vue.change_type1=="All") && (data_Vue.change_type2=="All" | data_Vue.change_type2==sex1) & (data_Vue.change_type3=="All" | data_Vue.change_type3==sex2)){

						nnodes++
						if(data_Vue.change_type13["Breeding Type"]!=undefined & data_Vue.change_type13["Breeding Type"] != "Remain unchanged"){
							edges[i]["Breeding Type"] = data_Vue.change_type13["Breeding Type"];
							
							if(edges[i]["Breeding Type"] == "Selection"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#7bbb44";
							}
							if(edges[i]["Breeding Type"] == "Reproduction"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#f5a623";
							}
							if(edges[i]["Breeding Type"] == "Aging"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#dba59a";
							}
							if(edges[i]["Breeding Type"] == "Combine"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#5a4f7c";
							}
							if(edges[i]["Breeding Type"] == "Repeat"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#f14235";
							}
							if(edges[i]["Breeding Type"] == "Split"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#94db8e";
							}
							if(edges[i]["Breeding Type"] == "Cloning"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#9932CC";
							}
							if(edges[i]["Breeding Type"] == "Selfing"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#ff90b7";
							}
							if(edges[i]["Breeding Type"] == "DH-Production"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#aa76fd";
							}
							if(edges[i]["Breeding Type"] == "Semen-collection"){
								edges[i].color.color = edges[i].color.highlight = edges[i].color.hover = "#483D8B";
							}
						}
						if(data_Vue.change_type13["Time Needed"]!=undefined &data_Vue.change_type13["Time Needed"] != ""){
							edges[i]["Time Needed"] = data_Vue.change_type13["Time Needed"];
						}
						
						if(data_Vue.change_type13["last_available"]!=undefined &data_Vue.change_type13["last_available"] != "Remain unchanged"){
							edges[i]["last_available"] = data_Vue.change_type13["last_available"]=="true";
						}
						if(data_Vue.change_type13["OGC"]!=undefined &data_Vue.change_type13["OGC"] != "Remain unchanged"){
							edges[i]["OGC"] = data_Vue.change_type13["OGC"];
						}
						if(data_Vue.change_type13["full_sib"]!=undefined &data_Vue.change_type13["full_sib"] != "Remain unchanged"){
							edges[i]["full_sib"] = data_Vue.change_type13["full_sib"]=="true";
						}
						if(data_Vue.change_type13["half_sib"]!=undefined &data_Vue.change_type13["half_sib"] != "Remain unchanged"){
							edges[i]["half_sib"] = data_Vue.change_type13["half_sib"]=="true";
						}
						if(data_Vue.change_type13["ogc_aCa"]!=undefined &data_Vue.change_type13["ogc_aCa"] != ""){
							edges[i]["ogc_aCa"] = data_Vue.change_type13["ogc_aCa"];
						}
						if(data_Vue.change_type13["Max Offspring"]!=undefined &data_Vue.change_type13["Max Offspring"] != ""){
							edges[i]["Max Offspring"] = data_Vue.change_type13["Max Offspring"];
						}
						if(data_Vue.change_type13["Max Offspring Pair"]!=undefined &data_Vue.change_type13["Max Offspring Pair"] != ""){
							edges[i]["Max Offspring Pair"] = data_Vue.change_type13["Max Offspring Pair"];
						}
						if(data_Vue.change_type13["selection_ratio"]!=undefined &data_Vue.change_type13["selection_ratio"] != ""){
							edges[i]["selection_ratio"] = data_Vue.change_type13["selection_ratio"];
						}
						if(data_Vue.change_type13["selection_ratio_type"]!=undefined &data_Vue.change_type13["selection_ratio_type"] != ""){
							edges[i]["selection_ratio_type"] = data_Vue.change_type13["selection_ratio_type"];
						}
						if(data_Vue.change_type13["selection_ratio_index"]!=undefined &data_Vue.change_type13["selection_ratio_index"] != "Remain unchanged"){
							edges[i]["selection_ratio_index"] = data_Vue.change_type13["selection_ratio_index"];
						}
						if(data_Vue.change_type13["Number of Repeat"]!=undefined &data_Vue.change_type13["Number of Repeat"] != ""){
							edges[i]["Number of Repeat"] = data_Vue.change_type13["Number of Repeat"];
						}
						if(data_Vue.change_type13["Selection Type"]!=undefined &data_Vue.change_type13["Selection Type"] != "Remain unchanged"){
							edges[i]["Selection Type"] = data_Vue.change_type13["Selection Type"];
						}
						if(data_Vue.change_type13["BVE Method"]!=undefined &data_Vue.change_type13["BVE Method"] != "Remain unchanged"){
							edges[i]["BVE Method"] = data_Vue.change_type13["BVE Method"];
						}
						if(data_Vue.change_type13["BVE Method_solver"]!=undefined &data_Vue.change_type13["BVE Method_solver"] != "Remain unchanged"){
							edges[i]["BVE Method_solver"] = data_Vue.change_type13["BVE Method_solver"];
						}
						if(data_Vue.change_type13["MAS_marker"]!=undefined &data_Vue.change_type13["MAS_marker"] != ""){
							edges[i]["MAS_marker"] = data_Vue.change_type13["MAS_marker"];
						}
						for(j=1; j<=data_Vue.traitsinfo; j++){
							if(data_Vue.change_type13[j]!=undefined &data_Vue.change_type13[j] != ""){
								edges[i][j] = data_Vue.change_type13[j];
							}
						}

						if(data_Vue.change_type13["Selection Index"]!=undefined &data_Vue.change_type13["Selection Index"] != "Remain unchanged"){
							edges[i]["Selection Index"] = data_Vue.change_type13["Selection Index"];
						}
						if(data_Vue.change_type13["threshold"]!=undefined &data_Vue.change_type13["threshold"] != ""){
							edges[i]["threshold"] = data_Vue.change_type13["threshold"];
						}
						if(data_Vue.change_type13["threshold_sign"]!=undefined &data_Vue.change_type13["threshold_sign"] != "Remain unchanged"){
							edges[i]["threshold_sign"] = data_Vue.change_type13["threshold_sign"];
						}
						if(data_Vue.change_type13["reliability"]!=undefined &data_Vue.change_type13["reliability"] != "Remain unchanged"){
							edges[i]["reliability"] = data_Vue.change_type13["reliability"];
						}
						if(data_Vue.change_type13["skip"]!=undefined &data_Vue.change_type13["skip"] != "Remain unchanged"){
							edges[i]["skip"] = data_Vue.change_type13["skip"];
						}
						if(data_Vue.change_type13["phenotype_used"]!=undefined &data_Vue.change_type13["phenotype_used"] != "Remain unchanged"){
							edges[i]["phenotype_used"] = data_Vue.change_type13["phenotype_used"];
						}
						if(data_Vue.change_type13["Relationship Matrix"]!=undefined &data_Vue.change_type13["Relationship Matrix"] != "Remain unchanged"){
							edges[i]["Relationship Matrix"] = data_Vue.change_type13["Relationship Matrix"];
						}
						if(data_Vue.change_type13["Depth of Pedigree"]!=undefined &data_Vue.change_type13["Depth of Pedigree"] != ""){
							edges[i]["Depth of Pedigree"] = data_Vue.change_type13["Depth of Pedigree"];
						}
						if(data_Vue.change_type13["Cohorts used in BVE"]!=undefined &data_Vue.change_type13["Cohorts used in BVE"] != "Remain unchanged"){
							edges[i]["Cohorts used in BVE"] = data_Vue.change_type13["Cohorts used in BVE"];
						}
						
						if(data_Vue.change_type13["Manuel selected cohorts"]!=undefined && data_Vue.change_type13["Manuel selected cohorts"].length>0){
							edges[i]["Manuel selected cohorts"] = data_Vue.change_type13["Manuel selected cohorts"];
						}
						
						data_Vue.edges.update(edges[i]);
						
					}

				}
				
			}
			
			alert(nnodes + ' nodes/edges were considered for modification.')
			
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
					var newChromo = new myChromo(100,10,1);
					this.geninfo['Chromosomes Info'].push(newChromo);
					len++;
				}
			}	
		},		
		
		createCombi: function(ind){
			
		//	console.log(ind);
		//	console.log(this.traitsinfo);
			if( this.traitsinfo[ind]['is_combi'] == true){
				this.traitsinfo[ind]['combi_weights'] = new Array(this.traitsinfo.length ).fill(0); 
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

					if(this.traitsinfo[ind]['Trait QTL Info'] == ""){
						this.traitsinfo[ind]['Trait QTL Info'] = [];
					}
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
			if (len > 1) { 
				showCorrDiv("true");
				for(var ind; ind < len; ind++){
					this.traitsinfo[ind]['combi_weights'] = new Array(this.traitsinfo.length ).fill(0); 
				}
			}		
			

		},
		
		// remove clicked Phenotype
		removePheno: function(ind){
			var len = this.traitsinfo.length;
			this.traitsinfo.splice(ind,1);
			
			// remove also correlation matrix elements
			// associated with this phenotype
			if(len > 1){
				for(var i=ind+1; i< len; i++){
					this.matrix[i].row.splice(ind,1);
					this.matrix2[i].row.splice(ind,1);
				}
				for(var i=0; i < (len-1); i++){
						console.log(i)
						console.log(data_Vue.traitsinfo[i]['combi_weights'])
					if(data_Vue.traitsinfo[i]['combi_weights'] !== undefined){
						data_Vue.traitsinfo[i]['combi_weights'].splice(ind,1); 
						console.log(i)
						console.log(data_Vue.traitsinfo[i]['combi_weights'])
					} else{
						data_Vue.traitsinfo[i]['combi_weights'] = new Array(len-1).fill(0);
					}

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
			for(var i=0; i<this.selection_index.length; i++){
				delete this.selection_index[i][Object.keys(this.selection_index[i])[ind+1]];
			}	
			for(var i=0; i<this.phenotyping_class.length; i++){
				delete this.phenotyping_class[i][Object.keys(this.phenotyping_class[i])[ind+2]];
			}
		},
		// will create a new Variable for the User:
		createVariable: function(){
			var val = document.getElementById("newVariable").value;
			for(var i=0; i<this.individualsVar_options.length; i++){
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
			for(var i=0; i< items.length; i++){
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
					this.nodes.update({id: items[ii], 'Number of Individuals': wert, title: items[ii]+':'+wert+' Ind', label: items[ii]+'('+wert+')'});
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
			for(var i=0; i< items.length; i++){
				items[i].useVar.splice(ind, 1);
			}
			this.edges.update(items);
		},
	}
})

//******************************************************************************************//
//**************** own functions required to manually update data_Vue or DOM ***************//

function isCharacterALetter(char) {
  return char.toLowerCase() != char.toUpperCase()
}


async function getMoBPSTreeProject() {
	const checkTreeExist = await axios.get('/get_projectTree')
		  .catch(function (error) {
		})

	if (checkTreeExist.data[0]!== undefined ){
		data_Vue.groupProjectCnt = checkTreeExist.data[0]['ProjectGroup'].length;
		return checkTreeExist.data[0]['ProjectGroup'];
	}	
	else {
		const thisdb = await axios.get('/fields_database')
			  .catch(function (error) {
		})

		var treeArray = [];
		var tempObj = {};
		var parent_options = { draggable: true, clicked: false };
		var child_options = {dropable:false};
	
	    var tempObj = { group_Name:"New Group", options: parent_options };
		treeArray.push(tempObj);

		for (var t = 0; t < thisdb.data.length; t++) {
			var thisName = thisdb.data[t]['name'];
			treeObj1 = {group_Name:thisName,  options:  child_options };
			if(thisName !== undefined ) {
			treeArray.push(treeObj1); }
		}	
			
			const saveTree = await axios.post('/create_projectTree',
			{ project: treeArray }).then(res => {
			  })
			  .catch(error => {
			    console.error(error)
			  })
			}					
			
	return treeArray;
}



function loadDataFromTree(project_name) {
var isProjectName = project_name;
var isProjectExist = data_Vue.database.includes(isProjectName);
	if(isProjectExist == false) {  
		console.log("This is project group") 
	}
	else {
		loadData(isProjectName);
	}
}


function isProject(proj_name) {
var isProjName = proj_name;
var isProjExist = data_Vue.database.includes(isProjName);
	return isProjExist;
}

function saveGroupTreeToDB() {
	var saveArray = data_Vue.treeModel['tree']['model'];

	if (saveArray.length > 0 ){
		var sArray = new Array();

		for (var s = 0; s < saveArray.length; s++) {
			var thisChild = saveArray[s].children.length;
			var childArr = new Array();
			
			if(thisChild > 0) {
				for (var s2 = 0; s2 < thisChild; s2++) {
					if(saveArray[s].children[s2].children.length > 0) {
						var s1_childArr = new Array();
						for (var s3 = 0; s3 < saveArray[s].children[s2].children.length; s3++) {
							if(saveArray[s].children[s2].children[s3].children.length > 0) {
								var s2_childArr = new Array();
								for (var s4 = 0; s4 < saveArray[s].children[s2].children[s3].children.length; s4++) {
									if(saveArray[s].children[s2].children[s3].children[s4].children.length > 0) {	
										var s3_childArr = new Array();	
										for (var s5 = 0; s5 < saveArray[s].children[s2].children[s3].children[s4].children.length; s5++) {
									
										if(saveArray[s].children[s2].children[s3].children[s4].children[s5].children.length > 0) {										
											var s4_childArr = new Array();
											for (var s6 = 0; s6 < saveArray[s].children[s2].children[s3].children[s4].children[s5].children.length; s6++) {
											s4_childArr.push({group_Name:saveArray[s].children[s2].children[s3].children[s4].children[s5].children[s6].text, options:{dropable:saveArray[s].children[s2].children[s3].children[s4].children[s5].children[s6]['states'].dropable }});
											
											}
											s3_childArr.push({group_Name:saveArray[s].children[s2].children[s3].children[s4].children[s5].text, Child:s4_childArr, options:{dropable:saveArray[s].children[s2].children[s3].children[s4].children[s5]['states'].dropable}});
											}
										else {s3_childArr.push({group_Name:saveArray[s].children[s2].children[s3].children[s4].children[s5].text, options:{dropable:saveArray[s].children[s2].children[s3].children[s4].children[s5]['states'].dropable, draggable:saveArray[s].children[s2].children[s3].children[s4].children[s5]['states'].draggable }});}					
										}
									
										
										s2_childArr.push({group_Name:saveArray[s].children[s2].children[s3].children[s4].text, Child:s3_childArr, options:{dropable:saveArray[s].children[s2].children[s3].children[s4]['states'].dropable}});
									}
									else {s2_childArr.push({group_Name:saveArray[s].children[s2].children[s3].children[s4].text, options:{dropable:saveArray[s].children[s2].children[s3].children[s4]['states'].dropable, draggable:saveArray[s].children[s2].children[s3].children[s4]['states'].draggable }});}	
								}
								
								
							s1_childArr.push({group_Name:saveArray[s].children[s2].children[s3].text, Child:s2_childArr, options:{dropable:saveArray[s].children[s2].children[s3]['states'].dropable}});
							}
							else {s1_childArr.push({group_Name:saveArray[s].children[s2].children[s3].text, options:{dropable:saveArray[s].children[s2].children[s3]['states'].dropable, draggable:saveArray[s].children[s2].children[s3]['states'].draggable }});}
						}
						childArr.push({group_Name:saveArray[s].children[s2].text, Child:s1_childArr, options:{dropable:saveArray[s].children[s2]['states'].dropable }});
								  
			}								
			else {childArr.push({group_Name:saveArray[s].children[s2].text, options:{dropable:saveArray[s].children[s2]['states'].dropable, draggable:saveArray[s].children[s2]['states'].draggable }});}}
		}
		sArray.push({group_Name:saveArray[s].data.text, Child:childArr, options:{dropable:saveArray[s]['states'].dropable }});}
	}
	saveProjectTree_toDB(sArray);
}


function removeProject_Tree(project) {
    project.remove();
	saveGroupTreeToDB();
}

function saveProjectTree_toDB(projectTree) {
	var projectGroup = projectTree;
	$.ajax
	({
		type: "POST",
		url: '/update_ProjectTree',
		data: {
			project: JSON.stringify(projectGroup),	
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
			})
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
	
}



function getMatrix() {
	 data_Vue['Upload_CorrFile'] == 'No';
     localStorage.setItem("movetrait", "yes");

     for(var i=0; i < data_Vue.traitsinfo.length; i++){     
         for(var j=0; j <= i; j++){

              var matrixval1 = data_Vue.matrix[i].row[j].val;
              var matrixval2 = data_Vue.matrix2[i].row[j].val;

              localStorage.setItem(data_Vue.traitsinfo[i]['Trait Name']+'_'+data_Vue.traitsinfo[j]['Trait Name'], JSON.stringify(matrixval1));
              localStorage.setItem(data_Vue.traitsinfo[j]['Trait Name']+'_'+data_Vue.traitsinfo[i]['Trait Name'], JSON.stringify(matrixval1));

              sessionStorage.setItem(data_Vue.traitsinfo[i]['Trait Name']+'_'+data_Vue.traitsinfo[j]['Trait Name'], JSON.stringify(matrixval2));
              sessionStorage.setItem(data_Vue.traitsinfo[j]['Trait Name']+'_'+data_Vue.traitsinfo[i]['Trait Name'], JSON.stringify(matrixval2));
         }
     }

}

function getSI() {
      for(var u=0; u < data_Vue.selection_index.length; u++){    
		 var thisSIName = data_Vue.selection_index[u]['Name'];
        for(var key in data_Vue.selection_index[u]) {
			var thisSIVar = key;
			var thisSIVal = data_Vue.selection_index[u][key];
			localStorage.setItem(thisSIName+'_'+thisSIVar, thisSIVal);
     	}
	}
}

function getPC() {
      for(var x=0; x < data_Vue.phenotyping_class.length; x++){    
		 var thisPCName = data_Vue.phenotyping_class[x]['Name'];
        for(var key in data_Vue.phenotyping_class[x]) {
			var thisPCVar = key;
			var thisPCVal = data_Vue.phenotyping_class[x][key];
			localStorage.setItem(thisPCName+'_'+thisPCVar, thisPCVal);
     	}
	}
}

function trait_move(si, from, to) {
    if (to >= si.length) {
        var k = to - si.length + 1;
        while (k--) {
			si.push(undefined);
        }
    }
    si.splice(to, 0, si.splice(from, 1)[0]);
    return si; 
};


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
	
	for(var i =0; i< data_Vue.traitsinfo.length; i++){
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



// two set of matrices for each correlation - one to display the correlation values (mat1,mat2) to container and another to save each correlation to database(savemat1, savemat2)!
function updateMatrices() {  
	if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {   
		 var mat1 = [];
	     var mat2 = [];

		 var savemat1 = [];
		 var savemat2 = [];
	
	     var row1;
	     var row2; 
		
		var saverow1;
		var saverow2;
	     
	     var listArray5 = [];
	     for(var a=0; a < data_Vue.traitsinfo.length; a++){
	         listArray5.push(data_Vue.traitsinfo[a]['Trait Name']);
	     }     
	    
		var arrayLength = listArray5.length;
         
         for(var i=0; i < arrayLength; i++){
              row1 = [];
              row2 = [];
			  saverow1 = [];
			  saverow2 = [];
              var am = listArray5[i]; 
         
              for(var j=0; j <= i; j++){
                   var thisvar = (am+'_'+data_Vue.traitsinfo[j]['Trait Name']);
                   var thisvar2 = (am+'_'+data_Vue.traitsinfo[j]['Trait Name']);
                   
                   if (thisvar === null) { 
                   var thisvar = (data_Vue.traitsinfo[j]['Trait Name']+'_'+am);
                   }
                   if (thisvar2 === null) { 
                   var thisvar2 = (data_Vue.traitsinfo[j]['Trait Name']+'_'+am);
                   }
              
                   if (i == j) { 
                   row1.push({val :"1"});
                   row2.push({val : "1"});

				   saverow1.push("1");
                   saverow2.push("1");
                   }
                   else { 
                   row1.push({val : JSON.parse(localStorage.getItem(thisvar))});
                   row2.push({val : JSON.parse(sessionStorage.getItem(thisvar2))});

				   saverow1.push(JSON.parse(localStorage.getItem(thisvar)));
                   saverow2.push(JSON.parse(sessionStorage.getItem(thisvar2)));
                   }
              }
     
        mat1.push({row : row1});
        mat2.push({row : row2});

		savemat1.push(saverow1);
		savemat2.push(saverow2);
		
		data_Vue.matrix = mat1;
		data_Vue.matrix2 = mat2;
		
		data_Vue.savemat1 = savemat1;
		data_Vue.savemat2 = savemat2;
         }         
	}
}

function updateSIKeys() {
	if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {          
	    	var siKeys = Object.keys(data_Vue.selection_index[0]);
		    siKeys.shift(); //remove "Name" from the array
		    newSIKey = trait_move(siKeys, data_Vue.geninfo['Traits moveFrom'], data_Vue.geninfo['Traits moveTo']);
		    var siArray = [];
		    for(var u=0; u < data_Vue.selection_index.length; u++){
			        var siObject = {}; 
        	 	var getSIName = data_Vue.selection_index[u]['Name'];		
         			siObject['Name'] = localStorage.getItem(getSIName+'_'+'Name');
               			for(var v=0; v < newSIKey.length; v++){
               				siObject[newSIKey[v]] = localStorage.getItem(getSIName+'_'+newSIKey[v]); 
            		   	}
     	siArray.push(siObject);
     		}
     		data_Vue.selection_index = siArray;
	}
}


function updatePCKeys() {
	if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {          
    		var pcKeys = Object.keys(data_Vue.phenotyping_class[0]);
    		pcKeys.shift(); //remove "Name" from the array
    		pcKeys.shift(); // remove Phenotyping Cost from the array
    		newPCKey = trait_move(pcKeys, data_Vue.geninfo['Traits moveFrom'], data_Vue.geninfo['Traits moveTo']);
    		var pcArray = [];
    		for(var p=0; p < data_Vue.phenotyping_class.length; p++){
    		    	var pcObject = {}; 
        	var getPCName = data_Vue.phenotyping_class[p]['Name'];		
    			    pcObject['Name'] = localStorage.getItem(getPCName+'_'+'Name');
        			pcObject['Cost of phenotyping'] = localStorage.getItem(getPCName+'_'+'Cost of phenotyping');
        			for(var q=0; q < newPCKey.length; q++){
        				pcObject[newPCKey[q]] = localStorage.getItem(getPCName+'_'+newPCKey[q]); 
     		   	}
    		pcArray.push(pcObject);
    		}
    		data_Vue.phenotyping_class = pcArray;
	}
}

// function to export Data into OutputArea:

function exportNetwork() {
    exportArea = document.getElementById('OutputArea');
    exportArea.value = "";
     
    if(data_Vue.geninfo['Chromosomes of Equal Length'] == 'Yes'){
        data_Vue.geninfo["Chromosomes Info"] = data_Vue.chromo_display.slice(0,1);
    } else {
        data_Vue.geninfo["Chromosomes Info"] = data_Vue.chromo_display;
    }

    var mat1 = [];
    var mat2 = [];
    var row1;
    var row2; 
     
    if((data_Vue['Upload_CorrFile'] == 'Yes') & (data_Vue.geninfo['Excel_File'] == 'both')) {
         var mat1 = data_Vue.mymatrix1;
         var mat2 = data_Vue.mymatrix2; 
		data_Vue.geninfo['Excel_File'] == '';
    }
	
	else if((data_Vue['Upload_CorrFile'] == 'Yes') & (data_Vue.geninfo['Excel_File'] == 'Residual')) {
        var mat1 = data_Vue.mymatrix1;
		for(var i=0; i < data_Vue.traitsinfo.length; i++){
	        row2 = [];
	        for(var j=0; j <= i; j++){
	            row2.push(data_Vue.matrix2[i].row[j].val);
	        }
	        mat2.push(row2);
		}
		data_Vue.geninfo['Excel_File'] == '';
    }
	else if((data_Vue['Upload_CorrFile'] == 'Yes') & (data_Vue.geninfo['Excel_File'] == 'Genetic')) {
		
		for(var i=0; i < data_Vue.traitsinfo.length; i++){
	        row1 = [];
	        for(var j=0; j <= i; j++){
	            row1.push(data_Vue.matrix[i].row[j].val);
	        }
	        mat1.push(row1);
		}
        var mat2 = data_Vue.mymatrix2;
		data_Vue.geninfo['Excel_File'] == '';
     }
     else if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {
		mat1 = data_Vue.savemat1;       
		mat2 = data_Vue.savemat2;
     }
     else {
         for(var i=0; i < data_Vue.traitsinfo.length; i++){
              row1 = [];
              row2 = [];
              for(var j=0; j <= i; j++){
                   row1.push(data_Vue.matrix[i].row[j].val);
                   row2.push(data_Vue.matrix2[i].row[j].val);
              }
              mat1.push(row1);
              mat2.push(row2);
         }
     }
     
	data_Vue.geninfo['Excel_File'] = '';
	
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
		'litter_size' : data_Vue.litter_size,
		'Subpopulation': data_Vue.subpopulation,
		'Phenotypic Correlation': mat1,
		'PhenotypicResidual': data_Vue.use_phenotypic_cor,
		'Genetic Correlation': mat2,
		'Intern': Intern,
		'Class' : data_Vue.curUserGroup
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



// function to import file from local drive and display in the UI.
function importNetwork() {
	var localDrivetoUI = document.getElementById('input-file');

		if(localDrivetoUI) {
		//	console.log(localDrivetoUI);
			localDrivetoUI.addEventListener('change', getJSONFromDrive, false);
		}	
	data_Vue.project_saved = false;
	showCorrDiv("true");
	
}


function importNetwork_fromBox() {
	var exportArea = document.getElementById('OutputArea');
	var inputValue = exportArea.value;
	if(inputValue == ''){
		alert("Nothing to import. Please paste the JSON file into the text area.");
		return;
	}
	var inputData = JSON.parse(inputValue);

	importNetwork_intern(inputData);
	data_Vue.project_saved = false;
	showCorrDiv("true");

}

function getJSONFromDrive(event) {
		const input = event.target;
  		if ('files' in input && input.files.length > 0) {
				//console.log (input.files[0]);

			 var reader = new FileReader();
			    reader.onload = function(){
			      var text = reader.result;

				var inputData = JSON.parse(text);	
				importNetwork_intern(inputData);	
			    };

	    	reader.readAsText(input.files[0]);
	  };
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
	
	var prior_user = data_Vue.geninfo.user;
	var prior_userclass = data_Vue.geninfo.curUserGroup;
	data_Vue.geninfo = inputData['Genomic Info'] ? inputData['Genomic Info'] : new myGeneral();
	data_Vue.geninfo.user = prior_user;
	data_Vue.geninfo.curUserGroup = prior_userclass;

	if(data_Vue.geninfo['advanced']==undefined){
		data_Vue.geninfo['advanced'] = false;
	}
	if(data_Vue.geninfo['advanced_test']==undefined){
		data_Vue.geninfo['advanced_test'] = false;
	}
	if(data_Vue.geninfo['advanced_ld']==undefined){
		data_Vue.geninfo['advanced_ld'] = false;
	}
	if(data_Vue.geninfo['advanced_history']==undefined){
		data_Vue.geninfo['advanced_history'] = false;
	}
	if(data_Vue.geninfo['advanced_litter']==undefined){
		data_Vue.geninfo['advanced_litter'] = false;
	}
	
	if(data_Vue.geninfo['advanced_multi']==undefined){
		data_Vue.geninfo['advanced_multi'] = false;
	}
	if(data_Vue.geninfo['advanced_multi']==undefined){
		data_Vue.geninfo['advanced_multi'] = false;
	}
	if(data_Vue.geninfo['advanced_miraculix']==undefined){
		data_Vue.geninfo['advanced_miraculix'] = true;
	}
	if(data_Vue.geninfo['advanced_parallel']==undefined){
		data_Vue.geninfo['advanced_parallel'] = false;
	}
	if(data_Vue.geninfo['advanced_trait']==undefined){
		data_Vue.geninfo['advanced_trait'] = false;
	}
	if(data_Vue.geninfo['advanced_trait_epi']==undefined){
		data_Vue.geninfo['advanced_trait_epi'] = false;
	}
	if(data_Vue.geninfo['advanced_trait_repeat']==undefined){
		data_Vue.geninfo['advanced_trait_repeat'] = false;
	}
	if(data_Vue.geninfo['advanced_trait_maternal']==undefined){
		data_Vue.geninfo['advanced_trait_maternal'] = false;
	}
	if(data_Vue.geninfo['advanced_trait_combi']==undefined){
		data_Vue.geninfo['advanced_trait_combi'] = false;
	}
	if(data_Vue.geninfo['advanced_trait_trafo']==undefined){
		data_Vue.geninfo['advanced_trait_trafo'] = false;
	}
	if(data_Vue.geninfo['advanced_trait_scaling']==undefined){
		data_Vue.geninfo['advanced_trait_scaling'] = false;
	}
	
	if(data_Vue.geninfo['advanced_culling']==undefined){
		data_Vue.geninfo['advanced_culling'] = false;
	}
	if(data_Vue.geninfo['advanced_sub']==undefined){
		data_Vue.geninfo['advanced_sub'] = false;
	}
	if(data_Vue.geninfo['advanced_eco']==undefined){
		data_Vue.geninfo['advanced_eco'] = false;
	}
	if(data_Vue.geninfo['advanced_box']==undefined){
		data_Vue.geninfo['advanced_box'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced']==undefined){
		data_Vue.geninfo['advanced_advanced'] = false;
	}
	if(data_Vue.geninfo['advanced_user']==undefined){
		data_Vue.geninfo['advanced_user'] = false;
	}
	
	if(data_Vue.geninfo['advanced_advanced_geno']==undefined){
		data_Vue.geninfo['advanced_advanced_geno'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_off']==undefined){
		data_Vue.geninfo['advanced_advanced_off'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_ogc']==undefined){
		data_Vue.geninfo['advanced_advanced_ogc'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_mating']==undefined){
		data_Vue.geninfo['advanced_advanced_mating'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_ratio']==undefined){
		data_Vue.geninfo['advanced_advanced_ratio'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_thres']==undefined){
		data_Vue.geninfo['advanced_advanced_thres'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_pheno']==undefined){
		data_Vue.geninfo['advanced_advanced_pheno'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_skip']==undefined){
		data_Vue.geninfo['advanced_advanced_skip'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_reli']==undefined){
		data_Vue.geninfo['advanced_advanced_reli'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_last']==undefined){
		data_Vue.geninfo['advanced_advanced_last'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_del']==undefined){
		data_Vue.geninfo['advanced_advanced_del'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_scaling']==undefined){
		data_Vue.geninfo['advanced_advanced_scaling'] = false;
	}
	if(data_Vue.geninfo['advanced_advanced_copy']==undefined){
		data_Vue.geninfo['advanced_advanced_copy'] = false;
	}
	
	if(data_Vue.geninfo['mutation_rate']==undefined){
		data_Vue.geninfo['mutation_rate'] = 1e-08;
	}
	
	if(data_Vue.geninfo['max_d']==undefined){
		data_Vue.geninfo['max_d'] = 25;
	}
	if(data_Vue.geninfo['max_d2']==undefined){
		data_Vue.geninfo['max_d2'] = 25;
	}
		if(data_Vue.geninfo['advanced_advanced_copy']==undefined){
		data_Vue.geninfo['advanced_advanced_copy'] = false;
	}
	
	if(data_Vue.plottingData.confidence==undefined){
		data_Vue.plottingData.confidence = false;
	}
	if(data_Vue.plottingData.legend==undefined){
		data_Vue.plottingData.legend = true;
	}

	if(data_Vue.geninfo['sharedWith']==undefined){
		data_Vue.geninfo['sharedWith'] = '';
	}
	
	if(data_Vue.geninfo['majorQTLsyntax']==undefined){
		data_Vue.geninfo['majorQTLsyntax'] = 'SNP + Chromosome';
	}

	if(data_Vue.change_type==undefined){
		data_Vue.change_type = 'select node/edge';
	}
	
	if(data_Vue.change_type1==undefined){
		data_Vue.change_type1 = 'All';
	}
	
	if(data_Vue.change_type2==undefined){
		data_Vue.change_type2 = 'All';
	}
		
	if(data_Vue.change_type3==undefined){
		data_Vue.change_type3 = 'All';
	}	
	if(data_Vue.change_type4==undefined){
		data_Vue.change_type4 = 'All';
	}	
	if(data_Vue.change_type5==undefined){
		data_Vue.change_type5 = '';
	}
	
	if(data_Vue.change_type7==undefined){
		data_Vue.change_type7 = 'All';
	}
	if(data_Vue.change_type8==undefined){
		data_Vue.change_type8 = 'All';
	}
		if(data_Vue.change_type9==undefined){
		data_Vue.change_type9 = 'Remain unchanged';
	}
		if(data_Vue.change_type10==undefined){
		data_Vue.change_type10 = '';
	}
		if(data_Vue.change_type11==undefined){
		data_Vue.change_type11 = 'Remain unchanged';
	}
		if(data_Vue.change_type12==undefined){
		data_Vue.change_type12 = 'Remain unchanged';
	}
		if(data_Vue.change_type13==undefined){
		data_Vue.change_type13 = [];
	}
	
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
	
	if(inputData['litter_size']){
		data_Vue.litter_size = inputData['litter_size'];
	} else{
		data_Vue.litter_size = new myLitter();
	}
	if(inputData['Culling']){
		data_Vue.culling = inputData['Culling'];
	}else{
		data_Vue.culling = new myCulling();
	}
	if(inputData['Subpopulation']){
		data_Vue.subpopulation = inputData['Subpopulation'];
		
		for(i = 0; i < data_Vue.subpopulation.subpopulation_list.length; i++){
			if(data_Vue.subpopulation.subpopulation_list[i].nindi == undefined){
				data_Vue.subpopulation.subpopulation_list[i].nindi = 100;
			}
			if(data_Vue.subpopulation.subpopulation_list[i].sharef == undefined){
				data_Vue.subpopulation.subpopulation_list[i].sharef = 0.5;
			}
			if(data_Vue.subpopulation.subpopulation_list[i].ngen == undefined){
				data_Vue.subpopulation.subpopulation_list[i].ngen = 0;
			}
			if(data_Vue.subpopulation.subpopulation_list[i].majorfreq == undefined){
				data_Vue.subpopulation.subpopulation_list[i].majorfreq = true;
			}

		}
	}else{
		data_Vue.subpopulation = new myPopulation();
	}
	
	if(inputData['Phenotyping Info']){
		data_Vue.phenotyping_class = inputData['Phenotyping Info'];
		for(var i=0; i < data_Vue.phenotyping_class.length; i++){
			if(data_Vue.phenotyping_class[i]["Cost of phenotyping"] == undefined){
				data_Vue.phenotyping_class[i]["Cost of phenotyping"] = "0";
			}
		}
	}else{
		// an older Version of JSON file, maually add phenoC
		data_Vue.phenotyping_class = [{Name: "Fully phenotyped"}];
		for(var i=0; i <data_Vue.traitsinfo.length; i++ ){
			data_Vue.phenotyping_class[0]['P'+(i+1)] =1;
		}
	}
	
	if(data_Vue.geninfo['slider_value'] === undefined) {
		data_Vue.geninfo['slider_value'] = 0;
		document.getElementById('heightNetwork').innerHTML = 0;
		networkBoxChange(0);
	}
	else {
		networkBoxChange(data_Vue.geninfo['slider_value']);
	}

	data_Vue.show_matrix_element = inputData["Intern"].show_matrix_element;
	data_Vue.counter_pheno = inputData["Intern"].counter_pheno;
	data_Vue.counter_qtl = inputData["Intern"].counter_qtl;
	data_Vue.counter_qtl_sub = inputData["Intern"].counter_qtl_sub;
	data_Vue.individualsVar_options = inputData["Intern"].individualsVar_options;
	data_Vue.genetic_data = inputData["Intern"].genetic_data;
	//data_Vue.runned = inputData["Intern"].runned;
	
	if(data_Vue.traitsinfo.length > 0){
		for(j = 0; j < data_Vue.traitsinfo.length ; j++){
			if(data_Vue.traitsinfo[j]['Trait Name'] == undefined){
				data_Vue.traitsinfo[j]['Trait Name'] = "Pheno " + j;
			}
			if(data_Vue.traitsinfo[j]['Trait Unit'] == undefined){
				data_Vue.traitsinfo[j]['Trait Unit'] = "";
			}
			if(data_Vue.traitsinfo[j]['Trait Mean'] == undefined){
				data_Vue.traitsinfo[j]['Trait Mean'] = 100;
			}
			if(data_Vue.traitsinfo[j]['Trait Std Deviation'] == undefined){
				data_Vue.traitsinfo[j]['Trait Std Deviation'] = 10;
			}
			if(data_Vue.traitsinfo[j]['Trait Heritability'] == undefined){
				data_Vue.traitsinfo[j]['Trait Heritability'] = 0.3;
			}
			if(data_Vue.traitsinfo[j]['Repeatability'] == undefined){
				data_Vue.traitsinfo[j]['Repeatability'] = "";
			}
			if(data_Vue.traitsinfo[j]['Trait Number of Polygenic Loci'] == undefined){
				data_Vue.traitsinfo[j]['Trait Number of Polygenic Loci'] = 1000;
			}
			if(data_Vue.traitsinfo[j]['dominant_qtl'] == undefined){
				data_Vue.traitsinfo[j]['dominant_qtl'] = 0;
			}
			if(data_Vue.traitsinfo[j]['qualitative_qtl'] == undefined){
				data_Vue.traitsinfo[j]['qualitative_qtl'] = 0;
			}
			if(data_Vue.traitsinfo[j]['quantitative_qtl'] == undefined){
				data_Vue.traitsinfo[j]['quantitative_qtl'] = 0;
			}
			
			if(data_Vue.traitsinfo[j]['additive_equal'] == undefined){
				data_Vue.traitsinfo[j]['additive_equal'] = 0;
			}
			
			if(data_Vue.traitsinfo[j]['dominant_equal'] == undefined){
				data_Vue.traitsinfo[j]['dominant_equal'] = 0;
			}
			
			if(data_Vue.traitsinfo[j]['dominant_positive'] == undefined){
				data_Vue.traitsinfo[j]['dominant_positive'] = false;
			}
			if(data_Vue.traitsinfo[j]['is_maternal'] == undefined){
				data_Vue.traitsinfo[j]['is_maternal'] = false;
			}
			if(data_Vue.traitsinfo[j]['is_paternal'] == undefined){
				data_Vue.traitsinfo[j]['is_paternal'] = false;
			}
			if(data_Vue.traitsinfo[j]['is_combi'] == undefined){
				data_Vue.traitsinfo[j]['is_combi'] = false;
			}
			if(data_Vue.traitsinfo[j]['Trait Major QTL'] == undefined){
				data_Vue.traitsinfo[j]['Trait Major QTL'] = 0;
			}
			if(data_Vue.traitsinfo[j]['Trait Value per Unit'] == undefined){
				data_Vue.traitsinfo[j]['Trait Value per Unit'] = 0;
			}
			if(data_Vue.traitsinfo[j]['trafo'] == undefined){
				data_Vue.traitsinfo[j]['trafo'] = "function(x){return(x)}";
			}
			
			if((data_Vue.traitsinfo[j]['combi_weights'] != undefined) && (data_Vue.traitsinfo[j]['combi_weights'].length != data_Vue.traitsinfo.length)){
				var temp = data_Vue.traitsinfo[j]['combi_weights'] ;
				data_Vue.traitsinfo[j]['combi_weights'] = [];
				for( var jj = 0; jj <data_Vue.traitsinfo.length; jj++){
					data_Vue.traitsinfo[j]['combi_weights'].push(temp[jj]);
				}
			}
		}
	}


	var mat1 = inputData['Phenotypic Correlation'];
	var mat2 = inputData['Genetic Correlation'];
	//console.log(mat1);
	if(mat1 !== undefined && mat1.length > 0 ){		
		var matrix = [];
		var matrix2 = [];
		var row1;
		var row2;
		for(var i=0; i < data_Vue.traitsinfo.length; i++){
			row1 = [];
			row2 = [];
			for(var j=0; j <= i; j++){
				row1.push({val : mat1[i][j]});
				row2.push({val : mat2[i][j]});
			}
			matrix.push({row : row1});
			matrix2.push({row : row2});
		}
		
		data_Vue.matrix = matrix;
		data_Vue.matrix2 = matrix2;
	}else{
		data_Vue.matrix = mat1;
		data_Vue.matrix2 = mat2;		
	}
	loadCohortInfoFromServer(data_Vue.geninfo['Project Name']);
	loadCohortTimeInfoFromServer(data_Vue.geninfo['Project Name']);
	
	if(data_Vue.nodes.length >0){
		nodes = data_Vue.nodes.get();
		for(i = 0; i < nodes.length; i ++){
			if(nodes[i]["Proportion of genotyped individuals"] == undefined){
				nodes[i]["Proportion of genotyped individuals"] = 1;
			}
			if(nodes[i]["Phenotyping Class"] == undefined){
				nodes[i]["Phenotyping Class"] = data_Vue.phenotyping_class[0]["Name"];
			}
			data_Vue.nodes.update(nodes[i]);
		}
	}

	if(data_Vue.edges.length > 0){
		edges = data_Vue.edges.get();
		for(i = 0; i < edges.length; i++){
			if(edges[i]["Time Needed"] == undefined){
				edges[i]["Time Needed"] = 0;
			}
			if(edges[i]["Cohorts used in BVE"] == undefined){
				edges[i]["Cohorts used in BVE"] = "";
			}
			if(edges[i]['Selection Type'] ==undefined){
				edges[i]['Selection Type'] = "Random";
			} 
			if(edges[i]['Selection Index'] ==undefined){
				edges[i]['Selection Index'] = data_Vue.selection_index[0]["Name"];
			} 
			
			if(edges[i]['BVE Method_solver'] ==undefined){
				edges[i]['BVE Method_solver'] = "Regular Inversion";
			} 
			data_Vue.edges.update(edges[i]);
		}
	}
	
	
	draw();
	console.log("Loading Data successful.");
	data_Vue.project_saved = true;
	showCorrDiv("true");
	
}

function resizeExportArea() {
	exportArea.style.height = (1 + exportArea.scrollHeight) + "px";
}

//function to Load Coghort information from Server
function loadCohortInfoFromServer(name) {
	$.ajax
	({
		type: "GET",
		url: '/getCohortInfo',
		success: function (data) {
			if (data != '') {
				data_Vue.cohortsList = csvToJSON(data);
				//console.log(data_Vue.cohortsList);
				return data_Vue.cohortsList;
				}
			}		
	})
}

//function to Load Coghort information from Server
function loadCohortTimeInfoFromServer(name) {
	$.ajax
	({
		type: "GET",
		url: '/getCohortTimeInfo',
		success: function (data) {
			if (data != '') {
				data_Vue.cohortsTimeList = csvToJSON(data);
				//console.log(data_Vue.cohortsTimeList);
				return data_Vue.cohortsTimeList;
				}
			}		
	})
}


//function to get Warnings Log from Server
function loadWarningsLogOfSimulation(name) {
	$.ajax
	({
		type: "GET",
		url: '/getWarningsInfo',
		success: function (data) {
			if (data != "") {

				thisText = data.split("\n");
				data_Vue.warningsLog = thisText;
				if (data_Vue.warningsLog.length>2) {
					alert("Your R - Simulation contains warnings during the simulation. Check R Warnings!");	
				}	
				return data_Vue.warningsLog;
				}
			}			
	})
}

//csv to JSON to get list of Cohorts in json format

function csvToJSON(cohorts) {
	var lines=cohorts.split("\n");
  	var result = [];
  	var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);
  }
  
  return result; 
}




// function to save data to database:
function postProject(name, url, jsondata, sharedWith){
	$.ajax
	({
		type: "POST",
		url: url,
		data: {
			name: name,
			jsondata : jsondata,
			sharedWith:sharedWith,
			versions: JSON.stringify(data_Vue.versions.reverse()),
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
				//document.getElementById("Project_Name").value = name; 
			})
			
			if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {
				localStorage.clear();
			}
			else if (data_Vue['Upload_CorrFile'] == 'Yes') {
				if(isProject(name) === false) {
					data_Vue.$refs.tree.append({ text: name,  state: { dropable: false } });
					saveProjectToTree();
					alert("Saving success with Imported values from Excel!");
				}
				else {
					alert("Imported values from Excel successfully!");
				}
			}
			else {
				if(url === '/save' && data_Vue.database.length !== 0) { 
					data_Vue.$refs.tree.append({ text: name,  state: { dropable: false } });
					saveProjectToTree();
					alert('Saving Success.');
				}
				else if(data_Vue.database.length === 0) {
					data_Vue.$refs.tree.append({ text: name,  state: { dropable: false } });
					var save_array1 = [];
					save_array1.push({group_Name:name, options:{ dropable: false } });
					save_array1.push({group_Name:'New Group', options:{ dropable: true } });
					saveProjectTree_toDB(save_array1);
					alert('Saving Success.');
				}
				else {
					alert("Saving Success!");
				} 
			}
					
			data_Vue.project_saved = true;
			data_Vue.versions = data.reverse();

			document.getElementById('excelToArray').value = '';
			if(document.getElementById("Version")) {
			document.getElementById("Version").value = "recent"; }
			document.getElementById("SaveAs_Div").style.display = 'none';
			document.getElementById("shareProject_Div").style.display = 'none';
			loadData(name);
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}
			
function saveProjectToTree() {
	var name = data_Vue.geninfo['Project Name'];
	
	$.ajax
	({
		type: "POST",
		url: '/saveProject_ProjectTree',
		data: {
			name: name,
		},
		success: function (data, msg) {
			//$.get('/get_projectTree', function(dat){
			//	console.log('tree'+dat);
			//	data_Vue.showTree = dat;
		//});
		//getMoBPSTreeProject();
		},
		failure: function(msg) 
		{
			alert('Saving dfdgfg Error!');
		},
		})
}	

			
// function to save data to database:

function unique_postProject(name, url, jsondata, sharedWith){
	$.ajax
	({
		type: "POST",
		url: url,
		data: {
			name: name,
			jsondata : jsondata,
			sharedWith:sharedWith,
			versions: JSON.stringify(data_Vue.versions.reverse()),
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
				//document.getElementById("Project_Name").value = name; 
			})

			if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {
				localStorage.clear();
			}
			else if (data_Vue['Upload_CorrFile'] == 'Yes') {
				alert("Imported values from Excel successfully!");
			}
			else {
				if (data_Vue.geninfo['sharedWith'] === " " || data_Vue.geninfo['sharedWith'].cnt === "undefined") {
					alert("Saving Success!"); }					
			}

			data_Vue.project_saved = true;
			data_Vue.versions = data.reverse();

			document.getElementById('excelToArray').value = '';
			document.getElementById("Version").value = "recent";
			document.getElementById("SaveAs_Div").style.display = 'none';
			document.getElementById("shareProject_Div").style.display = 'none';
			loadData(name);
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}

function checkProjectExists() {
	var checkProject = data_Vue.geninfo['Project Name']; 
		var isProjectExist = data_Vue.database.includes(checkProject);
		if(isProjectExist == false) {  
			alert('Please save your project before using SHARE or STOP SHARE!')
		}
	return isProjectExist;
}

function checkSharedPrExists() {
		var checkShared = data_Vue.geninfo['Project Name']; 
		var isSharedExist = checkShared.substring(0,7);
		var combineShare = "Shared_"+data_Vue.geninfo['Project Name'];
		var isPrExist = data_Vue.database.includes(combineShare);

		if(isPrExist || isSharedExist === 'Shared_') { 
			alert('You can not share this Project again!'); 
			isShared = true; 
		}
		else {
			isShared = false; 
		}
	return isShared;
}


function shareUser(val) {
	var thisUser = val;

	for (var u=0; u<val.length; u++) {
		var checkThisUser = val[u];
		var X = data_Vue.allDBUsers.includes(checkThisUser);
		if(X == false) { alert (thisUser+': One of the users is not existing from this User list'); 
			u = val.length+2; 
			loadData(data_Vue.geninfo['Project Name']); }
	}

	if(!val){
		data_Vue.geninfo['sharedWith'] = '';
	}else{
		data_Vue.geninfo['sharedWith'] = thisUser;
	}

	data_Vue.geninfo['project_Sharer'] = data_Vue.geninfo['user'];

	var name = "Shared_"+data_Vue.geninfo['Project Name'];
	data_Vue.geninfo['Project Name'] = name;

	data_Vue.geninfo['isPrShared'] = true;

	var jsondata = JSON.stringify(exportNetwork());
	data_Vue.geninfo['Excel_File'] = '';

	var sharedWith = data_Vue.geninfo['sharedWith'];

	if(data_Vue.versions.length > 10){
		var r = confirm("Only the 10 most recent versions are saved. The oldest version will be deleted. Do you want to proceed? Alternative: Change the Project Name and save to create a new project");
		if(!r) return;
	}

	while(data_Vue.versions.length > 10){
		data_Vue.versions.pop();
	}

	document.getElementById('shareProject_Div').style.display = 'none';

	if(X !== false) {
		var usrCNT = thisUser.length;
			if (usrCNT>0) {
				for (var us=0; us<usrCNT; us++) {
					var savetoThisUser = thisUser[us];
					share_postProject(name, "/saveProjectWithOtherUser", jsondata, savetoThisUser, us);
					saveProjectToTree_forSharedUser(name, savetoThisUser);
				}
				var x = false;
				share_postProject(name, "/saveProjectWithOtherUser", jsondata, data_Vue.geninfo['user'], x);
				saveProjectToTree_forSharedUser(name, data_Vue.geninfo['user']);
				data_Vue.$refs.tree.append({ text: name,  state: { dropable: false } })
			}		
		}
}

function saveProjectToTree_forSharedUser(name, user) {

	$.ajax
	({
		type: "POST",
		url: '/saveProject_ProjectTree_ForSharedUser',
		data: {
			name: name,
			user:JSON.stringify(user),	
		},
		success: function (data, msg) {
		},
		failure: function(msg) 
		{
			alert('Saving dfdgfg Error!');
		},
		})
}

function isShareUserExists(val) {
		if (Array.isArray(val) ) {	
			stopShareProject(val); 
		}
		else {
			alert('You can not "STOP SHARE". The project is not shared now with any users OR The project is already stopped sharing by other User.')
		}
}

function stopShareProject(val) {
	var thisUser = val;

	var cnt = val.length;

	thisUser[cnt] = data_Vue.geninfo['user'];

	var name = data_Vue.geninfo['Project Name'];
	data_Vue.geninfo['sharedWith'] = '';

	var jsondata = JSON.stringify(exportNetwork());	

	data_Vue.geninfo['Excel_File'] = '';	

	if(data_Vue.versions.length > 10){
		var r = confirm("Only the 10 most recent versions are saved. The oldest version will be deleted. Do you want to proceed? Alternative: Change the Project Name and save to create a new project");
		if(!r) return;
	}

	while(data_Vue.versions.length > 10){ data_Vue.versions.pop(); }

	var prExists = 	checkProjectExists();	

	if(prExists && val !== '') {
		var getSharer = data_Vue.geninfo['project_Sharer']
		var usrCNT = thisUser.length;
		//alert('usrCNT:'+usrCNT);
			if (usrCNT>0) {
				for (var us=0; us<usrCNT; us++) {
				var savetoThisUser = thisUser[us];
				stop_shareProjectUsers(name, "/stop_sharedProjectWithOtherUser", jsondata, savetoThisUser, us, usrCNT);
					if(data_Vue.geninfo['project_Sharer'] === savetoThisUser) {
						saveSharedProToOri(name, getSharer);
					}

				}
			}			
	}
	else {
	}	
		var cShared = data_Vue.geninfo['Project Name']; 
		var prName = 'Shared_'+cShared;
		var prC = cShared.count;
		var getPr = cShared.substring(7,prC);
			if(data_Vue.geninfo['user'] === data_Vue.geninfo['project_Sharer']) {
				if(data_Vue.geninfo['user'] === data_Vue.geninfo['project_Sharer']) 
					loadData(cShared);
 			}
			else {
				data_Vue.geninfo['sharedWith'] = '';
				data_Vue.geninfo['isPrShared'] = false;
				data_Vue.geninfo['isSharedExist'] = "No";
				loadData(prName);
			}
}


function saveSharedProToOri(name, getSharer) {
		var checkShared = data_Vue.geninfo['Project Name']; 
		var prCNT = checkShared.count;
		var getOriPr = checkShared.substring(7,prCNT);
		var isSharedExist = checkShared.substring(0,7);

		if(isSharedExist === 'Shared_') { 
			data_Vue.geninfo['Project Name'] = getOriPr;
		}

		var jsondata = JSON.stringify(exportNetwork());
		data_Vue.geninfo['Excel_File'] = '';

	//	console.log(data_Vue.versions);

		if(data_Vue.versions.length > 10){
			var r = confirm("Only the 10 most recent versions are saved. The oldest version will be deleted. Do you want to proceed? Alternative: Change the Project Name and save to create a new project");
			if(!r) return;
		}

		while(data_Vue.versions.length > 10){
			data_Vue.versions.pop();
		}

		updateToOrigPr(getOriPr, "/updateSharerProject", jsondata, getSharer);
		deleteSharedProject(checkShared, getOriPr, getSharer);
		deleteASharedPro_FromTree(checkShared, data_Vue.geninfo['project_Sharer']);
		if(data_Vue.user === data_Vue.geninfo['project_Sharer']) {
			data_Vue.$refs.tree.remove({ text: name});
		}
}

function updateToOrigPr(name, url, jsondata, sharedWith){

		$.ajax
		({
			type: "POST",
			url: '/loadproject',
			data: {name : name},
			success: function (data, msg) {
			if(data != ''){
				if(data[0].versions.length > 0){
					data_Vue.versions = data[0].versions.reverse();
				}
				} }
		});

	$.ajax
	({
		type: "POST",
		url: url,
		data: {
			name: name,
			jsondata : jsondata,
			projectSharer:sharedWith,
			versions: JSON.stringify(data_Vue.versions.reverse()),
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
			})
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}



function deleteSharedProject(name, getOriPr, projectSharer) {
			$.ajax
			({
				type: "POST",
				url: "/deleteProject",
				data: {
					name: name,
					user:projectSharer,
				},
				success: function (msg) {
				},
				failure: function(msg) 
				{
					alert('Delete Error!');
				},
			});	
}

function deleteASharedPro_FromTree(project, user) {
	var projectGroup = project;
	console.log(projectGroup);
	$.ajax
	({
		type: "POST",
		url: '/deleteASharedProject_FromTree',
		data: {
			project: JSON.stringify(projectGroup),	
			user:user,
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
			})
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			

}

function stop_shareProjectUsers(name, url, jsondata, sharedWith, shareCNT, userCNT){
	var totalCNT = userCNT;
	$.ajax
	({
		type: "POST",
		url: url,
		data: {
			name: name,
			jsondata : jsondata,
			sharedWith:sharedWith,
			versions: JSON.stringify(data_Vue.versions.reverse()),
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
			})

			if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {
				localStorage.clear();
			}
			else if (data_Vue['Upload_CorrFile'] == 'Yes') {
				alert("Imported values from Excel successfully!");
			}
			else {
				if(totalCNT == shareCNT+1) {
					alert("Stopped sharing Success! To share this project again you have to use SAVE AS beforehand."); 
					data_Vue.project_saved = true;
					data_Vue.versions = data.reverse();

					document.getElementById('excelToArray').value = '';
					document.getElementById("Version").value = "recent";
					document.getElementById("SaveAs_Div").style.display = 'none';
					document.getElementById("shareProject_Div").style.display = 'none';
				}
			}

		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}



function share_postProject(name, url, jsondata, sharedWith, shareCNT){
	var totalCNT = data_Vue.geninfo['sharedWith'].length;

	$.ajax
	({
		type: "POST",
		url: url,
		data: {
			name: name,
			jsondata : jsondata,
			sharedWith:sharedWith,
			versions: JSON.stringify(data_Vue.versions.reverse()),
		},
		success: function (data, msg) {
			$.post('/database', function(dat){
				data_Vue.database = dat;
			})

			if (typeof localStorage.getItem("movetrait") !== "undefined" & localStorage.getItem("movetrait") === "yes") {
				localStorage.clear();
			}
			else if (data_Vue['Upload_CorrFile'] == 'Yes') {
				alert("Imported values from Excel successfully!");
			}
			else {
				var isNumber = Number.isFinite(shareCNT);

				if(isNumber && totalCNT == shareCNT+1) {
					alert("Saving Success!"); 
				}

			}

			data_Vue.project_saved = true;
			data_Vue.versions = data.reverse();

			document.getElementById('excelToArray').value = '';
			document.getElementById("Version").value = "recent";
			document.getElementById("SaveAs_Div").style.display = 'none';
			document.getElementById("shareProject_Div").style.display = 'none';
			loadData(name);
		},
		failure: function(msg) 
		{
			alert('Saving Error!');
		},
	});			
}


function share_SaveProject(name) {
	if(!name){
		var name = data_Vue.geninfo['Project Name'];
	}else{
		data_Vue.geninfo['Project Name'] = name;
	}
	var jsondata = JSON.stringify(exportNetwork());
	data_Vue.geninfo['Excel_File'] = '';

	if(data_Vue.versions.length > 10){
		var r = confirm("Only the 10 most recent versions are saved. The oldest version will be deleted. Do you want to proceed? Alternative: Change the Project Name and save to create a new project");
		if(!r) return;
	}

	while(data_Vue.versions.length > 10){
		data_Vue.versions.pop();
	}	

	if(data_Vue.database.filter(function(obj){ return(obj==name)}).length > 0){
			var usrCNT = data_Vue.geninfo['sharedWith'].length;
			// var curUser = 1;
			if (usrCNT>0 && data_Vue.geninfo['sharedWith'] !== ' ') {
				//alert('share _save after stop');
				for (var us=0; us<usrCNT; us++) {
				var savetoThisUser = data_Vue.geninfo['sharedWith'][us];
				share_postProject(name, "/update_sharedProjectWithOtherUser", jsondata, savetoThisUser, us);
				} 
			}
			unique_postProject(name, "/updateProjectWithOtherUser", jsondata, data_Vue.geninfo['sharedWith']);	}
	else {
		postProject(name, "/save", jsondata, data_Vue.geninfo['sharedWith']);
	}
}


function saveProject(name) {
	if(!name){
		var name = data_Vue.geninfo['Project Name'];
	}else{
		data_Vue.geninfo['Project Name'] = name;
	}
	var jsondata = JSON.stringify(exportNetwork());
	data_Vue.geninfo['Excel_File'] = '';
	
	if(data_Vue.versions.length > 10){
		var r = confirm("Only the 10 most recent versions are saved. The oldest version will be deleted. Do you want to proceed? Alternative: Change the Project Name and save to create a new project");
		if(!r) return;
	}
	
	while(data_Vue.versions.length > 10){
		data_Vue.versions.pop();
	}
	
	if(data_Vue.database.filter(function(obj){ return(obj==name)}).length > 0){
		postProject(name, "/update", jsondata, data_Vue.geninfo['sharedWith']);
	}else{
		postProject(name, "/save", jsondata, data_Vue.geninfo['sharedWith']);
	}
}

function deleteProject() {
	var name = data_Vue.geninfo['Project Name'];
	//console.log(name);
	
	if(data_Vue.database.filter(function(x){return(x == name)}).length > 0){
		var r = confirm("The whole project including all older versions will be deleted. Do you want to proceed?");
		if(r){
			$.ajax
			({
				type: "POST",
			//	url: "/delete",
				data: {
					name: name,
				},
				success: function (msg) {
					//loadData(name);
				//	console.log("Project deleted.");
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

function deleteProject_FromTree() {
	var project = data_Vue.editProjectForTree;
	project.remove();
	saveGroupTreeToDB();
}

function deleteProjects_FromTree(projects) {
	var deleteArray = projects['children'];

	var dArray = new Array();

	if (deleteArray.length > 0 ){
		for (var d = 0; d < deleteArray.length; d++) {
			if(deleteArray[d].children.length > 0) {

				for (var d2 = 0; d2 < deleteArray[d].children.length; d2++) {
						if(deleteArray[d].children[d2].children.length > 0) {
							for (var d3 = 0; d3 < deleteArray[d].children[d2].children.length; d3++) {
							if(deleteArray[d].children[d2].children[d3].children.length > 0) {
							}
							else {dArray.push(deleteArray[d].children[d2].children[d3].data.text);}
							}							
						
						}
						else {dArray.push(deleteArray[d].children[d2].data.text);}
					}	
				
			}
			else {dArray.push(deleteArray[d].data.text); }				
	}}
}



function saveProjectAs() {
	document.getElementById("SaveAs_Div").style.display = 'block';
}

function shareProjectWith(val) {
	var isPrExist = checkProjectExists();
	var isShared = checkSharedPrExists();
	if(isPrExist === true && isShared == false) {
		document.getElementById("shareProject_Div").style.display = 'block';
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
			font: {
			     size: 23,		
			 },
		},
		interaction: {
			hover: true,
			hoverConnectedEdges: false,
			selectConnectedEdges: true,	
			navigationButtons: true,
   	            keyboard: false,
		},
	};
	network = new vis.Network(container, network_data, options);
	
	network.on("selectNode", function(params){
		data_Vue.show_info = 'node';
		data_Vue.active_node = data_Vue.nodes.get(params.nodes[0]);
		//console.log('Active Node is ' + data_Vue.active_node.id);
	});
	network.on("selectEdge", function(params){
		if(params.nodes.length == 0) data_Vue.show_info = 'edge';
		data_Vue.active_edge = data_Vue.edges.get(params.edges[0]);
		//console.log('Active Edge is ' + data_Vue.active_edge.id);
	});
	network.on("doubleClick", function(params){
		data_Vue.displayBtn = true;
		if(params.nodes.length > 0 ){
			var node_item = data_Vue.nodes.get(params.nodes[0]);
			cancelAction = my_cancelNodeEdit;
			showNode(node_item, cancelAction);
			}
		else if(params.edges.length > 0 ){
			var edge_item = data_Vue.edges.get(params.edges[0]);
			cancelAction = my_cancelEdgeEdit;
			showEdge(edge_item, cancelAction);
		}
	});
	
	network.on("oncontext", function(params){
		if(params.nodes.length > 0 ){
		
			var copy_node = data_Vue.nodes.get(params.nodes[0]);
			var str = Math.round(Math.random() * 10000);
			copy_node.id = copy_node.id + 'Copy' +str;
			copy_node.label = copy_node.label + 'Copy' +str;
			copy_node.x = copy_node.x + 50;
			copy_node.y = copy_node.y + 50;
			data_Vue.nodes.add(copy_node);
		}
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
	// when id is changed, update all the edges:
	data_Vue.displayBtn = false;
	var hidden = data_Vue.displayBtn;
	action(hidden);
	
	data_Vue.tempNodeforCohort = data.id;
	document.getElementById('node-saveButton').onclick = saveNodeData.bind(this, data, callback);
	document.getElementById('node-cancelButton').onclick = cancelAction.bind(this, callback);
	document.getElementById('node-popUp').style.display = 'block';
}

function showNode(data, cancelAction) {
	data_Vue.node_operation = "Node - Display Only";
	if (data_Vue.displayBtn == true) {
		var hidden = data_Vue.displayBtn;
		action(hidden);
		document.getElementById('node-cancelButton').onclick = cancelAction.bind(this);
		document.getElementById('node-popUp').style.display = 'block';
	}
}

function showEdge(data, cancelAction) {
	data_Vue.edge_operation = "Edge Display Only";
	if (data_Vue.displayBtn == true) {
		var hidden = data_Vue.displayBtn;
		action(hidden);
		document.getElementById('edge_cohorts_Div').style.display = 'block';
		document.getElementById('edge-cancelButton').onclick = cancelAction.bind(this);
		document.getElementById('edge-popUp').style.display = 'block';
	}
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

function my_cancelNodeEdit() {
	clearNodePopUp();
}

function my_cancelEdgeEdit() {
	clearEdgePopUp();
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
	
	change_id = data.id;
	change_id = change_id.replace("_","-");
	data.id = change_id;
	
	//data.label = data.id;
	var myInd = JSON.stringify(data['Number of Individuals']).replace(/\"/g, "");
	//data.label = data.id+'\n'+myInd;
	data.label = data.id+" ("+myInd+")";
	if(data.Founder == "Yes"){
		data.label = data.label + " *F"
	}
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
		data_Vue.allNodes = data_Vue.nodes.get();
		
		// update edges from:
		var items = data_Vue.edges.getIds({
			filter: function (item) {
				return item.from == old_id;
			}
		});
		//console.log(items);
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
		//console.log(items);
		if(items.length >= 1){
			for(ii=0; ii < items.length; ii++){
				data_Vue.edges.update({id: items[ii], to: data.id});
			}
		}
		
		// update edge -- Selection -> BVE - > Manual select cohorts 27/02/2020
		
		var checkedgesforCohort = data_Vue.edges.get();		
		if(checkedgesforCohort.length > 0) { 
			var check_cohorts_edges = [];
			if(data_Vue.tempNodeforCohort != data_Vue.active_node.id) {data_Vue.isCohortNameChanged = "Yes";}
			var nn = data_Vue.tempNodeforCohort.length;
			for(var i=0; i < checkedgesforCohort.length; i++){
				var bType = checkedgesforCohort[i]['Breeding Type'];
				var sType = checkedgesforCohort[i]['Selection Type'];
				var isBVE = checkedgesforCohort[i]['Cohorts used in BVE'];
				var isCohortNode = checkedgesforCohort[i]['Manuel selected cohorts'];
				var isCohortExist = '';
				if((bType == "Selection") && (sType == "BVE") && (isBVE == "Manual select")) {
					var updatedCohortNode = [];
					if(isCohortNode.length > 0) {
						for(var j=0; j < isCohortNode.length; j++){
							var curCoh = isCohortNode[j];
						 	var res = curCoh.substring(0, nn);
							if(res == data_Vue.tempNodeforCohort) { var isCohortExist = "yes";	}
							updatedCohortNode.push(isCohortNode[j]);							
						}
						//document.getElementById('edge_cohorts_Div').style.display = 'block';
					}
					if (isCohortExist === "yes") { check_cohorts_edges.push(checkedgesforCohort[i]); }
					isCohortExist = '';
				}	
			}
			
			if(check_cohorts_edges.length > 0 ) {
				var tempNode = data_Vue.tempNodeforCohort;
				for(var kk=0; kk < check_cohorts_edges.length; kk++){
						var thisCohortArray = [];
						var curCohortArray = check_cohorts_edges[kk]['Manuel selected cohorts'];
						if(curCohortArray.length >0) {
							for(var ll=0; ll < curCohortArray.length; ll++){
								var thisCoh = curCohortArray[ll];
								var res1 = thisCoh.substring(0, nn);
								var thisCohortExist = '';
								if(res1 == data_Vue.tempNodeforCohort) {
									var thisCohortExist = "yes";
									myVal = thisCoh.length;
									mytext = thisCoh.substring(nn, myVal); 
									thisCohortArray.push(data_Vue.active_node.id+mytext); 
									}
								else { thisCohortArray.push(curCohortArray[ll]); }										
							}
							data_Vue.edges.update({id: check_cohorts_edges[kk]['id'], 'Manuel selected cohorts': thisCohortArray});
						}
				}
			}
		}			
		// ends update edge -- Selection -> BVE - > Manual select cohorts 27/02/2020 
		
	cancelNodeEdit(callback);
	} else {
		clearNodePopUp();
		callback(data);
	}
	
}

function editEdgeWithoutDrag(data, callback) {
	
	data_Vue.displayBtn = false;
	var hidden = data_Vue.displayBtn;
	action(hidden);
	
	// add edge -> selection -> BVE --> Manual select cohorts 
	if(data_Vue.edge_operation=='Add Edge' || data_Vue.edge_operation =='Edit Edge'){
		data_Vue.allNodesforNewEdge = data_Vue.nodes.get();
	}
	// ends add edge -> selection -> BVE .> Manual select cohorts 
	
	document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(this, data, callback);
	document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(this,callback);
	document.getElementById('edge-popUp').style.display = 'block';
	
	// show-hide div for cohorts manual select
	if (data_Vue.active_edge["Cohorts used in BVE"] == 'Manual select') {
		document.getElementById('edge_cohorts_Div').style.display = 'block';
	}
	else {
		document.getElementById('edge_cohorts_Div').style.display = 'none';
	}
}

function clearEdgePopUp() {
	document.getElementById('edge-saveButton').onclick = null;
	document.getElementById('edge-cancelButton').onclick = null;
	document.getElementById('edge-popUp').style.display = 'none';
	document.getElementById('edge_cohorts_Div').style.display = 'none';
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
		for(var i=0; i< keys.length; i++){
			data[keys[i]] = "";
		}
		data['Manuel selected cohorts'] = [];
	}
	clearEdgePopUp();
	callback(data);
	addServices();
}

function init() {
  openNav();
  draw();
  isSafari();  
  shareUserTable();
}


//******************* If the User take data from database, then load them here **********/
function isSafari() {
	data_Vue.isBrowserSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	data_Vue.isDraggableOption='No';
}

function loadData(ind){
	data_Vue.name='';
	data_Vue.warningsLog='';
	data_Vue.allNodesforNewEdge = [];
	localStorage.clear();
	sessionStorage.clear();
	
	if(ind != "Create_New_123456YYYY"){
		$.ajax
		({
			type: "POST",
			url: '/loadproject',
			data: {name : ind},
			success: function (data, msg) {
				if(data != ''){
					data_Vue.filename = data[0].name;
					importNetwork_intern(data[0].json);
					
					if(typeof data[0].sharedWith !== 'undefined') {
							if (data[0].sharedWith.length > 0) {
								data_Vue.geninfo['isPrShared'] = true;		
								data_Vue.geninfo['sharedWith'] = data[0].sharedWith;}
							else { 
								data_Vue.geninfo['isPrShared'] = false;
								data[0].sharedWith = ''; 
								}
						}
					else { 
						data_Vue.geninfo['isPrShared'] = false;
						data_Vue.geninfo['sharedWith'] = '';
						}

					if(data[0].isShared === "Yes") {
						data_Vue.geninfo['isSharedExist'] = "Yes";	
					}
					else if (data[0].isShared === "No") {
						data_Vue.geninfo['isSharedExist'] = "No";
					}
					else { 
						data_Vue.geninfo['isSharedExist'] = '';
					}
					
					if(data[0].versions.length > 0){
						data_Vue.versions = data[0].versions.reverse();
					}
					document.getElementById("Version").value = "recent";
					data_Vue.project_saved = true;
					
					checkEverything(id="General_Info");
					checkEverything(id="Phenotype_Info_Div");
					checkEverything(id="Selectionindex_Div");
					checkEverything(id="Variables_Info");
					checkEverything(id="edge-popUp");
					checkEverything(id="node-popUp");
					
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
		importNetwork_intern(json);
	}else{
		var json = data_Vue.versions[0].json;
		importNetwork_intern(json);		
	}
	data_Vue.project_saved = true;
}

function loadTemplate(ind){
	if(ind != "New"){
		var json = data_Vue.template_database[ind].json;
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
	if (data_Vue.traitsinfo.length == 0) {
		document.getElementById("excelImport_button").disabled = true;
		document.getElementById('excelToArray').value = '';
		data_Vue.geninfo['Excel_File'] = '';
		alert("Please add phenotypes first and then choose to import correlation data! ")
	}
	else if ((data_Vue.geninfo['Excel_File'] !== '' && data_Vue.traitsinfo.length !== 0)) {
		var selectedFile = evt.target.files; 
		var fileName = selectedFile[0].name;
		const fileType = fileName.slice(-4);
			if (data_Vue.geninfo['Excel_File'] !== '' && fileType === "xlsx" ) {
				var excelToArray = new ExcelToArray();
	    		excelToArray.parseExcel(selectedFile[0]);	
			}
			else {
				document.getElementById('excelToArray').value = '';
				alert("Please use Excel file of .xslx to upload correlation data.")
			}	
	}
	else {
		document.getElementById('excelToArray').value = '';
		alert("Please select type of excel file then choose to import correlation data! ")
	}	

 }	


// excel to Array end
