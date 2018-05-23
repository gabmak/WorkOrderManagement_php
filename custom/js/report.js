$(document).ready(function() {
	// order date picker
	$("#startDate").datepicker();
	// order date picker
	$("#endDate").datepicker();

	$("#getOrderReportForm").unbind('submit').bind('submit', function() {
		
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();

		if(startDate == "" || endDate == "") {
			if(startDate == "") {
				$("#startDate").closest('.form-group').addClass('has-error');
				$("#startDate").after('<p class="text-danger">The Start Date is required</p>');
			} else {
				$(".form-group").removeClass('has-error');
				$(".text-danger").remove();
			}

			if(endDate == "") {
				$("#endDate").closest('.form-group').addClass('has-error');
				$("#endDate").after('<p class="text-danger">The End Date is required</p>');
			} else {
				$(".form-group").removeClass('has-error');
				$(".text-danger").remove();
			}
		} else {
			$(".form-group").removeClass('has-error');
			$(".text-danger").remove();

			var form = $(this);

			$.ajax({
				url: form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'text',
				success:function(response) {
					
					var jsonHtmlTable = ConvertJsonToTable(response, 'jsonTable', null, null);
					
					var mywindow = window.open('', 'Work Order Mangaement System', 'height=400,width=600');
	        		mywindow.document.write('<html><head><title>Order Report Slip</title>');        
					mywindow.document.write('</head><body><h1 align="center">Order Report</h1><br>');
					mywindow.document.write('<table id="jsonTable">');
					mywindow.document.write('</table>></body></html>');

					mywindow.document.close(); // necessary for IE >= 10
					mywindow.focus(); // necessary for IE >= 10

					mywindow.print();
	        
				} // /success
			});	// /ajax

		} // /else

		return false;
	});

});