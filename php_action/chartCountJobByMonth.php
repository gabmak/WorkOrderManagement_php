<?php 	

//require_once 'core.php';
require_once 'db_connect.php';

$thisYear = date("Y");

$sql = "SELECT month(work_order.rec_date) as monthE, COUNT(*) as counter from work_order WHERE work_order.status !=0 AND year(work_order.rec_date) = $thisYear GROUP BY monthE";

$result = $connect->query($sql);

$data = array();
foreach ($result as $row){
	$data[] = $row;
}

$connect->close();

echo json_encode($data,JSON_UNESCAPED_UNICODE);