<?php

// MAKE SURE ERRORS ARE SHOWN.
// error_reporting(E_ALL);
// ini_set('display_errors', 'On');

// SET DEFAULT TIME ZONE.
date_default_timezone_set('Europe/Stockholm');

// INCLUDE ALL FILES NEEDED.

// EXCEPTIONS.
require_once('exceptions/NoAvailableDayException.php');
require_once('exceptions/NoMoviesAddedException.php');
require_once('exceptions/NoCalendarPageFoundException.php');
require_once('exceptions/NoCinemaPageFoundException.php');
require_once('exceptions/NoDinnerPageFoundException.php');

// MODELS.
require_once('models/FormModel.php');
require_once('models/PageModel.php');
require_once('models/MovieModel.php');
require_once('models/BookingModel.php');

// VIEWS.
require_once('views/LayoutView.php');
require_once('views/FormView.php');
require_once('views/ResultView.php');

// CONTROLLERS.
require_once('controllers/MasterController.php');

// CREATE OBJECTS OF THE MODELS.
$formModel = new FormModel();

// CREATE OBJECTS OF THE VIEWS.
$formView = new FormView($formModel);
$layoutView = new LayoutView($formView);
$resultView = new ResultView($formModel);

// CREATE OBJECTS OF THE CONTROLLERS.
$masterController = new MasterController($layoutView, $formView, $formModel, $resultView);

// CALL FUNCTIONS.
$masterController -> showPage();
$masterController -> handleUserRequest();