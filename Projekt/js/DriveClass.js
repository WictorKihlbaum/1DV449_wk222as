"use strict";

var DriveClass = {
	
	featherEditor: {},
	
	
	init: function() {
		DriveClass.instantiateFeather();
	},
	
	instantiateFeather: function() {
		
		DriveClass.featherEditor = new Aviary.Feather({
			apiKey: 'eb5f4fca52634bbf94da9389bd974012',
			theme: 'minimum',
			tools: 'all',
			appendTo: '',
			onSave: function(imageID, newURL) {
				var img = document.getElementById(imageID);
				img.src = newURL;
			},
			
			onError: function(errorObj) {
				alert(errorObj.message);
			}
		});
	},
	
	launchEditor: function(id) {
		
		//id = '0BzR5X_i2lIK8czYwMkRiSGwwRk0';
		//src = 'https://lh5.googleusercontent.com/UX91ZGWx6SXmz4-5WfAAfV1m8F07GIyJ6NJYsf-QFKHPjDpWi3AaQ0X-xG4ZAzwLd1mGsA=s220';
		
		DriveClass.featherEditor.launch({
			image: id
		});
		
		return false;
	}
		
};

window.onload = DriveClass.init;