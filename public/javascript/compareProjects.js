Vue.component('treeselect', VueTreeselect.Treeselect);

function cpInfo () {
	this['curUserGroup'] = '';
}

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
	this['ResAccBVEGroup'] = ""
}


var cpInfo = new cpInfo();

var data_Vue = new Vue({
	el: '#compareProjectDiv',
	
	data: {
		cpInfo: cpInfo,
		user:'',
		database:[],
		compareProjects:[],
		jsonDataList:[],
		plottingPar: new myPlottingPar(),
		plottingData: new myPlottingData(),
		socket: '',
		curUserGroup:'',
		isBrowserSafari:'',
		plottingType: ["By Repeats", "By Cohorts", "By Time"],
		plottingType2: ["By Repeats", "By Time"],
		Summary: [],		
	}
	
})

function init() {
  updateUser();
  isSafari();  
}


function updateUser(){
	$.get('/user', function(dat){
		data_Vue.user = dat.username;
		data_Vue.curUserGroup = dat.usergroup;
		data_Vue.cpInfo['curUserGroup'] = dat.usergroup;
	})
	
	$.post('/database', function(dat){
		data_Vue.database = dat;
	})
	
	localStorage.clear();
}

function isSafari() {
	data_Vue.isBrowserSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function getProjects(val) {
 	var len = val.options.length;
	var compProjects = [];	
  	for (var i = 0; i < len; i++) {
	    opt = val.options[i];
		pro = val.options[i]['text'];
	    if (opt.selected) {
		  compProjects.push(pro);
	    }
	  }

	data_Vue.compareProjects = compProjects;

	data_Vue.compareProjects = compProjects;

	jsonListofProjects(data_Vue.compareProjects);
	
	//data_Vue.traitsinfo = data_Vue.jsonDataList[0]["jsonData"]["Trait Info"];
	//console.log(data_Vue.jsonDataList);
}


function jsonListofProjects (plist) {
	var arr = [];

	var jsonRequests  = function(jsonIndex) {
		 if (plist.length == jsonIndex) {
			console.log("jsonList Success", arr);
			return;
		}
		  
		var project_name = plist[jsonIndex];
		 
		 $.ajax({
			type: "POST",
			url: '/loadproject',
			data: {name : project_name},
								success: function(data) {
					arr.push(data[0].json);
			},
			 error: function() {
				arr.push({});
				console.error("jsonList Error", "plist", arguments);
			},
			complete: function() {
				jsonRequests(++jsonIndex);
			}
		});
	};

jsonRequests(0);

data_Vue.jsonDataList = arr;
//console.log(data_Vue.jsonDataList);
}
function setJsondataList(project_name) {	

	var thisObject = {};

	  $.ajax
		({
			type: "POST",
			url: '/loadproject',
			data: {name : project_name},
			success: function (data, msg) {
				if(data != ''){
					thisObject.project_name = data[0].name;
					thisObject.jsonData = data[0].json;
				}else{
					alert("Loading Data failed. Contact administrator. "+msg);
				}
			},
			failure: function(msg) 
			{
				alert("Loading Data failed! Contact administrator. "+msg);
			},
		});
		
	return thisObject;
};


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

