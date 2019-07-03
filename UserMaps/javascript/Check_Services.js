// this function will always be called when the body is focused on,
// it will check all possibly inconsistencies if anything of the following components are changed:
function checkEverything(id){
	console.log(id);
	if(id == "General_Info"){
		species_warn_text = "Please specify a species.";
		if(data_Vue.geninfo.Species =="" & data_Vue.warnings.indexOf(species_warn_text) == -1){
			data_Vue.warnings.push(species_warn_text);
		}else if(data_Vue.geninfo.Species != ""){
			data_Vue.warnings.splice(data_Vue.warnings.indexOf(species_warn_text),1);
		}
	}
	if(id == "Phenotype_Info_Div"){
		check_eigen();
	}
	if(id == "Selectionindex_Div"){
		
	}
	if(id == "Variables_Info"){
		
	}
	if(id == "node-popUp"){
		
	}
	if(id == "edge-popUp"){
		
	}
	
	data_Vue.project_saved = false;
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
