<?php

class PageModel {

	private $name;
	private $data;
	
	
	public function __construct($name, $data) {
		
		$this -> name = $name;
		$this -> data = $data;
	}
	
	public function getPageName() {
	
		return $this -> name;	
	}
	
	public function getPageData() {
		
		return $this -> data;	
	}
	
}