"use strict";

var AviaryClass = {
	
	featherEditor: {},
	
	
	init: function() {
		AviaryClass.addEventListenerForEditButton();
		AviaryClass.instantiateFeather();
	},
	
	instantiateFeather: function() {
		
		AviaryClass.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			apiVersion: 3,
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			displayImageSize: true,
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
				UploadImage.addDownloadButton(newURL);
			},
			onLoad: function() {
        		document.getElementById('edit').style.display = 'block';
    		},
			
			onError: function(errorObj) {
				console.log(errorObj.message);
			}
		});
	},
	
	launchEditor: function(id) {
		
		AviaryClass.featherEditor.launch({
			image: id.target.myParam
		});
		
		return false;
	},
	
	addEventListenerForEditButton: function() {
		var editButton = document.getElementById('edit');
		editButton.addEventListener('click', AviaryClass.launchEditor, false);
		editButton.myParam = 'editable-image'; // ID-name for img-tag.
	}
		
};

window.onload = AviaryClass.init();