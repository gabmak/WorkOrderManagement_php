$(document).ready(function() {
			$.ajax({
		url: 'chartCountJobByMonth.php',
			type: 'get',
			dataType: 'json',
			success:function(response) {
				console.log(response);
				var eachmonth = [];
				var counter = [];
				
//				for (var i in response) {
//					
//						eachmonth.push(response[i].each_month);
//						counter.push(response[i].counter);
//	
//				}

				
				for (var i = 0 ; i < 12 ; i++){
					var dataSet = (response[i].monthE);
					dataSet = dataSet + 1;
					if (dataSet == i ){
						eachmonth.push(response[i].monthE);
						counter.push(response[i].counter);
					} else {
						eachmonth.push(i);
						counter.push(0);
					}
				}
				console.log(eachmonth);
					}});
	
				
		});