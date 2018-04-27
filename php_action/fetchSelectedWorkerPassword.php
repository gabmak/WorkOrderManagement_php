<?php 	

require_once 'core.php';

$worker_id = $_POST['workerId'];

$sql = "SELECT worker_id, password FROM login WHERE worker_id = $worker_id";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);