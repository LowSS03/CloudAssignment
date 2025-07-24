<html>
<head>
<meta charset="UTF-8">
<title>Query Page</title>
<link rel="stylesheet" href="styles.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">
</head>


<body class="bodyStyle">
	

	<div id="header" class="mainHeader">
		<hr>
		<div class="center"><H1>Example Social Research Organization</H1></div>
	</div>
	<br>
		<hr>
		<div class="center"><H2>Country Data Query Page</H2></div>
	</div>
	<br>
		<H2><a href="index.php">Home</a></H2>
		
	</div>
	
	<H2>Please select which query you want to run.</H2>
	<form id="form1" method="post" action='query.php'>
	<select name="selection">
	 <option value="">Select...</option>     
     <option value='Q1'>Mobile phones</option>  
     <option value='Q2'>Population</option>
     <option value='Q3'>Life Expectancy</option>
     <option value='Q4'>GDP</option>
     <option value='Q5'>Childhood Mortality</option>
     
   </select>
   
   <input type="submit" value="Submit">
   </form>

   <div class="center">
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["selection"])) {
        include 'get-parameters.php';

        $conn = new mysqli($ep, $un, $pw, $db);
        if ($conn->connect_error) {
            die("<p style='color:red;'>Connection failed: " . $conn->connect_error . "</p>");
        }

        $_pick = $_POST["selection"];
        switch ($_pick) {
            case "Q1":
                $sql = "SELECT name, mobilephones FROM countrydata_final;";
                echo "<h3>Mobile Phones by Country</h3>";
                break;
            case "Q2":
                $sql = "SELECT name, population, populationurban FROM countrydata_final;";
                echo "<h3>Population by Country</h3>";
                break;
            case "Q3":
                $sql = "SELECT name, birthrate, lifeexpectancy FROM countrydata_final;";
                echo "<h3>Life Expectancy by Country</h3>";
                break;
            case "Q4":
                $sql = "SELECT name, gdp FROM countrydata_final;";
                echo "<h3>GDP by Country</h3>";
                break;
            case "Q5":
                $sql = "SELECT name, mortalityunder5 FROM countrydata_final;";
                echo "<h3>Childhood Mortality by Country</h3>";
                break;
            default:
                $sql = "";
                echo "<p style='color:red;'>Invalid selection.</p>";
        }

        if (!empty($sql)) {
            $result = $conn->query($sql);
            if ($result && $result->num_rows > 0) {
                echo "<table>";
                echo "<tr>";
                foreach ($result->fetch_fields() as $col) {
                    echo "<th>" . htmlspecialchars($col->name) . "</th>";
                }
                echo "</tr>";

                $result->data_seek(0); // Reset result pointer
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    foreach ($row as $value) {
                        echo "<td>" . htmlspecialchars($value) . "</td>";
                    }
                    echo "</tr>";
                }
                echo "</table>";
            } else {
                echo "<p>No results found.</p>";
            }
        }
        $conn->close();
    }
    ?>
</div>
 
<br>
<div id="Copyright" class="center">
    <h5>&copy; 2020, Amazon Web Services, Inc. or its Affiliates. All rights
        reserved.</h5>
</div>

</body>
</html>
