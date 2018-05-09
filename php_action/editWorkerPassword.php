<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$workerId 		= $_POST['workerId'];
	$password 		= $_POST['editPassword1'];
					
	$sql = "UPDATE login SET password = '$password' WHERE worker_id = $workerId";

	if($connect->query($sql) === TRUE) {
		$valid['success'] = true;
		$valid['messages'] = "Successfully Update";	
	} else {
		$valid['success'] = false;
		$valid['messages'] = "Error while updating station info";
	}

} // /$_POST
	 
$connect->close();

echo json_encode($valid);
 
