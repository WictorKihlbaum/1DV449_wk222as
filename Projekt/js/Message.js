/* This JS-file handles success/error-messages. */
"use strict";

var Message = {
	
	errorMessage: null,
	successMessage: null,
	

	init: function() {
		Message.errorMessage = document.getElementById('error-message');
		Message.successMessage = document.getElementById('success-message');
	},
	
	showErrorMessage: function(message) {
		Message.errorMessage.innerHTML = message + Message.getCloseButtonError();
		Message.errorMessage.className = 'error-message-show';
	},
	
	removeErrorMessage: function() {
		Message.errorMessage.className += ' fadeout';
		
		setTimeout(function() {
        	Message.errorMessage.className = 'message-hide';
    	}, 500);
	},
	
	showSuccessMessage: function(message) {
		Message.successMessage.innerHTML = message + Message.getCloseButtonSuccess();
		Message.successMessage.className = 'success-message-show';
	},
	
	removeSuccessMessage: function() {
		Message.successMessage.className += ' fadeout';
		
		setTimeout(function() {
        	Message.successMessage.className = 'message-hide';
    	}, 500);
	},
	
	getCloseButtonSuccess: function() {
		return '<img src="images/close_button_small.png" ' +
		'alt="X" ' +
		'title="Close window" ' +
		'class="close-message" ' +
		'onclick="Message.removeSuccessMessage()" />';
	},
	
	getCloseButtonError: function() {
		return '<img src="images/close_button_small.png" ' +
		'alt="X" ' +
		'title="Close window" ' +
		'class="close-message" ' +
		'onclick="Message.removeErrorMessage()" />';
	}
	
};

window.onload = Message.init();