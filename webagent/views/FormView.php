<?php

class FormView {

	private $formModel;
	
	private static $urlName = "LayoutView::UrlName";
	private static $start = "LayoutView::Start";
	private static $urlForm = "LayoutView::UrlForm";
	//private static $urlText = "LayoutView::UrlText";
	
	
	public function __construct(FormModel $formModel) {
		
		$this -> formModel = $formModel;
	}
	
	public function getURL() {
	
		return $_POST[self::$urlName];	
	}
	
	public function renderForm() {
	
		return '
			<form method="post" id="'. self::$urlForm .'" name="'. self::$urlForm .'"> 
				<input type="text" id="'. self::$urlName .'" name="'. self::$urlName .'" value="http://localhost:8080" placeholder="Ange URL">
				<input type="submit" id="start-button" name="'. self::$start .'" value="Start!" />
			</form>
		';	
	}
	
	public function didUserPressStart() {
	
		return isset($_POST[self::$start]);
	}
	
}