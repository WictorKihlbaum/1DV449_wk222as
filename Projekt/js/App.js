"use strict";

var App = {
	
	init: function() {
		App.addEventListeners();
		
		var obj = gapi.auth2.getAuthInstance();
		console.log(obj);
	},
	
	addEventListeners: function() {
		document.getElementById('signout-button').addEventListener('click', App.signOut, false);
	},
	
	onSignIn: function(googleUser) {
		var obj = gapi.auth2.getAuthInstance();
		console.log(obj);
		var profile = googleUser.getBasicProfile();
	 	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
		
		// The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
	},
			
	signOut: function() {
		var auth2 = gapi.auth2.getAuthInstance();
		console.log(auth2);
		auth2.signOut().then(function () {
			console.log('User signed out.');
		});
	}
	
};

//window.onload = App.init();