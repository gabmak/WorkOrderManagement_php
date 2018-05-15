<?php 	

require_once 'core.php';
$worker_id = $_SESSION['workerId'];

$sql = "SELECT work_order.work_id, work_order.rec_date, work_order.work_order_no, station.sta_name, work_order.work_description, work_order.priority, work_order.status, order_for_worker.worker_id FROM work_order, station, order_for_worker WHERE work_order.sta_id = station.sta_id AND work_order.status != 0 AND work_order.status != 3 AND station.status !=0 AND work_order.work_id = order_for_worker.work_id AND order_for_worker.worker_id = {$worker_id} ORDER BY work_order.status, work_order.rec_date DESC";
$result = $connect->query($sql);



$output = array('data' => array());

if($result->num_rows > 0) { 
 
 $orderPriority = "";
 $processStatus = "";
 $rec_date = "";


 while($row = $result->fetch_array()) {
 	$work_id = $row[0];
	
	 $rec_date = date("d/m/Y", strtotime($row[1]));
	 
 	 	// active 
 	if($row[5] == 5) { 		
 		$orderPriority = "<label class='label label-danger'>5-HSSE </label>";
 	} else if($row[5] == 4) { 		
 		$orderPriority = "<label class='label label-warning'>4-Critical</label>";
 	} else if($row[5] == 3) { 		
 		$orderPriority = "<label class='label label-primary'>3-Serious</label>";
 	} else if($row[5] == 2) { 		
 		$orderPriority = "<label class='label label-info'>2-Significant</label>";
 	} else if($row[5] == 1) { 		
 		$orderPriority = "<label class='label label-success'>1-Minor</label>";
 	} else{ 		
 		$orderPriority = "<label class='label label-default'>CEI</label>";
 	} // /else
	
	if($row[6] == 1) { 		
 		$processStatus = "<label class='label label-warning'>Pending</label>";
 	} else if($row[6] == 2) { 		
 		$processStatus = "<label class='label label-primary'>On-going</label>";
 	} else { 		
 		$processStatus = "<label class='label label-success'>Done</label>";
 	} // /else
		
	 
 	$button = '<!-- Single button -->
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Action <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu">
	  	<li><a type="button" data-toggle="modal" id="startOrderModalBtn" data-target="#startOrderModal" onclick="startOrder('.$work_id.')"> <i class="glyphicon glyphicon-send"></i> Start Working</a></li>
		
	    <li><a href="workOrder.php?o=editOrd&i='.$work_id.'" id="editOrderModalBtn"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
		
		<li><a type="button" data-toggle="modal" id="statusOrderModalBtn" data-target="#statusOrderModal" onclick="statusOrder('.$work_id.')"> <i class="glyphicon glyphicon-send"></i> Order Status</a></li>
		
	    <li><a type="button" onclick="printOrder('.$work_id.')"> <i class="glyphicon glyphicon-print"></i> Print </a></li>
		
	  </ul>
	</div>';		

 	$output['data'][] = array(
 		// order date
 		$rec_date,
 		// #WO
 		$row[2], 
 		// station
 		$row[3],
		// descrpition
		$row[4],
 		$orderPriority,
		$processStatus,
 		// button
 		$button 		
 		); 	
 } 

}// if num_rows

$connect->close();

echo json_encode($output);