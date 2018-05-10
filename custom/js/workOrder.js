var manageOrderTable;

$(document).ready(function() {

	var divRequest = $(".div-request").text();

	// top nav bar 
	$("#navOrder").addClass('active');

	if(divRequest == 'add')  {
		// add order	
		// top nav child bar 
		$('#topNavAddOrder').addClass('active');

		// create order form function
		$("#createOrderForm").unbind('submit').bind('submit', function() {
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var orderDate = $("#orderDate").val();
			var workOrderNo = $("#workOrderNo").val();
			var station = $("#station").val();
			var description = $("#description").val();
			var priority = $("#priority").val();
			var workType = $("#workType").val();
				

			// form validation 
			if(orderDate == "") {
				$("#orderDate").after('<p class="text-danger"> The Order Date field is required </p>');
				$('#orderDate').closest('.form-group').addClass('has-error');
			} else {
				$('#orderDate').closest('.form-group').addClass('has-success');
			} // /else

			if(workOrderNo == "") {
				$("#workOrderNo").after('<p class="text-danger"> Work order number field is required </p>');
				$('#workOrderNo').closest('.form-group').addClass('has-error');
			} else {
				$('#workOrderNo').closest('.form-group').addClass('has-success');
			} // /else

			if(station == "") {
				$("#station").after('<p class="text-danger"> Station is required </p>');
				$('#station').closest('.form-group').addClass('has-error');
			} else {
				$('#station').closest('.form-group').addClass('has-success');
			} // /else

			if(description == "") {
				$("#description").after('<p class="text-danger"> Description required </p>');
				$('#description').closest('.form-group').addClass('has-error');
			} else {
				$('#description').closest('.form-group').addClass('has-success');
			} // /else

			if(priority == "") {
				$("#priority").after('<p class="text-danger"> Priority is required </p>');
				$('#priority').closest('.form-group').addClass('has-error');
			} else {
				$('#priority').closest('.form-group').addClass('has-success');
			} // /else

			if(workType == "") {
				$("#workType").after('<p class="text-danger"> Work Type field is required </p>');
				$('#workType').closest('.form-group').addClass('has-error');
			} else {
				$('#workType').closest('.form-group').addClass('has-success');
			} // /else

			
			// array validation
			var workerName = document.getElementsByName('workerName[]');				
			var validateWorker;
			for (var x = 0; x < workerName.length; x++) {       			
				var workerNameId = workerName[x].worker_id;	    	
		    if(workerName[x].value == ''){	    		    	
		    	$("#"+workerNameId+"").after('<p class="text-danger"> Name Field is required!! </p>');
		    	$("#"+workerNameId+"").closest('.form-group').addClass('has-error');	    		    	    	
	      } else {      	
		    	$("#"+workerNameId+"").closest('.form-group').addClass('has-success');	    		    		    	
	      }          
	   	} // for

	   	for (var x = 0; x < workerName.length; x++) {       						
		    if(workerName[x].value){	    		    		    	
		    	validateWorker = true;
	      } else {      	
		    	validateWorker = false;
	      }          
	   	} // for       		   	
	   	
	   	var cbrePassport = document.getElementsByName('cbrePassport[]');		   	
	   	var validateCbrePassport;
	   	for (var x = 0; x < cbrePassport.length; x++) {       
	 			var cbrePassportId = cbrePassport[x].worker_id;
	   	}  // for

	   	
		var telephone = document.getElementsByName('telephone[]');		   	
	   	var validateTelephone;
	   	for (var x = 0; x < telephone.length; x++) {       
	 			var telephoneId = telephone[x].worker_id;
	   	}  // for

			if(orderDate && workOrderNo && station && description && priority && workType) {
				if(validateWorker == true ) {
					// create order button
					//$("#createOrderBtn").button('loading');

					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// reset button
							$("#createOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
	            	'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            	'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	            	' <br /> <br /> '+
	            	'<a href="workOrder.php?o=add" class="btn btn-default" style="margin-left:10px;"> <i class="glyphicon glyphicon-plus-sign"></i> Add New Order </a>'+
	            	
	   		       '</div>');
								
							$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

							// disabled te modal footer button
							$(".submitButtonFooter").addClass('div-hide');
							// remove the product row
							$(".removeWorkerRowBtn").addClass('div-hide');
								
							} else {
								alert(response.messages);								
							}
						} // /response
					}); // /ajax
				} // if array validate is true
			} // /if field validate is true
			

			return false;
		}); // /create order form function	
	
	} else if(divRequest == 'manord') {
		// top nav child bar 
		$('#topNavManageOrder').addClass('active');

		manageOrderTable = $("#manageOrderTable").DataTable({
			'ajax': 'php_action/fetchWorkOrder.php',
			'order': []
		});		
					
	} else if(divRequest == 'editOrd') {

		// edit order form function
		$("#editOrderForm").unbind('submit').bind('submit', function() {
			// alert('ok');
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var orderDate = $("#orderDate").val();
			var workOrderNo = $("#workOrderNo").val();
			var priority = $("#priority").val();
			var description = $("#description").val();
			var station = $("#station").val();
			var workType = $("#workType").val();
			var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			var completeDate = $("#completeDate").val();
			var reason = $("#reason").val();
			var affectedNozzle = $("#affectedNozzle").val();
			var status = $("#status").val();
			

			// form validation 
			if(orderDate == "") {
				$("#orderDate").after('<p class="text-danger"> The Order Date field is required </p>');
				$('#orderDate').closest('.form-group').addClass('has-error');
			} else {
				$('#orderDate').closest('.form-group').addClass('has-success');
			} // /else

			if(workOrderNo == "") {
				$("#workOrderNo").after('<p class="text-danger"> #WO field is required </p>');
				$('#workOrderNo').closest('.form-group').addClass('has-error');
			} else {
				$('#workOrderNo').closest('.form-group').addClass('has-success');
			} // /else

			if(priority == "") {
				$("#priority").after('<p class="text-danger"> Priority is required </p>');
				$('#priority').closest('.form-group').addClass('has-error');
			} else {
				$('#priority').closest('.form-group').addClass('has-success');
			} // /else

			if(description == "") {
				$("#description").after('<p class="text-danger"> Description is required </p>');
				$('#description').closest('.form-group').addClass('has-error');
			} else {
				$('#description').closest('.form-group').addClass('has-success');
			} // /else

			if(station == "") {
				$("#station").after('<p class="text-danger"> Station is required </p>');
				$('#station').closest('.form-group').addClass('has-error');
			} else {
				$('#station').closest('.form-group').addClass('has-success');
			} // /else

			if(workType == "") {
				$("#workType").after('<p class="text-danger"> Work type is required </p>');
				$('#workType').closest('.form-group').addClass('has-error');
			} else {
				$('#workType').closest('.form-group').addClass('has-success');
			} // /else
			
			if(status == "") {
				$("#status").after('<p class="text-danger"> Status is required </p>');
				$('#status').closest('.form-group').addClass('has-error');
			} else {
				$('#status').closest('.form-group').addClass('has-success');
			} // /else

			// array validation
			var workerName = document.getElementsByName('workerName[]');				
			var validateWorker;
			for (var x = 0; x < workerName.length; x++) {       			
				var workerNameId = workerName[x].worker_id;	    	
		    if(workerName[x].value == ''){	    		    	
		    	$("#"+workerNameId+"").after('<p class="text-danger"> Name Field is required!! </p>');
		    	$("#"+workerNameId+"").closest('.form-group').addClass('has-error');	    		    	    	
	      } else {      	
		    	$("#"+workerNameId+"").closest('.form-group').addClass('has-success');	    		    		    	
	      }          
	   	} // for

	   	for (var x = 0; x < workerName.length; x++) {       						
		    if(workerName[x].value){	    		    		    	
		    	validateWorker = true;
	      } else {      	
		    	validateWorker = false;
	      }          
	   	} // for       		   	
	   	
	   	var cbrePassport = document.getElementsByName('cbrePassport[]');		   	
	   	var validateCbrePassport;
	   	for (var x = 0; x < cbrePassport.length; x++) {       
	 			var cbrePassportId = cbrePassport[x].worker_id;
		    if(cbrePassport[x].value == ''){	    	
		    	$("#"+cbrePassportId+"").after('<p class="text-danger"> Name Field is required!! </p>');
		    	$("#"+cbrePassportId+"").closest('.form-group').addClass('has-error');	    		    		    	
	      } else {      	
		    	$("#"+cbrePassportId+"").closest('.form-group').addClass('has-success');	    		    		    		    	
	      } 
	   	}  // for

	   	for (var x = 0; x < cbrePassport.length; x++) {       						
		    if(cbrePassport[x].value){	    		    		    	
		    	validateCbrePassport = true;
	      } else {      	
		    	validateCbrePassport = false;
	      }          
	   	} // for       	
	   	
		var telephone = document.getElementsByName('telephone[]');		   	
	   	var validateTelephone;
	   	for (var x = 0; x < telephone.length; x++) {       
	 			var telephoneId = telephone[x].worker_id;
		    if(telephone[x].value == ''){	    	
		    	$("#"+telephoneId+"").after('<p class="text-danger"> Name Field is required!! </p>');
		    	$("#"+telephoneId+"").closest('.form-group').addClass('has-error');	    		    		    	
	      } else {      	
		    	$("#"+telephoneId+"").closest('.form-group').addClass('has-success');	    		    		    		    	
	      } 
	   	}  // for

	   	for (var x = 0; x < telephone.length; x++) {       						
		    if(telephone[x].value){	    		    		    	
		    	validateTelephone = true;
	      } else {      	
		    	validateTelephone = false;
	      }          
	   	} // for  
			if(orderDate && workOrderNo && station && description && priority && workType) {
				if(validateCbrePassport == true && validateTelephone == true) {
					// create order button
					// $("#createOrderBtn").button('loading');

					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// reset button
							$("#editOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
	            	'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            	'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +	            		            		            	
	   		       '</div>');
								
							$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

							// disabled te modal footer button
							$(".editButtonFooter").addClass('div-hide');
							// remove the product row
							$(".removeProductRowBtn").addClass('div-hide');
								
							} else {
								alert(response.messages);								
							}
						} // /response
					}); // /ajax
				} // if array validate is true
			} // /if field validate is true
			

			return false;
		}); // /edit order form function
	} 	

}); // /documernt


// print order function
function printOrder(orderId = null) {
	if(orderId) {		
			
		$.ajax({
			url: 'php_action/printOrder.php',
			type: 'post',
			data: {orderId: orderId},
			dataType: 'text',
			success:function(response) {
				
				var mywindow = window.open('', 'Stock Management System', 'height=400,width=600');
        mywindow.document.write('<html><head><title>Order Invoice</title>');        
        mywindow.document.write('</head><body>');
        mywindow.document.write(response);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

//      mywindow.print();
//        mywindow.close();
				
			}// /success function
		}); // /ajax function to fetch the printable order
	} // /if orderId
} // /print order function

function addRow() {
	$("#addRowBtn").button("loading");

	var tableLength = $("#workerTable tbody tr").length;

	var tableRow;
	var arrayNumber;
	var count;

	if(tableLength > 0) {		
		tableRow = $("#workerTable tbody tr:last").attr('id');
		arrayNumber = $("#workerTable tbody tr:last").attr('class');
		count = tableRow.substring(3);	
		count = Number(count) + 1;
		arrayNumber = Number(arrayNumber) + 1;					
	} else {
		// no table row
		count = 1;
		arrayNumber = 0;
	}

	$.ajax({
		url: 'php_action/fetchWorkerData.php',
		type: 'post',
		dataType: 'json',
		success:function(response) {
			$("#addRowBtn").button("reset");			

			var tr = '<tr id="row'+count+'" class="'+arrayNumber+'">'+			  				
				'<td>'+
					'<div class="form-group">'+

					'<select class="form-control" name="workerName[]" id="workerName'+count+'" onchange="getWorkerData('+count+')" >'+
						'<option value="">~~SELECT~~</option>';
						// console.log(response);
						$.each(response, function(index, value) {
							tr += '<option value="'+value[0]+'">'+value[1]+'</option>';							
						});
													
					tr += '</select>'+
					'</div>'+
				'</td>'+
				'<td style="padding-left:20px;"">'+
					'<input type="text" name="cbrePassport[]" id="cbrePassport'+count+'" autocomplete="off" disabled="true" class="form-control" />'+
				'</td style="padding-left:20px;">'+
				
				'<td style="padding-left:20px;">'+
					'<input type="text" name="telephone[]" id="telephone'+count+'" autocomplete="off" class="form-control" disabled="true" />'+
				'</td>'+
				'<td>'+
					'<button class="btn btn-default removeWorkerRowBtn" type="button" onclick="removeWorkerRow('+count+')"><i class="glyphicon glyphicon-trash"></i></button>'+
				'</td>'+
			'</tr>';
			if(tableLength > 0) {							
				$("#workerTable tbody tr:last").after(tr);
			} else {				
				$("#workerTable tbody").append(tr);
			}		

		} // /success
	});	// get the product data

} // /add row

function removeWorkerRow(row = null) {
	if(row) {
		$("#row"+row).remove();
	} else {
		alert('error! Refresh the page again');
	}
}

// select on worker data
function getWorkerData(row = null) {
	if(row) {
		var workerId = $("#workerName"+row).val();		
		
		if(workerId == "") {
			$("#cbrePassport"+row).val("");
			$("#telephone"+row).val("");

			
		} else {
			$.ajax({
				url: 'php_action/fetchSelectedWorker.php',
				type: 'post',
				data: {workerId : workerId},
				dataType: 'json',
				success:function(response) {
					// setting the rate value into the rate input field
					
					$("#cbrePassport"+row).val(response.cbre_passport);
					$("#telephone"+row).val(response.telephone);
				} // /success
			}); // /ajax function to fetch the product data	
		}
				
	} else {
		alert('no row! please refresh the page');
	}
} // /select on product data


function resetOrderForm() {
	// reset the input field
	$("#createOrderForm")[0].reset();
	// remove remove text danger
	$(".text-danger").remove();
	// remove form group error 
	$(".form-group").removeClass('has-success').removeClass('has-error');
} // /reset order form


// remove order from server
function removeOrder(work_id = null) {
	if(work_id) {
		$("#removeOrderBtn").unbind('click').bind('click', function() {
			$("#removeOrderBtn").button('loading');

			$.ajax({
				url: 'php_action/removeOrder.php',
				type: 'post',
				data: {work_id : work_id},
				dataType: 'json',
				success:function(response) {
					$("#removeOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#removeOrderModal").modal('hide');
						// success messages
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

					} else {
						// error messages
						$(".removeOrderMessages").html('<div class="alert alert-warning">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert	          
					} // /else

				} // /success
			});  // /ajax function to remove the order

		}); // /remove order button clicked
		

	} else {
		alert('error! refresh the page again');
	}
}
// /remove order from server

function statusOrder(work_id = null) {
	if(work_id) {
		
			
		$.ajax({
			url: 'php_action/fetchOrderData.php',
			type: 'post',
			data: {work_id: work_id},
			dataType: 'json',
			success:function(response) {				
	
				
				// update status
				$("#updateStatusOrderBtn").unbind('click').bind('click', function() {
					
					var processStatus = $("#processStatus").val();
					
					if(processStatus == "") {
						$("#processStatus").after('<p class="text-danger">Process Status is required</p>');
						$("#processStatus").closest('.form-group').addClass('has-error');
					} else {
						$("#processStatus").closest('.form-group').addClass('has-success');
					}
					
					if(processStatus) {
						$("#updateStatusOrderBtn").button('loading');
						$.ajax({
							url: 'php_action/editStatus.php',
							type: 'post',
							data: {
								work_id: work_id,
								processStatus: processStatus,
								
							},
							dataType: 'json',
							success:function(response) {
								$("#updateStatusOrderBtn").button('loading');

								// remove error
								$('.text-danger').remove();
								$('.form-group').removeClass('has-error').removeClass('has-success');

								$("#statusOrderModal").modal('hide');
								$("#updateStatusOrderBtn").button('reset');
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
								manageOrderTable.ajax.reload(null, false);		
							} //

						});
					} // /if
						
					return false;
				}); // /update payment			

			} // /success
		}); // fetch order data
	} else {
		alert('Error ! Refresh the page again');
	}
}
