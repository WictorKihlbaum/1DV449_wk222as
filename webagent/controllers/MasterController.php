<?php

class MasterController {
	
	private $layoutView;
	private $formView;
	private $formModel;
	
	
	public function __construct(LayoutView $layoutView, FormView $formView, FormModel $formModel) {
		
		$this -> layoutView = $layoutView;
		$this -> formView = $formView;
		$this -> formModel = $formModel;
	}

	public function handleUserRequest() {
		
		$this -> layoutView -> renderLayout();
		
		if ($this -> formView -> didUserPressStart()) {
			
			$this -> formModel -> curlGetRequest();
			$this -> formModel -> createDomDocument();
		}
	}
}