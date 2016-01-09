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
			displayImageSize: true, // remove later?.
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
				img.style.width = "200px";
				img.style.heigth = "225px";
			},
			
			/*onClose: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
				img.style.width = "200px";
				img.style.heigth = "225px";
			},*/
			
			onError: function(errorObj) {
				alert(errorObj.message);
			}
		});
		
		console.log(DriveClass.featherEditor);
	},
	
	launchEditor: function(id) {
		
		DriveClass.featherEditor.launch({
			image: id
		});
		
		return false;
	}
		
};

window.onload = DriveClass.init();