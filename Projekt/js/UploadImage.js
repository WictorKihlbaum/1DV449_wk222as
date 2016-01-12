"use strict";

var UploadImage = {
	
	init: function() {
		UploadImage.addEventListeners();
	},

	handleFiles: function() {
		
		var preview = document.getElementById('editable-image');
		var selectedFile = document.getElementById('input').files[0];
		
		// Aviary editor only supports Png and Jpg/Jpeg.
		if (selectedFile.type === 'image/png' || 
			selectedFile.type === 'image/jpg' || 
			selectedFile.type === 'image/jpeg') {
			
			var reader = new FileReader();
	
			reader.onloadend = function() {
				preview.src = reader.result;
			}
			
			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			} else {
				preview.src = "images/questionmark.png";
			}
			
		} else {
			// TODO: Add error-message.
			console.log('Wrong image-format');	
		}
	},
	
	addDownloadButton: function(url) {
		var downloadField = document.getElementById('download-button-field');
		downloadField.innerHTML = '<a href="'+url+'" download class="button-class download-button">Download image</a>';
	},
	
	addEventListeners: function() {
		var inputElement = document.getElementById('input');
		inputElement.addEventListener('change', UploadImage.handleFiles, false);
		
		var closeButton = document.getElementById('close-window');
		closeButton.addEventListener('click', UploadImage.closeWindow, false);
		
		var editButton = document.getElementById('edit');
		editButton.addEventListener('click', AviaryClass.launchEditor, false);
		editButton.myParam = 'editable-image'; // ID-name for img-tag.
	},
	
	closeWindow: function() {
		var infoWindow = document.getElementById('step-by-step');
		infoWindow.style.display = 'none';
	}
	
};				

window.onload = UploadImage.init();