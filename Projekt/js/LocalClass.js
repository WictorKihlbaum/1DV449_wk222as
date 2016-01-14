"use strict";

var LocalClass = {
	
	errorMessage: null,
	
	
	init: function() {
		LocalClass.addEventListeners();
		LocalClass.errorMessage = document.getElementById('error-message');
	},

	handleFiles: function() {
		
		var preview = document.getElementById('editable-image');
		var selectedFile = document.getElementById('input').files[0];
		
		// Aviary photo editor only supports Png and Jpg/Jpeg.
		if (selectedFile.type === 'image/png' || 
			selectedFile.type === 'image/jpg' || 
			selectedFile.type === 'image/jpeg') {
				
			LocalClass.removeErrorMessage();
			
			var reader = new FileReader();
	
			reader.onloadend = function() {
				preview.src = reader.result;
			}
			
			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			} else {
				preview.src = "images/no_image_chosen.jpg";
			}
			
		} else { // TODO: move to function.
			LocalClass.errorMessage.className = 'error-message-show';
			LocalClass.errorMessage.innerHTML = 
				'File is not valid! The file is either not an image or the format is wrong. Valid formats are Png and Jpg/Jpeg. Please try again.' +
				'<img src="images/close_button_small.png" alt="X" title="Close window" class="close-message" id="close-error-message" onclick="LocalClass.removeErrorMessage()" />';
			// Change back to default image.
			var image = document.getElementById('editable-image');
			image.src = 'images/no_image_chosen.jpg';
		}
	},
	
	removeErrorMessage: function() {
		LocalClass.errorMessage.className += ' fadeout';
		
		setTimeout(function() {
        	LocalClass.errorMessage.className = 'error-message-hide';
    	}, 500);
	},
	
	addDownloadButton: function(url) {
		var downloadField = document.getElementById('download-button-field');
		downloadField.innerHTML = '<a href="'+url+'" download class="button-class button-size-large download-button">Download image</a>';
	},
	
	addEventListeners: function() {
		var inputElement = document.getElementById('input');
		inputElement.addEventListener('change', LocalClass.handleFiles, false);
		
		var closeInfoButton = document.getElementById('close-info-message');
		closeInfoButton.addEventListener('click', LocalClass.closeWindow, false);
		
		var editButton = document.getElementById('edit');
		editButton.addEventListener('click', AviaryLocal.launchEditor, false);
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

window.onload = LocalClass.init();