var managePersonOrderTable;

$(document).ready(function() {
	
	managePersonOrderTable = $("#managePersonOrderTable").DataTable({
			'ajax': 'php_action/fetchWorkerOrder.php',
			'order': []
		});
	
	$.ajax({
		url: 'php_action/chartCountJobByStation.php',
			type: 'get',
			dataType: 'json',
			success:function(data) {
				console.log(data);
				var sta_name = [];
				var counter = [];
				
				for(var i in data) {
					sta_name.push(data[i].sta_name);
					counter.push(data[i].counter);
				}
				
				var chartdata = {
					labels: sta_name,
					datasets : [
						{
							label : 'jobs',
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
							borderColor:  'rgba(54, 162, 235, 0.2)',
							borderWidth: 1,
							data: counter
						}]
					
					
				};
			var ctx = $("#chartForCountStation");
			var orverRideOption = {
					scales : {
						yAxes: [{ticks: {beginAtZero: true}}]
					}
				}
				
			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata,
				options: orverRideOption
			});
		},
		error: function(data) {
			console.log(data);
		}
	});
	
	$.ajax({
		url: 'php_action/chartCountJobByWorkType.php',
			type: 'get',
			dataType: 'json',
			success:function(data) {
				console.log(data);
				var type = [];
				var counter = [];
				
				for(var i in data) {
					type.push(data[i].type);
					counter.push(data[i].counter);
				}
				
				var chartdata = {
					labels: type,
					datasets : [
						{
							label : 'work type',
							backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                			hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"],
							data: counter
						}]
					
					
				};
			var ctx = $("#chartForCountWorkTypeMonth");
			var orverRideOption = {
					responsive: true
				};
				
			var pieChart = new Chart(ctx, {
				type: 'doughnut',
				data: chartdata,
				options: orverRideOption
			});
		},
		error: function(data) {
			console.log(data);
		}
	});
	


$.ajax({
		url: 'php_action/chartCountJobByMonth.php',
			type: 'get',
			dataType: 'json',
			success:function(result) {
				console.log(result);
				var eachmonth = [];
				var counter = [];
				
				for (var i in result) {
					
						eachmonth.push(result[i].each_month);
						counter.push(result[i].counter);
	
				}

				
//				for (var i =0; i<12; i++){
//
//					if (result[i].each_month+1 == i){
//						eachmonth.push(result[i].each_month);
//						counter.push(result[i].counter);
//					} else {
//						eachmonth.push(i+1);
//						counter.push(0);
//					}
//				}
				
				var chartdata = {
					labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					datasets : [
						{
							label : 'jobs',
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
							borderColor:  'rgba(54, 162, 235, 0.2)',
							borderWidth: 1,
							data: counter
						}]
					
					
				};
			var ctx = $("#chartForCountMonth");
			var orverRideOption = {
					scales : {
						yAxes: [{ticks: {beginAtZero: true}}]
					}
				}
				
			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata,
				options: orverRideOption
			});
		},
		error: function(data) {
			console.log(data);
		}
	});

	$.ajax({
		url: 'php_action/chartCountJobByWorkTypeMonth.php',
			type: 'get',
			dataType: 'json',
			success:function(data) {
				console.log(data);
				var type = [];
				var counter = [];
				
				for(var i in data) {
					type.push(data[i].type);
					counter.push(data[i].counter);
				}
				
				var chartdata = {
					labels: type,
					datasets : [
						{
							label : 'work type',
							backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                			hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"],
							data: counter
						}]
					
					
				};
			var ctx = $("#chartForCountWorkType");
			var orverRideOption = {
					responsive: true
				};
				
			var pieChart = new Chart(ctx, {
				type: 'doughnut',
				data: chartdata,
				options: orverRideOption
			});
		},
		error: function(data) {
			console.log(data);
		}
	});
	
});

function startOrder(work_id = null) {
	
	
	if(work_id) {
		
		$.ajax({
			url: 'php_action/fetchOrderData.php',
			type: 'post',
			data: {work_id: work_id},
			dataType: 'json',
			success:function(response) {				
				console.log(response);
				if(response.status != 1){
					$(".startOrderMessages").html('<div class="alert alert-danger warningIfStarted">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-warning-sign"></i> Warning, job already started!</strong></div>');
					document.getElementById("updateStartOrderBtn").disabled = true;
				}	else{
					$(".warningIfStarted").remove();
					document.getElementById("updateStartOrderBtn").disabled = false;
				}
				
				// update status
				$("#updateStartOrderBtn").unbind('click').bind('click', function() {
					
					// remove the error 
					$('.text-danger').remove();
					// remove the form-error
					$('.form-group').removeClass('has-error').removeClass('has-success');
					
					var startTime = $("#startTime").val();
					var helmet = document.getElementById("helmet");
					var shose = document.getElementById("shose");
					var jacket = document.getElementById("jacket");
					var allGreen = false;
					
					if(startTime == "") {
						$("#startTime").after('<p class="text-danger">Time is required</p>');
						$("#startTime").closest('.form-group').addClass('has-error');
					} else {
						$("#startTime").closest('.form-group').addClass('has-success');
					}
					
					if (helmet.checked==true && shose.checked==true && jacket.checked==true){
						allGreen = true ;
						$(".warningIfStarted").remove();
					} else {
						allGreen = false;
						$(".startOrderMessages").html('<div class="alert alert-danger warningIfStarted">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-warning-sign"></i> Make sure you have wear the protection tools!</strong></div>');
						
					}
					

					
					if(startTime && allGreen==true) {
						$("#updateStartOrderBtn").button('loading');
						$.ajax({
							url: 'php_action/startJob.php',
							type: 'post',
							data: {
								work_id: work_id,
								startTime: startTime,
							},
							dataType: 'json',
							success:function(response) {
								$("#updateStartOrderBtn").button('loading');

								// remove error
								$('.text-danger').remove();
								$('.form-group').removeClass('has-error').removeClass('has-success');

								$("#startOrderModal").modal('hide');
								$("#updateStartOrderBtn").button('reset');
								$("#success-messages").html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

								// remove the mesages
			          $(".alert-success").delay(500).show(10, function() {
									$(this).delay(3000).hide(10, function() {
										$(this).remove();
									});
								}); // /.alert	

			          // refresh the manage order table
								managePersonOrderTable.ajax.reload(null, false);		
							} //

						});
					} // /if
						
					return false;
				}); // /update status			

			} // /success
		}); // fetch order data
	} else {
		alert('Error ! Refresh the page again');
	}
}
