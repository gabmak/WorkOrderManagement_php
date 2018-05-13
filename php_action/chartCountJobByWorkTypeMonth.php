<?php 	

//require_once 'core.php';
require_once 'db_connect.php';

$thisYear = date("Y");
$thisMonth = date("m");

$sql = "SELECT work_type.type, COUNT(*) as counter FROM work_order, work_type WHERE work_order.status !=0 AND work_order.type_id = work_type.type_id AND year(work_order.rec_date) = $thisYear AND month(work_order.rec_date)= $thisMonth GROUP by work_type.type";

$result = $connect->query($sql);

$data = array();
foreach ($result as $row){
	$data[] = $row;
}

$connect->close();

echo json_encode($data,JSON_UNESCAPED_UNICODE);