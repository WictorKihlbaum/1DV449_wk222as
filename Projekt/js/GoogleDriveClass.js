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
		if (authResult && !authResult.error) {
			document.getElementById('top-text').style.display = 'none';
		  	GoogleDriveClass.loadDriveApi();
		} else {
			document.getElementById('top-text').style.display = 'block';
		}
	},
	
	/**
	 * Load Drive API client library.
	 */
	loadDriveApi: function() {
		gapi.client.load('drive', 'v2', GoogleDriveClass.listImages);
	},
	
	/**
	 * Render images.
	 */
	listImages: function() {
		
		GoogleDriveClass.imageList.innerHTML = '';
		
		var request = gapi.client.drive.files.list({
			'maxResults': 100
		});
	
		request.execute(function(resp) {  
			var files = resp.items;
			if (files && files.length > 0) {
				
				for (var i = 0; i < files.length; i++) {
					
					var file = files[i];
				
					if (file.mimeType === 'image/png' || 
						file.mimeType === 'image/jpg' || 
						file.mimeType === 'image/jpeg') {
						
						GoogleDriveClass.renderListElement(file);
					}
				}
			  
			} else {
				var imageDiv = document.getElementById('image-div');
				imageDiv.innerHTML = "No valid images (Png, Jpg/Jpeg) found in your Google Drive";
			}
		});
	},
	  
	renderListElement: function(image) {
		  
		GoogleDriveClass.imageList.innerHTML += 
		
			'<li>' + 
				'<div class="thumbnail-frame">' +
					'<span class="helper"></span>' +
					'<img id="'+image.id+'" ' + 
					'class="thumbnail-image" ' + 
					'src="'+image.thumbnailLink+'" ' +
					'alt="'+image.originalFilename+'" ' +
					'onclick="Fullscreen.showFullScreen(\''+image.id+'\', \''+image.webContentLink+'\')" ' + 
					'title="Click to preview in fullscreen" />' +
				'</div>' +
				'<span class="image-name">'+image.originalFilename+'</span>' +
				'<a href="#" class="button-class button-size-small edit-button" onclick="GoogleDriveClass.getImageFromDrive(\''+image.id+'\', \''+image.downloadUrl+'\')">Edit</a>' +
				'<a href="'+image.webContentLink+'" download class="button-class button-size-small download-button">Download original</a>' +
				'<span id="'+image.id+'-edited"></span><!-- Download-button for edited image will be added from DriveClass.js -->' +
				'<div id="'+image.id+'-upload"></div><!-- Upload-button for edited image will be added from DriveClass.js -->' +
			'</li>';
	},	
				
	getImageFromDrive: function(id, downloadURL) {
			
		if (downloadURL) {
			
			var accessToken = gapi.auth.getToken().access_token;
			var xhr = new XMLHttpRequest();
				
			xhr.onload = function() {
					
				var reader = new FileReader();
						
				reader.onloadend = function() {
					DriveClass.launchEditor(id, reader.result);
				};
					
				reader.readAsDataURL(xhr.response);
			};
				
			xhr.onerror = function() {
				var errorMessage = 'Error! Could not get image from Google Drive.';
				console.log(errorMessage);
				GoogleDriveClass.showErrorMessage(errorMessage);
			};
				
			xhr.open('GET', downloadURL);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			xhr.send();
		}
	},
	
	// Aviary photo editor saves image temporarily on Amazon server.
	getImageFromAmazon: function(id, url) {
		
		var xhr = new XMLHttpRequest();
			
		xhr.onload = function() {
			GoogleDriveClass.postImageToDrive(xhr.response);
		};
			
		xhr.onerror = function() {
			console.log('Error! Could not get image from Amazon.');
			var errorMessage = 'Error! Failed to get the edited image. Therefore an upload to Google Drive could not be done.';
			GoogleDriveClass.showErrorMessage(errorMessage);	
		};
			
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();	
	},
	
	postImageToDrive: function(fileData, callback) {
		// Indicate image is being uploaded to Google Drive and to avoid user pressing anything.
		document.body.className = 'cursor-wait';
  		
		var boundary = '-------314159265358979323846';
		var delimiter = "\r\n--" + boundary + "\r\n";
		var close_delim = "\r\n--" + boundary + "--";
	
		var reader = new FileReader();
		reader.readAsBinaryString(fileData);
		
		reader.onload = function() {
			
			var contentType = fileData.type || 'application/octet-stream';
			var metadata = {
				'title': fileData.fileName,
				'mimeType': contentType
			};
	
			var base64Data = btoa(reader.result);
			var multipartRequestBody =
				delimiter +
				'Content-Type: application/json\r\n\r\n' +
				JSON.stringify(metadata) +
				delimiter +
				'Content-Type: ' + contentType + '\r\n' +
				'Content-Transfer-Encoding: base64\r\n' +
				'\r\n' +
				base64Data +
				close_delim;
		
			var request = gapi.client.request({
				'path': '/upload/drive/v2/files',
				'method': 'POST',
				'params': {'uploadType': 'multipart'},
				'headers': {
				  'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
				},
				'body': multipartRequestBody});
				
			if (!callback) {
      			callback = function(file) {
        			console.log(file);
					GoogleDriveClass.showSuccessMessage();
					GoogleDriveClass.listImages();
					document.body.className = 'cursor-default';
      			};
				
    		} else {
				console.log('Something went wrong! Could not post image to Google Drive.');
				var errorMessage = 'The image failed to upload to your Google Drive!';
				GoogleDriveClass.showErrorMessage(errorMessage);
				document.body.className = 'cursor-default';
			}
			
			request.execute(callback);
		};
	},
	
	showSuccessMessage: function() {
		var message = document.getElementById('success-message');
		message.className = 'success-message-show';
		message.innerHTML = 'The image was successfully uploaded to your Google Drive!' +
		'<img src="images/close_button_small.png" alt="X" title="Close window" class="close-message" id="close-success-message" onclick="GoogleDriveClass.removeSuccessMessage()" />';
	},
	
	removeSuccessMessage: function() {
		var message = document.getElementById('success-message');
		message.className += ' fadeout';
		
		setTimeout(function() {
        	message.className = 'success-message-hide';
    	}, 500);
	},
	
	showErrorMessage: function(errorMessage) {
		var message = document.getElementById('error-message');
		message.className = 'error-message-show';
		message.innerHTML = errorMessage +
		'<img src="images/close_button_small.png" alt="X" title="Close window" class="close-message" id="close-error-message" onclick="GoogleDriveClass.removeErrorMessage()" />';
	},
	
	removeErrorMessage: function() {
		var message = document.getElementById('error-message');
		message.className += ' fadeout';
		
		setTimeout(function() {
        	message.className = 'error-message-hide';
    	}, 500);
	}
	  
};

window.onload = GoogleDriveClass.init();