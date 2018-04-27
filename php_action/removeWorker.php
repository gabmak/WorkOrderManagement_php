<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$workerId = $_POST['workerId'];

if($workerId) { 

 $sql = "UPDATE worker SET visible = 2 WHERE worker_id = {$workerId}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the worker";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST