<?php 	

//require_once 'core.php';
require_once 'db_connect.php';

$workId = $_POST['work_id'];


$sql = "SELECT work_id, rec_date, work_order_no, sta_id, work_description, start_time, end_time, complete_date, reason, priority, affected_nozzle, status FROM work_order WHERE status !=0 AND work_id = {$workId}";

$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row,JSON_UNESCAPED_UNICODE);