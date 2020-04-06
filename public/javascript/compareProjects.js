function cpInfo () {
	this['curUserGroup'] = '';
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

	var cnt = compProjects.length;
	var testthis = {};
	
	for (var j = 0; j < cnt; j++) {
		var testthis = setJsondataList(compProjects[j]);	
		data_Vue.jsonDataList.push(testthis);	
	}
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

