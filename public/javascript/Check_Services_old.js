// this function will always be called when the body is focused on,
// it will check all possibly inconsistencies if anything of the following components are changed:
function checkEverything(id){
    	console.log(id);
	if(id == "General_Info"){  
			
		gen_warn_text = "Please specify a Project Name.";
		if(!data_Vue.geninfo['Project Name'] & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.geninfo['Project Name'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
        	}
			
		gen_warn_text = "Please specify a Species.";
		if(!data_Vue.geninfo['Species'] & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.geninfo['Species'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
        	}
						
		gen_warn_text = "Please specify Time Unit.";
		if(!data_Vue.geninfo['Time Unit'] & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.geninfo['Time Unit'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
            	}			
		
		gen_warn_textEns = "Please specify an Ensembl Dataset.";
		if ((data_Vue.genetic_data == "Ens" & !data_Vue.geninfo['Ensembl Dataset'] & data_Vue.warnings.indexOf(gen_warn_textEns) == -1)){
			data_Vue.warnings.push(gen_warn_textEns);
		}else if(data_Vue.genetic_data == "Ens" & data_Vue.geninfo['Ensembl Dataset'] != "" & data_Vue.warnings.indexOf(gen_warn_textEns) > -1) {
                	data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_textEns),1);
		}
		else if (data_Vue.genetic_data != "Ens" & data_Vue.warnings.indexOf(gen_warn_textEns) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_textEns),1);
		}      

		gen_warn_textSNP = "Please specify Max.Number of SNPs. SNPs are in positive integer";
		checkPosSNP = isPositiveInt(data_Vue.geninfo['Max Number of SNPs']);
		if (data_Vue.genetic_data == "Ens" & (isNaN(data_Vue.geninfo['Max Number of SNPs']) || data_Vue.geninfo['Max Number of SNPs'] < 0  || (data_Vue.geninfo['Max Number of SNPs'] != "" & checkPosSNP == false )) & data_Vue.warnings.indexOf(gen_warn_textSNP) == -1){
			data_Vue.warnings.push(gen_warn_textSNP);
		}else if((data_Vue.geninfo['Max Number of SNPs'] == "" || (data_Vue.geninfo['Max Number of SNPs'] >=0 & checkPosSNP == true)) & data_Vue.warnings.indexOf(gen_warn_textSNP) > -1) {
                	data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_textSNP),1);
            	}
		else if (data_Vue.genetic_data != "Ens" & data_Vue.warnings.indexOf(gen_warn_textSNP) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_textSNP),1);
		}   	
			
		gen_warn_text = "Please upload Own Map.";
		if ((data_Vue.genetic_data == "Own" & !data_Vue.geninfo['Own Map Path']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
            	}else if(data_Vue.geninfo['Own Map Path'] != "Own" & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
            
		gen_warn_text = "Please enter number of Chromosomes. Chromosomes are in positive integer.";			
		checkCus = isPositiveInteger(data_Vue.geninfo['Number of Chromosomes']) ? "true" : "false";
		checkNumeric = isNumeric(data_Vue.geninfo['Number of Chromosomes']);
		if ((data_Vue.genetic_data == "Cus" & !data_Vue.geninfo['Number of Chromosomes'] & checkCus == "false") & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((data_Vue.genetic_data == "Cus" & (data_Vue.geninfo['Number of Chromosomes'] != "" & (checkNumeric == "false") || checkCus == "false")) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((data_Vue.genetic_data == "Cus" & data_Vue.geninfo['Number of Chromosomes'] != "" & checkCus == "true") & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}                            
		else if (data_Vue.genetic_data != "Cus" & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}                            


		thisChromoLen = data_Vue.geninfo['Chromosomes of Equal Length'];
	        thisChromoNum = data_Vue.geninfo['Chromosomes Info'].length;
	
        	if (thisChromoNum > 0 ) {
			for (i=0; i<thisChromoNum; i++) {
			gen_warn_text = "Chromo "+(i+1)+" : "+"Please enter Chromosomes Length and must be in number.";
			if((!data_Vue.geninfo['Chromosomes Info'][i]['Length'] || isNaN(data_Vue.geninfo['Chromosomes Info'][i]['Length']) || data_Vue.geninfo['Chromosomes Info'][i]['Length'] < 0 ) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
				data_Vue.warnings.push(gen_warn_text);
			}
			else if((data_Vue.geninfo['Chromosomes Info'][i]['Length'] != "" & data_Vue.geninfo['Chromosomes Info'][i]['Length'] > 0 ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
			}

			gen_warn_text = "Chromo "+(i+1)+" : "+"Please enter Chromosomes MD and must be in number.";
			if((!data_Vue.geninfo['Chromosomes Info'][i]['MD'] || isNaN(data_Vue.geninfo['Chromosomes Info'][i]['MD']) || data_Vue.geninfo['Chromosomes Info'][i]['MD'] < 0) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
				data_Vue.warnings.push(gen_warn_text);
			}
			else if((data_Vue.geninfo['Chromosomes Info'][i]['MD'] != "" & data_Vue.geninfo['Chromosomes Info'][i]['MD'] > 0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                        
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
        		}                                                            

			gen_warn_text = "Chromo "+(i+1)+" : "+"Please enter Chromosomes Recombination and must be in number.";
			if((!data_Vue.geninfo['Chromosomes Info'][i]['Recombination'] || isNaN(data_Vue.geninfo['Chromosomes Info'][i]['Recombination']) || data_Vue.geninfo['Chromosomes Info'][i]['Recombination'] < 0) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
				data_Vue.warnings.push(gen_warn_text);
			}
			else if((data_Vue.geninfo['Chromosomes Info'][i]['Recombination'] != "" & data_Vue.geninfo['Chromosomes Info'][i]['Recombination'] > 0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
			}
			}
		}
	}             
// end general info validation


		
	// phenotype validation
	if(id == "Phenotype_Info_Div"){
		var phenoLength = data_Vue.traitsinfo.length;

		if (phenoLength > 0 ) {
		for (i=0; i<phenoLength; i++)
			{
				gen_warn_text = "Pheno"+(i+1)+" : "+"Please enter Phenotype Name.";
				if(!data_Vue.traitsinfo[i]['Trait Name']  & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
					}
				else if (data_Vue.traitsinfo[i]['Trait Name'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}	
				
				gen_warn_text = "Pheno "+(i+1)+": Please enter Phenotype Mean and must be in number.";
				if((!data_Vue.traitsinfo[i]['Trait Mean'] || isNaN(data_Vue.traitsinfo[i]['Trait Mean'])) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if (data_Vue.traitsinfo[i]['Trait Mean'] != "" & isNaN(data_Vue.traitsinfo[i]['Trait Mean']) == false & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}	

				gen_warn_text = "Pheno "+(i+1)+" : "+"Please enter Phenotype Standard deviation and must be a Positive number.";
				thisStdDev = data_Vue.traitsinfo[i]['Trait Std Deviation'];

				if ((!thisStdDev || isNaN(thisStdDev) || thisStdDev < 0)  & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((thisStdDev != "" & thisStdDev >=0) & isNaN(thisStdDev) == false & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
				}	
		
				gen_warn_text = "Pheno"+(i+1)+" : "+"Please enter Trait Heritability and must be a number between 0 and 1. ";
				if((!data_Vue.traitsinfo[i]['Trait Heritability'] || data_Vue.traitsinfo[i]['Trait Heritability'] < 0 ||  data_Vue.traitsinfo[i]['Trait Heritability'] > 1) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((data_Vue.traitsinfo[i]['Trait Heritability'] != "" & data_Vue.traitsinfo[i]['Trait Heritability'] >= 0 & data_Vue.traitsinfo[i]['Trait Heritability'] <= 1) & data_Vue.warnings.indexOf(gen_warn_text) > -1){  
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}

				checkPoly = isPositiveInt(data_Vue.traitsinfo[i]['Trait Number of Polygenic Loci']);
				gen_warn_text = "Pheno"+(i+1)+" : "+"Please enter polygenic loci and must be a Number.";
				if((!data_Vue.traitsinfo[i]['Trait Number of Polygenic Loci'] || data_Vue.traitsinfo[i]['Trait Number of Polygenic Loci'] < 0 || checkPoly == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((data_Vue.traitsinfo[i]['Trait Number of Polygenic Loci'] != "" & data_Vue.traitsinfo[i]['Trait Number of Polygenic Loci'] > 0 & checkPoly == true) & data_Vue.warnings.indexOf(gen_warn_text) > -1){   
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}
				
				gen_warn_text = "Pheno"+(i+1)+" : "+"Please enter Value per Unit and must be in number.";
				if((data_Vue.traitsinfo[i]['Trait Value per Unit'] == "" & data_Vue.traitsinfo[i]['Trait Value per Unit']  != "0") & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if (data_Vue.traitsinfo[i]['Trait Value per Unit'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){   
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}
								
				gen_warn_text = "Pheno"+(i+1)+" : "+"Please enter Major QTL and must be in positive number or can be zero. ";
				thisMajorQTL = data_Vue.traitsinfo[i]['Trait Major QTL']
				if(thisMajorQTL < 0 & data_Vue.warnings.indexOf(gen_warn_text) ==-1){  
					data_Vue.warnings.push(gen_warn_text);
				}
				else if(thisMajorQTL >= 0 & data_Vue.warnings.indexOf(gen_warn_text) > -1){  
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}

				var qtlCnt = data_Vue.traitsinfo[i]['Trait Major QTL'];
				var qtlName = i;

				if (qtlCnt > 0) {
					qtlsforPheno(qtlName, qtlCnt);
				}
					
				matrix1();
				matrix2();				

			}
		}
	}	// end of phenotype validation
	
	
	if(id == "Selectionindex_Div"){
		selection_Index();
		phenotyping_classes();		
		economyWarning();	
		animalHousingCost();
	}
	

	if(id == "Variables_Info"){
		var ownVariableCnt = data_Vue.individualsVar_options.length;
		var ownVariable = data_Vue.individualsVar_options;

		for(let i=0; i < ownVariableCnt; i++){			
			thisName = ownVariable[i]['name'];
			thisValue = ownVariable[i]['value'];

			gen_warn_text = thisName+" : "+"Please enter Own variable and must be a positive number.";

			if((thisValue == "" || thisValue =="0" || thisValue <0 || isNaN(thisValue)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
				data_Vue.warnings.push(gen_warn_text);
			}
			else if((thisValue != "" & thisValue >0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}		
				
		}
	}
	
	
	if(id == "node-popUp"){
		
		gen_warn_text = "Please enter Name of the Node. ";
		if (!data_Vue.active_node['id'] & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.active_node['id'] != "" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}	
		
		gen_warn_text = "Please enter Positive Number or select a Variable. ";
		if (!data_Vue.active_node['Number of Individuals'] & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_node['Number of Individuals'] != "" || data_Vue.active_node['Number of Individuals'] > 0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		 
		gen_warn_text = "Please enter Proportion of genotyped individuals of the node. And must be a number between 0 and 1.";
		if((!data_Vue.active_node['Proportion of genotyped individuals'] || data_Vue.active_node['Proportion of genotyped individuals'] < 0 || data_Vue.active_node['Proportion of genotyped individuals']  > 1) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((data_Vue.active_node['Proportion of genotyped individuals'] != "" & data_Vue.active_node['Proportion of genotyped individuals'] >= 0 & data_Vue.active_node['Proportion of genotyped individuals']  <= 1) & data_Vue.warnings.indexOf(gen_warn_text) > -1){  
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please enter Proportion of Male. And must be a number between 0 and 1.";
		if((data_Vue.active_node['Sex'] == "Both" & (!data_Vue.active_node['Proportion of Male'] || data_Vue.active_node['Proportion of Male'] < 0 || data_Vue.active_node['Proportion of Male']  > 1)) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
			data_Vue.warnings.push(gen_warn_text);
		}
		else if ((data_Vue.active_node['Sex'] == "Both" & (data_Vue.active_node['Proportion of Male'] != "" & data_Vue.active_node['Proportion of Male'] >= 0 & data_Vue.active_node['Proportion of Male']  <= 1)) & data_Vue.warnings.indexOf(gen_warn_text) > -1){  
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		else if (data_Vue.active_node['Sex'] != "Both"  & data_Vue.warnings.indexOf(gen_warn_text) > -1){  
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}		

	}
	

	if(id == "edge-popUp"){
		
		gen_warn_text = "The parent node of a selection edge should contain at least as many individuals as the child node. ";
		if (data_Vue.active_edge['Breeding Type'] == "Selection" & (data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] < data_Vue.nodes.get(data_Vue.active_edge.to)['Number of Individuals']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){ 
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.active_edge['Breeding Type'] == "Selection" & (data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] >= data_Vue.nodes.get(data_Vue.active_edge.to)['Number of Individuals']) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		
		gen_warn_text = "The parent node of a Aging edge should contain at least as many individuals as the child node. ";
		if (data_Vue.active_edge['Breeding Type'] == "Aging" & (data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] < data_Vue.nodes.get(data_Vue.active_edge.to)['Number of Individuals']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){ 
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.active_edge['Breeding Type'] == "Aging" & (data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] >= data_Vue.nodes.get(data_Vue.active_edge.to)['Number of Individuals']) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Aging" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		
		gen_warn_text = "The parent node of a repeat edge should contain the same number of individuals as the child node. ";
		if (data_Vue.active_edge['Breeding Type'] == "Repeat" & (data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] != data_Vue.nodes.get(data_Vue.active_edge.to)['Number of Individuals']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){ 
			data_Vue.warnings.push(gen_warn_text);
		}else if(data_Vue.active_edge['Breeding Type'] == "Repeat" & (data_Vue.nodes.get(data_Vue.active_edge.from)['Number of Individuals'] == data_Vue.nodes.get(data_Vue.active_edge.to)['Number of Individuals']) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Repeat" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please select Selection type. ";
		if ((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "") & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] != "")& data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please enter Time needed for Selection. And it must be a positive number";
		if ((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] < 0 || isNaN(data_Vue.active_edge['Time Needed'])) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Time Needed'] != null) & data_Vue.active_edge['Time Needed'] >= 0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}	

		gen_warn_text = "Please select Relationship Matrix for Selection type BVE. ";
		if (((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE") & !data_Vue.active_edge['Relationship Matrix']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] != "") & data_Vue.active_edge['Relationship Matrix'] != "") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}

		gen_warn_text = "Please select BVE Method for Selection type BVE. ";
		if (((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE") & !data_Vue.active_edge['BVE Method']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] != "") & data_Vue.active_edge['BVE Method'] != "") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}

		gen_warn_text = "Please enter Depth of Pedigree. And it is a Number ";
		if ((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.active_edge['Relationship Matrix'] == "Pedigree") & (!data_Vue.active_edge['Depth of Pedigree'] || isNaN(data_Vue.active_edge['Depth of Pedigree'])) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.active_edge['Relationship Matrix'] == "Pedigree") & data_Vue.active_edge['Depth of Pedigree'] != "" & data_Vue.active_edge['Depth of Pedigree'] >= 0 ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.active_edge['Relationship Matrix'] != "Pedigree") || (data_Vue.active_edge['Depth of Pedigree'] == "" || data_Vue.active_edge['Depth of Pedigree'] != "" || data_Vue.active_edge['Depth of Pedigree'] >= 0 )) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if((data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.active_edge['Relationship Matrix'] == "Pedigree") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
	
		gen_warn_text = "Please enter Depth of Pedigree for Single Step. And it is a Number ";
		if ((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.active_edge['Relationship Matrix'] == "Single Step") & (!data_Vue.active_edge['Depth of Pedigree'] || isNaN(data_Vue.active_edge['Depth of Pedigree'])) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.active_edge['Relationship Matrix'] == "Single Step") & data_Vue.active_edge['Depth of Pedigree'] != "" & data_Vue.active_edge['Depth of Pedigree'] >= 0 ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if((data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.active_edge['Selection Type'] != "BVE" || data_Vue.active_edge['Relationship Matrix'] == "Single Step" || data_Vue.active_edge['Relationship Matrix'] != "Single Step") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}

	
		gen_warn_text = "Please select Cohorts Used in BVE for Selection type BVE. ";
		if (((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE") & !data_Vue.active_edge['Cohorts used in BVE']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if(((data_Vue.active_edge['Breeding Type'] == "Selection" & data_Vue.active_edge['Selection Type'] == "BVE") & data_Vue.active_edge['Cohorts used in BVE'] != "") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Selection" & data_Vue.active_edge['Selection Type'] == "BVE" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please enter Time needed for Reproduction. It must be a positive number";
		if (data_Vue.active_edge['Breeding Type'] == "Reproduction" & ( data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Reproduction" & data_Vue.active_edge['Time Needed'] !=null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Reproduction" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please select id for Reproduction. ";
		if (data_Vue.active_edge['Breeding Type'] == "Reproduction" & (data_Vue.active_edge['id'] == "" || data_Vue.active_edge['id'] <0)  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Reproduction" & data_Vue.active_edge['id'] !="" & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Reproduction" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please enter number of repeat for breeding type Repeat. It must be a positive number ";
		if (data_Vue.active_edge['Breeding Type'] == "Repeat" & (!data_Vue.active_edge['Number of Repeat'] || data_Vue.active_edge['Number of Repeat'] < 0 || isNaN(data_Vue.active_edge['Time Needed'])) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Repeat" & data_Vue.active_edge['Number of Repeat'] != "" & data_Vue.active_edge['Number of Repeat'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}else if(data_Vue.active_edge['Breeding Type'] != "Repeat" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}

		gen_warn_text = "Please enter Time needed for Cloning. And it must be a positive number";
		if (data_Vue.active_edge['Breeding Type'] == "Cloning" & (data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Cloning" & data_Vue.active_edge['Time Needed'] != null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Cloning" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}		
		
		gen_warn_text = "Please enter Time needed for Split. And it must be a positive number";
		if (data_Vue.active_edge['Breeding Type'] == "Split" & (data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Split" & data_Vue.active_edge['Time Needed'] != null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Split" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}		
		
		gen_warn_text = "Please enter Time needed for Selfing. And it must be a positive number";
		if (data_Vue.active_edge['Breeding Type'] == "Selfing" & (data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Selfing" & data_Vue.active_edge['Time Needed'] != null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Selfing" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}		
		
		gen_warn_text = "Please enter Time needed for Combine. It must be a positive number number";
		if (data_Vue.active_edge['Breeding Type'] == "Combine" & (data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Combine" & data_Vue.active_edge['Time Needed'] != null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Combine" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}	
		
		gen_warn_text = "Please enter Time needed for DH-Production. And it must be a positive number";
		if (data_Vue.active_edge['Breeding Type'] == "DH-Production" & (data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "DH-Production" & data_Vue.active_edge['Time Needed'] != null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "DH-Production" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}	
	
		gen_warn_text = "Please enter Time needed for Aging. And it must be a positive number";
		if (data_Vue.active_edge['Breeding Type'] == "Aging" & (data_Vue.active_edge['Time Needed'] == null || data_Vue.active_edge['Time Needed'] <0 || isNaN(data_Vue.active_edge['Time Needed']))  & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Aging" & data_Vue.active_edge['Time Needed'] != null & data_Vue.active_edge['Time Needed'] >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Aging" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}	
		
		gen_warn_text = "Please enter Recombination - New Mutation Rate. ";
		if ((data_Vue.active_edge['Breeding Type'] == "Recombination" & !data_Vue.active_edge['New Mutation Rate']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		} else if((data_Vue.active_edge['Breeding Type'] == "Recombination" & data_Vue.active_edge['New Mutation Rate'] != "") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Recombination" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		
		gen_warn_text = "Please enter Recombination - New Remutation Rate. ";
		if ((data_Vue.active_edge['Breeding Type'] == "Recombination" & !data_Vue.active_edge['New Remutation Rate']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		} else if((data_Vue.active_edge['Breeding Type'] == "Recombination" & data_Vue.active_edge['New Remutation Rate'] != "") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Recombination" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		
		gen_warn_text = "Please enter Recombination - Number of Recombination per M. ";
		if ((data_Vue.active_edge['Breeding Type'] == "Recombination" & !data_Vue.active_edge['Number of Rec per M']) & data_Vue.warnings.indexOf(gen_warn_text) == -1){			
			data_Vue.warnings.push(gen_warn_text);
		}else if((data_Vue.active_edge['Breeding Type'] == "Recombination" & data_Vue.active_edge['Number of Rec per M'] !="") & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if(data_Vue.active_edge['Breeding Type'] != "Recombination" & data_Vue.warnings.indexOf(gen_warn_text) > -1){               
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}
		
		gen_warn_text = "Please choose ID of 2.Parent for the Reproduction edge. Please consider that in case of an animal reproduction one parent should be a female and the other parent should be a male.";
		if (data_Vue.active_edge['Breeding Type'] == "Reproduction" & (data_Vue.geninfo['Species'] == "Chicken" || data_Vue.geninfo['Species'] == "Cattle" || data_Vue.geninfo['Species'] == "Sheep" || data_Vue.geninfo['Species'] == "Pig" || data_Vue.geninfo['Species'] == "Horse" || data_Vue.geninfo['Species'] == "Goat" || data_Vue.geninfo['Species'] == "Human") & document.getElementById("parents_input") == null & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		} else if (data_Vue.active_edge['Breeding Type'] == "Reproduction" & data_Vue.geninfo['Species'] == ("Chicken" || "Cattle" || "Sheep" || "Pig" || "Horse" || "Goat" || "Human" ) & document.getElementById("parents_input") != null & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if (data_Vue.active_edge['Breeding Type'] == "Reproduction" & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		} else if (data_Vue.active_edge['Breeding Type'] != "Reproduction"& data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
		}		
	}
	
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
		var thisTrait = data_Vue.traitsinfo[qtlName]["Trait Name"];
		
		for (k=0; k<qtlCnt; k++) {	
			curBP = thisQTL[k]['QTL BP'];
			curID = thisQTL[k]['QTL ID'];
			gen_warn_text = thisTrait+"-bp"+(k+1)+":"+"Please enter bp and must be a Positive Number .";	
			checkBP = isPositiveInt(thisQTL[k]['QTL BP']);
			if ((!thisQTL[k]['QTL BP'] || thisQTL[k]['QTL BP'] <= 0 || checkBP == false )& data_Vue.warnings.indexOf(gen_warn_text) == -1) {
				data_Vue.warnings.push(gen_warn_text);
			}
			else if ((thisQTL[k]['QTL BP'] != "" & thisQTL[k]['QTL BP'] > 0 & checkBP == true) & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                    
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}		

			gen_warn_text = thisTrait+"-Chromo "+(k+1)+":"+"Please enter chromosomes and must be a Positive Number.";
			checkchromo = isPositiveInt(thisQTL[k]['QTL Chromosome']);
			if ((!thisQTL[k]['QTL Chromosome'] || thisQTL[k]['QTL Chromosome'] <= 0 || checkchromo == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
				data_Vue.warnings.push(gen_warn_text);
			}
			else if ((thisQTL[k]['QTL Chromosome'] != "" & thisQTL[k]['QTL Chromosome'] > 0 & checkchromo ==true) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}		
			
			checkAANumeric = isNumeric(thisQTL[k]['QTL Effect AA']);
			gen_warn_text = thisTrait+"-EffectAA"+(k+1)+":"+"Please enter Effect AA and must be a Number.";
			if ((!thisQTL[k]['QTL Effect AA'] || checkAANumeric == false ) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
				data_Vue.warnings.push(gen_warn_text);
			}
			else if (thisQTL[k]['QTL Effect AA'] != "" & checkAANumeric == true & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                       
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}	
			
			checkABNumeric = isNumeric(thisQTL[k]['QTL Effect AB']);	
			gen_warn_textAB = thisTrait+"-EffectAB"+(k+1)+":"+"Please enter Effect AB and must be a Number.";
			if ((!thisQTL[k]['QTL Effect AB'] || checkABNumeric == false) & data_Vue.warnings.indexOf(gen_warn_textAB) == -1) {
				data_Vue.warnings.push(gen_warn_textAB);
			}
			else if ((thisQTL[k]['QTL Effect AB'] != "" ) & checkABNumeric == true & data_Vue.warnings.indexOf(gen_warn_textAB) > -1){                                                                       
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_textAB),1); 
			}

			
			checkBBNumeric = isNumeric(thisQTL[k]['QTL Effect BB']);	
			gen_warn_textBB = thisTrait+"-EffectBB"+(k+1)+":"+"Please enter Effect BB and must be a Number.";
			if ((!thisQTL[k]['QTL Effect BB'] || checkBBNumeric == false) & data_Vue.warnings.indexOf(gen_warn_textBB) == -1) {
				data_Vue.warnings.push(gen_warn_textBB);
			}
			else if ((thisQTL[k]['QTL Effect BB'] != "") & checkBBNumeric == true & data_Vue.warnings.indexOf(gen_warn_textBB) > -1){                                                                       
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_textBB),1); 
			}
					
			checkAllele = isNumeric(thisQTL[k]['QTL Allele Frequency']);		
			gen_warn_text = thisTrait+"-Allele Freq "+(k+1)+":"+"Please enter Allele Freq and it must be between 0 and 1.";
			if ((!thisQTL[k]['QTL Allele Frequency']  || thisQTL[k]['QTL Allele Frequency'] <0 || thisQTL[k]['QTL Allele Frequency'] >1 ) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
				data_Vue.warnings.push(gen_warn_text);
			}
			else if ((thisQTL[k]['QTL Allele Frequency'] != "" & thisQTL[k]['QTL Allele Frequency'] >=0 & thisQTL[k]['QTL Allele Frequency'] <=1) & data_Vue.warnings.indexOf(gen_warn_text) > -1){                                                                       
				data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
			}	
					
		}
	}

	function matrix1() {
		var traitsCnt = data_Vue.traitsinfo.length;
		for(let i=0; i < traitsCnt; i++){			
			for(let j=0; j < data_Vue.matrix[i].row.length; j++){
				curMatVal = data_Vue.matrix[i].row[j].val;	
					
				gen_warn_text = data_Vue.traitsinfo[i]['Trait Name']+"-"+data_Vue.traitsinfo[j]['Trait Name']+":Please enter Phenotypic Correlation and must be a number between -1 and 1 ";

				if (((!curMatVal & curMatVal == "" & curMatVal !="0") || curMatVal <-1 || curMatVal > 1 || isNaN(curMatVal)) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((curMatVal != "" & curMatVal >=-1 & curMatVal <=1 & isNaN(curMatVal) == false ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
				}
				
			}			
		}			
	}	

  
	function matrix2() {
			var traitsCnt = data_Vue.traitsinfo.length;
			for(let i=0; i < traitsCnt; i++){			
				for(let j=0; j < data_Vue.matrix2[i].row.length; j++){
					curMatVal2 = data_Vue.matrix2[i].row[j].val;	

					gen_warn_text = data_Vue.traitsinfo[i]['Trait Name']+"-"+data_Vue.traitsinfo[j]['Trait Name']+":Please enter Genetic Correlation and must be a number between -1 and 1 ";
					
					if (((!curMatVal2 & curMatVal2 == "" & curMatVal2 !="0") || curMatVal2 <-1 || curMatVal2 > 1 || isNaN(curMatVal2)) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
						data_Vue.warnings.push(gen_warn_text);
					}
					else if ((curMatVal2 != "" & curMatVal2 >=-1 & curMatVal2 <=1 & isNaN(curMatVal2) == false ) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
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

						var objSI = pVar =	data_Vue.selection_index[i];
						var keys = Object.keys(objSI);
						constP = keys[j+1];			
						pVar =	data_Vue.selection_index[i][constP];
						pName = data_Vue.selection_index[i]['Name'];
						checkpVar = isNumeric(pVar);	

						gen_warn_text = pName+(i+1)+":Pheno"+(j+1)+":Please enter selection index and it must be a number.";
						if ((!pVar || isNaN(pVar) || checkpVar == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
							data_Vue.warnings.push(gen_warn_text);
						}
						else if (pVar != "" & checkpVar == true & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
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
				var objPC = pVar =	data_Vue.phenotyping_class[i];
				var keys = Object.keys(objPC);
				
				constPC = keys[j+2];			
						
				pVar =  data_Vue.phenotyping_class[i][constPC];
				pName = data_Vue.phenotyping_class[i]['Name'];
				Cost = data_Vue.phenotyping_class[i]['Cost of phenotyping'];

				checkpVar = isNumeric(pVar);  
				checkPospVar = isPositiveInt(pVar);
					
				gen_warn_text = pName+":Phenotyping Cost"+(i+1)+": Please enter phenotyping classes and it must be a positive number or zero.";
				if ((isNaN(Cost) || Cost <0) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((Cost >=0) & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}	

				gen_warn_text = pName+(i+1)+":Pheno"+(j+1)+": Please enter phenotyping classes and it must be a positive number or zero.";
				if ((pVar == null || isNaN(pVar) || pVar < 0 || checkpVar == false || checkPospVar == false) & data_Vue.warnings.indexOf(gen_warn_text) == -1) {
					data_Vue.warnings.push(gen_warn_text);
				}
				else if ((pVar != null & pVar >= 0 & checkpVar == true & checkPospVar == true) & data_Vue.warnings.indexOf(gen_warn_text) > -1) {
					data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1);
				}
			}
			}             
		}
	}


	
	function economyWarning() {
	
		gen_warn_text = "Please enter Fixed Cost must be a number between 0 and 100.";
		
		curFixedCost = data_Vue.economy['Fixed Cost'];

		if(((!curFixedCost & curFixedCost !=0) || curFixedCost < 0 || curFixedCost > 100 || isNaN(curFixedCost)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}
		else if((curFixedCost != "" & curFixedCost >= 0 & curFixedCost <= 100) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}
		
		gen_warn_text = "Please enter Interest Rate must be a number.";
		curInt = data_Vue.economy['Interest Rate'];	

		if(((!curInt & curInt !=0) || curInt < 0 || curInt > 100 || isNaN(curInt)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
		}
		else if((curInt != "" & curInt >= 0 & curInt <= 100) & data_Vue.warnings.indexOf(gen_warn_text) > -1){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(gen_warn_text),1); 
		}
		
		gen_warn_text = "Please enter Genotyping Cost must be a number. Cost must be less than 100 euros";
		curGenoType = data_Vue.economy['Genotyping Cost'];

		if(((!curGenoType & curGenoType !=0) || curGenoType < 0 || curGenoType > 100 || isNaN(curGenoType)) & data_Vue.warnings.indexOf(gen_warn_text) == -1){
			data_Vue.warnings.push(gen_warn_text);
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


function check_eigen(){
	
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
		
		addEdge_extern(new_edge);
	}
}
