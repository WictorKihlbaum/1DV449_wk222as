<?php

class FormView {

	private $formModel;
	
	private static $urlName = "LayoutView::UrlName";
	private static $start = "LayoutView::Start";
	private static $urlForm = "LayoutView::UrlForm";
	private static $urlText = "LayoutView::UrlText";
	
	
	public function __construct(FormModel $formModel) {
		
		$this -> formModel = $formModel;
	}
	
	public function getURL() {
	
		return $_POST[self::$urlName];	
	}
	
	public function renderForm() {
	
		return '
			<p id="'. self::$urlText .'">Ange URL:</p> 
			<form method="post" id="'. self::$urlForm .'" name="'. self::$urlForm .'"> 
				<input type="text" id="'. self::$urlName .'" name="'. self::$urlName .'" value="http://localhost:8080">
				<input type="submit" id="'. self::$start .'" name="'. self::$start .'" value="Start!" />
			</form>
		';	
	}
	
	public function didUserPressStart() {
	
		return isset($_POST[self::$start]);
	}
	
}