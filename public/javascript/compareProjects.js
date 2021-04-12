var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var cpuser = urlParams.get('cpuser');
var cpusergroup = urlParams.get('cpusergroup')

// returns an object with all parameters, we need for plotting results:
function myPlottingPar(){
	this['ResQTLGroup_trait'] = "", 
	this['ResQTLGroup_qtl'] = "",
	this['ResQTLGroup_cohorts'] = [],
	this['ResRelGroup_cohorts'] = [],
	this['ResRelbetweenCGroup_cohort1'] = "",
	this['ResRelbetweenCGroup_cohort2'] = "",
	this['ResgMeanGroup_cohorts'] = [],
	this['ResgMeanGroup_pType'] = "By Repeats",
	this['RespMeanGroup_cohorts'] = [],
	this['RespMeanGroup_pType'] = "By Repeats",
	this['ResRelGroup_pType'] = "By Repeats",
	this['ResAccBVEGroup_cohorts'] = [],
	this['ResAccBVEGroup_pType'] = "By Repeats"
}

// returns an object with all data for plotting results:
function myPlottingData(){
	this['ResQTLGroup'] = "", 
	this['ResRelGroup'] = "",
	this['ResRelbetweenCGroup'] = "",
	this['ResgMeanGroup'] = "",
	this['SummaryGroup'] = "",
	this['RespMeanGroup'] = "",
	this['ResAccBVEGroup'] = "",
	this['confidence'] = false,
	this['legend'] = true
}


var data_Vue = new Vue({
	el: '#compareProjectDiv',
	
	data: {
		user:cpuser,
		curUserGroup:cpusergroup,
		database:null,
		compareProjects:[],
		jsonDataList:[],
		plottingPar: new myPlottingPar(),
		plottingData: new myPlottingData(),
		socket: '',
		plottingType: ["By Repeats", "By Cohorts", "By Time"],
		plottingType2: ["By Repeats", "By Time"],
		Summary: [],
				
		cptreeData:getMoBPSTreeProject(),
		cptreeModel:null,
		cpfilter:null,
        cptreeOptions: {
             propertyNames: {
              text: 'group_Name',
              children: 'Child',
              state: 'options',
             },
            dnd: false,
            checkbox: true,
			multiple:true,
			parentSelect:true,
        },

	},
	async created() {
		const response = await axios.post('/databaseCP', {username : cpuser,
				usergroup:cpusergroup})
	      .catch(function (error) {
	        if (error.response) {
	          console.log(error.response);
	        }
	      })
	this.database = response.data;
	},
	methods: {
		nodeChecked(node){	
			let arr1 = [];	
			let checkedList = data_Vue.cptreeModel.checked.map(el => el.text);
			checkedList.push(node.text);
				
				for (let k=0; k < checkedList.length; k++) {
					let project_name = checkedList[k];
					for (let j=0; j < data_Vue.database.length; j++) {
				        if (data_Vue.database[j].name === project_name) {
				          arr1.push(data_Vue.database[j].json);
				     	}
			 		}
				}
			data_Vue.jsonDataList = arr1;
			console.log(data_Vue.jsonDataList);
		},
		
		nodeUnchecked(node){
			let arr = []; 
			let thisList = data_Vue.cptreeModel.checked.map(el => el.text);
			let index = thisList.indexOf(node.text);
			thisList.splice(index, 1);
				
					for (let p=0; p < thisList.length; p++) {
						let project_name1 = thisList[p];
						for (let i=0; i < data_Vue.database.length; i++) {
					        if (data_Vue.database[i].name === project_name1) {
					         arr.push(data_Vue.database[i].json);
					     }
	 				}
				}					
		data_Vue.jsonDataList = arr;
		console.log(data_Vue.jsonDataList);
		}
		
	}
	
})
		

async function getMoBPSTreeProject() {
	const treeArray = await axios.get('/get_projectTree')
	  .catch(function (error) {
	})

	return treeArray.data[0]['ProjectGroup'];
}
