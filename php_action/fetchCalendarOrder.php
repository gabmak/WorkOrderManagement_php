<?php 	

require_once 'db_connect.php';
//$worker_id = $_SESSION['workerId'];
$worker_id = $_POST['worker_id'];

$sql = "SELECT work_order.rec_date, work_order.work_order_no, work_order.complete_date FROM work_order, order_for_worker WHERE work_order.status != 0 AND  work_order.work_id = order_for_worker.work_id AND order_for_worker.worker_id = {$worker_id} ";
$result = $connect->query($sql);

$today = date("Y-m-d"); 

$output = array();

if($result->num_rows > 0) { 
 
 $title = "";
 $start = "";
 $end = "";
 

 while($row = $result->fetch_array()) {
 	
	$title = $row[1];
	$start = date("Y-m-d", strtotime($row[0]));
	 
	if ($row[2] == ""){
		$end = $today;
	} else {
		$end = date("Y-m-d", strtotime($row[2]));
	}

 	$output[] = array(
 		'title' => $title,
		'start' =>$start,
		'end' =>$end		
 		); 	
 } 

}// if num_rows

$connect->close();

echo json_encode($output);