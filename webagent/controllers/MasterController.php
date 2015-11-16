<?php

class MasterController {
	
	private $layoutView;
	private $formView;
	private $formModel;
	private $resultView;
	private $bookingView;
	
	
	public function __construct(
		LayoutView $layoutView, 
		FormView $formView, 
		FormModel $formModel, 
		ResultView $resultView,
		BookingView $bookingView) {
		
		$this -> layoutView = $layoutView;
		$this -> formView = $formView;
		$this -> formModel = $formModel;
		$this -> resultView = $resultView;
		$this -> bookingView = $bookingView;
	}
	
	public function showPage() {
		
		$this -> layoutView -> renderLayout();		
	}

	public function handleUserRequest() {
		
		if ($this -> formView -> didUserPressStart()) {
			
			$this -> formModel -> setDefaultURL($this -> formView -> getURL());
			$this -> formModel -> scrapePages();
			
			if (!empty($this -> formModel -> getMovies())) {
				echo $this -> resultView -> renderResult();
				
			} else {
				echo "No movies found"; // TODO: Throw exception instead.	
			}
		}
	}
	
}