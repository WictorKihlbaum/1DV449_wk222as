"use strict";

var ClipboardClass = {
	
	instantiate: function() {
		
		var button = document.getElementById("google-circle");
		var clipboard = new Clipboard(button);
		
		clipboard.on("success", function(e) {
			console.log(e);
		});
		
		clipboard.on("error", function(e) {
			console.log(e);
		});
	}
};

window.onload = ClipboardClass.instantiate;