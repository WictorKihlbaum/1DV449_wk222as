"use strict";

var GoogleDriveClass = {
	
	imageList: null,
	CLIENT_ID: '788591829115-1uq193qnm8r72ujqej7l3hdj558hj7ej.apps.googleusercontent.com',
	SCOPES: ['https://www.googleapis.com/auth/drive'],
	
	thumbnailSrc: null,
	openedThumbnail: null,
	
			  
	init: function() {
		GoogleDriveClass.imageList = document.getElementById("image-list");
		GoogleDriveClass.imageList.innerHTML = ''; // Reset list.
		// Fullscreen functionality.
		GoogleDriveClass.addEventListener();
	},
	
	addEventListener: function() {
		// Make it work for all major browsers.
		document.addEventListener("fullscreenchange", function() { GoogleDriveClass.fullscreenChanged(); });
		document.addEventListener("webkitfullscreenchange", function() { GoogleDriveClass.fullscreenChanged(); });
		document.addEventListener("mozfullscreenchange", function() { GoogleDriveClass.fullscreenChanged(); });
		document.addEventListener("MSFullscreenChange", function() { GoogleDriveClass.fullscreenChanged(); });
	},
	
	fullscreenChanged: function() {
		
		if (document.webkitFullscreenElement !== null) {
			document.webkitFullscreenElement.className = 'thumbnail-image-opened';
			GoogleDriveClass.openedThumbnail = document.webkitFullscreenElement;
		} else {
			GoogleDriveClass.openedThumbnail.className = 'thumbnail-image';
			GoogleDriveClass.openedThumbnail.src = GoogleDriveClass.thumbnailSrc;
		}
		
	},
	
	showFullScreen: function(id, src) {
		
		// Check if full-screen is available?
		if (
			document.fullscreenEnabled || 
			document.webkitFullscreenEnabled || 
			document.mozFullScreenEnabled ||
			document.msFullscreenEnabled
		) {
			var newSrc = src.replace(/&export=download/i, '');
			var image = document.getElementById(id);
			GoogleDriveClass.thumbnailSrc = image.src;
			image.src = newSrc;
			
			// Go full-screen
			if (image.requestFullscreen) {
				image.requestFullscreen();
				image.src = src;
			} else if (image.webkitRequestFullscreen) {
				image.webkitRequestFullscreen();
				image.src = src;
			} else if (image.mozRequestFullScreen) {
				image.mozRequestFullScreen();
				image.src = src;
			} else if (image.msRequestFullscreen) {
				image.msRequestFullscreen();
				image.src = src;
			}
		}
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
				
				//GoogleDriveClass.addFullScreen();
			  
			} else {
				document.getElementById("image-div").innerHTML = "No images found in your Google Drive";
			}
		});
	},
	  
	renderListElement: function(image) {
		  
		GoogleDriveClass.imageList.innerHTML += 
			'<li>' + 
				'<div class="thumbnail-frame">' +
					'<span class="helper"></span>' +
					'<img id="'+image.id+'" class="thumbnail-image" src="'+image.thumbnailLink+'" alt="'+image.originalFilename+'" onclick="GoogleDriveClass.showFullScreen(\''+image.id+'\', \''+image.webContentLink+'\')" title="Click to preview in fullscreen" />' +
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
				console.log('Something went wrong!');	
			};
				
			xhr.open('GET', downloadURL);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
			xhr.send();
		}
	},
	
	getImageFromAmazon: function(id, url) {
		
		var xhr = new XMLHttpRequest();
			
		xhr.onload = function() {
			GoogleDriveClass.postImageToDrive(xhr.response);
		};
			
		xhr.onerror = function() {
			console.log('Something went wrong!');	
		};
			
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();	
	},
	
	postImageToDrive: function(fileData, callback) {
  		
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
      			};
    		}
			
			request.execute(callback);
			
			document.body.className = 'cursor-wait';
			
			setTimeout(function() {
        		GoogleDriveClass.listImages();
				document.body.className = 'cursor-default';
    		}, 3000);
			
		};
	}
	  
};

window.onload = GoogleDriveClass.init();