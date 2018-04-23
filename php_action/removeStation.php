<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$stationID = $_POST['stationID'];

if($stationID) { 

 $sql = "UPDATE Station SET visible = 0 WHERE sta_id = {$stationID}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the brand";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST