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
						yAxes: [{ticks: {beginAtZero: true}}],
						xAxes: [{ticks: {autoSkip: false}}],
						pointLabels: {fontSize: 20}
					},
					legend: {
						display: false,
						},
					
				};
				
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
							backgroundColor: ["#f9cdac", "#f3aca2", "#ee8b97", "#e96a8d", "#db5087","#b8428c", "#973490","#742796", "#5e1f88","#4d1a70", "#3d1459","#2d0f41"],
							data: counter
						}]
					
					
				};
			var ctx = $("#chartForCountWorkType");
			var orverRideOption = {
					responsive: true,
					legend: {
						display: false,
						},
						
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
			success:function(response) {
				console.log(response);
				var eachmonth = [];
				var counter = [];
				var finalMonth = [];
				var finalCounter = [];
				
				for (var i in response) {	
					eachmonth[i] = response[i].monthE;
					counter[i] = response[i].counter;
	
				}
				console.log(eachmonth);
				console.log(counter);
				
				for (i = 0; i<12; i ++){
						finalCounter[i] = 0;
					}			

				for (i=0; i<12;i++){
					for (var j = 1; j<=12; j++){
						if (j == eachmonth[i]){
							finalCounter[j-1] = counter[i];
							break;
						}		
					}
				}
				
				console.log(finalMonth);
				console.log(finalCounter);

				

				
				var chartdata = {
					labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					datasets : [
						{
							label : 'jobs',
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
							borderColor:  'rgba(54, 162, 235, 0.2)',
							borderWidth: 1,
							data: finalCounter
						}]
					
					
				};
			var ctx = $("#chartForCountMonth");
			var orverRideOption = {
					scales : {
						yAxes: [{ticks: {beginAtZero: true}}]
					},
					legend: {
						display: false,
					},
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
			var ctx = $("#chartForCountWorkTypeMonth");
			var orverRideOption = {
					responsive: true,
					legend: {
						display: false,
						},
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
				var reason = response.reason;
				console.log(reason);
				document.getElementById("reason").value = reason;
				var work_description = response.work_description;
				console.log(work_description);
				document.getElementById("work_description").value = work_description;
				
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
