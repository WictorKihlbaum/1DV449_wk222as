<?php

class FormModel {

	private $defaultURL;
	private $startPageData;
	private $subPageData = array();
	private $people = array();
	private $availableDays = array();
	private $movies = array();
	private $bookings = array();
	
	
	public function scrapePages() {
	
		$this -> scrapeStartPageData();
		$this -> scrapeSubPageData();
		$this -> scrapePeoplePageData();
		$this -> verifyAvailableDays(); // TODO: Move this.
		$this -> verifyAvailableMovies(); // TODO: Move this.
		$this -> verifyAvailableBookings(); // TODO: Move this.
	}
	
	public function getBookings() {
		return $this -> bookings;	
	}
	
	private function verifyAvailableBookings() {
	
		$dinnerPageFound = false;
		
		foreach ($this -> subPageData as $data) {
			
			$pageName = $data -> getPageName();
			
			if (preg_match('/dinner/i', $pageName)) {
				
				$dinnerPageFound = true;
				$dom = new DOMDocument();
				
				if ($dom -> loadHTML($data -> getPageData())) {
					
					$xpath = new DOMXPath($dom);
					$availableBookings = $xpath -> query('//input/@value');
					
					foreach ($availableBookings as $booking) {
						$this -> bookings[] = new BookingModel($booking -> nodeValue);
					}
					
				} else {
					
					die("Fel vid inläsning av HTML");
				}
			} 
		}
		
		if (!$dinnerPageFound) {
			echo "Restaurangsida kunde ej hittas. Sidan har antingen tagits bort eller bytt namn."; // Throw exception instead.
		}
	}
	
	public function getMovies() {
		return $this -> movies;	
	}
	
	private function getMovieDayResult($availableDay, $movieOptions, $pageName) {
		
		foreach ($movieOptions as $movieOption) {
			
			$url = $this -> defaultURL . $pageName .'/check?day='. $availableDay .'&movie='. $movieOption -> nodeValue.'';
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			
			// Create object for each movie and its different showtimes.
			foreach (json_decode(curl_exec($ch), true) as $movie) {
				$this -> movies[] = new MovieModel($availableDay, $movie);
			}
			
			curl_close($ch);
		}
	}
	
	private function verifyAvailableMovies() {
	
		$moviePageFound = false;
		
		foreach ($this -> subPageData as $data) {
			
			$pageName = $data -> getPageName();
			
			if (preg_match('/cinema/i', $pageName)) {
				
				$moviePageFound = true;
				$dom = new DOMDocument();
				
				if ($dom -> loadHTML($data -> getPageData())) {
					
					$xpath = new DOMXPath($dom);
					$dayOptions = $xpath -> query('//select[@id="day"]/option/@value');
					$movieOptions = $xpath -> query('//select[@id="movie"]/option/@value');
					
					foreach ($dayOptions as $dayOption) {
					
						foreach ($this -> availableDays as $availableDay) {
							
							if ($dayOption -> nodeValue == $availableDay) {
								
								$this -> getMovieDayResult($availableDay, $movieOptions, $pageName);
							}
						}
					}
					
				} else {
					
					die("Fel vid inläsning av HTML");
				}
			} 
		}
		
		if (!$moviePageFound) {
			echo "Filmsida kunde ej hittas. Sidan har antingen tagits bort eller bytt namn.";
		}
	}
	
	public function setDefaultURL($url) {
		$this -> defaultURL = $url;		
	}
	
	public function scrapeStartPageData() {
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this -> defaultURL);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$this -> startPageData = curl_exec($ch);
		curl_close($ch);
	}
	
	public function scrapeSubPageData() {
	
		$dom = new DOMDocument();
		
		if ($dom -> loadHTML($this -> startPageData)) {
			
			$xpath = new DOMXPath($dom);
			$items = $xpath -> query("//a/@href");
			
			foreach ($items as $item) {
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $this -> defaultURL . $item -> nodeValue);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
				$this -> subPageData[] = new PageModel($item -> nodeValue, curl_exec($ch));
				curl_close($ch);
			}
			
		} else {
			
			die("Fel vid inläsning av HTML");	
		}
	}
	
	private function scrapePeoplePageData() {
		
		$calendarPageFound = false;
		
		foreach ($this -> subPageData as $data) {
			
			if (preg_match('/calendar/i', $data -> getPageName())) {
				
				$calendarPageFound = true;
				$dom = new DOMDocument();
				
				if ($dom -> loadHTML($data -> getPageData())) {
					
					$xpath = new DOMXPath($dom);
					$items = $xpath -> query("//a/@href");
					
					foreach ($items as $item) {
						
						$url = $this -> defaultURL . $data -> getPageName() . '/' . $item -> nodeValue;
						
						$ch = curl_init();
						curl_setopt($ch, CURLOPT_URL, $url);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
						$this -> people[] = new PageModel($item -> nodeValue, curl_exec($ch));
						curl_close($ch);
					} 
					
				} else {
					
					die("Fel vid inläsning av HTML");
				}
			} 
		}
		
		if (!$calendarPageFound) {
			echo "Kalendersida kunde ej hittas. Sidan har antingen tagits bort eller bytt namn."; // TODO: Throw Exception instead.
		}
	}
	
	private function verifyAvailableDays() {
		
		$amountOfPeople = count($this -> people);	
		$friday = 0;
		$saturday = 0;
		$sunday = 0;
	
		foreach ($this -> people as $person) {
			
			$dom = new DOMDocument();
			
			if ($dom -> loadHTML($person -> getPageData())) {
				
				$xpath = new DOMXPath($dom);
				$days = $xpath -> query("//th");
				$dayStatus = $xpath -> query("//td");
				
				for ($i = 0; $i <= count($days); $i++) {
					
					if ($days[$i] -> nodeValue == "Friday" && 
						preg_match('/ok/i', $dayStatus[$i] -> nodeValue)) {
						
						$friday += 1;
						
					} else if ($days[$i] -> nodeValue == "Saturday" && 
						preg_match('/ok/i', $dayStatus[$i] -> nodeValue)) {
						
						$saturday += 1;
					
					} else if ($days[$i] -> nodeValue == "Sunday" && 
						preg_match('/ok/i', $dayStatus[$i] -> nodeValue)) {
						
						$sunday += 1;
					}
				}
				
			} else {
					
				die("Fel vid inläsning av HTML");
			}
		}
		
		if ($friday == $amountOfPeople) {
			$this -> availableDays[] = "01";
		}
		if ($saturday == $amountOfPeople) {
			$this -> availableDays[] = "02";	
		}
		if ($sunday == $amountOfPeople) {
			$this -> availableDays[] = "03";	
		}
		
		if (empty($this -> availableDays)) {
			echo "Det finns ingen dag som alla kan delta"; // TODO: Throw Exception instead.
		}
	}
		
}