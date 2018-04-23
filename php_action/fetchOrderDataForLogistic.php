<?php 	

$localhost = "localhost:3306";
$username = "root";
$password = "password";
$dbname = "stock";

// db connection
$connect = new mysqli($localhost, $username, $password, $dbname);

mysqli_query($connect,"SET NAMES 'utf8'");

$orderId = $_POST['orderId'];

	
$valid['sender'] = "YourSupplyer Ltd";
$valid['sender contact'] = "26471358";
$valid['email']="logistic@yoursupplier.com";
$valid['sender address'] = "YourSupplier, 1 Sender Road";

$sql = "SELECT orders.shipping_address FROM orders WHERE orders.order_id = {$orderId}";
$result = $connect->query($sql);
if ($result->num_rows > 0) {
	while($row = mysqli_fetch_row($result)) {
	$valid['shipping address'] = $row[0];
	}
}

$sql = "SELECT orders.client_name FROM orders WHERE orders.order_id = {$orderId}";
$result = $connect->query($sql);
if ($result->num_rows > 0) {
	while($row = mysqli_fetch_row($result)) {
	$valid['receiver'] = $row[0];
	}
}


$sql = "SELECT orders.client_contact FROM orders WHERE orders.order_id = {$orderId}";
$result = $connect->query($sql);
if ($result->num_rows > 0) {
	while($row = mysqli_fetch_row($result)) {
	$valid['shipping contact'] = $row[0];
	}
}



$sql = "SELECT categories.categories_name, order_item.quantity
	FROM order_item, categories, product
	WHERE order_item.order_id = {$orderId} 
	AND order_item.product_id = product.product_id 
	AND product.categories_id = categories.categories_id";

$counter = 0;
$result = $connect->query($sql);
if ($result->num_rows > 0) {
	while($row = mysqli_fetch_row($result)) {
		$counter = $counter +1;
		$valid['product'][$counter]['name'] = $row[0];
		$valid['product'][$counter]['quantity'] = $row[1];
	}
}





$connect->close();

echo json_encode($valid);