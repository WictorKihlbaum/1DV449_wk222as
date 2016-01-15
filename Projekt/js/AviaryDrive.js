/* This JS-file handles Aviary Editor for 'driveimage.html' */
"use strict";

var AviaryDrive = {
	
	featherEditor: {},
	
	
	init: function() {
		AviaryDrive.instantiateFeather();
	},
	
	instantiateFeather: function() {
		// Instantiate Aviary editor.
		AviaryDrive.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			apiVersion: 3,
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			
			onSave: function(imageID, newURL) {
				// Show the new edited image.
				var img = document.getElementById(imageID);
				img.src = newURL;
				// Add download and upload button for new image.
				DriveClass.addDownloadButton(imageID, newURL);
				DriveClass.addUploadButton(imageID, newURL);
			},
			
			onError: function(errorObj) {
				// Show error message.
				console.log(errorObj.message);
				var message = 'Error! Something went wrong.';
				Message.showErrorMessage(message);
			}
		});
	},
	
	launchEditor: function(id, src) {
		
		AviaryDrive.featherEditor.launch({
			image: id,
			url: src
		});
		
		return false;
	}
		
};

window.onload = AviaryDrive.init();