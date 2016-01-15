/* This JS-file handles events related to signin/signout. */
"use strict";

var SignEvent = {
	
	signOutButton: null,
	profileImage: null,
	profileName: null,
	
	
	init: function() {
		SignEvent.signOutButton = document.getElementById('signout-button');
		SignEvent.profileImage = document.getElementById('profile-image');
		SignEvent.profileName = document.getElementById('profile-name');
		
		SignEvent.hideSignOutButton();
		SignEvent.hideProfileImage();
		SignEvent.addEventListener();
	},
	
	signIn: function(googleUser) {
		var profile = googleUser.getBasicProfile();
		SignEvent.showProfileImage(profile.getImageUrl());
		SignEvent.showProfileName(profile.getName());
		SignEvent.showSignOutButton();
		
		// Check if user is authenticated.
		DriveClass.checkAuth();
		
		/* Developer purpose */
		/*console.log('ID: ' + profile.getId());
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());*/
	},
	
	signOut: function() {
		var auth2 = gapi.auth2.getAuthInstance();
		
		auth2.signOut().then(function() {
			console.log('User signed out.');
		});
		// Revoke all tokens and scopes.
		auth2.disconnect();
		
		SignEvent.hideSignOutButton();
		SignEvent.hideProfileImage();
		SignEvent.hideProfileName();
  	},
	
	showSignOutButton: function() {
		SignEvent.signOutButton.style.visibility = 'visible';
	},
	
	hideSignOutButton: function() {
		SignEvent.signOutButton.style.visibility = 'hidden';
	},
	
	showProfileName: function(name) {
		SignEvent.profileName.innerHTML = name;
	},
	
	hideProfileName: function() {
		SignEvent.profileName.innerHTML = '';
	},
	
	showProfileImage: function(imageUrl) {
		// Show profile picture if user has any.
		if (typeof(imageUrl) !== 'undefined') {
			SignEvent.profileImage.className = 'profile-image-show';
			SignEvent.profileImage.src = imageUrl;
		}
	},
	
	hideProfileImage: function() {
		SignEvent.profileImage.className = 'profile-image-hide';
	},
	
	addEventListener: function() {
		SignEvent.signOutButton.addEventListener('click', SignEvent.signOut, false);
	}
	
};

window.onload = SignEvent.init();