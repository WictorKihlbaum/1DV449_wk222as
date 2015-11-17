<?php

class ResultView {
	
	private $formModel;
	//private static $bookingButton = "ResultView::BookingButton";
	//private $bookings;
	
	
	public function __construct($formModel) {
		
		$this -> formModel = $formModel;
	}

	public function renderResult() {
		
		$movies = $this -> formModel -> getMovies();
		
		$result = '
			<ul id="main-list">
				<h1>Följande filmer hittades</h1>
				'. $this -> renderAvailableMovies($movies) .'
			</ul>
		';
		
		return $result;
	}
	
	private function renderAvailableMovies($movies) {
	
		$mainListElements = "";
		
		foreach ($movies as $movie) {
				
			if ($movie -> isAvailable()) {
				
				$mainListElements .= 
					'<li class="movie-hit">
						Filmen <strong>'. $movie -> getMovieName() .'</strong> 
						klockan '. $movie -> getTime() .' 
						på '. $movie -> getDay() .' 
						<a href="#">Välj denna och boka bord</a>'.
						$this -> verifyBookingAlternatives($movie);
			}
		}
		
		return $mainListElements;
	}
	
	private function verifyBookingAlternatives($movie) {
		
		$subListTopic = '<p><strong>Lediga bokningar</strong></p>';
		$subListElements = '';
		$bookings = $this -> formModel -> getBookings();
		
		foreach($bookings as $booking) {
			
			if ($booking -> getDay() == $movie -> getDay()) {
				
				if ($booking -> getStartTime() >= $movie -> getEndTime()) {
				
					$subListElements .= 
						'<li class="booking-hit">Det finns ett ledigt bord mellan klockan '. 
						$booking -> getStartTime() . 
						' och ' . $booking -> getEndTime() .
						' efter att sett filmen ' .
						'<strong>' . $movie -> getMovieName() . '</strong>' .
						' klockan ' .
						$movie -> getTime() .
						' <a href="#">Boka detta bord</a>';
					
				} else {
				
					$subListElements .= 
						'<li class="not-available">
							Den lediga tiden mellan klockan 
							'. $booking -> getStartTime() .' 
							och 
							'. $booking -> getEndTime() .'
							är antingen innan och/eller under filmens visning
						</li>';	
				}
			}
		}
		
		return '<ul class="sub-list">'. $subListTopic . $subListElements .'</ul></li>';
	}
	
}