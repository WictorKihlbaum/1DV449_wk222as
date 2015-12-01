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
		ResultView $resultView) {
		
		$this -> layoutView = $layoutView;
		$this -> formView = $formView;
		$this -> formModel = $formModel;
		$this -> resultView = $resultView;
	}
	
	public function showPage() {
		
		$this -> layoutView -> renderLayout();		
	}

	public function handleUserRequest() {
		
		try {
		
			if ($this -> formView -> didUserPressStart()) {
			
				$this -> formModel -> setDefaultURL($this -> formView -> getURL());
				$this -> formModel -> scrapePages();
				$this -> formModel -> processScrapedData();
				
				echo $this -> resultView -> renderResult();
			}
			
		} catch (NoAvailableDayException $e) {
				
			echo "Det finns ingen dag som alla kan delta.";
				
		} catch (NoMoviesAddedException $e) {
				
			echo "Inga filmer tillagda.";
				
		} catch (NoCalendarPageFoundException $e) {
			
			echo "Ingen kalendersida kunde hittas. Detta kan bero på att den antingen tagits bort eller bytt namn.";
					
		} catch (NoCinemaPageFoundException $e) {
				
			echo "Ingen filmsida kunde hittas. Detta kan bero på att den antingen tagits bort eller bytt namn.";
				
		} catch (NoDinnerPageFoundException $e) {
			
			echo "Ingen restaurangsida kunde hittas. Detta kan bero på att den antingen tagits bort eller bytt namn.";
		}
	}
		
}