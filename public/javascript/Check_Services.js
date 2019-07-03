// this function will always be called when the body is focused on,
// it will check all possibly inconsistencies if anything of the following components are changed:
function checkEverything(id){


	data_Vue.project_saved = false;
}
	
	
function isNumeric(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}

function isPositiveInteger(val) {
	var isNumber = Math.floor(Number(val));
	var thisNumber = (String(isNumber) == val && isNumber >= 0);
	return thisNumber;
}


function isPositiveInt(val) {
    return val >>> 0 === parseFloat(val);
}


function qtlsforPheno(qtlName, qtlCnt) {
	var thisQTL = data_Vue.traitsinfo[qtlName]["Trait QTL Info"];
	for (i=0; i<qtlCnt; i++) {		
	
		gen_warn_text = "bp"+(i+1)+" : "+"Please enter bp and must be a Positive Integer .";	
		checkBP = isPositiveInt(thisQTL[i]['QTL BP']);
		if ((!thisQTL[i]['QTL BP'] || thisQTL[i]['QTL BP'] < 0 || checkBP == false )& data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((thisQTL[i]['QTL BP'] != "" & thisQTL[i]['QTL BP'] >= 0 & checkBP == true) & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                    
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}		

		gen_warn_text = "chromo"+(i+1)+" : "+"Please enter chromosomes and must be a Positive Integer.";
		checkchromo = isPositiveInt(thisQTL[i]['QTL Chromosome']);
		if ((!thisQTL[i]['QTL Chromosome'] || thisQTL[i]['QTL Chromosome'] < 0 || checkchromo == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((thisQTL[i]['QTL Chromosome'] != "" & thisQTL[i]['QTL Chromosome'] >= 0 & checkchromo ==true) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}
		
		checkAANumeric = isNumeric(thisQTL[i]['QTL Effect AA']);		
		gen_warn_text = "EffectAA"+(i+1)+" : "+"Please enter Effect AA and must be a number.";
		if (((!thisQTL[i]['QTL Effect AA'] & thisQTL[i]['QTL Effect AA'] != 0 )|| checkAANumeric == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if (thisQTL[i]['QTL Effect AA'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                       
			 data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}		

		checkAANumeric = isNumeric(thisQTL[i]['QTL Effect AB']);		
		gen_warn_text = "EffectAB"+(i+1)+" : "+"Please enter Effect AB and must be a number.";
		if (((!thisQTL[i]['QTL Effect AB']  & thisQTL[i]['QTL Effect AB'] != 0 ) ||  checkAANumeric == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((thisQTL[i]['QTL Effect AB'] != "" ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                       
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}

		checkAANumeric = isNumeric(thisQTL[i]['QTL Effect BB']);		
		gen_warn_text = "EffectBB"+(i+1)+" : "+"Please enter Effect BB and must be a number.";
		if (((!thisQTL[i]['QTL Effect BB']  & thisQTL[i]['QTL Effect BB'] != 0 ) ||  checkAANumeric == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((thisQTL[i]['QTL Effect BB'] != "" ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                       
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}	
		
	}
}

function matrix1() {
		var traitsCnt = data_Vue.traitsinfo.length;
		for(let i=0; i < traitsCnt; i++){			
			for(let j=0; j < data_Vue.matrix[i].row.length; j++){
				curMatVal = data_Vue.matrix[i].row[j].val;	
				gen_warn_text = i+":"+j+"Please enter Phenotypic Correlation and must be a number between -1 and 1 ";
				if ((curMatVal == null || curMatVal <-1 || curMatVal > 1) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((curMatVal != null & curMatVal >=-1 & curMatVal <=1) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
				}
			}			
		}			
	}	

  
 function matrix2() {
		var traitsCnt = data_Vue.traitsinfo.length;
		for(let i=0; i < traitsCnt; i++){			
			for(let j=0; j < data_Vue.matrix2[i].row.length; j++){
				curMatVal = data_Vue.matrix2[i].row[j].val;	
				gen_warn_text = i+":"+j+"Please enter Genetic Correlation and must be a number between -1 and 1 ";
				if ((curMatVal == null || curMatVal <-1 || curMatVal > 1) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((curMatVal != null & curMatVal >=-1 & curMatVal <=1) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
				}
			}			
		}			
	}	

	  
	function selection_Index() {

	var traitsCnt = data_Vue.traitsinfo.length;
	var siCnt = data_Vue.selection_index.length
	
	if (siCnt > 0) {
	for(let i=0; i<siCnt; i++){

		for(let j=0; j < traitsCnt; j++)
		{
			constP = 'P'+(j+1);			
			pVar =	data_Vue.selection_index[i][constP];
			pName = data_Vue.selection_index[i]['Name'];
			gen_warn_text = pName+"P"+(j+1)+": Please enter selection index and it must be a number.";

			if (!pVar & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
				data_Vue.warnings.push(gen_warn_text);
			}
			else if (pVar != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
				console.log('pVar'+pVar + 'i' + i +'j' +j);
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}
		}
	}	
	}
	}
	
	function phenotyping_classes() {

	var traitsCnt = data_Vue.traitsinfo.length;
	var piCnt = data_Vue.phenotyping_class.length
	
	if (piCnt > 0) {
	for(let i=0; i<piCnt; i++){

		for(let j=0; j < traitsCnt; j++)
		{
			pVar =	data_Vue.phenotyping_class[i]['P'+(j+1)];
			pName = data_Vue.phenotyping_class[i]['Name'];
			pCost =	data_Vue.phenotyping_class[i]["Cost of phenotyping"];

				gen_warn_text = "Cost_of_P"+i+": Please enter cost of phenotyping and it must be a number.";
				if ((pCost == null || pCost <0 )  & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((pCost != null & pCost >= 0) & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
				}
				
				gen_warn_text = pName+": P"+(j+1)+": Please enter phenotyping classes and it must be a number.";
				if ((pVar == null || isNaN(pVar) || pVar <0) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if (pVar != null & pVar >=0 & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
				}
		}
	}	
	}
	}

	
		
	function economyWarning() {
	
		gen_warn_text = "Please enter Fixed Cost must be a number between 0 and 100.";
		
		curFixedCost = data_Vue.economy['Fixed Cost'];
		console.log(curFixedCost);

		if(((!curFixedCost & curFixedCost !=0) || curFixedCost < 0 || curFixedCost > 100 || isNaN(curFixedCost)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
			console.log('empty'+curFixedCost);
		}
		else if((curFixedCost != "" & curFixedCost >= 0 & curFixedCost <= 100) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}
		
		gen_warn_text = "Please enter Interest Rate must be a number.";
		curInt = data_Vue.economy['Interest Rate'];	

		if(((!curInt & curInt !=0) || curInt < 0 || curInt > 100 || isNaN(curInt)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
			console.log('empty'+curInt);
		}
		else if((curInt != "" & curInt >= 0 & curInt <= 100) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}
		
		gen_warn_text = "Please enter Genotyping Cost must be a number.";
		curGenoType = data_Vue.economy['Genotyping Cost'];

		if(((!curGenoType & curGenoType !=0) || curGenoType < 0 || curGenoType > 100 || isNaN(curGenoType)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
			console.log('empty'+curInt);
		}
		else if((curGenoType != "" & curGenoType >= 0 & curGenoType <= 100) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}		
		
	}
	



function animalHousingCost() {

		var animal_housing_costCnt = data_Vue.economy['Animal Housing Costs'].length;
		var thisAnimalHousingCosts = data_Vue.economy['Animal Housing Costs'];
		
		for(let i=0; i < animal_housing_costCnt; i++){			
			thisCost = thisAnimalHousingCosts[i]['Cost'];
			nameOfCost = thisAnimalHousingCosts[i]['Name'];

			gen_warn_text = nameOfCost+" : "+"Please enter Animal Housing Cost and must be a number.";

			if(((thisCost =="" & thisCost !=0) || thisCost <0 || isNaN(thisCost)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
				data_Vue.warnings.push(gen_warn_text);
			}
			else if(thisCost != "" & thisCost >=0 & data_Vue.warnings.indexOf(gen_warn_text) > -1){
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}		
			
		}
}


// this funtion will always be called after an edge has been created,
// you can use this function to add further services, e.g add the secong parent automatically if Breeding Type == Reproduction etc.
function addServices(){
	if(data_Vue.active_edge['Breeding Type'] == "Reproduction"){
		var val = document.getElementById("parents_input").value ;
		if(val =='') return;
		if(data_Vue.nodes.get(val) == null){  	// create new node by copying:
			var p1_node = data_Vue.nodes.get(data_Vue.active_edge.from);
			p1_node.Sex = p1_node.Sex == "Male" ? "Female" : "Male" ;
			p1_node.id = val;
			p1_node.x = p1_node.x+50;
			addNode_extern(p1_node);
		}								
		var child_node = data_Vue.nodes.get(data_Vue.active_edge.to);
		var new_edge = new myEdge(val, child_node.id);
		new_edge['Breeding Type'] = "Reproduction";
		new_edge['Time Needed'] = document.getElementById("time_n").value;
		for(let i=0; i < data_Vue.active_edge.useVar.length; i++){
			new_edge['useVar'].push(data_Vue.active_edge.useVar[i]);
		}
		
		addEdge_extern(new_edge);
	}
	if(data_Vue.active_edge['Breeding Type'] == "Split"){
		var val = document.getElementById("split_input").value ;
		if(val =='') return;
		if(data_Vue.nodes.get(val) == null){  	// create new node by copying:
			var p1_node = data_Vue.nodes.get(data_Vue.active_edge.to);
			p1_node.id = val;
			p1_node.x = p1_node.x+50;
			p1_node['Number of Individuals'] = data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] - p1_node['Number of Individuals'];
			p1_node.individualsVar ='';
			addNode_extern(p1_node);
		}								
		var parent_node = data_Vue.nodes.get(data_Vue.active_edge.from);
		var new_edge = new myEdge(parent_node.id, val);
		new_edge['Breeding Type'] = "Split";
		new_edge['Time Needed'] = data_Vue.active_edge['Time Needed'];
		
		addEdge_extern(new_edge);
	}

}



