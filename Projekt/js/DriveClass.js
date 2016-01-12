"use strict";

var DriveClass = {
	
	featherEditor: {},
	
	
	init: function() {
		DriveClass.instantiateFeather();
		DriveClass.addEventEventListener();
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
				//DriveClass.renderSaveToDrive(imageID, newURL);
				console.log(newURL);
			},
			
			onError: function(errorObj) {
				console.log(errorObj.message);
			}
		});
	},
	
	launchEditor: function(id, src) {
		
		DriveClass.featherEditor.launch({
			image: id,
			url: src
		});
		
		return false;
	},
	
	addDownloadButton: function(id, url) {
		var buttonField = document.getElementById(id+'-edited');
		buttonField.innerHTML = '<a href="'+url+'" download class="button-class button-size-small download-button">Download edited</a>';
	},
	
	addUploadButton: function(id, url) {
		var buttonField = document.getElementById(id+'-upload');
		buttonField.innerHTML = '<a href="#" class="button-class button-size-small upload-button" onclick="GoogleDriveClass.getImageFromAmazon(\''+id+'\', \''+url+'\')">Upload to Drive</a>';
	},
	
	addEventEventListener: function() {
		var closeButton = document.getElementById('close-window');
		closeButton.addEventListener('click', DriveClass.closeWindow, false);
	},
	
	closeWindow: function() {
		var infoWindow = document.getElementById('need-to-login-text');
		infoWindow.className = 'fadeout';
		
		setTimeout(function() {
        	infoWindow.style.display = 'none';
    	}, 500);
	}
		
};

window.onload = DriveClass.init();