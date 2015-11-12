<?php

class SiteModel {
	
	private $siteData;


	public function __construct($siteData) {
		
		$this -> siteData = $siteData;
	}
	
	public function getSiteData() {
	
		return $this -> siteData;	
	}
}