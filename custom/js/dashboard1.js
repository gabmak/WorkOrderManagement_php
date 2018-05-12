var managePersonOrderTable;

$(document).ready(function() {
	
	managePersonOrderTable = $("#managePersonOrderTable").DataTable({
			'ajax': 'php_action/fetchWorkerOrder.php',
			'order': []
		});
});


