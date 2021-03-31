	
	function func(val){
		if (val == "intro") {
		window.location.href = "intro";		
		} 
		else if (val == "faq") {
		window.location.href = "faq";		
		} 	
		else if (val == "history") {
		window.location.href = "history";		
		} 
		else if (val == "agb") {
		window.location.href = "agb";		
		} 
		else if (val == "publication"){
		window.location.href = "publication";
		}
		else {
		window.location.href = "auth";
		}
	}
	function guestLogin() {
		document.getElementById("username").value = "Guest";
		document.getElementById("password").value = "guest";
	}  
