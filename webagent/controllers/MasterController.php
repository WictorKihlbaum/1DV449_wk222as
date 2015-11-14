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
	
	public function showPage() {
		
		$this -> layoutView -> renderLayout();		
	}

	public function handleUserRequest() {
		
		if ($this -> formView -> didUserPressStart()) {
			
			$this -> formModel -> setDefaultURL($this -> formView -> getURL());
			$this -> formModel -> scrapePages();
		}
	}
	
}