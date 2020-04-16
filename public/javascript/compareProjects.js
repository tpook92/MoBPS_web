Vue.component('treeselect', VueTreeselect.Treeselect);

function cpInfo () {
	this['curUserGroup'] = '';
	this['jsonDataList'] = [];
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
	
	var cnt = compProjects.length;
	var testthis = {};
	data_Vue.cpInfo['jsonDataList'] = [];
	data_Vue.jsonDataList = [];
	for (var j = 0; j < cnt; j++) {
		var testthis = setJsondataList(compProjects[j]);	
		data_Vue.jsonDataList.push(testthis);	
		data_Vue.cpInfo['jsonDataList'].push(testthis);
	}

	console.log(data_Vue.cpInfo);
	console.log(data_Vue.jsonDataList);
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

