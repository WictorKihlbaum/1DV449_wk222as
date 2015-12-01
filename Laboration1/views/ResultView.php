<?php

class ResultView {
	
	private $formModel;
	
	
	public function __construct($formModel) {
		
		$this -> formModel = $formModel;
	}

	public function renderResult() {
		
		$movies = $this -> formModel -> getMovies();
		
		$result = '
			<ul id="main-list">
				<h1 id="topic">Följande filmer hittades</h1>
				'. $this -> renderAvailableMovies($movies) .'
			</ul>
		';
		
		return $result;
	}
	
	private function renderAvailableMovies($movies) {
	
		$mainListElements = "";
		$id = 0;
		
		foreach ($movies as $movie) {
			
			$id += 1;
				
			if ($movie -> isAvailable()) {
				
				$mainListElements .= 
					'<li class="movie-hit">
						Filmen <strong>'. $movie -> getMovieName() .'</strong> 
						klockan '. $movie -> getTime() .' 
						på '. $movie -> getDay() .' 
						<a href="#" onClick="HandleBooking.showSubList('. $id .')">Välj denna och boka bord</a>'.
						$this -> renderBookingAlternatives($movie, $id);
			}
		}
		
		return $mainListElements;
	}
	
	private function renderBookingAlternatives($movie, $id) {
		
		$subListTopic = '<p><strong>Lediga bokningar <a href="#" onClick="HandleBooking.hideSubList('. $id .')">(Dölj)</a></strong></p>';
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
		
		return '<ul class="sub-list" id="'. $id .'">'. $subListTopic . $subListElements .'</ul></li>';
	}
	
}