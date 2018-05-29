<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$stationName = $_POST['stationName'];
	$address = $_POST['address'];
	$telephone = $_POST['telephone'];
	$stationStatus = $_POST['stationStatus'];

	$sql = "INSERT INTO station (sta_name, address, telephone, status, visible) 
	VALUES ('$stationName', '$address', $telephone, '$stationStatus', 1)";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Added";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the members";
	}

	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST