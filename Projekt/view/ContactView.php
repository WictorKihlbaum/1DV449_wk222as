<?php

class ContactView {
	
	public function response() {
		
		return 
			$this -> renderContactPage();
	}
	
	public function renderContactPage() {
		
		return '
			<div id="contact-circles-container">
                <a href="https://www.facebook.com/wictor.kihlbaum">
                    <div class="contact-circles" id="facebook-circle"></div>
                </a>
                
                <a href="https://twitter.com/WictorKihlbaum">
                    <div class="contact-circles" id="twitter-circle"></div>
                </a>
                
                <div class="contact-circles" id="google-circle" data-clipboard-text="wictor.kihlbaum@gmail.com" title="Copy email to clipboard"></div>
            </div>
		';
	}
	
}