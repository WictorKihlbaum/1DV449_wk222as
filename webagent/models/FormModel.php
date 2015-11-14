<?php

class FormModel {

	private static $url = "http://localhost:8080";
	private $curlData;
	private $siteData = array();
	
	private $availableDays = array();
	
	
	public function curlGetRequest() {
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, self::$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$this -> curlData = curl_exec($ch);
		curl_close($ch);
		
		
		$this -> fetchSiteData();
		$this -> fetchSiteLinks();
	}
	
	public function fetchSiteData() {
	
		$dom = new DOMDocument();
		
		if ($dom -> loadHTML($this -> curlData)) {
			
			$xpath = new DOMXPath($dom);
			$items = $xpath -> query("//a/@href");
			
			foreach ($items as $item) {
				
				//echo self::$url . $item -> nodeValue . '<br />';
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, self::$url . $item -> nodeValue);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				$this -> siteData[] = curl_exec($ch);
				curl_close($ch);
			}
			
		} else {
			
			die("Fel vid inläsning av HTML");	
		}
	}
	
	private function fetchSiteLinks() {
	
		foreach ($this -> siteData as $site) {
			
			$dom = new DOMDocument();
		
			if ($dom -> loadHTML($site)) {
				
				$xpath = new DOMXPath($dom);
				$items = $xpath -> query("//a/@href");
				
				foreach ($items as $item) {
					
					echo $item -> nodeValue;
					
					/*$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL, self::$url . $item -> nodeValue);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					$this -> siteData[] = new SiteModel(curl_exec($ch));
					curl_close($ch);*/
				}
				
			} else {
				
				die("Fel vid inläsning av HTML");	
			}
		}
	}
		
	public function getUrl() {
		
		return self::$url;	
	}
}