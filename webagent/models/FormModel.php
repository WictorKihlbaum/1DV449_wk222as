<?php

class FormModel {

	private static $url = "http://localhost:8080";
	private $curlData;
	private $siteData = array();
	
	
	public function curlGetRequest() {
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, self::$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		
		$this -> curlData = curl_exec($ch);
		curl_close($ch);	
	}
	
	public function createDomDocument() {
	
		$dom = new DOMDocument();
		
		if ($dom -> loadHTML($this -> curlData)) {
			
			$xpath = new DOMXPath($dom);
			$items = $xpath -> query("//a/@href");
			
			foreach ($items as $item) {
				
				var_dump($item -> nodeValue);
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, self::$url . $item -> nodeValue);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				
				$this -> siteData[] = new SiteModel(curl_exec($ch));
				curl_close($ch);
			}
			
		} else {
			
			die("Fel vid inläsning av HTML");	
		}
	}
		
	public function getUrl() {
		
		return self::$url;	
	}
}