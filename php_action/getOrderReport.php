<?php 

require_once 'db_connect.php';

if($_POST) {

	$startDate = date('Y-m-d', strtotime($_POST['startDate']));
	$endDate = date('Y-m-d', strtotime($_POST['endDate']));


	$sql = "SELECT work_order.work_id, work_order.rec_date, work_order.work_order_no, station.sta_name, work_order.work_description, work_order.priority, work_order.start_time, work_order.end_time, work_order.complete_date,work_order.reason, work_order.affected_nozzle, work_type.type, work_order.status FROM work_order, station, work_type WHERE work_order.sta_id = station.sta_id AND work_order.type_id = work_type.type_id AND work_order.rec_date >= '$startDate' AND work_order.rec_date <= '$endDate' and work_order.status != 0 ORDER BY work_order.rec_date ASC";
	$query = $connect->query($sql);
	
	$table = '
	<table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
		<tr>
			<th>work_id</th>
			<th>rec_date</th>
			<th>work_order_no</th>
			<th>sta_name</th>
			<th>work_description</th>
			<th>priority</th>
			<th>start_time</th>
			<th>end_time</th>
			<th>complete_date</th>
			<th>reason</th>
			<th>affected_nozzle</th>
			<th>type</th>
			<th>status</th>
		</tr>
		<tr>';
		
		while ($result = $query->fetch_assoc()) {
			$receive_date =  date('d-m-Y', strtotime($result['rec_date']));
			
			//set up status
			if ($result['status'] == 1){
				$orderStatus = 'Pending';
			} else if ($result['status'] == 2){
				$orderStatus = 'On-going';
			} else{
				$orderStatus = 'Done';
			}
			
			//set up priority
			if ($result['priority'] == 0){
				$priority = '0-CEI';
			} else if ($result['priority'] == 1){
				$priority = '1-Minor';
			} else if ($result['priority'] == 2){
				$priority = '2-Significant';
			} else if ($result['priority'] == 3){
				$priority = '3-Serious';
			} else if ($result['priority'] == 4){
				$priority = '4-Critical';
			} else{
				$priority = '5-HSSE';
			}
			
			$table .= '<tr>
				<td><center>'.$result['work_id'].'</center></td>
				<td><center>'.$receive_date.'</center></td>
				<td><center>'.$result['work_order_no'].'</center></td>
				<td><center>'.$result['sta_name'].'</center></td>
				<td>'.$result['work_description'].'</td>
				<td><center>'.$priority.'</center></td>
				<td><center>'.$result['start_time'].'</center></td>
				<td><center>'.$result['end_time'].'</center></td>
				<td><center>'.$result['complete_date'].'</center></td>
				<td>'.$result['reason'].'</td>
				<td><center>'.$result['affected_nozzle'].'</center></td>
				<td>'.$result['type'].'</td>
				<td><center>'.$orderStatus.'</center></td>
			</tr>';	
			
		}
		$table .= '
		</tr>
		
	</table>
	';	

	$connect->close();

	echo $table;
}
?>