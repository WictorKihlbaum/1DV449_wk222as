"use strict";

var UploadImage = {
	
	//editedImageURL: '',
	
	
	init: function() {
		var inputElement = document.getElementById("input");
		inputElement.addEventListener("change", UploadImage.handleFiles, false);
		
		/*var image = document.getElementById("editable-image");
		image.addEventListener("change", UploadImage.changeImageSource, false);
		image.myParam = image.src;*/
	},

	handleFiles: function() {
		
		var preview = document.getElementById("editable-image");
		var selectedFile = document.getElementById('input').files[0];
		
		// Aviary photo-editor only supports Png and Jpeg.
		if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
			
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
	
	/*changeImageSource: function(imageSrc) {
		var downloadField = document.getElementById("download-field-div");
		downloadField.innerHTML = '<p><a href="'+imageSrc.target.myParam+'" download>Download image</a></p>';
	},*/
	
	/*setEditedImageURL: function(url) {
		UploadImage.editedImageURL = url;	
	},*/
	
	addDownloadButton: function(url) {
		var downloadField = document.getElementById("download-button-field");
		downloadField.innerHTML = '<a href="'+url+'" download class="button-class" id="download-button">Download image</a>';
	}
	
};				

window.onload = UploadImage.init;