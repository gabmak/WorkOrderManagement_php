<?php 	

//require_once 'core.php';
require_once 'db_connect.php';


$valid['success'] = array('success' => false, 'messages' => array());

// print_r($valid);
if($_POST) {
	
	$workId 					= $_POST['workId'];
	$orderDate 					= date('Y-m-d H:i:s', strtotime($_POST['orderDate']));	
	$workOrderNo 				= $_POST['workOrderNo'];
	$station 					= $_POST['station'];
	$description 				= $_POST['description'];
	$priority 					= $_POST['priority'];
	$workType     				= $_POST['workType'];
	$startTime     				= $_POST['startTime'];
	$endTime     				= $_POST['endTime'];
	$completeDate   			= $_POST['completeDate'];
	$reason     				= $_POST['workType'];
	$affectedNozzle     		= $_POST['affectedNozzle'];
	$status						= $_POST['status'];

	$sql = "UPDATE work_order SET order_date = '$orderDate', workOrderNo = '$workOrderNo', sta_id = '$station', description = '$description', priority = '$priority', startTime = '$startTime', endTime = '$endTime', completeDate = '$completeDate', reason = '$reason', affectedNozzle = '$affectedNozzle',  status = '$status' WHERE work_id = {$workId}";
	
	$connect->query($sql);


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