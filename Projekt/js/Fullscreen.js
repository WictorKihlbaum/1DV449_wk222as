"use strict";

var Fullscreen = {
	
	thumbnail: '',
	thumbnailSrc: '',
	
	
	init: function() {
		// Make it work for all major browsers.
		// Call 'fullscreenChanged' everytime fullscreen are opened or closed.
		document.addEventListener("fullscreenchange", function() { Fullscreen.fullscreenChanged(); });
		document.addEventListener("webkitfullscreenchange", function() { Fullscreen.fullscreenChanged(); });
		document.addEventListener("mozfullscreenchange", function() { Fullscreen.fullscreenChanged(); });
		document.addEventListener("MSFullscreenChange", function() { Fullscreen.fullscreenChanged(); });
	},
	
	fullscreenChanged: function() {
		
		if (document.fullscreenElement) {
			document.fullscreenElement.className = 'thumbnail-image-opened';
		} else if (document.webkitFullscreenElement) {
			document.webkitFullscreenElement.className = 'thumbnail-image-opened';
		} else if (document.mozFullScreenElement ) {
			document.mozFullScreenElement.className = 'thumbnail-image-opened';
		} else if (document.msFullscreenElement) {
			document.msFullscreenElement.className = 'thumbnail-image-opened';
		}
		
		if (!document.fullscreenElement &&
			!document.webkitFullscreenElement &&
			!document.mozFullScreenElement &&
			!document.msFullscreenElement) {
			
			Fullscreen.thumbnail.className = 'thumbnail-image';
			Fullscreen.thumbnail.src = Fullscreen.thumbnailSrc;
		}
	},
	
	showFullScreen: function(id, src) {
		
		// Check if full-screen is available.
		if (document.fullscreenEnabled || 
			document.webkitFullscreenEnabled || 
			document.mozFullScreenEnabled ||
			document.msFullscreenEnabled) {
			
			// Remove unnecessary part of url.
			var newSrc = src.replace(/&export=download/i, '');
			var image = document.getElementById(id);
			
			// Save thumbnail image source for later use.
			Fullscreen.thumbnailSrc = image.src;
			
			/* 1. Go fullscreen.
			 * 2. Change img src to high-res version.
			 * 3. Save thumbnail element for later use.
			 */
			if (image.requestFullscreen) {
				image.requestFullscreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.fullscreenElement;
				
			} else if (image.webkitRequestFullscreen) {
				image.webkitRequestFullscreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.webkitFullscreenElement;
				
			} else if (image.mozRequestFullScreen) {
				image.mozRequestFullScreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.mozFullScreenElement;
				
			} else if (image.msRequestFullscreen) {
				image.msRequestFullscreen();
				image.src = newSrc;
				Fullscreen.thumbnail = document.msFullscreenElement;
			}
			
		} else {
			console.log('Fullscreen not available by your browser.');	
		}
	},
	
};

window.onload = Fullscreen.init();