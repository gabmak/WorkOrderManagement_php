<?php 

session_start();

require_once 'db_connect.php';

// echo $_SESSION['userId'];

if(!$_SESSION['userId']) {
	header('location: http://localhost/FYP/index.php');
	
} else if ($_SESSION['isAdmin'] == 1){
	header('location: http://localhost/FYP/includes/header.php');
} else if ($_SESSION['isAdmin'] == 2){
	header('location: http://localhost/FYP/includes/header1.php');
}

?>