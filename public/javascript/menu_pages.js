	
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
	
	
	
	// when scroll the content the menu items stay on top!
	
	window.onscroll = function() {scrollFunction()};
	
	var header = document.getElementById("menuItems");
	
	var sticky = header.offsetTop;
	
	function scrollFunction() {
	  if (window.pageYOffset > sticky) {
	    header.classList.add("sticky");
	  } else {
	    header.classList.remove("sticky");
	  }
	}

