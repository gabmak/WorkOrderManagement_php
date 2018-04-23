<?php require_once 'includes/header.php'; ?>

<div class="row">
	<div class="col-md-12">

		<ol class="breadcrumb">
		  <li><a href="dashboard.php">Home</a></li>
		  <li class="active">Station </li>
		</ol>

		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="page-heading"> <i class="glyphicon glyphicon-edit"></i> Manage Station</div>
			</div> <!-- /panel-heading -->
			<div class="panel-body">

				<div class="remove-messages"></div>

				<div class="div-action pull pull-right" style="padding-bottom:20px;">
					<button class="btn btn-default button1" data-toggle="modal" data-target="#addStationModel"> <i class="glyphicon glyphicon-plus-sign"></i> Add Station </button>
				</div> <!-- /div-action -->				
				
				<table class="table" id="manageStationTable">
					<thead>
						<tr>							
							<th>Station ID</th>
							<th>Name</th>
							<th>Address</th>
							<th>Telephone</th>
							<th>Status</th>
							<th style="width:15%;">Options</th>
						</tr>
					</thead>
				</table>
				<!-- /table -->

			</div> <!-- /panel-body -->
		</div> <!-- /panel -->		
	</div> <!-- /col-md-12 -->
</div> <!-- /row -->

<div class="modal fade" id="addStationModel" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
    	
    	<form class="form-horizontal" id="submitStationForm" action="php_action/createStation.php" method="POST">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title"><i class="fa fa-plus"></i> Add Station</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="add-brand-messages"></div>

	        <div class="form-group">
	        	<label for="stationID" class="col-sm-3 control-label">Station ID: </label>
	        	<label class="col-sm-1 control-label">: </label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="stationID" placeholder="Station ID" name="stationID" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->
			
			<div class="form-group">
	        	<label for="stationName" class="col-sm-3 control-label">Station Name: </label>
	        	<label class="col-sm-1 control-label">: </label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="stationName" placeholder="Station Name" name="stationName" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->
			  
			<div class="form-group">
	        	<label for="address" class="col-sm-3 control-label">Address: </label>
	        	<label class="col-sm-1 control-label">: </label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="stationID" placeholder="Address" name="address" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->
			
			<div class="form-group">
	        	<label for="telephone" class="col-sm-3 control-label">Telephone: </label>
	        	<label class="col-sm-1 control-label">: </label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" id="telephone" placeholder="Telephone" name="telephone" autocomplete="off">
				    </div>
	        </div> <!-- /form-group-->
			  
	        <div class="form-group">
	        	<label for="stationStatus" class="col-sm-3 control-label">Status: </label>
	        	<label class="col-sm-1 control-label">: </label>
				    <div class="col-sm-8">
				      <select class="form-control" id="stationStatus" name="stationStatus">
				      	<option value="">~~SELECT~~</option>
				      	<option value="1">Available</option>
				      	<option value="0">Not Available</option>
				      </select>
				    </div>
	        </div> <!-- /form-group-->	         	        

	      </div> <!-- /modal-body -->
	      
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        
	        <button type="submit" class="btn btn-primary" id="createBrandBtn" data-loading-text="Loading..." autocomplete="off">Save Changes</button>
	      </div>
	      <!-- /modal-footer -->
     	</form>
	     <!-- /.form -->
    </div>
    <!-- /modal-content -->
  </div>
  <!-- /modal-dailog -->
</div>
<!-- / add modal -->