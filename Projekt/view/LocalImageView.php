<?php

class LocalImageView {

	public function response() {
	
		return $this -> renderPageContent();	
	}
	
	private function renderPageContent() {
	
		return '
		
			<input type="file" onchange="UploadImage.previewFile()"><br />
			<img src="" height="200" alt="Image preview..." id="local-image">
			
			
			<!-- <img id="local-image" src="http://weknowyourdreams.com/images/cat/cat-02.jpg" height="200" alt="image preview..." /> -->
        
            <!-- Add an edit button, passing the HTML id of the image and the public URL of the image -->
			
            <p>
				<input type="button" id="edit-button" value="Edit image" alt="Edit image" />
			</p>
			
			
			
		
		';	
		
		
	}
	
	private function addFunction() {
	
		return 'onclick="return AviaryClass.launchEditor("local-image", UploadImage.getImageSrc())"';	
	}
	
	//<a href="#" onclick="return launchEditor('editableimage1', 'http://example.com/public/images/goat.jpg');">Edit!</a>
	
	//<input type="button" id="edit-button" value="Edit image" onclick="return AviaryClass.launchEditor("local-image", UploadImage.getImageSrc());" alt="Edit image" />
}