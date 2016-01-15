/* This JS-file handles Aviary Editor for 'localimage.html' */
"use strict";

var AviaryLocal = {
	
	featherEditor: {},
	
	
	init: function() {
		AviaryLocal.instantiateFeather();
	},
	
	instantiateFeather: function() {
		// Instantiate Aviary editor.
		AviaryLocal.featherEditor = new Aviary.Feather({
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
				// Add download button for new image.
				LocalClass.addDownloadButton(newURL);
			},
			
			onError: function(errorObj) {
				// Show error message.
				console.log(errorObj.message);
				var message = 'Error! Something went wrong.';
				Message.showErrorMessage(message);
			}
		});
	},
	
	launchEditor: function(id) {
		
		AviaryLocal.featherEditor.launch({
			image: id
		});
		
		return false;
	}
		
};

window.onload = AviaryLocal.init();