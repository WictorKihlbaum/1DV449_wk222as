"use strict";

var UploadImage = {
	
	imageSrc: "",
	

	previewFile: function() {
		
		var preview = document.querySelector("img"); // Selects the query named img
   		var file    = document.querySelector("input[type=file]").files[0]; // Sames as here
   		var reader  = new FileReader();

   		reader.onloadend = function () {
	   		preview.src = reader.result;
			UploadImage.imageSrc = reader.result;
   		}

   		if (file) {
	   	
			reader.readAsDataURL(file); // Reads the data as a URL
   		
		} else {
	   	
			preview.src = "";
		}
	},
	
	getImageSrc: function() {
	
		return UploadImage.imageSrc;	
	}
	
};

window.onload = UploadImage.previewFile;

