<?php

class ResultView {
	
	private $formModel;
	private static $bookingLink = "ResultView::BookingLink";
	
	
	
	public function __construct($formModel) {
		
		$this -> formModel = $formModel;
	}

	public function renderResult() {
		
		$movies = $this -> formModel -> getMovies();
		
		$result = '
			<ul>
				<h1>Följande filmer hittades</h1>
				'. $this -> renderAvailableMovies($movies) .'
			</ul>
		';
		
		return $result;
	}
	
	private function renderAvailableMovies($movies) {
	
		$listElements = "";
		
		foreach ($movies as $movie) {
				
			if ($movie -> isAvailable()) {
				
				$listElements .= 
					'<li>
						Filmen <strong>'. $movie -> getMovieName() .'</strong> 
						klockan '. $movie -> getTime() .' 
						på '. $movie -> getDay() .' 
						<a href="/result" name="'. self::$bookingLink .'">Välj denna och boka bord</a>
					</li>';
			}
		}
		
		return $listElements;
	}
	
}