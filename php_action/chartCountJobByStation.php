<?php 	

//require_once 'core.php';
require_once 'db_connect.php';


$sql = "SELECT station.sta_name, COUNT(*) AS counter FROM station, work_type, work_order WHERE work_order.sta_id = station.sta_id AND work_order.type_id = work_type.type_id AND work_order.status != 0 GROUP BY work_order.sta_id";

$result = $connect->query($sql);

$data = array();
foreach ($result as $row){
	$data[] = $row;
}

$connect->close();

echo json_encode($data,JSON_UNESCAPED_UNICODE);