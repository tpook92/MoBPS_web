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
	
	if(data_Vue.geninfo['Chromosomes Info'].length > 0){
		var nsnp = data_Vue.geninfo['Chromosomes Info'][0].Length * data_Vue.geninfo['Chromosomes Info'][0].MD;
		var Morgan = data_Vue.geninfo['Chromosomes Info'][0].Length * data_Vue.geninfo['Chromosomes Info'][0].Recombination /100;
	}else{
		var nsnp = data_Vue.geninfo['Max Number of SNPs'];
		var Morgan = 5;
	}
	
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
	console.log(nF);
	console.log(nsnp);
	console.log(nInd);
	var comptime = nF*nsnp/1000000 + 0.0002*nInd*Morgan;
	return comptime;	
}

function runningR(){
	
  
	clearResult();
	data_Vue.plottingData = new myPlottingData();
	var jsondata = JSON.stringify(exportNetwork());
	//console.log(jsondata);
	//alert("Approx. simulation running time: " + Math.round(checkRunTime()/60*2.6*100)/100 + "minutes.");
	
	$.ajax
	({
		type: "POST",
		url: './Rsim',
		data: {jsondata : jsondata},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'MoBPS is running .... please wait';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			//console.log(data);
			alert("Simulation Finished!");
			data_Vue.runned = true;
			document.getElementById("Rout_Div").innerHTML = data;
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/Error/g, "<span style=\"color:red\">Error</span>");
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/\n/g, "<br/>");
			writeSum();
		},
		error: function(obj, msg, err) 
		{
			alert(err);
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}


//Running R with streaming
function runningR1(){
  
	clearResult();
	data_Vue.plottingData = new myPlottingData();
	var jsondata = JSON.stringify(exportNetwork());
	//console.log(jsondata);
	//alert("Approx. simulation running time: " + Math.round(checkRunTime()/60*2.6*100)/100 + "minutes.");
	
	savedNodes = data_Vue.nodes.get();
	var savedNodesLen = savedNodes.length;
	var isFounder = "";
	for(let i=0; i < savedNodesLen; i++){
		var checkFounder = savedNodes[i].Founder;
		if (checkFounder == "Yes") {
			isFounder = "Found";
		}
	}

	if(isFounder == ""){
		alert("There is no Founder in the Project. Please add a Founder!");
	}		

	$.ajax
	({
		type: "POST",
		url: './Rsim1',
		data: {jsondata : jsondata},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'MoBPS is running .... please wait';
			document.getElementById("runningDog").style.visibility = 'visible';
			if(data_Vue.socket == ''){
				data_Vue.socket = io();
				data_Vue.socket.on(data_Vue.user, function(d){
					document.getElementById("runningDogLog").innerHTML += d + "<br>";
				})
			}
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			//console.log(data);

			document.getElementById("Rout_Div").innerHTML = data;
			
			where = document.getElementById("Rout_Div").innerHTML.indexOf("Execution");
			where2 = document.getElementById("Rout_Div").innerHTML.indexOf("exceeds your");
			where3 = document.getElementById("Rout_Div").innerHTML.indexOf("run simulations");
			
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/Error/g, "<span style=\"color:red\">Error</span>");
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/\n/g, "<br/>");
			

			
			if(where == -1){
				alert("Simulation Finished successfully!");

			} else if(where3 > (-1)){
				alert("This account has no permission to run simulations in R!")
			} else if(where2> (-1)){
				alert("Limited of cores exceeded! Adapt parallel computing settings!")
			} else{
				alert("Your Simulation failed! Check your inputs and potential warnings!");
			}
			data_Vue.runned = true;
			

			writeSum();
		},
		error: function(obj, msg, err) 
		{
			alert("Simulation failed!");
			alert(err);
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			document.getElementById("runningDogLog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

function ReloadSim(){
	var filename = data_Vue.geninfo["Project Name"];
	//var cohorts = data_Vue.plottingPar.ResgMean_cohorts;
	
	$.ajax
	({
		type: "POST",
		url: './RsimResult',
		data: {
			filename : filename,
			script: "ReloadSim"
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Getting Old Results...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			data_Vue.runned = true;
			console.log(data);
			document.getElementById("Rout_Div").innerHTML = data;
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/Error/g, "<span style=\"color:red\">Error</span>");
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/\n/g, "<br/>");
			writeSum();
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

$(document).ready(function(){
    $("#ResultUpload").on('change',function(){
        UploadSim();
    });
});

function UploadSim(){
	var filename = document.getElementById('ResultFile').files[0].name
	//var cohorts = data_Vue.plottingPar.ResgMean_cohorts;
	//console.log(filename);
	data_Vue.geninfo['Project Name'] = filename;
	
	$.ajax
	({
		type: "POST",
		url: './RsimResult',
		data: {
			filename : filename,
			script: "ReloadSim"
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Getting Old Results...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			data_Vue.runned = true;
			//console.log(data);
			document.getElementById("Rout_Div").innerHTML = data;
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/Error/g, "<span style=\"color:red\">Error</span>");
			document.getElementById("Rout_Div").innerHTML = document.getElementById("Rout_Div").innerHTML.replace(/\n/g, "<br/>");
			writeSum();
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

function stopR(){
	var r = confirm("The R process will be stopped and data in R will be lost. Do you want to proceed?");
	if(r){
		$.ajax
		({
			type: "POST",
			url: './StopR',
			success: function (msg) {
				document.getElementById("runningDog").style.visibility = 'hidden';
				document.getElementById("runningDogLog").innerHTML = '';
			},
			error: function(obj, msg, err) 
			{
				alert(err);
			},
			dataType: "text",
		});
	}
}

function writeSum(){
	var file =  data_Vue['geninfo']['Project Name'] + 'Summary';
	
	$.ajax
	({
		type: "POST",
		url: './JSON',
		data: {file : file},
		success: function (data, msg) {
			//console.log(data);
			data_Vue.plottingData.Summary = JSON.parse(data);
			data = data_Vue.plottingData.Summary;
			data_Vue.Summary = Object.keys(data_Vue.plottingData.Summary).map(function(x){return({id: x, label: x+" ("+(data_Vue.plottingData.Summary[x].trep -1)+" Repeats)"})});
			var el = document.getElementById("Result_Summary");
			el.innerHTML = "==> " + "Project <b>" + data_Vue.geninfo["Project Name"]+ "</b> successfully processed in R." + "<br/>";
			el.innerHTML += "<br/><b>Founders: </b>" + "<br/>";
			for(let key in data){
				console.log(key);
				if(data[key].tfounder[0]){
					el.innerHTML += "==> Cohort <b>" + key + "</b> with " + (data[key].trep[0] - 1) + " repetitions.<br/>";
				}
			}
			el.innerHTML += "<br/><b>Non-founders: </b>" + "<br/>";
			for(let key in data){
				if(!data[key].tfounder[0]){
					el.innerHTML += "==> Cohort <b>" + key + "</b> with " + (data[key].trep[0] - 1) + " repetitions.<br/>";
				}
			}
			
		},
		error: function(obj, msg, err) 
		{
			alert(err);
		},
		dataType: "text",
	});
}

//*************************************************************************************************//
//*********** Functions for plotting results after R Simulation ***********************************//
// ---- Plotting observed Phenotypes Mean:
function plottingResultpMean(){
	var data = data_Vue.plottingData.RespMean;
	var coh = data_Vue.plottingPar.RespMean_cohorts;
	var pType = data_Vue.plottingPar.RespMean_pType;
	
	var data1 = [];
	for(let i=0; i< data_Vue.traitsinfo.length; i++){
		data1.push([]);
	}
	
	if(pType=="By Repeats"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each trait:
			for(let j=0; j< data_Vue.traitsinfo.length; j++){
				data1[j].push({
					y : Object.values(data[coh[i]]).map(function(x){return(math.mean(x.tval[j]))}),
					x : Object.keys(data[coh[i]]),
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Repeats';
	}
	if(pType=="By Cohorts"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			var red = ((Math.floor(i/3)+1)*85)%255;
			var green = ((Math.floor(i/6)+1)*85)%255;
			var blue = ((i+1)*85)%255;
			// each rep:
			var ttimes = Object.keys(data[coh[i]]);
			for(let k=0; k < ttimes.length; k++){
				// eacht trait
				for(let j=0; j< data_Vue.traitsinfo.length; j++){
					data1[j].push({
						y : data[coh[i]][ttimes[k]].tval[j],
						name : coh[i]+'_'+ttimes[k],
						marker : {color: "rgb("+red+","+green+","+blue+")"},
						type: 'box',
						boxpoints : 'Outliers',
						boxmean : true
					});	
				}
			}			
		}
		var xtitle = 'Cohorts (trailing numbers denote repeated cohorts)';
	}
	if(pType=="By Time"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each trait:
			for(let j=0; j< data_Vue.traitsinfo.length; j++){
				data1[j].push({
					y : Object.values(data[coh[i]]).map(function(x){return(math.mean(x.tval[j]))}),
					x : Object.values(data[coh[i]]).map(function(x){return(math.mean(x.ttime[0]))}),
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Time in '+data_Vue.geninfo['Time Unit'];
	}
		
	//console.log(data);
	var titles = data_Vue.traitsinfo.map(function(x){return(x['Trait Name'])});
	for(let i=0; i < data_Vue.traitsinfo.length; i++){
		var layout = {
			title : titles[i],
			showlegend: pType != 'By Cohorts',
			plot_bgcolor: '#FFFFFF',
			xaxis: {
				title: xtitle,
				zeroline: false,
				automargin: true
			},
			};
		var config = {
			scrollZoom: true,
			toImageButtonOptions: {
				format: 'png', // one of png, svg, jpeg, webp
				filename: 'custom_image',
				height: 750,
				width: 1500,
				scale: 0.8 // Multiply title/legend/axis/canvas sizes by this factor
			}
		};
		Plotly.newPlot('RespMean_Div'+(i+1), data1[i], layout, config);
	}
}

function RunResultpMean(){
	var filename = data_Vue.geninfo["Project Name"];
	//var cohorts = data_Vue.plottingPar.ResgMean_cohorts;
	
	$.ajax
	({
		type: "POST",
		url: './RsimResult',
		data: {
			filename : filename,
			script: "pMean"
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Calculating Results for observed Phenotypes...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plottingData.RespMean = JSON.parse(data);
				//plottingResultgMean(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first! here");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

function RunDataPreparation(){
	
	var auser = data_Vue.user
	var filename = data_Vue.geninfo["Project Name"];
	var dtype = data_Vue.plottingPar.download1;
	var cohort = data_Vue.plottingPar.download2.id;
	if(data_Vue.plottingPar.download3 == undefined){
		var nrepeat = 0;
	} else{
		var nrepeat = data_Vue.plottingPar.download3;
	};

	$.ajax
	({
		type: "POST",
		url: './RsimDownload',
		data: {
			auser: auser,
			filename : filename,
			dtype: dtype,
			cohort: cohort,
			nrepeat: nrepeat
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Preparing file for download...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
		},
		failure: function(msg) 
		{
			alert("Data preparation failed! Check if your input makes sense!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

// ---- Plotting genotypic Mean:
function plottingResultgMean(){
	var data = data_Vue.plottingData.ResgMean;
	var coh = data_Vue.plottingPar.ResgMean_cohorts;
	var pType = data_Vue.plottingPar.ResgMean_pType;
	
	var data1 = [];
	for(let i=0; i< data_Vue.traitsinfo.length; i++){
		data1.push([]);
	}
	
	if(pType=="By Repeats"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each trait:
			for(let j=0; j< data_Vue.traitsinfo.length; j++){
				data1[j].push({
					y : Object.values(data[coh[i]]).map(function(x){return(math.mean(x.tval[j]))}),
					x : Object.keys(data[coh[i]]),
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Repeats';
	}
	if(pType=="By Cohorts"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			var red = ((Math.floor(i/3)+1)*85)%255;
			var green = ((Math.floor(i/6)+1)*85)%255;
			var blue = ((i+1)*85)%255;
			// each rep:
			var ttimes = Object.keys(data[coh[i]]);
			for(let k=0; k < ttimes.length; k++){
				// eacht trait
				for(let j=0; j< data_Vue.traitsinfo.length; j++){
					data1[j].push({
						y : data[coh[i]][ttimes[k]].tval[j],
						name : coh[i]+'_'+ttimes[k],
						marker : {color: "rgb("+red+","+green+","+blue+")"},
						type: 'box',
						boxpoints : 'Outliers',
						boxmean : true
					});	
				}
			}			
		}
		var xtitle = 'Cohorts (trailing numbers denote repeated cohorts)';
	}
	if(pType=="By Time"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each trait:
			for(let j=0; j< data_Vue.traitsinfo.length; j++){
				data1[j].push({
					y : Object.values(data[coh[i]]).map(function(x){return(math.mean(x.tval[j]))}),
					x : Object.values(data[coh[i]]).map(function(x){return(math.mean(x.ttime[0]))}),
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Time in '+data_Vue.geninfo['Time Unit'];
	}
		
	var titles = data_Vue.traitsinfo.map(function(x){return(x['Trait Name'])});
	for(let i=0; i < data_Vue.traitsinfo.length; i++){
		var layout = {
			title : titles[i],
			showlegend: pType != 'By Cohorts',
			plot_bgcolor: '#FFFFFF',
			xaxis: {
				title: xtitle,
				zeroline: false,
				automargin: true
			},
			};
		var config = {
			scrollZoom: true,
			toImageButtonOptions: {
				format: 'png', // one of png, svg, jpeg, webp
				filename: 'custom_image',
				height: 750,
				width: 1500,
				scale: 0.8 // Multiply title/legend/axis/canvas sizes by this factor
			}
		};
		Plotly.newPlot('ResgMean_Div'+(i+1), data1[i], layout, config);
	}
}

function RunResultgMean(){
	var filename = data_Vue.geninfo["Project Name"];
	//var cohorts = data_Vue.plottingPar.ResgMean_cohorts;
	
	$.ajax
	({
		type: "POST",
		url: './RsimResult',
		data: {
			filename : filename,
			script: "gMean"
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Calculating Results for genomic breeding values...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plottingData.ResgMean = JSON.parse(data);
				//plottingResultgMean(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}


// ---- Plotting Relationship:
function plottingResultRel(){
	var data = data_Vue.plottingData.ResRel;
	var coh = data_Vue.plottingPar.ResRel_cohorts;
	var pType = data_Vue.plottingPar.ResRel_pType;
	var data1 = [[],[]];// Relationship and Inbreeding

	if(pType=="By Repeats"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each value:
			for(let j=0; j< data1.length; j++){
				data1[j].push({
					y : data[coh[i]][3+j],
					x : data[coh[i]][1],
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Repeats';
	}
	if(pType=="By Cohorts"){
		var data1 = [[{}],[{}]];// Relationship and Inbreeding
		// each cohort
		for(let j=0; j< data1.length; j++){
			data1[j][0].y = [];
			data1[j][0].x = [];
			data1[j][0].type = "bar";
			for(let i=0; i < coh.length; i++){
				var red = ((Math.floor(i/3)+1)*85)%255;
				var green = ((Math.floor(i/6)+1)*85)%255;
				var blue = ((i+1)*85)%255;
				// each value
				var ttimes = data[coh[i]][1];
				for(let k=0; k< ttimes.length; k++){
					data1[j][0].y.push(Number(data[coh[i]][3+j][k]));
					data1[j][0].x.push(coh[i] +'_'+ ttimes[k]);
				}
							
			}
		}
		//console.log(data1);
		var xtitle = 'Cohorts (trailing numbers denote repeated cohorts)';
	}
	if(pType=="By Time"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each value:
			for(let j=0; j< data1.length; j++){
				data1[j].push({
					y : data[coh[i]][3+j],
					x : data[coh[i]][2],
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Time in '+data_Vue.geninfo['Time Unit'];
	}
		
	var titles = ["Average Relationship within Cohorts", "Average Inbreeding within Cohorts"];
	for(let i=0; i < data1.length; i++){
		var layout = {
			title : titles[i],
			showlegend: pType != 'By Cohorts',
			plot_bgcolor: '#FFFFFF',
			xaxis: {
				title: xtitle,
				zeroline: false,
				automargin: true
			},
			};
		var config = {
			scrollZoom: true,
			toImageButtonOptions: {
				format: 'png', // one of png, svg, jpeg, webp
				filename: 'custom_image',
				height: 750,
				width: 1500,
				scale: 0.8 // Multiply title/legend/axis/canvas sizes by this factor
			}
		};
		Plotly.newPlot('ResRel_Div'+(i+1), data1[i], layout, config);
	}
}

function RunResultRel(){
	var filename = data_Vue.geninfo["Project Name"];
	//var cohorts = data_Vue.plottingPar.ResgMean_cohorts;
	
	$.ajax
	({
		type: "POST",
		url: './RsimResult',
		data: {
			filename : filename,
			script: "Rel"
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Calculating Results for Relationship within Cohorts...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plottingData.ResRel = JSON.parse(data);
				//plottingResultgMean(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

// ---- Plotting Relationship between Cohorts:
function plottingResultRelbetweenC(){
	var data = data_Vue.plottingData.ResRelbetweenC;
	var coh1 = data_Vue.plottingPar.ResRelbetweenC_cohort1;
	var coh2 = data_Vue.plottingPar.ResRelbetweenC_cohort2;
	
	// average relationship between cohorts:
	var data1 = [{
		y: data[coh1] ? data[coh1][coh2] : data[coh2][coh1],
		mode : 'scatter',
	}];
	if(data1[0].y == undefined){
		data1[0].y = data[coh2][coh1];
	}
	data1[0].x = data1[0].y.map(function(x, index){return(index)});
	var layout = {
		title : 'Relationship between '+ coh1 +' and '+coh2,
		showlegend: false,
		plot_bgcolor: '#FFFFFF',
		xaxis: {
			title: 'Repeats',
			zeroline: false,
			automargin: true
		},
		};
	var config = {
		scrollZoom: true,
		toImageButtonOptions: {
			format: 'png', // one of png, svg, jpeg, webp
			filename: 'custom_image',
			height: 750,
			width: 1500,
			scale: 0.8 // Multiply title/legend/axis/canvas sizes by this factor
		}
	};
	Plotly.newPlot('ResRelbetweenC_Div1', data1, layout, config);
}

function RunResultRelbetweenC(){
	var filename = data_Vue.geninfo["Project Name"];
	//var cohorts = data_Vue.plottingPar.ResgMean_cohorts;
	
	$.ajax
	({
		type: "POST",
		url: './RsimResult',
		data: {
			filename : filename,
			script: "RelbetweenC"
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Calculating Results for Relationship between Cohorts...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plottingData.ResRelbetweenC = JSON.parse(data);
				//plottingResultgMean(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

// ---- Plotting QTL:
function plottingResultQTL(){
	var data1 = [[],[],[]];
	var trait = data_Vue.plottingPar.ResQTL_trait-1;
	var qtl = data_Vue.plottingPar.ResQTL_qtl;
	var coh = data_Vue.plottingPar.ResQTL_cohorts;
	
	var data = data_Vue.plottingData.ResQTL[data_Vue.traitsinfo[trait]['Trait Name']][qtl];
	
	for(let i=0; i < coh.length; i++){
		// allele frequency:
		data1[0].push({
			y : data[coh[i]][2],
			x : data[coh[i]][1],
			mode : 'scatter',
			name : coh[i]
		});	
		// observed He:
		data1[1].push({
			y : data[coh[i]][3],
			x : data[coh[i]][1],
			mode : 'scatter',
			name : coh[i]
		});	
		// expected He:
		data1[2].push({
			y : data[coh[i]][4],
			x : data[coh[i]][1],
			mode : 'scatter',
			name : coh[i]
		});			
	}
		
	var titles = ["Allele Frequency (A)", "Observed Heterozygosity", "Expected Heterozygosity"];
	for(let i=0; i < 3; i++){
		var layout = {
			title : titles[i],
			showlegend: true,
			plot_bgcolor: '#FFFFFF',
			xaxis: {
				title: 'Repeats',
				zeroline: false,
				automargin: true
			},
			};
		var config = {
			scrollZoom: true,
			toImageButtonOptions: {
				format: 'png', // one of png, svg, jpeg, webp
				filename: 'custom_image',
				height: 750,
				width: 1500,
				scale: 0.8 // Multiply title/legend/axis/canvas sizes by this factor
			}
		};
		Plotly.newPlot('ResQTL_Div'+(i+1), data1[i], layout, config);
	}
}

function RunResultQTL(){
	var filename = data_Vue.geninfo["Project Name"];
	var qtl = 0;
	for(let i=0; i< data_Vue.traitsinfo.length; i++){
		qtl += data_Vue.traitsinfo[i]["Trait Major QTL"];
	}
	if(qtl == 0){
		alert("There is no QTL to calculate results for.");
		return;
	}
	
	$.ajax
	({
		type: "POST",
		url: './RsimQTL',
		data: {
			filename : filename,
			traitsinfo : data_Vue.traitsinfo
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Calculating Results for QTLs';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plottingData.ResQTL = JSON.parse(data);
				//plottingResultQTL(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

// ---- Plotting Accuracy of Breeding Value Estimation:
function plottingResultAccBVE(){
	var data = data_Vue.plottingData.ResAccBVE;
	var coh = data_Vue.plottingPar.ResAccBVE_cohorts;
	var pType = data_Vue.plottingPar.ResAccBVE_pType;
	var sindex = data_Vue.selection_index;
	var data1 = [];
	for(let i=0;i < sindex.length; i++){
		data1.push([]);
	} 

	if(pType=="By Repeats"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each value:
			for(let j=0; j< data1.length; j++){
				data1[j].push({
					y : Object.values(data[coh[i]]).map(function(x){return(Number(x.tval[j]))}),
					x : Object.keys(data[coh[i]]),
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Repeats';
	}
	if(pType=="By Cohorts"){
		var data1 = [];
		for(let i=0;i < sindex.length; i++){
			data1.push([{}]);
		} // Relationship and Inbreeding
		// each cohort
		for(let j=0; j< data1.length; j++){
			data1[j][0].y = [];
			data1[j][0].x = [];
			data1[j][0].type = "bar";
			for(let i=0; i < coh.length; i++){
				// each value
				var ttimes = Object.keys(data[coh[i]]);
				for(let k=0; k< ttimes.length; k++){
					data1[j][0].y.push(Number(Object.values(data[coh[i]])[k].tval[j]));
					data1[j][0].x.push(coh[i] + "_"+ ttimes[k]);
				}
							
			}
		}
		//console.log(data1);
		var xtitle = 'Cohorts (trailing numbers denote repeated cohorts)';
	}
	if(pType=="By Time"){
		// each cohort
		for(let i=0; i < coh.length; i++){
			// each value:
			for(let j=0; j< data1.length; j++){
				data1[j].push({
					y : Object.values(data[coh[i]]).map(function(x){return(Number(x.tval[j]))}),
					x : Object.values(data[coh[i]]).map(function(x){return(x.ttime[0])}),
					mode : 'scatter',
					name : coh[i]
				});	
			}		
		}
		var xtitle = 'Time in '+data_Vue.geninfo['Time Unit'];
	}
		
	var titles = sindex.map(function(x){return(x['Name'])});
	for(let i=0; i < data1.length; i++){
		var layout = {
			title : titles[i],
			showlegend: pType != 'By Cohorts',
			plot_bgcolor: '#FFFFFF',
			xaxis: {
				title: xtitle,
				zeroline: false,
				automargin: true
			},
			yaxis: {
				title: "Correlation of True BV and EBV/Phenotype",
				zeroline: false,
				automargin: true
			},
			};
		var config = {
			scrollZoom: true,
			toImageButtonOptions: {
				format: 'png', // one of png, svg, jpeg, webp
				filename: 'custom_image',
				height: 750,
				width: 1500,
				scale: 0.8 // Multiply title/legend/axis/canvas sizes by this factor
			}
		};
		Plotly.newPlot('ResAccBVE_Div'+(i+1), data1[i], layout, config);
	}
}


function RunResultAccBVE(){
	var filename = data_Vue.geninfo["Project Name"];
	
	$.ajax
	({
		type: "POST",
		url: './RsimAccBVE',
		data: {
			filename : filename,
			sindex : sindex
			},
		beforeSend: function() {
			document.getElementById("runningDogTitle").innerHTML = 'Calculating Results for Accuracy of Breeding Value Estimations...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plottingData.ResAccBVE = JSON.parse(data);
				data_Vue.Summary_AccBVE = data_Vue.Summary.filter(function(x){
					return(data_Vue.plottingData.ResAccBVE[x.id][0].tval != "NA");
				});
				//plottingResultQTL(JSON.parse(data));
			}else{
				alert("Failed to plot KS. Please run the Simulation first!");
			}
		},
		failure: function(msg) 
		{
			alert("Failed to plot KS. Please run the Simulation first!");
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			//document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}


function clearResult(){
	document.getElementById("Rout_Div").innerHTML = '';
	document.getElementById("Result_Summary").innerHTML = '';
	data_Vue.plottingData = new myPlottingData();
	for(let i=0; i< data_Vue.traitsinfo.length; i++){
		Plotly.purge('ResgMean_Div'+(i+1));
	}
	for(let i=0; i< data_Vue.traitsinfo.length; i++){
		Plotly.purge('RespMean_Div'+(i+1));
	}
	for(let i=0; i< data_Vue.selection_index.length; i++){
		Plotly.purge('ResAccBVE_Div'+(i+1));
	}
	for(let i=0; i< 2; i++){
		Plotly.purge('ResRel_Div'+(i+1));
	}
	for(let i=0; i< 1; i++){
		Plotly.purge('ResRelbetweenC_Div'+(i+1));
	}
	for(let i=0; i< 3; i++){
		Plotly.purge('ResQTL_Div'+(i+1));
	}
	data_Vue.runned=false;
}



var A = [[1,0,0],[0,1,0], [0,0,1]];
//console.log(numeric.eig(A).lambda.x);


