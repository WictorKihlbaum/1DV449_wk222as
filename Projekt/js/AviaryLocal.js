"use strict";

var AviaryLocal = {
	
	featherEditor: {},
	
	
	init: function() {
		AviaryLocal.instantiateFeather();
	},
	
	instantiateFeather: function() {
		
		AviaryLocal.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			apiVersion: 3,
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
				LocalClass.addDownloadButton(newURL);
			},
			
			onError: function(errorObj) {
				console.log(errorObj.message);
				// TODO: Show error message for user.
			}
		});
	},
	
	launchEditor: function(id) {
		
		AviaryLocal.featherEditor.launch({
			image: id.target.myParam
		});
		
		return false;
	}
		
};

window.onload = AviaryLocal.init();