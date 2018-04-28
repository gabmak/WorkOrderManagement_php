<?php 	

require_once 'core.php';

$sql = "SELECT worker_id, name FROM worker WHERE status = 1";
$result = $connect->query($sql);

$data = $result->fetch_all();

$connect->close();

echo json_encode($data);