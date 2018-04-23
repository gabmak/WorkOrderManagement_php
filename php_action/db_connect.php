<?php 	

$localhost = "localhost";
$username = "root";
$password = "password";
$dbname = "floatplane";

// db connection
$connect = new mysqli($localhost, $username, $password, $dbname);

mysqli_query($connect,"SET NAMES 'utf8'");
	
// check connection
if($connect->connect_error) {
  die("Connection Failed : " . $connect->connect_error);
} else {
  // echo "Successfully connected";
}

?>