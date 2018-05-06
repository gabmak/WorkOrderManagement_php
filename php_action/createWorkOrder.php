<?php 	

//require_once 'core.php';
require_once 'db_connect.php';


$valid['success'] = array('success' => false, 'messages' => array());

// print_r($valid);
if($_POST) {	
	$orderDate 					= date('Y-m-d H:i:s', strtotime($_POST['orderDate']));	
	$workOrderNo 				= $_POST['workOrderNo'];
	$station 					= $_POST['station'];
	$description 				= $_POST['description'];
	$priority 					= $_POST['priority'];
	$workType     				= $_POST['workType'];
	
	
	$sql = "INSERT INTO work_order (rec_date, work_order_no, sta_id, work_description, priority, type_id, status) VALUES ('$orderDate', '$workOrderNo', '$station', '$description', '$priority', '$workType', 1)";
	
	
	$work_id;
	$workStatus = false;
	if($connect->query($sql) === true) {
		$work_id = $connect->insert_id;
		
		$workStatus = true;
	}


	$workerStatus = false;

	for($x = 0; $x < count($_POST['workerName']); $x++) {			
		$orderWorkerSql = "INSERT INTO order_for_worker (work_id, worker_id) VALUES ('$work_id', '".$_POST['workerName'][$x]."')";
		$connect ->query($orderWorkerSql);
		}


	$valid['success'] = true;
	$valid['messages'] = "Successfully Added";		
	
	$connect->close();


 
} 
echo json_encode($valid);