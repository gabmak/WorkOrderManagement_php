<?php 	

//require_once 'core.php';
$localhost = "localhost";
$username = "root";
$password = "password";
$dbname = "floatplane";

// db connection
$connect = new mysqli($localhost, $username, $password, $dbname);

mysqli_query($connect,"SET NAMES 'utf8'");

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	
	
	$workerName = $_POST['workerName'];
	$telephone = $_POST['telephone'];
	$cbrePassport = $_POST['cbrePassport'];
	$accessLevel = $_POST['accessLevel'];
	$loginId = $_POST['loginId'];
	$password = $_POST['password'];
	$workerId = "";
	$continue = 0;

	$sql = "INSERT INTO worker (name, telephone, cbre_passport, status) 
	VALUES ('$workerName', '$telephone', '$cbrePassport', 1)";

	if($connect->query($sql) === TRUE) {
		$continue = 1;
	} else {
		$valid['messages'] = "Error 0";
	}
	
	if($continue = 1){
		$idSql = "SELECT max(worker_id) FROM worker";
		$result = $connect->query($idSql);
			if($result->num_rows > 0) { 
				while($row = $result->fetch_array()) {
	 				$workerId = $row[0];
					$continue = 2;
				} 
			} else {
				$valid['messages'] = "Error1";
		}
	
	if ($continue = 2){
		$accSql = "INSERT INTO login (login_id, worker_id, password, access_level, active) 
		VALUES ('$loginId', '$workerId', '$password','$accessLevel', 1)";
		
		if($connect->query($accSql) === TRUE) {
			$valid['success'] = true;
			$valid['messages'] = "Successfully Added";
		}
	}
	else {
		$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the login";
	}
			
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the worker";
	}

	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST