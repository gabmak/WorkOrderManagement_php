var manageStationTable;

$(document).ready(function() {
	// top bar active
	$('#navStation').addClass('active');
	
	// manage station table
	manageStationTable = $("#manageStationTable").DataTable({
		'ajax': 'php_action/fetchStation.php',
		'order': []		
	});

	// submit station form function
	$("#submitStationForm").unbind('submit').bind('submit', function() {
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');			

		var stationName = $("#stationName").val();
		var stationStatus = $("#stationStatus").val();
		var address = $("#address").val();
		var telephone = $("#telephone").val();

		if(stationName == "") {
			$("#stationName").after('<p class="text-danger">Station field is required</p>');
			$('#stationName').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#stationName").find('.text-danger').remove();
			// success out for form 
			$("#stationName").closest('.form-group').addClass('has-success');	  	
		}
		
		if(address == "") {
			$("#address").after('<p class="text-danger">Address field is required</p>');
			$('#address').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#address").find('.text-danger').remove();
			// success out for form 
			$("#address").closest('.form-group').addClass('has-success');	  	
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

		if(stationStatus == "") {
			$("#stationStatus").after('<p class="text-danger">Station Name field is required</p>');

			$('#stationStatus').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#stationStatus").find('.text-danger').remove();
			// success out for form 
			$("#stationStatus").closest('.form-group').addClass('has-success');	  	
		}

		if(stationName && telephone && address && stationStatus) {
			var form = $(this);
			// button loading
			$("#createStationBtn").button('loading');

			$.ajax({
				url : form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'json',
				success:function(response) {
					// button loading
					$("#createStationBtn").button('reset');

					if(response.success == true) {
						// reload the manage member table 
						manageStationTable.ajax.reload(null, false);						

  	  			// reset the form text
						$("#submitStationForm")[0].reset();
						// remove the error text
						$(".text-danger").remove();
						// remove the form error
						$('.form-group').removeClass('has-error').removeClass('has-success');
  	  			
  	  			$('#add-station-messages').html('<div class="alert alert-success">'+
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

		return false;
	}); // /submit station form function

});

function editStations(stationId = null) {
	if(stationId) {
		// remove hidden station id text
		$('#stationId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-station-result').addClass('div-hide');
		// modal footer
		$('.editStationFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedStation.php',
			type: 'post',
			data: {stationId : stationId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-station-result').removeClass('div-hide');
				// modal footer
				$('.editStationFooter').removeClass('div-hide');

				// setting the station name value 
				$('#editStationName').val(response.sta_name);
				// setting the station address value 
				$('#editStationAddress').val(response.address);
				// setting the station telephone value 
				$('#editStationTelephone').val(response.telephone);
				// setting the station status value
				$('#editStationStatus').val(response.status);
				// station id 
				$(".editStationFooter").after('<input type="hidden" name="stationId" id="stationId" value="'+response.sta_id+'" />');

				// update station form 
				$('#editStationForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var stationName = $('#editStationName').val();
					var stationAddress = $('#editStationAddress').val();
					var stationTelephone = $('#editStationTelephone').val();
					var stationStatus = $('#editStationStatus').val();

					if(stationName == "") {
						$("#editStationName").after('<p class="text-danger">Station Name field is required</p>');
						$('#editStationName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editStationName").find('.text-danger').remove();
						// success out for form 
						$("#editStationName").closest('.form-group').addClass('has-success');	  	
					}
					
					if(stationAddress == "") {
						$("#editStationAddress").after('<p class="text-danger">Station Address field is required</p>');
						$('#editStationAddress').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editStationAddress").find('.text-danger').remove();
						// success out for form 
						$("#editStationAddress").closest('.form-group').addClass('has-success');	  	
					}
					
					if(stationTelephone == "") {
						$("#editStationTelephone").after('<p class="text-danger">Station Telephone field is required</p>');
						$('#editStationTelephone').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editStationTelephone").find('.text-danger').remove();
						// success out for form 
						$("#editStationTelephone").closest('.form-group').addClass('has-success');	  	
					}

					if(stationStatus == "") {
						$("#editStationStatus").after('<p class="text-danger">Station Status field is required</p>');

						$('#editStationStatus').closest('.form-group').addClass('has-error');
					} else {
						// remove error text field
						$("#editStationStatus").find('.text-danger').remove();
						// success out for form 
						$("#editStationStatus").closest('.form-group').addClass('has-success');	  	
					}

					if(stationName && stationAddress && stationTelephone && stationStatus) {
						var form = $(this);

						// submit btn
						$('#editStationBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editStationBtn').button('reset');

									// reload the manage station table 
									manageStationTable.ajax.reload(null, false);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-station-messages').html('<div class="alert alert-success">'+
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
				}); // /update station form

			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit stations function

function removeStations(stationId = null) {
	if(stationId) {
		$('#removeStationId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedStation.php',
			type: 'post',
			data: {stationId : stationId},
			dataType: 'json',
			success:function(response) {
				$('.removeStationFooter').after('<input type="hidden" name="removeStationId" id="removeStationId" value="'+response.sta_id+'" /> ');

				// click on remove button to remove the station
				$("#removeStationBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeStationBtn").button('loading');

					$.ajax({
						url: 'php_action/removeStation.php',
						type: 'post',
						data: {stationId : stationId},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeStationBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the station table 
								manageStationTable.ajax.reload(null, false);
								
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
					}); // /ajax function to remove the station

				}); // /click on remove button to remove the station

			} // /success
		}); // /ajax

		$('.removeStationFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove station function