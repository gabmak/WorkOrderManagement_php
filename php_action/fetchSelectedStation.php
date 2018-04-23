<?php 	

require_once 'core.php';

$stationID = $_POST['stationID'];

$sql = "SELECT sta_id, sta_name, address, telephone, status, visible FROM Station WHERE sta_id = $stationID";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);