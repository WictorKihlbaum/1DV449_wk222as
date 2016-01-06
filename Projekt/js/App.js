"use strict";

var App = {
	
	init: function() {
	
		App.addEventListeners();
	},
	
	addEventListeners: function() {
		document.getElementById('signout-button').addEventListener('click', App.signOut, false);
	},
	
	onSignIn: function(googleUser) {
		var profile = googleUser.getBasicProfile();
	 	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
	},
			
	signOut: function() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			console.log('User signed out.');
		});
	}
	
};

window.onload = App.init;