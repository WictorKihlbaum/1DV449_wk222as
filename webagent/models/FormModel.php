<?php

class FormModel {

	private $defaultURL; //"http://localhost:8080";
	private $startPageData;
	private $subPageData = array();
	private $people = array();
	//private $availableDays = array();
	
	
	public function scrapePages() {
	
		$this -> scrapeStartPage($this -> defaultURL);
		$this -> getSubPageData();
		$this -> getCalendarLinks();
	}
	
	public function setDefaultURL($url) {
	
		$this -> defaultURL = $url;		
	}
	
	public function scrapeStartPage($url) {
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$this -> startPageData = curl_exec($ch);
		curl_close($ch);
	}
	
	public function getSubPageData() {
	
		$dom = new DOMDocument();
		
		if ($dom -> loadHTML($this -> startPageData)) {
			
			$xpath = new DOMXPath($dom);
			$items = $xpath -> query("//a/@href");
			
			foreach ($items as $item) {
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $this -> defaultURL . $item -> nodeValue);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
				$this -> subPageData[] = new SiteModel($item -> nodeValue, curl_exec($ch));
				curl_close($ch);
			}
			
		} else {
			
			die("Fel vid inläsning av HTML");	
		}
	}
	
	private function getCalendarLinks() {
		
		foreach ($this -> subPageData as $data) {
			
			if (preg_match('/calendar/i', $data -> getName())) {
				
				$dom = new DOMDocument();
				
				if ($dom -> loadHTML($data -> getData())) {
					
					$xpath = new DOMXPath($dom);
					$items = $xpath -> query("//a/@href");
					
					foreach ($items as $item) {
						
						$ch = curl_init();
						curl_setopt($ch, CURLOPT_URL, $this -> defaultURL . $data -> getName() . '/' . $item -> nodeValue);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
						
						$this -> people[] = new PersonModel(); // TODO: Add name and availabledays.
						
						
						$this -> hej = curl_exec($ch); // change name.
						var_dump($this -> hej);
						
						curl_close($ch);
					} 
					
				} else {
					
					die("Fel vid inläsning av HTML");
				}
			}
		}
	}
		
}