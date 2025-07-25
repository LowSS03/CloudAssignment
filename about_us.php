<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>About Us</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">
    <style>

    </style>
</head>

<body class="bodyStyle">
    <?php
    include("header.php");
    ?>

    <canvas id="particleCanvas" class="particle-bg"></canvas>

    <div class="about-wrapper">
        <!-- Left Column -->
        <div class="about-column left">
            <h2 class="about-title">Our Mission</h2>
            <p>We aim to bridge data access gaps by providing researchers around the world with reliable, clean, and curated datasets. </p>
        </div>

        <!-- Center Column -->
        <div class="about-column center">
            <h2 class="about-title">About Us</h2>
            <img src="Shirley.jpg" alt="Founder - Shirley" class="founder-img">
            <div class="founder-name">Shirley</div>
            <p class="about-description">
                Our site got started when Maria Gondalaz found that she was frequently looking up data from a variety of databases. <br>
                Shirley decided to start sharing some of this data with other social researchers.
            </p>
        </div>

        <!-- Right Column -->
        <div class="about-column right">
            <h2 class="about-title">Who We Help</h2>
            <p>Our platform supports academic scholars, policymakers, and NGOs by providing access to development indicators and demographic data.</p>
        </div>
    </div>
    <?php
    include("copyright.php");
    ?>

    <script src="about-script.js"></script>


</body>

</html>