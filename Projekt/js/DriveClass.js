"use strict";

var DriveClass = {
	
	featherEditor: {},
	
	
	init: function() {
		DriveClass.instantiateFeather();
	},
	
	instantiateFeather: function() {
		
		DriveClass.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
			},
			
			onError: function(errorObj) {
				alert(errorObj.message);
			}
		});
	},
	
	launchEditor: function(id) {
		
		DriveClass.featherEditor.launch({
			image: id
		});
		
		return false;
	}
		
};

window.onload = DriveClass.init;

//id.target.myParam,