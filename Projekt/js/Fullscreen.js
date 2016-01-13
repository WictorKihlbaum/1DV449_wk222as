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
		
		if (document.webkitFullscreenElement !== null) {
			document.webkitFullscreenElement.className = 'thumbnail-image-opened';
			Fullscreen.thumbnail = document.webkitFullscreenElement;
		} else {
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
			
			// Go full-screen.
			// Change image source to high-res image.
			if (image.requestFullscreen) {
				image.requestFullscreen();
				image.src = newSrc;
			} else if (image.webkitRequestFullscreen) {
				image.webkitRequestFullscreen();
				image.src = newSrc;
			} else if (image.mozRequestFullScreen) {
				image.mozRequestFullScreen();
				image.src = newSrc;
			} else if (image.msRequestFullscreen) {
				image.msRequestFullscreen();
				image.src = newSrc;
			}
		}
	},
	
};

window.onload = Fullscreen.init();