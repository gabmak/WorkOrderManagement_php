<?php 	

require_once 'core.php';
$sectionAccessLevel = $_SESSION['accessLevel'];

$sql = "SELECT worker.worker_id, login.login_id, worker.name, worker.telephone, worker.cbre_passport, login.access_level FROM worker, login WHERE worker.worker_id = login.worker_id AND worker.status = 1 AND login.active = 1";
$result = $connect->query($sql);

$output = array('data' => array());

if($result->num_rows > 0) { 

 // $row = $result->fetch_array();
 $activeWorker = ""; 

 while($row = $result->fetch_array()) {
	 $workerId = $row[0];
	 
 	// active 
 	if($row[5] == 1) {
 		// activate member
 		$activeWorker = "<label class='label label-info'>Admin</label>";
 	} else {
 		// deactivate member
 		$activeWorker = "<label class='label label-default'>Worker</label>";
 	}

 	$button = '<!-- Single button -->
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Action <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu">
	  
	    <li><a type="button" data-toggle="modal" data-target="#editWorkerModal" onclick="editWorkers('.$workerId.')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
		
		<li><a type="button" data-toggle="modal" data-target="#editPasswordModal" onclick="editPassword ('.$workerId.')"> <i class="glyphicon glyphicon-edit"></i> Change Password</a></li>
		
	    <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeWorkers ('.$workerId.')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>    
	  </ul>
	</div>';
	
	$disabledButton= '<!-- Single button -->
	<div class="btn-group">
	  <button type="button" class="btn btn-default" disabled >
	    Action <span class="caret"></span>
	  </button>';
	
	if ($sectionAccessLevel == 1){
	 $output['data'][] = array( 		
		$row[2],
		$row[1],
		$row[3],
		$row[4],
 		$activeWorker,
 		$button
 		); 
	} else {
	 $output['data'][] = array( 		
		$row[2],
		$row[1],
		$row[3],
		$row[4],
 		$activeWorker,
 		$disabledButton
		 );
	}	
 	} // /while 

} // if num_rows

$connect->close();

echo json_encode($output);