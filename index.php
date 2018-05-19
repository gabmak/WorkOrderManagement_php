<link rel="apple-touch-icon" sizes="167x167" href="http://i.imgur.com/ONSrjLm.png">
<link rel="icon" type="image/png" sizes="128x128"  href="https://i.imgur.com/ONSrjLm.png"/>
<?php 
require_once 'php_action/db_connect.php';

session_start();

if(isset($_SESSION['userId'])) {
	if ($_SESSION['accessLevel'] == 1){
		header('location: https://localhost/FYP/dashboard.php');
	} else
		header('location: https://localhost/FYP/dashboard1.php');		
	
}

$errors = array();

if($_POST) {		

	$username = $_POST['username'];
	$password = $_POST['password'];

	if(empty($username) || empty($password)) {
		if($username == "") {
			$errors[] = "Username is required";
		} 

		if($password == "") {
			$errors[] = "Password is required";
		}
	} else {
		$sql = "SELECT * FROM login WHERE login_id = '$username' AND active='1'";
		$result = $connect->query($sql);

		if($result->num_rows == 1) {
			
			// exists
			$mainSql = "SELECT * FROM login WHERE login_id = '$username' AND password = '$password'";
			$mainResult = $connect->query($mainSql);

			if($mainResult->num_rows == 1) {
				$row = $result->fetch_array();
				$user_id = $row['user_id'];
				$accessLevel = $row['access_level'];
				$worker_id = $row['worker_id'];
				$workerName = "";
				$workerType = "";
				$nameSql = "SELECT * FROM WORKER WHERE worker_id = {$worker_id}";
				$nameResult = $connect->query($nameSql);
				if ($nameResult->num_rows > 0){
					$nameRow = $nameResult->fetch_array();
					$workerName = $nameRow['name'];
					$workerType = $nameRow['worker_type'];
				}
				// set session
				$_SESSION['userId'] = $user_id;
				$_SESSION['accessLevel'] = $accessLevel;
				$_SESSION['workerId'] = $worker_id;
				$_SESSION['name'] = $workerName;
				$_SESSION['workerType'] = $workerType;
				
				if ($accessLevel == 1){
					header('location: https://localhost/FYP/dashboard.php');
				} else 
					header('location: https://localhost/FYP/dashboard1.php');

			} else{
				
				$errors[] = "Incorrect username/password combination";
			} // /else
		} else {		
			$errors[] = "Incorrect username/password combination";		
		} // /else
	} // /else not empty username // password
	
} // /if $_POST
?>

<!DOCTYPE html>
<html>
<head>
	<title>Work Order Management System</title>

	<!-- bootstrap -->
	<link rel="stylesheet" href="assests/bootstrap/css/bootstrap.min.css">
	<!-- bootstrap theme-->
	<link rel="stylesheet" href="assests/bootstrap/css/bootstrap-theme.min.css">
	<!-- font awesome -->
	<link rel="stylesheet" href="assests/font-awesome/css/font-awesome.min.css">

  <!-- custom css -->
  <link rel="stylesheet" href="custom/css/custom.css">

  <!-- jquery -->
	<script src="assests/jquery/jquery.min.js"></script>
  <!-- jquery ui -->  
  <link rel="stylesheet" href="assests/jquery-ui/jquery-ui.min.css">
  <script src="assests/jquery-ui/jquery-ui.min.js"></script>

  <!-- bootstrap js -->
	<script src="assests/bootstrap/js/bootstrap.min.js"></script>
	
	<style>
		.center-screen {
				  display: flex;
				  flex-direction: column;
				  justify-content: center;
				  align-items: center;
				  text-align: center;
				  min-height: 100vh;


		}
		.button-login{
			background-color: white; /* Green */
			border: 2px solid #e9345d;
			color: back;
			padding: 16px 32px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
			margin: 4px 2px;
			-webkit-transition-duration: 0.4s; /* Safari */
			transition-duration: 0.4s;
			cursor: pointer;
		}
		.button-login:hover {
			background-color: #e9345d;
			color: white;
    		
		}
	</style>
	
</head>
<body style="background-image:url(https://localhost/FYP/assests/images/bg-01.jpg);background-size: 100% 100%;">
	<div class="container">
		<div class="row align-items-center" >
			<div class="col-md-5 col-md-offset-4 center-screen" >
				<div style="color: #212527;background-color: #ffffff; border-radius: 2%; padding: 35px; font-family:Poppins-Regular, sans-serif;">
					<div class="panel-body" >
				  <br><br><center><img src="assests/images/smart-icon.png"  style="border-radius: 10%"  width="200"  alt=""/></br><h3><br>Work Order Management System</h3>
				    Version: Alpha.5
				  </center></div>

					<div class="panel-body">
						<div class="messages">
							<?php if($errors) {
								foreach ($errors as $key => $value) {
									echo '<div class="alert alert-warning" role="alert">
									<i class="glyphicon glyphicon-exclamation-sign"></i>
									'.$value.'</div>';										
									}
								} ?>
						</div>
						<form class="form-horizontal" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" id="loginForm">
							<fieldset>
							  <div class="form-group">
								  <div style="display: block"><label for="username" class="control-label"></label></div>
									<div>
									  <input type="text" class="form-control glyphicon input-lg" id="username" name="username" placeholder="&#xe008; Username" autocomplete="off" />
									</div>
								</div>
								<div class="form-group">
									<div style="display: block"><label for="password" class="control-label"></label></div>
									<div>
									  <input type="password" class="form-control glyphicon input-lg" id="password" name="password" placeholder="&#xe033; Password" autocomplete="off" />
									</div>
								</div>								
								<div class="form-group">
									<div style="display: block">
									  <button type="submit" class="button-login btn-lg btn-block"><center></center>Login</button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
					<!-- panel-body -->
				</div>
			</div>
			<!-- /col-md-4 -->
		</div>
		<!-- /row -->
	</div>
	<!-- container -->	
</body>
</html>







	