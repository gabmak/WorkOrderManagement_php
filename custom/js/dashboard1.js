var managePersonOrderTable;

$(document).ready(function() {
	
	managePersonOrderTable = $("#managePersonOrderTable").DataTable({
			'ajax': 'php_action/fetchWorkerOrder.php',
			'order': []
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
