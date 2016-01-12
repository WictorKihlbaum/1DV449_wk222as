"use strict";

var GoogleDriveClass = {
	
	imageList: null,
	CLIENT_ID: '788591829115-1uq193qnm8r72ujqej7l3hdj558hj7ej.apps.googleusercontent.com',
	SCOPES: ['https://www.googleapis.com/auth/drive'],
			  
	init: function() {
		GoogleDriveClass.imageList = document.getElementById("image-list");
		GoogleDriveClass.imageList.innerHTML = ''; // Reset list.
	},
		
	/**
	 * Check if current user has authorized this application.
	 */
	checkAuth: function() {
		GoogleDriveClass.imageList.innerHTML = ''; // Reset list.
		gapi.auth.authorize(
			{
				'client_id': GoogleDriveClass.CLIENT_ID,
				'scope': GoogleDriveClass.SCOPES.join(' '),
				'immediate': true
		  	}, GoogleDriveClass.handleAuthResult);
	},
	
	/**
	 * Handle response from authorization server.
	 *
	 * @param {Object} authResult Authorization result.
	 */
	handleAuthResult: function(authResult) {
		
		var needToDiv = document.getElementById('need-to-login-text');
		
		if (authResult && !authResult.error) {
		  needToDiv.style.visibility = 'hidden';
		  GoogleDriveClass.loadDriveApi();
		} else {
		  needToDiv.style.visibility = 'visible';
		  GoogleDriveClass.imageList.innerHTML = '';
		}
	},
	
	/**
	 * Initiate auth flow in response to user clicking authorize button.
	 *
	 * @param {Event} event Button click event.
	 */
	handleAuthClick: function(event) {
		
		gapi.auth.authorize(
			{client_id: GoogleDriveClass.CLIENT_ID, scope: GoogleDriveClass.SCOPES, immediate: false},
		  	GoogleDriveClass.handleAuthResult);
		return false;
	},
	
	/**
	 * Load Drive API client library.
	 */
	loadDriveApi: function() {
		gapi.client.load('drive', 'v2', GoogleDriveClass.listFiles);
	},
	
	/**
	 * Print files.
	 */
	listFiles: function() {
		
		var request = gapi.client.drive.files.list({
			'maxResults': 10
		});
	
		request.execute(function(resp) {  
			var files = resp.items;
			if (files && files.length > 0) {
				
				for (var i = 0; i < files.length; i++) {
					
					var file = files[i];
				
					if (file.fileExtension === 'png' || 
						file.fileExtension === 'jpg' || 
						file.fileExtension === 'jpeg') {
					
						GoogleDriveClass.renderListElement(file);
					}
				}
			  
			} else {
				
				document.getElementById("image-div").innerHTML = "No images found in your Google Drive";
			}
		});
	},
	  
	renderListElement: function(image) {
		  
		GoogleDriveClass.imageList.innerHTML += 
			'<li>' + 
				'<img id="'+image.id+'" class="thumbnail-image" src="'+image.thumbnailLink+'" alt="'+image.originalFilename+'" />' +
				'<span class="image-name">'+image.originalFilename+'</span>' +
				'<a href="#" class="button-class edit-button" onclick="GoogleDriveClass.downloadFile(\''+image.id+'\', \''+image.downloadUrl+'\')">Edit</a>' +
				'<a href="'+image.webContentLink+'" download class="button-class download-button">Download original</a>' +
				'<span id="'+image.id+'-edited"></span><!-- Download-button for edited image will be added from GoogleDriveClass.js -->' +
				'<div id="'+image.id+'-upload"></div><!-- Upload-button for edited image will be added from GoogleDriveClass.js -->' +
			'</li>';
	},	
				
	downloadFile: function(id, downloadURL) {
			
		if (downloadURL) {
				
			var accessToken = gapi.auth.getToken().access_token;
			var xhr = new XMLHttpRequest();
				
			xhr.onload = function() {
					
				var reader = new FileReader();
						
				reader.onloadend = function() {
					DriveClass.launchEditor(id, reader.result);
				}
					
				reader.readAsDataURL(xhr.response);
			};
				
			xhr.onerror = function() {
				console.log('Something went wrong!');	
			};
				
			xhr.open('GET', downloadURL);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			xhr.send();
		}
	}
	  
};

window.onload = GoogleDriveClass.init();