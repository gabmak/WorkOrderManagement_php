<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	
	$work_id 		= $_POST['work_id'];
	$startTime 	= $_POST['startTime']; 
 	
 
	$sql = "UPDATE work_order SET start_time = '$startTime', status = 2 WHERE work_id = {$work_id}";

	if($connect->query($sql) === TRUE) {
		$valid['success'] = true;
		$valid['messages'] = "Successfully Update";	
	} else {
		$valid['success'] = false;
		$valid['messages'] = "Error while updating product info";
	}

	 
$connect->close();

echo json_encode($valid);
 
} // /if $_POST