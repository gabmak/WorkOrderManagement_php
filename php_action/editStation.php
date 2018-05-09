<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$stationId 			= $_POST['stationId'];
	$stationName 		= $_POST['editStationName'];
	$stationAddress		= $_POST['editStationAddress'];
	$stationTelephone	= $_POST['editStationTelephone'];
	$stationStatus		= $_POST['editStationStatus'];

				
	$sql = "UPDATE station SET sta_name = '$stationName', address = '$stationAddress', telephone = '$stationTelephone', status = '$stationStatus', visible = 1 WHERE sta_id = $stationId";

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
 
