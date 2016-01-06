<?php

class HomeView {
	
	private static $localImageURL = 'localimage';
	
	
	public function response() {
		
		return $this -> renderPageContent();
	}
	
	private function renderPageContent() {
		
		return '
			<div id="app-container">
				
				<a href="?'. self::$localImageURL .'">
            		<div class="app-button" id="default-app"><span class="app-text">Edit image locally from your computer</span></div>
            	</a>
				
				<div class="app-button" id="drive-app"><span class="app-text">Edit image from your Google Drive</span></div>
            </div>
		';
	}
	
}