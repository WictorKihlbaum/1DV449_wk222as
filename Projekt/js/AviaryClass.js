"use strict";

var AviaryClass = {
	
	featherEditor: {},
	
	
	init: function() {
		AviaryClass.addEventListenerToEditButton();
		AviaryClass.instantiateFeather();
	},
	
	instantiateFeather: function() {
		
		AviaryClass.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
				UploadImage.addDownloadButton(newURL);
				//AviaryClass.getImageFromNewURL(newURL);
			},
			onLoad: function() {
        		document.getElementById('edit-button').style.display = 'block';
    		},
			
			onError: function(errorObj) {
				alert(errorObj.message);
			}
		});
	},
	
	launchEditor: function(id) {
		
		AviaryClass.featherEditor.launch({
			image: id.target.myParam,
		});
		
		return false;
	},
	
	addEventListenerToEditButton: function() {
	
		var editButton = document.getElementById("edit-button");
		editButton.addEventListener("click", AviaryClass.launchEditor, false);
		editButton.myParam = 'editable-image'; // ID-name for img-tag.
	}
	
	/*getImageFromNewURL: function(newURL) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', newURL, true);
		xhr.responseType = 'blob';
		
		xhr.onload = function(e) {
			
		  if (this.status == 200) {
			
			var blob = new Blob([this.response], {type: 'image/png'});
			AviaryClass.postImageFromNewURL(blob);
		  }
		};
		
		xhr.send();
	},
	
	postImageFromNewURL: function(blob) {
		
		var postURL = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=media';
		var xhr = new XMLHttpRequest();
  		xhr.open('POST', postURL, true);
  		
		xhr.onload = function(e) {  
			console.log(e);
		};

  		xhr.send(blob);
	}*/
		
};

window.onload = AviaryClass.init;