<?php

class ResultView {
	
	private $formModel;
	private static $bookingButton = "ResultView::BookingButton";
	//private $bookings;
	
	
	
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
						<a href="#">Välj denna och boka bord</a>'.
						$this -> verifyBookingAlternatives($movie);
			}
		}
		
		return $listElements;
	}
	
	private function verifyBookingAlternatives($movie) {
		
		$listElements = '';
		$bookings = $this -> formModel -> getBookings();
		
		foreach($bookings as $booking) {
			
			if ($booking -> getDay() == $movie -> getDay()) {
				
				if ($booking -> getStartTime() >= $movie -> getEndTime()) {
				
					$listElements .= 
						'<li>Det finns ett ledigt bord mellan klockan '. 
						$booking -> getStartTime() . 
						' och ' . $booking -> getEndTime() .
						' efter att sett filmen ' .
						'<strong>' . $movie -> getMovieName() . '</strong>' .
						' klockan ' .
						$movie -> getTime() .
						' <a href="#">Boka detta bord</a>';
					
				} else {
				
					$listElements .= '<li>Inte tillgänglig</li>';	
				}
			}
		}
		
		return '<ul>'. $listElements .'</ul></li>';
	}
	
}