<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$work_id = $_POST['work_id'];

if($work_id) { 

 $sql = "UPDATE work_order SET status = 0 WHERE work_id = {$work_id}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the record";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST