<?php

class LayoutView {
	
	private $homeView;
	private $aboutView;
	private $contactView;
	private $localImageView;
	
	private static $homeLink = 'LayoutView::HomeLink';
	private static $aboutLink = 'LayoutView::AboutLink';
	private static $contactLink = 'LayoutView::ContactLink';
	
	private static $homeURL = 'home';
	private static $aboutURL = 'about';
	private static $contactURL = 'contact';
	private static $localImageURL = 'localimage';
	
	
	public function __construct($homeView, $aboutView, $contactView, $localImageView) {
	
		$this -> homeView = $homeView;
		$this -> aboutView = $aboutView;
		$this -> contactView = $contactView;
		$this -> localImageView = $localImageView;
	}
	
	public function renderLayout() {
	
		echo '
		    <!doctype html>
			<html>
				<head>
					<meta charset="utf-8">
					<meta name="google-signin-client_id" content="788591829115-1uq193qnm8r72ujqej7l3hdj558hj7ej.apps.googleusercontent.com">
					<title>WebProject</title>
					<!-- Skeleton CSS Framework -->
					<link rel="stylesheet" type="text/css" href="css/normalize.css">
					<link rel="stylesheet" type="text/css" href="css/skeleton.css">
					<!-- Mainstyle CSS -->
					<link rel="stylesheet" type="text/css" href="css/mainstyle.css">
					<!-- Navigation CSS -->
					<link rel="stylesheet" type="text/css" href="css/nav.css">
					<!-- Contact Subpage CSS -->
        			<link rel="stylesheet" type="text/css" href="css/contact.css">
				</head>
				<body>
					<header>
						<h1>Web Project</h1>
						<!-- Google login/logout button -->
						<div class="g-signin2" data-onsuccess="App.onSignIn"></div>
						<a href="#" id="signout-button" onClick="App.signOut()">Sign out</a>
					</header>
					<main>
						<nav>
							<ul>
								<li '. $this -> isActive(self::$homeURL) .'><a href="?'. self::$homeURL .'" name="'. self::$homeLink .'">Home</a></li>
								<li '. $this -> isActive(self::$aboutURL) .'><a href="?'. self::$aboutURL .'" name="'. self::$aboutLink .'">About</a></li>
								<li '. $this -> isActive(self::$contactURL) .'><a href="?'. self::$contactURL .'" name="'. self::$contactLink .'">Contact</a></li>
							</ul>
            			</nav>
						
						'. $this -> renderContent() .'
						
					</main>
					<footer>
						<!-- TODO: Add content -->
					</footer>
					
					
					<script src="https://apis.google.com/js/client.js?onload=checkAuth"></script>
        
					<!-- Google Platform Library -->
					<script src="https://apis.google.com/js/platform.js" async defer></script>
					<!-- App JS -->
					<script src="js/App.js"></script>
					<!-- Load Feather code -->
					<script type="text/javascript" src="http://feather.aviary.com/imaging/v2/editor.js"></script>
					<!-- AviaryClass JS -->
					<script src="js/AviaryClass.js"></script>
					<!-- Clipboard JS -->
					<script src="js/clipboard.js-master/dist/clipboard.min.js"></script>
					<script src="js/ClipboardClass.js"></script>
					
					<script src="js/UploadImage.js"></script>
					
				</body>
			</html>
		';	
	}
	
	private function isActive($url) {
		// CSS purpose only.
		if ($_SERVER['QUERY_STRING'] == $url) {
			
			return 'id="active"'; 
		}
		
		return '';
	}
	
	private function renderContent() {
		
		switch ($_SERVER['QUERY_STRING']) {
		
			case self::$homeURL: 
				return $this -> homeView -> response();
				break;
				
			case self::$aboutURL: 
				return $this -> aboutView -> response();
				break;
				
			case self::$contactURL: 
				return $this -> contactView -> response();
				break;
				
			case self::$localImageURL:
				return $this -> localImageView -> response();
			
			default: 
				return $this -> homeView -> response();
				break;	
		}
	}
	
}