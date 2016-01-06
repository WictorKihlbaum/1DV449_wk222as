<?php

class AboutView {
	
	public function response() {
		
		return $this -> renderPageContent();
	}
	
	private function renderPageContent() {
		
		return '
			<h1>About</h1>
		';
	}
	
}