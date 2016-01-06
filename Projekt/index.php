<?php

// MAKE SURE ERRORS ARE SHOWN.
// (TURNED OFF FOR PUBLIC SERVER)
 error_reporting(E_ALL);
 ini_set('display_errors', 'On');

// SET DEFAULT TIME ZONE.
date_default_timezone_set('Europe/Stockholm');

// INCLUDE ALL FILES NEEDED.

// MODELS.


// VIEWS.
require_once('view/LayoutView.php');
require_once('view/HomeView.php');
require_once('view/AboutView.php');
require_once('view/ContactView.php');
require_once('view/LocalImageView.php');


// CONTROLLERS.
require_once('controller/MasterController.php');


// CREATE OBJECTS OF THE VIEWS.

$homeView = new HomeView();
$aboutView = new AboutView();
$contactView = new ContactView();
$localImageView = new LocalImageView();
$layoutView = new layoutView($homeView, $aboutView, $contactView, $localImageView);


// CREATE OBJECTS OF CONTROLLERS.
//$masterController = new MasterController();

// CALL FUNCTIONS.
$layoutView -> renderLayout();