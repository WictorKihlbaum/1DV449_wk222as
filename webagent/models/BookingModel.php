<?php

class BookingModel {
	
	private $bookingValue;
	
	
	public function __construct($bookingValue) {
		
		$this -> bookingValue = $bookingValue;
	}
	
	public function getDay() {
	
		switch (true) {
			
			case preg_match('/fre/', $this -> bookingValue): return "Fredag"; break;
			case preg_match('/lor/', $this -> bookingValue): return "Lördag"; break;
			case preg_match('/son/', $this -> bookingValue): return "Söndag"; break;
			default: break;
		}
	}
	
	public function getStartTime() {
	
		switch (true) {
			
			case preg_match('/1416/', $this -> bookingValue): return 14; break;
			case preg_match('/1618/', $this -> bookingValue): return 16; break;
			case preg_match('/1820/', $this -> bookingValue): return 18; break;
			case preg_match('/2022/', $this -> bookingValue): return 20; break;
			default: break;
		}	
	}
	
	public function getEndTime() {
	
		switch (true) {
			
			case preg_match('/1416/', $this -> bookingValue): return 16; break;
			case preg_match('/1618/', $this -> bookingValue): return 18; break;
			case preg_match('/1820/', $this -> bookingValue): return 20; break;
			case preg_match('/2022/', $this -> bookingValue): return 22; break;
			default: break;
		}	
	}
	
}