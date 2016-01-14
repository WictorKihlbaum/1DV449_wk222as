"use strict";

var UploadImage = {
	
	errorMessage: null,
	
	
	init: function() {
		UploadImage.addEventListeners();
		UploadImage.errorMessage = document.getElementById('error-message');
	},

	handleFiles: function() {
		
		var preview = document.getElementById('editable-image');
		var selectedFile = document.getElementById('input').files[0];
		
		// Aviary photo editor only supports Png and Jpg/Jpeg.
		if (selectedFile.type === 'image/png' || 
			selectedFile.type === 'image/jpg' || 
			selectedFile.type === 'image/jpeg') {
				
			UploadImage.removeErrorMessage();
			
			var reader = new FileReader();
	
			reader.onloadend = function() {
				preview.src = reader.result;
			}
			
			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			} else {
				preview.src = "images/no_image_chosen.jpg";
			}
			
		} else {
			UploadImage.errorMessage.className = 'error-message-show';
			UploadImage.errorMessage.innerHTML = 
				'File is not valid! The file is either not an image or the format is wrong. Valid formats are Png and Jpg/Jpeg. Please try again.' +
				'<img src="images/close_button_small.png" alt="X" title="Close window" class="close-message" id="close-error-message" onclick="UploadImage.removeErrorMessage()" />';
			// Change back to default image.
			var image = document.getElementById('editable-image');
			image.src = 'images/no_image_chosen.jpg';
		}
	},
	
	removeErrorMessage: function() {
		UploadImage.errorMessage.className += ' fadeout';
		
		setTimeout(function() {
        	UploadImage.errorMessage.className = 'error-message-hide';
    	}, 500);
	},
	
	addDownloadButton: function(url) {
		var downloadField = document.getElementById('download-button-field');
		downloadField.innerHTML = '<a href="'+url+'" download class="button-class button-size-large download-button">Download image</a>';
	},
	
	addEventListeners: function() {
		var inputElement = document.getElementById('input');
		inputElement.addEventListener('change', UploadImage.handleFiles, false);
		
		var closeInfoButton = document.getElementById('close-info-message');
		closeInfoButton.addEventListener('click', UploadImage.closeWindow, false);
		
		var editButton = document.getElementById('edit');
		editButton.addEventListener('click', AviaryClass.launchEditor, false);
		editButton.myParam = 'editable-image'; // ID-name for img-tag.
	},
	
	closeWindow: function() {
		var infoWindow = document.getElementById('step-by-step');
		infoWindow.className = 'fadeout';
		
		setTimeout(function() {
        	infoWindow.style.display = 'none';
    	}, 500);
	}
	
};				

window.onload = UploadImage.init();