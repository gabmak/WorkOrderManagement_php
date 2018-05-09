<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$workerId 			= $_POST['workerId'];
	$workerName 		= $_POST['editWorkerName'];
	$workerTelephone	= $_POST['editTelephone'];
	$workerPassport		= $_POST['editPassport'];

				
	$sql = "UPDATE worker SET name = '$workerName', cbre_passport = '$workerPassport', telephone = '$workerTelephone', status = 1 WHERE worker_id = $workerId";

	if($connect->query($sql) === TRUE) {
		$valid['success'] = true;
		$valid['messages'] = "Successfully Update";	
	} else {
		$valid['success'] = false;
		$valid['messages'] = "Error while updating worker info";
	}

} // /$_POST
	 
$connect->close();

echo json_encode($valid);
 
