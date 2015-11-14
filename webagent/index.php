<?php

// MAKE SURE ERRORS ARE SHOWN.
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// SET DEFAULT TIME ZONE.
date_default_timezone_set('Europe/Stockholm');

// INCLUDE ALL FILES NEEDED.

// MODELS.
require_once('models/FormModel.php');
require_once('models/SiteModel.php');

// VIEWS.
require_once('views/LayoutView.php');
require_once('views/FormView.php');

// CONTROLLERS.
require_once('controllers/MasterController.php');

// CREATE OBJECTS OF THE MODELS.
$formModel = new FormModel();

// CREATE OBJECTS OF THE VIEWS.
$formView = new FormView($formModel);
$layoutView = new LayoutView($formView);

// CREATE OBJECTS OF THE CONTROLLERS.
$masterController = new MasterController($layoutView, $formView, $formModel);

// CALL FUNCTIONS.
$masterController -> showPage();
$masterController -> handleUserRequest();