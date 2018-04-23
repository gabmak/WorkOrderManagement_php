<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$stationId = $_POST['stationId'];

if($stationId) { 

 $sql = "UPDATE station SET visible = 0 WHERE sta_id = {$stationId}";

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