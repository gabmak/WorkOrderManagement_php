<?php 
require_once 'php_action/db_connect.php'; 
require_once 'includes/header.php';


if($_GET['o'] == 'add') { 
// add order
	echo "<div class='div-request div-hide'>add</div>";
} else if($_GET['o'] == 'manord') { 
	echo "<div class='div-request div-hide'>manord</div>";
} else if($_GET['o'] == 'editOrd') { 
	echo "<div class='div-request div-hide'>editOrd</div>";
} // /else manage order


?>

<ol class="breadcrumb">
  <li><a href="dashboard.php">Home</a></li>
  <li>Work Order</li>
  <li class="active">
  	<?php if($_GET['o'] == 'add') { ?>
  		Add Order
		<?php } else if($_GET['o'] == 'manord') { ?>
			Manage Work Order
		<?php } // /else manage order ?>
  </li>
</ol>


<h4>
	<i class='glyphicon glyphicon-circle-arrow-right'></i>
	<?php if($_GET['o'] == 'add') {
		echo "Add Work Order";
	} else if($_GET['o'] == 'manord') { 
		echo "Manage Work Order";
	} else if($_GET['o'] == 'editOrd') { 
		echo "Edit Work Order";
	}
	?>	
</h4>



<div class="panel panel-default">
	<div class="panel-heading">

		<?php if($_GET['o'] == 'add') { ?>
  		<i class="glyphicon glyphicon-plus-sign"></i>	Add Order
		<?php } else if($_GET['o'] == 'manord') { ?>
			<i class="glyphicon glyphicon-edit"></i> Manage Order
		<?php } else if($_GET['o'] == 'editOrd') { ?>
			<i class="glyphicon glyphicon-edit"></i> Edit Order
		<?php } ?>

	</div> <!--/panel-->	
	<div class="panel-body">
			
		<?php if($_GET['o'] == 'add') { 
			// add order
			?>			

			<div class="success-messages"></div> <!--/success-messages-->

  		<form class="form-horizontal" method="POST" novalidate action="php_action/createWorkOrder.php" id="createOrderForm">

			  <div class="form-group">
			    <label for="orderDate" class="col-sm-2 control-label">Receive Date:</label>
			    <div class="col-sm-10">
			      <input type="datetime-local" class="form-control" id="orderDate" name="orderDate" autocomplete="off" />
			    </div>
			  </div> <!--/form-group-->
			  <div class="form-group">
			    <label for="workOrderNo" class="col-sm-2 control-label">Work Order Number:</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="workOrderNo" name="workOrderNo" placeholder="#WO" autocomplete="off"/>
			    </div>
			  </div> <!--/form-group-->
			
			<div class="form-group">
	        	<label for="priority" class="col-sm-2 control-label">Priority: </label>
				    <div class="col-sm-10">
				      <select class="form-control" id="priority" name="priority">
				      	<option value="">~~SELECT~~</option>
				      	<option value="5">5- HSSE</option>
						<option value="4">4- Critical</option>
						<option value="3">3- Serious</option>
						<option value="2">2- Significant</option>
						<option value="1">1- Minor</option>
						<option value="0">0- CEI</option>
				      </select>
				    </div>
	        </div> <!-- /form-group-->
			
			  <div class="form-group">
			    <label for="description" class="col-sm-2 control-label">Work description:</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="description" name="description" placeholder="Work describtion" autocomplete="off"/>
			    </div>
			  </div> <!--/form-group-->
			
			<div class="form-group">
			    <label for="station" class="col-sm-2 control-label">Station:</label>
			    <div class="col-sm-10">
			      <select class="form-control" name="station" id="station" onchange="getStationData" >
			  						<option value="">~~SELECT~~</option>
			  						<?php
			  							$stationSql = "SELECT * FROM station WHERE visible = 1 AND status = 1 ";
			  							$stationData = $connect->query($stationSql);

			  							while($row = $stationData->fetch_array()) {									 		
			  								echo "<option value='".$row['sta_id']."' id='changeStation".$row['sta_id']."'>".$row['sta_name']."</option>";
										 	} // /while 

			  						?>
		  						</select>
			    </div>
			  </div> <!--/form-group-->
			
			  <div class="form-group">
			    <label for="workType" class="col-sm-2 control-label">Job type:</label>
			    <div class="col-sm-10">
			      <select class="form-control" name="workType" id="workType" onchange="getWorkTypeData" >
			  						<option value="">~~SELECT~~</option>
			  						<?php
			  							$typeSql = "SELECT * FROM work_type";
			  							$workTypeData = $connect->query($typeSql);

			  							while($row = $workTypeData->fetch_array()) {									 		
			  								echo "<option value='".$row['type_id']."' id='changeWorkType".$row['type_id']."'>".$row['type']."</option>";
										 	} // /while 

			  						?>
		  						</select>
			    </div>
			  </div> <!--/form-group-->

			  <table class="table" id="workerTable">
			  	<thead>
			  		<tr>			  			
			  			<th style="width:40%;">Worker</th>
			  			<th>CBRE passport</th>
			  			<th>Telephone</th>
						<th style="width:10%;"></th>
			  		</tr>
			  	</thead>
			  	<tbody>
			  		<?php
			  		$arrayNumber = 0;
			  		for($x = 1; $x < 3; $x++) { ?>
			  			<tr id="row<?php echo $x; ?>" class="<?php echo $arrayNumber; ?>">			  				
			  				<td style="margin-left:20px;">
			  					<div class="form-group">

			  					<select class="form-control" name="workerName[]" id="workerName<?php echo $x; ?>" onchange="getWorkerData(<?php echo $x; ?>)" >
			  						<option value="">~~SELECT~~</option>
			  						<?php
			  							$workerSql = "SELECT * FROM worker WHERE status = 1 ";
			  							$workerData = $connect->query($workerSql);

			  							while($row = $workerData->fetch_array()) {									 		
			  								echo "<option value='".$row['worker_id']."' id='changeWorker".$row['worker_id']."'>".$row['name']."</option>";
										 	} // /while 

			  						?>
		  						</select>
			  					</div>
			  				</td>
			  				<td style="padding-left:20px;">			  					
			  					<input type="text" name="cbrePassport[]" id="cbrePassport<?php echo $x; ?>" autocomplete="off" disabled="true" class="form-control" />	
			  				</td>
			  				
			  				<td style="padding-left:20px;">			  					
			  					<input type="text" name="telephone[]" id="telephone<?php echo $x; ?>" autocomplete="off" class="form-control" disabled="true" />		  					
			  				</td>
			  				<td>

			  					<button class="btn btn-default removeWorkerRowBtn" type="button" id="removeWorkerRowBtn" onclick="removeWorkerRow(<?php echo $x; ?>)"><i class="glyphicon glyphicon-trash"></i></button>
			  				</td>
			  			</tr>
		  			<?php
		  			$arrayNumber++;
			  		} // /for
			  		?>
			  	</tbody>			  	
			  </table>
			
			  <div class="form-group submitButtonFooter">
			    <div class="col-sm-offset-2 col-sm-10">
			    <button type="button" class="btn btn-default" onclick="addRow()" id="addRowBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-plus-sign"></i> Add Row </button>

			      <button type="submit" id="createOrderBtn" data-loading-text="Loading..." class="btn btn-success"><i class="glyphicon glyphicon-ok-sign"></i> Save Changes</button>

			      <button type="reset" class="btn btn-default" onclick="resetOrderForm()"><i class="glyphicon glyphicon-erase"></i> Reset</button>
			    </div>
			  </div>
			</form>
		<?php } else if($_GET['o'] == 'manord') { 
			// manage order
			?>

			<div id="success-messages"></div>
			
			<table class="table" id="manageOrderTable">
				<thead>
					<tr>
						<th>Record Date</th>
						<th>#WO</th>
						<th>Station</th>
						<th>Description</th>
						<th>Priority</th>
						<th>Status</th>
						<th>Option</th>
					</tr>
				</thead>
			</table>

		<?php 
		// /else manage order
		} else if($_GET['o'] == 'editOrd') {
			// get order
			?>
			
			<div class="success-messages"></div> <!--/success-messages-->

  		<form class="form-horizontal" method="POST" novalidate action="php_action/editWorkOrder.php" id="editOrderForm">

  			<?php $work_id = $_GET['i'];

  			$sql = "SELECT work_id, rec_date, work_order_no, sta_id, work_description, start_time, end_time, complete_date, reason, priority, affected_nozzle, type_id, status FROM work_order WHERE status !=0 AND work_id = {$work_id}";

				$result = $connect->query($sql);
				$data = $result->fetch_row();				
  			?>

			  <div class="form-group">
			    <label for="orderDate" class="col-sm-2 control-label">Order Date</label>
			    <div class="col-sm-10">
			      <input type="datetime" class="form-control" id="orderDate" name="orderDate" autocomplete="off" value="<?php echo $data[1] ?>" />
			    </div>
			  </div> <!--/form-group-->
			  <div class="form-group">
			    <label for="workOrderNo" class="col-sm-2 control-label">#WO</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="workOrderNo" name="workOrderNo" placeholder="#WO" autocomplete="off" value="<?php echo $data[2] ?>" />
			    </div>
			  </div> <!--/form-group-->
			
			<div class="form-group">
				    <label for="priority" class="col-sm-2 control-label">Priority</label>
				    <div class="col-sm-10">
				      <select class="form-control" name="priority" id="priority">
				      	<option value="">~~SELECT~~</option>
				      	<option value="5" <?php if($data[9] == 5) {
				      		echo "selected";
				      	} ?>  >5-HSSE</option>
				      	<option value="4" <?php if($data[9] == 4) {
				      		echo "selected";
				      	} ?> >4-Critical</option>
				      	<option value="3" <?php if($data[9] == 3) {
				      		echo "selected";
				      	} ?> >3-Serious</option>
						<option value="2" <?php if($data[9] == 2) {
				      		echo "selected";
				      	} ?> >2-Significant</option>
				      	<option value="1" <?php if($data[9] == 1) {
				      		echo "selected";
				      	} ?> >1-Minor</option>
						<option value="0" <?php if($data[9] == 0) {
				      		echo "selected";
				      	} ?> >CEI</option>
				      </select>
				    </div>
				  </div> <!--/form-group-->	
			
			  <div class="form-group">
			    <label for="station" class="col-sm-2 control-label">Station</label>
			    <div class="col-sm-10">
			      <select class="form-control" name="station" id="station" onchange="getStationData()" >
			  						<option value="">~~SELECT~~</option>
			  						<?php
			  							$stationSql = "SELECT * FROM station WHERE visible = 1 AND status = 1 ";
										$stationData = $connect->query($stationSql);

			  							while($row = $stationData->fetch_array()) {									 		
			  								$selected = "";
			  								if($row['sta_id'] == $data[3]) {
			  									$selected = "selected";
			  								} else {
			  									$selected = "";
			  								}
			  								echo "<option value='".$row['sta_id']."' id='changeStation".$row['sta_id']."' ".$selected." >".$row['sta_name']."</option>";
										 	} // /while 

			  						?>
		  						</select>
			    </div>
			  </div> <!--/form-group-->	
			<div class="form-group">
			    <label for="description" class="col-sm-2 control-label">Description</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="description" name="description" placeholder="Description" autocomplete="off" value="<?php echo $data[4] ?>" />
			    </div>
			</div> <!--/form-group-->
			
			<div class="form-group">
			    <label for="workType" class="col-sm-2 control-label">Work Type</label>
			    <div class="col-sm-10">
			      <select class="form-control" name="workType" id="workType" onchange="getWorkTypeData()" >
			  			<option value="">~~SELECT~~</option>
			  				<?php
			  					$workTypeSql = "SELECT * FROM work_type ";
								$workTypeData = $connect->query($workTypeSql);

			  					while($row = $workTypeData->fetch_array()) {									 		
			  						$selected = "";
			  						if($row['type_id'] == $data[11]) {
			  							$selected = "selected";
			  						} else {
			  							$selected = "";
			  						}
			  						echo "<option value='".$row['type_id']."' id='changeWorkType".$row['type_id']."' ".$selected." >".$row['type']."</option>";
									} // /while 

			  						?>
		  						</select>
			    </div>
			</div> <!--/form-group-->
			  <table class="table" id="workerTable">
			  	<thead>
			  		<tr>			  			
			  			<th style="width:40%;">Worker</th>
			  			<th>CBRE passport</th>
			  			<th>Telephone</th>
						<th style="width:10%;"></th>
			  		</tr>
			  	</thead>
			  	<tbody>
			  		<?php

			  		$workerJobSql = "SELECT order_for_worker.worker_order_id, order_for_worker.work_id, order_for_worker.worker_id, worker.telephone, worker.cbre_passport FROM order_for_worker, worker WHERE order_for_worker.worker_id = worker.worker_id AND order_for_worker.work_id = {$work_id}";
						$jobWorkerResult = $connect->query($workerJobSql);
						// $orderItemData = $orderItemResult->fetch_all();						
						
						// print_r($orderItemData);
			  		$arrayNumber = 0;
			  		// for($x = 1; $x <= count($orderItemData); $x++) {
			  		$x = 1;
			  		while($jobWorkerData = $jobWorkerResult->fetch_array()) { 
			  			// print_r($orderItemData); ?>
			  			<tr id="row<?php echo $x; ?>" class="<?php echo $arrayNumber; ?>">			  				
			  				<td style="margin-left:20px;">
			  					<div class="form-group">

			  					<select class="form-control" name="workerName[]" id="workerName<?php echo $x; ?>" onchange="getWorkerData(<?php echo $x; ?>)" >
			  						<option value="">~~SELECT~~</option>
			  						<?php
			  							$workerSql = "SELECT * FROM worker WHERE status != 2";
			  							$workerData = $connect->query($workerSql);

			  							while($row = $workerData->fetch_array()) {									 		
			  								$selected = "";
			  								if($row['worker_id'] == $jobWorkerData['worker_id']) {
			  									$selected = "selected";
			  								} else {
			  									$selected = "";
			  								}

			  								echo "<option value='".$row['worker_id']."' id='changeWorker".$row['worker_id']."' ".$selected." >".$row['name']."</option>";
										 	} // /while 

			  						?>
		  						</select>
			  					</div>
			  				</td>
			  				<td style="padding-left:20px;">			  					
			  					<input type="text" name="cbrePassport[]" id="cbrePassport<?php echo $x; ?>" autocomplete="off" disabled="true" class="form-control" value="<?php echo $jobWorkerData['cbre_passport']; ?>" />
			  				</td>
							<td style="padding-left:20px;">			  					
			  					<input type="text" name="telephone[]" id="telephone<?php echo $x; ?>" autocomplete="off" disabled="true" class="form-control" value="<?php echo $jobWorkerData['telephone']; ?>" />
			  				</td>
			  				<td>

			  					<button class="btn btn-default removeWorkerRowBtn" type="button" id="removeWorkerRowBtn" onclick="removeWorkerRow(<?php echo $x; ?>)"><i class="glyphicon glyphicon-trash"></i></button>
			  				</td>
			  			</tr>
		  			<?php
		  			$arrayNumber++;
		  			$x++;
			  		} // /for
			  		?>
			  	</tbody>			  	
			  </table><!--/form-group-->			  		  

			<div class="col-md-6">
			  	<div class="form-group">
				    <label for="startTime" class="col-sm-3 control-label">Start time</label>
				    <div class="col-sm-9">
				      <input type="time" class="form-control" id="startTime" name="startTime" value="<?php echo $data[5] ?>" />
				    </div>
				  </div> <!--/form-group-->			  
			</div>
			<div class="col-md-6">
			<div class="form-group">
				    <label for="endTime" class="col-sm-3 control-label">End time</label>
				    <div class="col-sm-9">
				      <input type="time" class="form-control" id="endTime" name="endTime" value="<?php echo $data[6] ?>" />
				    </div>
				  </div> <!--/form-group-->
			</div>
			
			<div class="form-group">
			    <label for="completeDate" class="col-sm-2 control-label">Complete Date</label>
			    <div class="col-sm-10">
			      <input type="date" class="form-control" id="completeDate" name="completeDate" autocomplete="off" value="<?php echo $data[7] ?>" />
			    </div>
			</div> <!--/form-group-->
			
			<div class="form-group">
			    <label for="reason" class="col-sm-2 control-label">Reason</label>
			    <div class="col-sm-10">
			      <textarea class="form-control" id="reason" name="reason" placeholder="Service Description" autocomplete="off" value="<?php echo $data[8] ?>" ></textarea>
			    </div>
			</div> <!--/form-group-->
			
			<div class="form-group">
			    <label for="affectedNozzle" class="col-sm-2 control-label">Affected Nozzle</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="affectedNozzle" name="affectedNozzle" placeholder="n.a. if no" autocomplete="off" value="<?php echo $data[10] ?>" />
			    </div>
			</div> <!--/form-group-->
			
			<div class="form-group">
				    <label for="status" class="col-sm-2 control-label">Status</label>
				    <div class="col-sm-10">
				      <select class="form-control" name="status" id="status" >
				      	<option value="">~~SELECT~~</option>
				      	<option value="1" <?php if($data[12] == 1) {
				      		echo "selected";
				      	} ?> >Pending</option>
				      	<option value="2" <?php if($data[12] == 2) {
				      		echo "selected";
				      	} ?>  >On-going</option>
				      	<option value="3" <?php if($data[12] == 3) {
				      		echo "selected";
				      	} ?> >Done</option>
				      </select>
				    </div>
				  </div> <!--/form-group-->
			</br></br>
		
			  <div class="form-group editButtonFooter">
			    <div class="col-sm-offset-2 col-sm-10">
			    <button type="button" class="btn btn-default" onclick="addRow()" id="addRowBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-plus-sign"></i> Add Row </button>

			    <input type="hidden" name="work_id" id="work_id" value="<?php echo $_GET['i']; ?>" />

			    <button type="submit" id="editOrderBtn" data-loading-text="Loading..." class="btn btn-success"><i class="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
			      
			    </div>
			  </div>
			</form>
 
			<?php
		} // /get order else  ?>


	</div> <!--/panel-->	
</div> <!--/panel-->	



<!-- edit status form -->
<div class="modal fade" tabindex="-1" role="dialog" id="statusOrderModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"><i class="glyphicon glyphicon-edit"></i> Edit Status</h4>
      </div>      

      <div class="modal-body form-horizontal" style="max-height:500px; overflow:auto;" >

      	<div class="statusOrderMessages"></div>
			  
			  <div class="form-group">
			    <label for="orderStatus" class="col-sm-3 control-label">Order Status</label>
			    <div class="col-sm-9">
			      <select class="form-control" name="processStatus" id="processStatus" >
			      	<option value="">~~SELECT~~</option>
			      	<option value="1">Pending</option>
			      	<option value="2">On going</option>
			      	<option value="3">Done</option>
			      </select>
			    </div>
			  </div> <!--/form-group-->							  
			  						  				  
      	        
      </div> <!--/modal-body-->
      <div class="modal-footer">
      	<button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
        <button type="button" class="btn btn-primary" id="updateStatusOrderBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-ok-sign"></i> Save changes</button>	
      </div>           
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- /edit order-->

<!-- remove order -->
<div class="modal fade" tabindex="-1" role="dialog" id="removeOrderModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"><i class="glyphicon glyphicon-trash"></i> Remove Order</h4>
      </div>
      <div class="modal-body">

      	<div class="removeOrderMessages"></div>

        <p>Do you really want to remove ?</p>
      </div>
      <div class="modal-footer removeProductFooter">
        <button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
        <button type="button" class="btn btn-primary" id="removeOrderBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-ok-sign"></i> Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- /remove order-->


<script src="custom/js/workOrder.js"></script>

<?php require_once 'includes/footer.php'; ?>


	