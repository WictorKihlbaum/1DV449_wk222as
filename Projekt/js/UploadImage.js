"use strict";

var UploadImage = {
	
	init: function() {
		var inputElement = document.getElementById("input");
		inputElement.addEventListener("change", UploadImage.handleFiles, false);
	},

	handleFiles: function() {
		
		var preview = document.getElementById("editable-image");
		var selectedFile = document.getElementById('input').files[0];
		
		// Aviary editor only supports Png and Jpg/Jpeg.
		if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/jpeg') {
			
			var reader = new FileReader();
	
			reader.onloadend = function() {
				preview.src = reader.result;
				// If image is way to big make it smaller.
				if (preview.width > 660) {
					preview.width = 660;
				}
			}
			
			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			} else {
				preview.src = "images/questionmark.png";
			}
			
		} else {
			// TODO: Add error-message-image to preview.	
		}
	},
	
	addDownloadButton: function(url) {
		var downloadField = document.getElementById("download-button-field");
		downloadField.innerHTML = '<a href="'+url+'" download class="button-class download-button">Download image</a>';
	}
	
};				

window.onload = UploadImage.init;