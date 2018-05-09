<?php 	

require_once 'core.php';

$sql = "SELECT sta_id, sta_name, address, telephone, status FROM station WHERE visible = 1";
$result = $connect->query($sql);

$output = array('data' => array());

if($result->num_rows > 0) { 

 // $row = $result->fetch_array();
 $activeStation = ""; 

 while($row = $result->fetch_array()) {
	 $stationId = $row[0];
	 
 	// active 
 	if($row[4] == 1) {
 		// activate member
 		$activeStation = "<label class='label label-success'>Available</label>";
 	} else {
 		// deactivate member
 		$activeStation = "<label class='label label-danger'>Not in service</label>";
 	}

 	$button = '<!-- Single button -->
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Action <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu">
	    <li><a type="button" data-toggle="modal" data-target="#editStationModel" onclick="editStations ('.$stationId.')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
	    <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeStations ('.$stationId.')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>    
	  </ul>
	</div>';

 	$output['data'][] = array( 		
		$row[1],
		$row[2],
		$row[3],
 		$activeStation,
 		$button
 		); 	
 } // /while 

} // if num_rows

$connect->close();

echo json_encode($output);