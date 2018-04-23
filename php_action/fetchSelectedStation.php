<?php 	

require_once 'core.php';

$stationId = $_POST['stationId'];

$sql = "SELECT sta_id, sta_name, address, telephone, status, visible FROM station WHERE sta_id = $stationId";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);