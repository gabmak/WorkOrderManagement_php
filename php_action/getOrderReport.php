<?php 

require_once 'db_connect.php';

if($_POST) {

	$startDate = $_POST['startDate'];
	$date = DateTime::createFromFormat('m/d/Y',$startDate);
	$start_date = $date->format("Y-m-d");


	$endDate = $_POST['endDate'];
	$format = DateTime::createFromFormat('m/d/Y',$endDate);
	$end_date = $format->format("Y-m-d");

	$sql = "SELECT * FROM work_order WHERE rec_date >= '$start_date' AND rec_date <= '$end_date' and status != 0";
	$query = $connect->query($sql);

	foreach ($result as $row){
	$data[] = $row;
}

	$connect->close();

	echo json_encode($data,JSON_UNESCAPED_UNICODE);
}
?>