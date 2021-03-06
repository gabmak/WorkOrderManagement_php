<?php 	

//require_once 'core.php';
require_once 'db_connect.php';


$valid['success'] = array('success' => false, 'messages' => array());

// print_r($valid);
if($_POST) {
	
	$workId 					= $_POST['work_id'];
	$orderDate 					= date('Y-m-d H:i:s', strtotime($_POST['orderDate']));
	$workOrderNo 				= $_POST['workOrderNo'];
	$station 					= $_POST['station'];
	$description 				= $_POST['description'];
	$priority 					= $_POST['priority'];
	$workType     				= $_POST['workType'];
	$startTime     				= $_POST['startTime'];
	$endTime     				= $_POST['endTime'];
	$completeDate   			= $_POST['completeDate'];
	$reason     				= $_POST['reason'];
	$affectedNozzle     		= $_POST['affectedNozzle'];
	$status						= $_POST['status'];
	

	

	$sql = "UPDATE work_order SET rec_date = '$orderDate', work_order_no = '$workOrderNo', sta_id = '$station', work_description = '$description', priority = '$priority', type_id = '$workType', reason = '$reason', status = '$status' WHERE work_id = {$workId}";
	
	$connect->query($sql);
	
	if ($startTime && $endTime){
		$workDoneSql = "UPDATE work_order SET start_time = '$startTime', end_time = '$endTime', complete_date = '$completeDate', affected_nozzle = '$affectedNozzle' WHERE work_id = {$workId}";
		$connect->query($workDoneSql);
		
	} else if ($startTime){
		$startSql = "UPDATE work_order SET start_time = '$startTime'WHERE work_id = {$workId}";
		$connect->query($startSql);
	}	

	// remove the order item data from order item table
	for($x = 0; $x < count($_POST['workerName']); $x++) {			
		$removeOrderSql = "DELETE FROM order_for_worker WHERE work_id = {$workId}";
		$connect->query($removeOrderSql);	
	} // /for quantity

			// insert the order item data 
		for($x = 0; $x < count($_POST['workerName']); $x++) {			
					// add into order_item
				$orderItemSql = "INSERT INTO order_for_worker (work_id, worker_id) 
				VALUES ({$workId}, '".$_POST['workerName'][$x]."')";

				$connect->query($orderItemSql);		
			} // while	

	

	$valid['success'] = true;
	$valid['messages'] = "Successfully Updated";		
	
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST
// echo json_encode($valid);