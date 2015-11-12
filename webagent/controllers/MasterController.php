<?php

class MasterController {
	
	private $layoutView;
	private $formView;
	
	
	public function __construct(LayoutView $layoutView, FormView $formView) {
		
		$this -> layoutView = $layoutView;
		$this -> formView = $formView;
	}

	public function handleUserRequest() {
		
		$this -> layoutView -> renderLayout();
		
		if ($this -> formView -> didUserPressStart()) {
			
			echo "You pressed Start!";
		}
	}
}