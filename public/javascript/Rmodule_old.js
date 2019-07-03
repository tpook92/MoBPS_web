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
	data_Vue.plottingData = new myPlottingData();
	var jsondata = JSON.stringify(exportNetwork());
	//console.log(jsondata);
	alert("Approx. simulation running time: " + Math.round(checkRunTime()/60*2.6*100)/100 + "minutes.");
	
	$.ajax
	({
		type: "POST",
		url: './Rsim',
		data: {jsondata : jsondata},
		beforeSend: function() {
			document.getElementById("runningDog").innerHTML = 'MoBPS is running .... please wait';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			//console.log(data);
			alert("Simulation Finished!");
			data_Vue.runned = true;
			document.getElementById("Rout_Div").innerHTML = data;
			writeSum();
		},
		error: function(obj, msg, err) 
		{
			alert(err);
		},
		complete: function(obj, msg){
			document.getElementById("runningDog").style.visibility = 'hidden';
			document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

function writeSum(){
	var file =  data_Vue['geninfo']['Project Name'] + 'Summary'
	
	$.ajax
	({
		type: "POST",
		url: './JSON',
		data: {file : file},
		success: function (data, msg) {
			//console.log(data);
			data_Vue.plottingData.Summary = JSON.parse(data);
			data = data_Vue.plottingData.Summary;
			var el = document.getElementById("Result_Summary");
			el.innerHTML = "==> " + "Project <b>" + data_Vue.geninfo["Project Name"]+ "</b> successfully processed in R." + "<br/>";
			el.innerHTML += "<br/><b>Founders: </b>" + "<br/>";
			for(let i =0; i <Object.keys(data).length; i++){
				if(Object.values(data)[i].tfounder[0]){
					el.innerHTML += "==> Cohort <b>" + Object.keys(data)[i] + "</b> with " + (Object.values(data)[i].trep[0] - 1) + " repetitions.<br/>";
				}
			}
			el.innerHTML += "<br/><b>Non-founders: </b>" + "<br/>";
			for(let i =0; i <Object.keys(data).length; i++){
				if(!Object.values(data)[i].tfounder[0]){
					el.innerHTML += "==> Cohort <b>" + Object.keys(data)[i] + "</b> with " + (Object.values(data)[i].trep[0] - 1) + " repetitions.<br/>";
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
function boxdata(y, name){
	this.y = y;
	this.name = name;
	this.marker = {color: 'rgba(79, 90, 117, 0.5)'};
	this.type = 'box';
	this.boxpoints = 'Outliers';
	this.boxmean = true;
}

// BVE
function plottingBVE(flag){
	var file =  data_Vue['geninfo']['Project Name'] + 'BV';
	
	$.ajax
	({
		type: "POST",
		url: './JSON',
		data: {file : file},
		success: function (data, msg) {
			//console.log(data);
			if(data != ''){
				var plottype = document.getElementById("plottingType").value;
				if(plottype == "By Cohorts"){
					plottingBVE_cohorts(JSON.parse(data).val, flag);
				}
				if(plottype == "By Time"){
					plottingBVE_time(JSON.parse(data), flag);
				}
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

function plottingBVE_time(data, flag){
	
	var traces = [];
	var keys = Object.keys(data.val);
	
	if(flag =="newWin"){
		var newW = window.open('about:blank', 'popoutWindow', '');
		newW.document.write("<!DOCTYPE html><html><head></head><body>");
		for(let j=0; j <data_Vue.traitsinfo.length; j++){
			newW.document.write("<div id='"+j+"' style='width:100%;'></div>");
		}
		newW.document.write("</body></html>");
	}
	
	// color:
	var colors = {};
	for(let i=0; i < keys.length; i++){
		if(colors[data.ttnames[i]] == undefined){
			console.log(data.ttnames[i]);
			var red = ((Math.floor(i/3)+1)*85)%255;
			var green = ((Math.floor(i/6)+1)*85)%255;
			var blue = ((i+1)*85)%255;
			colors[data.ttnames[i]] = {color: "rgb("+red+","+green+","+blue+")"};
		}
	}
	
	console.log(data);
	for(let j=0; j <data_Vue.traitsinfo.length; j++){
		traces[j] = {};
		for(let i=0; i < keys.length; i++){
			if(traces[j][data.ttnames[i]]){
				//console.log("hier" + i+j);
				traces[j][data.ttnames[i]].y = traces[j][data.ttnames[i]].y.concat(data.val[keys[i]][j]);
				traces[j][data.ttnames[i]].x = traces[j][data.ttnames[i]].x.concat(new Array(data.val[keys[i]][j].length).fill(data.tt[i]));				
			}else{
				//console.log("hier else" + i+j);
				traces[j][data.ttnames[i]] = new boxdata(data.val[keys[i]][j], data.ttnames[i] );
				traces[j][data.ttnames[i]].x = new Array(traces[j][data.ttnames[i]].y.length).fill(data.tt[i]);
				traces[j][data.ttnames[i]].marker = colors[data.ttnames[i]];
			}
		}
		//console.log(traces[j]);
		//var data1 = traces;
		var layout = {
			title : 'BVE Development of ' + data_Vue.traitsinfo[j]['Trait Name'],
			showlegend: true,
			plot_bgcolor: '#FFFFFF',
			boxmode: 'group',
			xaxis: {
				title: 'Time in '+data_Vue.geninfo["Time Unit"],
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
		if(flag == "newWin"){
			Plotly.newPlot(newW.document.getElementById(j), Object.values(traces[j]), layout, config);
		}else{
			Plotly.newPlot(data_Vue.traitsinfo[j]['Trait Name']+flag, Object.values(traces[j]), layout, config);
		}

	}
}


function plottingBVE_cohorts(data, flag){
	
	var traces = [];
	var keys = Object.keys(data);
	
	if(flag =="newWin"){
		var newW = window.open('about:blank', 'popoutWindow', '');
		newW.document.write("<!DOCTYPE html><html><head></head><body>");
		for(let j=0; j <data_Vue.traitsinfo.length; j++){
			newW.document.write("<div id='"+j+"' style='width:100%;'></div>");
		}
		newW.document.write("</body></html>");
	}
	
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
			xaxis: {
				title: 'Cohorts (trailing numbers denote repeated cohorts)',
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
		if(flag == "newWin"){
			Plotly.newPlot(newW.document.getElementById(j), traces[j], layout, config);
		}else{
			Plotly.newPlot(data_Vue.traitsinfo[j]['Trait Name']+flag, traces[j], layout, config);
		}

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
		xaxis: {
			title: 'Cohorts (trailing numbers denote repeated cohorts)',
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
	Plotly.newPlot('KS_Div', data1, layout, config);
}

// ---- Plotting QTL:
function plottingResultQTL(data){
	var data1 = [[],[],[]];
	var coh = Object.keys(data);
	
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
	var trait = data_Vue.plottingPar.ResQTL_trait;
	var qtl = data_Vue.plottingPar.ResQTL_qtl;
	var poli = 0;
	for(let i=1; i<= trait; i++){
		poli = poli + Number(data_Vue.traitsinfo[i-1]["Trait Number of Polygenic Loci"]);
	}
	var cohorts = data_Vue.plottingPar.ResQTL_cohorts;
	
	if(data_Vue.traitsinfo[trait-1]["Trait QTL Info"][qtl-1] == undefined){
		alert("Please choose a trait and QTL for plotting.")
		return;
	}
	
	$.ajax
	({
		type: "POST",
		url: './RsimQTL',
		data: {
			filename : filename,
			trait : trait,
			poli: poli,
			qtl: qtl,
			cohorts: cohorts
			},
		beforeSend: function() {
			document.getElementById("runningDog").innerHTML = 'Calculating Results for QTL';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plotttingData.ResQTL = JSON.parse(data);
				plottingResultQTL(JSON.parse(data));
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
			document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}

// ---- Plotting Relationship:
function plottingResultRel(data){
	var data1 = [[],[]];
	var coh = Object.keys(data);
	
	for(let i=0; i < coh.length; i++){
		// relationship within:
		data1[0].push({
			y : data[coh[i]][2],
			x : data[coh[i]][1],
			mode : 'scatter',
			name : coh[i]
		});	
		// inbreeding:
		data1[1].push({
			y : data[coh[i]][3],
			x : data[coh[i]][1],
			mode : 'scatter',
			name : coh[i]
		});		
	}
		
	var titles = ["Relationship within Cohorts", "Inbreeding Rate"];
	for(let i=0; i < 2; i++){
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
		Plotly.newPlot('ResRel_Div'+(i+1), data1[i], layout, config);
	}
}

function RunResultRel(){
	var filename = data_Vue.geninfo["Project Name"];
	var cohorts = data_Vue.plottingPar.ResRel_cohorts;
	
	if(cohorts.length == 0){
		alert("Please choose at least one cohort for plotting Relationship.")
		return;
	}
	
	$.ajax
	({
		type: "POST",
		url: './RsimRel',
		data: {
			filename : filename,
			cohorts: cohorts
			},
		beforeSend: function() {
			document.getElementById("runningDog").innerHTML = 'Calculating Results for Relationship within Cohorts';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				//console.log(data);
				data_Vue.plotttingData.ResRel = JSON.parse(data);
				plottingResultRel(JSON.parse(data));
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
			document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}


// ---- Plotting Relationship between Cohorts:
function plottingResultRelbetweenC(data){
	
	// average relationship between cohorts with heatmap:

	var data1 = [{
		y: data[0],
		x: data[1],
		z: data[2],
		type: 'heatmap'
	}];
	var layout = {
		title : 'Relationship between cohorts',
		showlegend: true,
		plot_bgcolor: '#FFFFFF',
		xaxis: {
			title: 'Cohorts (trailing numbers denote repeated cohorts)',
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
	var cohorts = data_Vue.plottingPar.ResRelbetweenC_cohorts;
	
	if(cohorts.length < 2){
		alert("Please choose at least two cohorts for plotting Relationship between them.")
		return;
	}
	
	$.ajax
	({
		type: "POST",
		url: './RsimRelbetweenC',
		data: {
			filename : filename,
			cohorts: cohorts
			},
		beforeSend: function() {
			document.getElementById("runningDog").innerHTML = 'Calculating Results for Relationship between Cohorts';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				data_Vue.plotttingData.ResRelbetweenC = JSON.parse(data);
				plottingResultRelbetweenC(JSON.parse(data));
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
			document.getElementById("runningDog").innerHTML = '';
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
			// each rep:
			var ttimes = Object.keys(data[coh[i]]);
			for(let k=0; k < ttimes.length; k++){
				// eacht trait
				for(let j=0; j< data_Vue.traitsinfo.length; j++){
					data1[j].push({
						y : data[coh[i]][ttimes[k]].tval[j],
						name : coh[i]+'_'+ttimes[k],
						marker : {color: 'rgba(79, 90, 117, 0.5)'},
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
			document.getElementById("runningDog").innerHTML = 'Calculating Results for genomic breeding values...';
			document.getElementById("runningDog").style.visibility = 'visible';
			//alert("Now Sending!");
		},
		success: function (data, msg) {
			if(data != ''){
				console.log(data);
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
			document.getElementById("runningDog").innerHTML = '';
			//alert(msg);
			//console.log(obj);
		},
		dataType: "text",
	});
}


function clearResult(){
	document.getElementById("Rout_Div").innerHTML = '';
	data_Vue.plottingData = new myPlottingData();
	data_Vue.runned=false;
}



var A = [[1,0,0],[0,1,0], [0,0,1]];
//console.log(numeric.eig(A).lambda.x);


