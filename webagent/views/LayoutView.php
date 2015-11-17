<?php

class LayoutView {
	
	private $formView;
	
	
	public function __construct(FormView $formView) {
	
		$this -> formView = $formView;		
	}
	
	public function renderLayout() {
		
		echo '
			<!doctype html>
			<html>
				<head>
					<meta charset="utf-8">
					<title>Webagent</title>
					<link rel="stylesheet" type="text/css" href="../content/css/mainstyle.css">
				</head>
			
				<body>
					<div id="main-content">
						'. $this -> formView -> renderForm() .'
					</div>
				</body>
			</html>
		';
	}
	
}