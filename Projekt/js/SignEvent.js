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
		
		console.log('ID: ' + profile.getId());
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
		
		GoogleDriveClass.checkAuth();
	},
	
	signOut: function() {
		var auth2 = gapi.auth2.getAuthInstance();
		
		auth2.signOut().then(function() {
			console.log('User signed out.');
		});
		
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
		if (typeof(imageUrl) !== 'undefined') {
			SignEvent.profileImage.style.display = 'inline';
			SignEvent.profileImage.src = imageUrl;
		}
	},
	
	hideProfileImage: function() {
		SignEvent.profileImage.style.display = 'none';
	},
	
	hideProfileImage: function() {
		SignEvent.profileImage.style.display = 'none';
	},
	
	addEventListener: function() {
		SignEvent.signOutButton.addEventListener('click', SignEvent.signOut, false);
	}
	
};

window.onload = SignEvent.init();