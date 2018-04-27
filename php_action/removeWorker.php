<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$workerId = $_POST['workerId'];
$continue = 0;

if($workerId) { 

 $sql = "UPDATE worker SET status = 2 WHERE worker_id = {$workerId}";

 if($connect->query($sql) === TRUE) {
	 $continue = 1;
 }
 if($continue = 1){
	 $loginSql = "UPDATE login SET active = 0 WHERE worker_id = {$workerId}";
	 if($connect->query($loginSql) === TRUE) {
		 $continue = 2;
	 }
 } 
 	
 if ($continue = 2) {
	 $valid['success'] = true;
	 $valid['messages'] = "Successfully Removed";
 	} else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the worker";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST