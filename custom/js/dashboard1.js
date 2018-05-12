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
				
				if(response['ststus'] != 1){
					$("#startOrderMessages").html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');
					document.getElementById("updateStartOrderBtn").disabled = true;
				}
				
				// update status
				$("#updateStartOrderBtn").unbind('click').bind('click', function() {
					
					// remove the error 
					$('.text-danger').remove();
					// remove the form-error
					$('.form-group').removeClass('has-error').removeClass('has-success');
					
					var startTime = $("#startTime").val();
					
					if(startTime == "") {
						$("#startTime").after('<p class="text-danger">Time is required</p>');
						$("#startTime").closest('.form-group').addClass('has-error');
					} else {
						$("#startTime").closest('.form-group').addClass('has-success');
					}
					
					$("#removeOrderBtn").button('loading');
//					if(processStatus) {
//						$("#updateStatusOrderBtn").button('loading');
//						$.ajax({
//							url: 'php_action/editStatus.php',
//							type: 'post',
//							data: {
//								work_id: work_id,
//								processStatus: processStatus,
//								
//							},
//							dataType: 'json',
//							success:function(response) {
//								$("#updateStatusOrderBtn").button('loading');
//
//								// remove error
//								$('.text-danger').remove();
//								$('.form-group').removeClass('has-error').removeClass('has-success');
//
//								$("#statusOrderModal").modal('hide');
//								$("#updateStatusOrderBtn").button('reset');
//								$("#success-messages").html('<div class="alert alert-success">'+
//			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
//			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
//			          '</div>');
//
//								// remove the mesages
//			          $(".alert-success").delay(500).show(10, function() {
//									$(this).delay(3000).hide(10, function() {
//										$(this).remove();
//									});
//								}); // /.alert	
//
//			          // refresh the manage order table
//								manageOrderTable.ajax.reload(null, false);		
//							} //
//
//						});
//					} // /if
//						
					return false;
				}); // /update status			

			} // /success
		}); // fetch order data
	} else {
		alert('Error ! Refresh the page again');
	}
}
