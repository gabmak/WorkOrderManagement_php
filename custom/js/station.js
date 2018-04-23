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
			$("#stationName").after('<p class="text-danger">Station Name field is required</p>');
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
  	  			
  	  			$('#add-brand-messages').html('<div class="alert alert-success">'+
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
	}); // /submit brand form function

});

function editBrands(brandId = null) {
	if(brandId) {
		// remove hidden brand id text
		$('#brandId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-brand-result').addClass('div-hide');
		// modal footer
		$('.editBrandFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedBrand.php',
			type: 'post',
			data: {brandId : brandId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-brand-result').removeClass('div-hide');
				// modal footer
				$('.editBrandFooter').removeClass('div-hide');

				// setting the brand name value 
				$('#editBrandName').val(response.brand_name);
				// setting the brand status value
				$('#editBrandStatus').val(response.brand_active);
				// brand id 
				$(".editBrandFooter").after('<input type="hidden" name="brandId" id="brandId" value="'+response.brand_id+'" />');

				// update brand form 
				$('#editBrandForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var brandName = $('#editBrandName').val();
					var brandStatus = $('#editBrandStatus').val();

					if(brandName == "") {
						$("#editBrandName").after('<p class="text-danger">Brand Name field is required</p>');
						$('#editBrandName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editBrandName").find('.text-danger').remove();
						// success out for form 
						$("#editBrandName").closest('.form-group').addClass('has-success');	  	
					}

					if(brandStatus == "") {
						$("#editBrandStatus").after('<p class="text-danger">Brand Name field is required</p>');

						$('#editBrandStatus').closest('.form-group').addClass('has-error');
					} else {
						// remove error text field
						$("#editBrandStatus").find('.text-danger').remove();
						// success out for form 
						$("#editBrandStatus").closest('.form-group').addClass('has-success');	  	
					}

					if(brandName && brandStatus) {
						var form = $(this);

						// submit btn
						$('#editBrandBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editBrandBtn').button('reset');

									// reload the manage member table 
									manageBrandTable.ajax.reload(null, false);								  	  										
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-brand-messages').html('<div class="alert alert-success">'+
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
				}); // /update brand form

			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit brands function

function removeStations(stationId = null) {
	if(stationId) {
		$('#removeStationId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedStation.php',
			type: 'post',
			data: {stationId : stationId},
			dataType: 'json',
			success:function(response) {
				$('.removeBrandFooter').after('<input type="hidden" name="removeBrandId" id="removeBrandId" value="'+response.sta_id+'" /> ');

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
					}); // /ajax function to remove the brand

				}); // /click on remove button to remove the brand

			} // /success
		}); // /ajax

		$('.removeStationFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove station function