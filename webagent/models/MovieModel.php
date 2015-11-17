<?php 

class MovieModel {
	
	private $day;
	private $movieSpecs;
	
	
	public function __construct($day, $movieSpecs) {
		
		$this -> day = $day;
		$this -> movieSpecs = $movieSpecs;
	}
	
	public function getDay() {
		
		switch ($this -> day) {
		
			case "01": return "Fredag"; break;
			case "02": return "Lördag"; break;
			case "03": return "Söndag"; break;
			default: break;
		}
	}
	
	public function getMovieName() {
	
		switch ($this -> movieSpecs["movie"]) {
			
			case "01": return "Söderkåkar"; break;
			case "02": return "Fabian Bom"; break;
			case "03": return "Pensionat Paradiset"; break;
			default: break;
		}
	}
	
	public function isAvailable() {
	
		if ($this -> movieSpecs["status"] == 1) {
			
			return true;
		}
		return false;
	}
	
	public function getTime() {
		
		return $this -> movieSpecs["time"];	
	}
	
	public function getEndTime() {
	
		switch (true) {
			
			case preg_match("/16/", $this -> movieSpecs["time"]): return 18; break;
			case preg_match("/18/", $this -> movieSpecs["time"]): return 20; break;
			case preg_match("/21/", $this -> movieSpecs["time"]): return 23; break;
			default: break;
		}
	}
	
}