<?php require_once 'php_action/core.php'; ?>
<?php 
	$accessLevel = $_SESSION['accessLevel'];
	if ($accessLevel == 1){
		require_once 'includes/header.php';
	} else if ($accessLevel == 0){
		require_once 'includes/header1.php';
	}
?>

<?php 

$sql = "SELECT * FROM work_order";
$query = $connect->query($sql);
$countOrders = $query->num_rows;

$orderSql = "SELECT * FROM work_order WHERE status = 1";
$orderQuery = $connect->query($orderSql);
$countOrder = $orderQuery->num_rows;
$workerId = $_SESSION['workerId'];
$totalWorksSql = "SELECT * FROM order_for_worker WHERE worker_id = {$workerId}";
$workQuery = $connect->query($totalWorksSql);
$totalWorks = $workQuery->num_rows;


$lowStockSql = "SELECT * FROM work_order WHERE priority=5 AND status = 1";
$lowStockQuery = $connect->query($lowStockSql);
$countECall = $lowStockQuery->num_rows;

$connect->close();

?>


<style type="text/css">
	.ui-datepicker-calendar {
		display: none;
	}
	
	<style type="text/css">
	.ui-datepicker-calendar {
		display: none;
	}
	@supports (zoom:1.5) {
		input[type="radio"],  input[type=checkbox]{
		zoom: 1.5;
		}
	}
	@supports not (zoom:1.5) {
		input[type="radio"],  input[type=checkbox]{
			transform: scale(1.5);
			margin: 15px;
		}
	}
	body {
    	font-size: 15px;
	}
</style>

<!-- fullCalendar 2.2.5-->
    <link rel="stylesheet" href="assests/plugins/fullcalendar/fullcalendar.min.css">
    <link rel="stylesheet" href="assests/plugins/fullcalendar/fullcalendar.print.css" media="print">


<div class="row">
	<div>
		<div class="panel-default">
		  <div class="panel-body">
		    <p><h4><center>Welcome back, <?php echo $_SESSION['name']; ?></center></h4></p><br>
		  </div>
		</div>
	</div>
	
	<div class="col-md-4">
		<div class="panel panel-success">
			<div class="panel-heading">
				
				<a href="workOrder.php?o=manord" style="text-decoration:none;color:black;">
					Total Job
					<span class="badge pull pull-right"><?php echo $countOrders; ?></span>	
				</a>
				
			</div> <!--/panel-hdeaing-->
		</div> <!--/panel-->
	</div> <!--/col-md-4-->

		<div class="col-md-4">
			<div class="panel panel-info">
			<div class="panel-heading">
				<a href="workOrder.php?o=manord" style="text-decoration:none;color:black;">
					Pending jobs
					<span class="badge pull pull-right"><?php echo $countOrder; ?></span>
				</a>
					
			</div> <!--/panel-hdeaing-->
		</div> <!--/panel-->
		</div> <!--/col-md-4-->

	<div class="col-md-4">
		<div class="panel panel-danger">
			<div class="panel-heading">
				<a href="workOrder.php?o=manord" style="text-decoration:none;color:black;">
					On going E-call
					<span class="badge pull pull-right"><?php echo $countECall; ?></span>	
				</a>
				
			</div> <!--/panel-hdeaing-->
		</div> <!--/panel-->
	</div> <!--/col-md-4-->
	<div class="col-md-12">
		
		<div class="panel-body">
			<div id="success-messages"></div>
			
			<table class="table" id="managePersonOrderTable">
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
		</div>
	</div>
	<div class="col-md-4">
		<div class="card">
		  <div class="cardHeader">
		    <h1><?php echo date('d'); ?></h1>
		  </div>

		  <div class="cardContainer">
		    <p><?php echo date('l') .' '.date('d').', '.date('Y'); ?></p>
		  </div>
		</div> 
		<br/>

		<div class="card">
		  <div class="cardHeader" style="background-color:#245580;">
		    <h1><?php if($totalWorks) {
		    	echo $totalWorks;
		    	} else {
		    		echo '0';
		    		} ?></h1>
		  </div>

		  <div class="cardContainer">
		    <p>Total jobs Contributed</p>
		  </div>
		</div> 

	</div>

	<div class="col-md-8">
		<div class="panel panel-default">
			<div class="panel-heading"> <i class="glyphicon glyphicon-calendar"></i> Calendar</div>
			<div class="panel-body">
				<div id="calendar"></div>
			</div>	
		</div>
		
	</div>

	
</div> <!--/row-->


<!-- edit start form -->
<div class="modal fade" tabindex="-1" role="dialog" id="startOrderModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"><i class="glyphicon glyphicon-edit"></i> Start Work</h4>
      </div>      

      <div class="modal-body form-horizontal" style="max-height:500px; overflow:auto;" >

      	<div class="startOrderMessages"></div>	
		  
		 	<div class="form-group">
				<label class="col-md-12"><p>Please make sure you are wearing the follwing protecting tools</p></label>
				<div class="col-xs-6 col-sm-4">
					<center><label class="container" id="helmetDiv"><img src="assests/images/helmet.png" width="100" alt=""/>&emsp;<input type="checkbox" id="helmet" name="helmet"></label></center>
				</div>
				<div class="col-xs-6 col-sm-4">
					<center><label class="container" id="shoseDiv"><img src="assests/images/boots.png" width="100" alt=""/>&emsp;<input type="checkbox" id="shose" name="shose"></label></center>
				</div>
				<div class="col-xs-6 col-sm-4">
					<center><label class="container" id="jacketDiv"><img src="assests/images/vest.png" width="100" alt=""/>&emsp;<input type="checkbox" id="jacket" name="jacket"></label></center>
				</div>
			 </div> <!--/form-group-->	
		 	
			 <div class="form-group">
				 
			   <label for="startTime" class="col-sm-3 control-label">Start Time</label>
			   <div class="col-sm-3">
			     <input type="time" class="form-control" id="startTime" name="startTime"/>					
			   </div>
			 </div> <!--/form-group-->					  				  
      	        
      </div> <!--/modal-body-->
      <div class="modal-footer">
      	<button type="button" class="btn btn-default" data-dismiss="modal"> <i class="glyphicon glyphicon-remove-sign"></i> Close</button>
        <button type="button" class="btn btn-primary" id="updateStartOrderBtn" data-loading-text="Loading..."> <i class="glyphicon glyphicon-ok-sign"></i> Save changes</button>	
      </div>           
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- /edit order-->






<!-- fullCalendar 2.2.5 -->
<script src="assests/plugins/moment/moment.min.js"></script>
<script src="assests/plugins/fullcalendar/fullcalendar.min.js"></script>


<script type="text/javascript">
	$(function () {
			// top bar active
	$('#navDashboard').addClass('active');

      //Date for the calendar events (dummy data)
      var date = new Date();
      var d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear();

      $('#calendar').fullCalendar({
        header: {
          left: '',
          center: 'title'
        },
        buttonText: {
          today: 'today',
          month: 'month'          
        }        
      });


    });
</script>
<script src="custom/js/dashboard1.js"></script>
<?php require_once 'includes/footer.php'; ?>