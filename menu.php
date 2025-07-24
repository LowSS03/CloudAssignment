<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Caf&eacute; Menu</title>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="menu.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">
</head>

<body class="bodyStyle">

	<div id="header" class="mainHeader">
		<hr>
		<div class="center">Caf&eacute;</div>
	</div>
	<br>
	<?php
		// Get the application environment parameters from the Parameter Store.
		include ('getAppParameters.php');

		// Display the server metadata information if the showServerInfo parameter is true.
		include('serverInfo.php');
	?>
	<hr>
	<div class="topnav">
		<a href="index.php">Home</a>
		<a href="menu.php" class="active">Menu</a>
		<a href="query.php" class="active">Query</a>
	</div>



	<div id="Copyright" class="center">
		<h5>&copy; 2020, Amazon Web Services, Inc. or its Affiliates. All rights reserved.</h5>
	</div>


</body>
</html>