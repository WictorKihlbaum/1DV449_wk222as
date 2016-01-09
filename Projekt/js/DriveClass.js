"use strict";

var DriveClass = {
	
	featherEditor: {},
	
	
	init: function() {
		DriveClass.instantiateFeather();
	},
	
	instantiateFeather: function() {
		
		DriveClass.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			apiVersion: 3,
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
				DriveClass.addDownloadButton(imageID, newURL);
				DriveClass.addUploadButton(imageID, newURL);
			},
			
			onError: function(errorObj) {
				console.log(errorObj.message);
			}
		});
		
		console.log(DriveClass.featherEditor);
	},
	
	launchEditor: function(id, src) {
		
		console.log(id);
		console.log(src);
		
		DriveClass.featherEditor.launch({
			image: id,
			url: src
		});
		
		return false;
	},
	
	addDownloadButton: function(id, url) {
		var buttonField = document.getElementById(id+'-edited');
		buttonField.innerHTML = '<a href="'+url+'" download class="button-class download-button">Download edited</a>';
	},
	
	addUploadButton: function(id, url) {
		var buttonField = document.getElementById(id+'-upload');
		buttonField.innerHTML = '<a href="#" class="button-class upload-button" onclick="DriveClass.sayHi()">Upload to Drive</a>';
	},
	
	sayHi: function() {
		console.log('Upload-button pressed by user');
	}
		
};

window.onload = DriveClass.init();