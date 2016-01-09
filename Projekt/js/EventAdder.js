"use strict";

var EventAdder = {

	init: function() {
		EventAdder.addEvents();	
	},
	
	addEvents: function() {
		var idArray = imageIDs;
		console.log(idArray);	
	
		for (var i = 0; i < idArray.length; i++) {
			
			var button = document.getElementById(idArray[i]);
			
			button.addEventListener("click", DriveClass.launchEditor, false);
			button.myParam = idArray[i];
		}
	}

	
};

window.onload = EventAdder.init;