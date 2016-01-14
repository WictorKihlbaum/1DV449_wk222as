"use strict";

var LocalClass = {
	
	init: function() {
		LocalClass.addEventListeners();
	},

	handleFiles: function() {
		
		var preview = document.getElementById('editable-image');
		var selectedFile = document.getElementById('input').files[0];
		
		// Aviary photo editor only supports Png and Jpg/Jpeg.
		if (selectedFile.type === 'image/png' || 
			selectedFile.type === 'image/jpg' || 
			selectedFile.type === 'image/jpeg') {
			// In case an error message has been shown.
			//LocalClass.removeErrorMessage();
			Message.removeErrorMessage();
			
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
			var message = 'File is not valid! The file is either not an image or the format is wrong. ' +
			'Valid formats are Png and Jpg/Jpeg. Please try again.';
			Message.showErrorMessage(message);
			
			// Change back to default image.
			var image = document.getElementById('editable-image');
			image.src = 'images/no_image_chosen.jpg';
		}
	},
	
	addDownloadButton: function(url) {
		var downloadField = document.getElementById('download-button-field');
		downloadField.innerHTML = '<a href="'+url+'" download ' +
		'class="button-class button-size-large download-button">Download image</a>';
	},
	
	addEventListeners: function() {
		var inputElement = document.getElementById('input');
		inputElement.addEventListener('change', LocalClass.handleFiles, false);
		
		var closeInfoButton = document.getElementById('close-info-message');
		closeInfoButton.addEventListener('click', LocalClass.closeWindow, false);
		
		var editButton = document.getElementById('edit');
		editButton.addEventListener('click', LocalClass.isImageChosen, false);
		editButton.myParam = 'editable-image'; // ID-name for img-tag.
	},
	
	closeWindow: function() {
		var infoWindow = document.getElementById('step-by-step');
		infoWindow.className = 'fadeout';
		
		setTimeout(function() {
        	infoWindow.style.display = 'none';
    	}, 500);
	},
	
	isImageChosen: function(id) {
		var image = document.getElementById(id.target.myParam);
		// Check if an image has been chosen before open photo editor.
		if (!image.src.match(/no_image_chosen/g)) {
			AviaryLocal.launchEditor(id.target.myParam);
		} else {
			var message = 'Error! You have to choose an image before you can edit.';
			Message.showErrorMessage(message);
		}
	}
	
};				

window.onload = LocalClass.init();