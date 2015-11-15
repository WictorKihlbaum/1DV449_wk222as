<?php

class FormModel {

	private $defaultURL; //"http://localhost:8080";
	private $startPageData;
	private $subPageData = array();
	private $people = array();
	private $availableDays = array();
	
	
	public function scrapePages() {
	
		$this -> scrapeStartPageData($this -> defaultURL);
		$this -> scrapeSubPageData();
		$this -> scrapePeoplePageData();
		$this -> verifyAvailableDays(); // TODO: Move this function.
		$this -> verifyAvailableMovies(); // TODO: Move this function.
	}
	
	private function verifyAvailableMovies() {
	
		$moviePageFound = false;
		
		foreach ($this -> subPageData as $data) {
			
			if (preg_match('/cinema/i', $data -> getPageName())) {
				
				$moviePageFound = true;
				$dom = new DOMDocument();
				
				if ($dom -> loadHTML($data -> getPageData())) {
					
					// TODO: ...
					
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
	
	public function scrapeStartPageData($url) {
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
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
						
						$ch = curl_init();
						curl_setopt($ch, CURLOPT_URL, $this -> defaultURL . $data -> getPageName() . '/' . $item -> nodeValue);
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
			
			echo "Kalendersida kunde ej hittas. Sidan har antingen tagits bort eller bytt namn.";
		}
	}
	
	private function verifyAvailableDays() {
		
		$amountOfPeople = count($this -> people);
		$availableDays = array();
			
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
			$availableDays[] = "Friday";
		}
		if ($saturday == $amountOfPeople) {
			$availableDays[] = "Saturday";	
		}
		if ($sunday == $amountOfPeople) {
			$availableDays[] = "Sunday";	
		}
	}
		
}