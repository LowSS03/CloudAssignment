<html>

<head>
	<meta charset="UTF-8">
	<title>Example Site;!</title>
	<link rel="stylesheet" href="styles.css">
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">
</head>

<body class="bodyStyle">
	<?php
	include("header.php");

	// Get the application environment parameters from the Parameter Store.
	// include('getAppParameters.php');

	// Display the server metadata information if the showServerInfo parameter is true.

	?>
	<div class="content-wrapper">
		<div class="center-column">
			<h1>Welcome to our <span class="highlight">data query site</span></h1>
			<h1>Get <span class="highlight">data from countries</span> all over the world to <span class="highlight">use in your research</span></h1>
			<div class="orb-container">
				<canvas id="orbParticles"></canvas>
				<div class="orb-glow"></div>
				<script src="particles-orb.js"></script>
			</div>
			<h1>Data or a variety of areas including <span class="highlight">basic demographics</span> & <span class="highlight">development statistics</span></h1>
		</div>
	</div>
</body>

</html>