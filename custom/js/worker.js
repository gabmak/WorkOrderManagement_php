var manageWorkerTable;

$(document).ready(function() {
	// top bar active
	$('#navWorker').addClass('active');
	
	// manage worker table
	manageWorkerTable = $("#manageWorkerTable").DataTable({
		'ajax': 'php_action/fetchWorker.php',
		'order': []		
	});

	// submit worker form function
	$("#submitWorkerForm").unbind('submit').bind('submit', function() {
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');			

		var workerName = $("#workerName").val();
		var telephone = $("#telephone").val();
		var cbrePassport = $("#cbrePassport").val();
		var accessLevel = $("#accessLevel").val();
		var loginId = $("#loginId").val();
		var password = $("#password").val();
		var password1 = $("#password1").val();
		

		if(workerName == "") {
			$("#workerName").after('<p class="text-danger">Worker Name field is required</p>');
			$('#workerName').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#workerName").find('.text-danger').remove();
			// success out for form 
			$("#workerName").closest('.form-group').addClass('has-success');	  	
		}
		
		if(telephone == "") {
			$("#telephone").after('<p class="text-danger">Telephone field is required</p>');
			$('#telephone').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#telephone").find('.text-danger').remove();
			// success out for form 
			$("#telephone").closest('.form-group').addClass('has-success');	  	
		}
		
		if(cbrePassport == "") {
			$("#cbrePassport").after('<p class="text-danger">CBRE Passport field is required</p>');
			$('#cbrePassport').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#cbrePassport").find('.text-danger').remove();
			// success out for form 
			$("#cbrePassport").closest('.form-group').addClass('has-success');	  	
		}
		
		if(accessLevel == "") {
			$("#accessLevel").after('<p class="text-danger">Access Level field is required</p>');
			$('#accessLevel').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#accessLevel").find('.text-danger').remove();
			// success out for form 
			$("#accessLevel").closest('.form-group').addClass('has-success');	  	
		}
		
		if(loginId == "") {
			$("#loginId").after('<p class="text-danger">Login Name field is required</p>');
			$('#loginId').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#loginId").find('.text-danger').remove();
			// success out for form 
			$("#loginId").closest('.form-group').addClass('has-success');	  	
		}
		
		if(password == "") {
			$("#password").after('<p class="text-danger">Password field is required</p>');
			$('#password').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#password").find('.text-danger').remove();
			// success out for form 
			$("#password").closest('.form-group').addClass('has-success');	  	
		}
		
		if(password1 == "") {
			$("#password1").after('<p class="text-danger">Password field is required</p>');

			$('#password1').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#password1").find('.text-danger').remove();
			// success out for form 
			$("#password1").closest('.form-group').addClass('has-success');	  	
		}
		if(password == password1){
			// remov error text field
			$("#password").find('.text-danger').remove();
			// success out for form 
			$("#password").closest('.form-group').addClass('has-success');
			// remov error text field
			$("#password1").find('.text-danger').remove();
			// success out for form 
			$("#password1").closest('.form-group').addClass('has-success');
			
			if(workerName && telephone && cbrePassport && accessLevel && loginId && password && password1) {
				var form = $(this);
				// button loading
				$("#createWorkerBtn").button('loading');
				
				$.ajax({
					url : form.attr('action'),
					type: form.attr('method'),
					data: form.serialize(),
					dataType: 'json',
					success:function(response) {
						// button loading
						$("#createWorkerBtn").button('reset');
						
						if(response.success == true) {
							// reload the manage member table 
							manageWorkerTable.ajax.reload(null, false);							
							
							// reset the form text
							$("#submitWorkerForm")[0].reset();
							// remove the error text
							$(".text-danger").remove();
							// remove the form error
							$('.form-group').removeClass('has-error').removeClass('has-success');
  	  			
							$('#add-worker-messages').html('<div class="alert alert-success">'+
														   '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
														   '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
														   '</div>');

							$(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert
						}  // if
						
					} // /success
				}); // /ajax	
			} // if
		} else {
			$("#password1").after('<p class="text-danger">Wrong password</p>');
			$('#password1').closest('.form-group').addClass('has-error');
		}

		return false;
	}); // /submit worker form function

});

function editWorkers(workerId = null) {
	if(workerId) {
		// remove hidden worker id text
		$('#workerId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-worker-result').addClass('div-hide');
		// modal footer
		$('.editWorkerFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedWorker.php',
			type: 'post',
			data: {workerId : workerId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-worker-result').removeClass('div-hide');
				// modal footer
				$('.editWorkerFooter').removeClass('div-hide');

				// setting the worker name value 
				$('#editWorkerName').val(response.name);
				// setting the worker address value 
				$('#editTelephone').val(response.telephone);
				// setting the worker telephone value 
				$('#editPassport').val(response.cbre_passport);
				
				// worker id 
				$(".editWorkerFooter").after('<input type="hidden" name="workerId" id="workerId" value="'+response.worker_id+'" />');

				// update worker form 
				$('#editWorkerForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var workerName = $('#editWorkerName').val();
					var workerTelephone = $('#editTelephone').val();
					var workerPassport = $('#editPassport').val();

					if(workerName == "") {
						$("#editWorkerName").after('<p class="text-danger">Worker Name field is required</p>');
						$('#editWorkerName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editWorkerName").find('.text-danger').remove();
						// success out for form 
						$("#editWorkerName").closest('.form-group').addClass('has-success');	  	
					}
									
					if(workerTelephone == "") {
						$("#editTelephone").after('<p class="text-danger">Telephone field is required</p>');
						$('#editTelephone').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editTelephone").find('.text-danger').remove();
						// success out for form 
						$("#editTelephone").closest('.form-group').addClass('has-success');	  	
					}

					if(workerPassport == "") {
						$("#editPassport").after('<p class="text-danger">CBRE Passport field is required</p>');

						$('#editPassport').closest('.form-group').addClass('has-error');
					} else {
						// remove error text field
						$("#editPassport").find('.text-danger').remove();
						// success out for form 
						$("#editPassport").closest('.form-group').addClass('has-success');	  	
					}

					if(workerName && workerTelephone && workerPassport) {
						var form = $(this);

						// submit btn
						$('#editWorkerBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editWorkerBtn').button('reset');

									// reload the manage worker table 
									manageWorkerTable.ajax.reload(null, false);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-worker-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
								} // /if
									
							}// /success
						});	 // /ajax												
					} // /if

					return false;
				}); // /update worker form

			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit workers function

function removeWorkers(workerId = null) {
	if(workerId) {
		$('#removeWorkerId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedWorker.php',
			type: 'post',
			data: {workerId : workerId},
			dataType: 'json',
			success:function(response) {
				$('.removeWorkerFooter').after('<input type="hidden" name="removeWorkerId" id="removeWorkerId" value="'+response.worker_id+'" /> ');

				// click on remove button to remove the worker
				$("#removeWorkerBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeWorkerBtn").button('loading');

					$.ajax({
						url: 'php_action/removeWorker.php',
						type: 'post',
						data: {workerId : workerId},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeWorkerBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the worker table 
								manageWorkerTable.ajax.reload(null, false);
								
								$('.remove-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
							} else {

							} // /else
						} // /response messages
					}); // /ajax function to remove the worker

				}); // /click on remove button to remove the worker

			} // /success
		}); // /ajax

		$('.removeWorkerFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove worker function