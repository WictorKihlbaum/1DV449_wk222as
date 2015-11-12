<?php

class FormView {

	private static $url = "http://localhost:8080/";
	private static $urlName = "LayoutView::UrlName";
	private static $start = "LayoutView::Start";
	private static $urlForm = "LayoutView::UrlForm";
	private static $urlText = "LayoutView::UrlText";
	
	
	public function renderForm() {
	
		return '
			<p id="'. self::$urlText .'">Ange URL:</p> 
			<form method="post" id="'. self::$urlForm .'" name="'. self::$urlForm .'"> 
				<input type="text" id="'. self::$urlName .'" name="'. self::$urlName .'" value="'. self::$url .'">
				<input type="submit" id="'. self::$start .'" name="'. self::$start .'" value="Start!" />
			</form>
		';	
	}
	
	public function didUserPressStart() {
	
		return isset($_POST[self::$start]);
	}
	
	public function getURL() {
	
		return self::$url;	
	}
	
}