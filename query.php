<html>
<head>
    <meta charset="UTF-8">
    <title>Query Page</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">
</head>

<body class="bodyStyle">

<?php
    include("header.php");
?>

<br>
<hr>
<div class="center"><H2>Country Data Query Page</H2></div>
<br>

<H2>Please select which query you want to run.</H2>

<form id="form1" method="post" action="query.php">
    <select name="selection">
        <option value="">Select...</option>
        <option value='Q1'>Mobile phones</option>
        <option value='Q2'>Population</option>
        <option value='Q3'>Life Expectancy</option>
        <option value='Q4'>GDP</option>
        <option value='Q5'>Childhood Mortality</option>
    </select>
    <input type="submit" value="Submit">

    <!-- Live Search Input -->
    <input type="text" id="countrySearch" placeholder="Search Country..." style="margin-left:10px;">
</form>

<div class="center">
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" || isset($_GET["selection"])) {
    include 'get-parameters.php';
    $conn = new mysqli($ep, $un, $pw, $db);
    if ($conn->connect_error) {
        die("<p style='color:red;'>Connection failed: " . $conn->connect_error . "</p>");
    }

    $_pick = $_POST["selection"] ?? $_GET["selection"];
    $sortColumn = $_GET['sort'] ?? null;
    $sortOrder = $_GET['order'] ?? 'asc';

    $columnTitles = [
        "name" => "Country Name",
        "population" => "Population",
        "populationurban" => "Populationurban",
        "mobilephones" => "Mobile Phones",
        "birthrate" => "Birth Rate",
        "lifeexpectancy" => "Life Expectancy",
        "gdp" => "GDP",
        "mortalityunder5" => "Mortality Rate (Age under 5)"
    ];

    $numericColumns = [
        "population",
        "populationurban",
        "mobilephones",
        "birthrate",
        "lifeexpectancy",
        "gdp",
        "mortalityunder5"
    ];

    // SQL base
    switch ($_pick) {
        case "Q1":
            $baseSQL = "SELECT name, mobilephones FROM countrydata_final";
            echo "<h3>Mobile Phones by Country</h3>";
            break;
        case "Q2":
            $baseSQL = "SELECT name, population, populationurban FROM countrydata_final";
            echo "<h3>Population by Country</h3>";
            break;
        case "Q3":
            $baseSQL = "SELECT name, birthrate, lifeexpectancy FROM countrydata_final";
            echo "<h3>Life Expectancy by Country</h3>";
            break;
        case "Q4":
            $baseSQL = "SELECT name, gdp FROM countrydata_final";
            echo "<h3>GDP by Country</h3>";
            break;
        case "Q5":
            $baseSQL = "SELECT name, mortalityunder5 FROM countrydata_final";
            echo "<h3>Childhood Mortality by Country</h3>";
            break;
        default:
            $baseSQL = "";
            echo "<p style='color:red;'>Invalid selection.</p>";
    }

    if (!empty($baseSQL)) {
        $sortWhitelist = array_keys($columnTitles);
        $validOrder = in_array(strtolower($sortOrder), ['asc', 'desc']) ? strtolower($sortOrder) : 'asc';

        if ($sortColumn && in_array($sortColumn, $sortWhitelist)) {
            $sql = "$baseSQL ORDER BY $sortColumn $validOrder";
        } else {
            $sql = $baseSQL;
        }

        $result = $conn->query($sql);
        if ($result && $result->num_rows > 0) {
            echo "<table id='dataTable'>";
            echo "<tr>";
            foreach ($result->fetch_fields() as $col) {
                $dbCol = $col->name;
                $friendlyTitle = $columnTitles[$dbCol] ?? $dbCol;

                if ($sortColumn == $dbCol) {
                    $arrow = $validOrder == 'asc' ? " ▲" : " ▼";
                    $newOrder = $validOrder == 'asc' ? 'desc' : 'asc';
                } else {
                    $arrow = " –";
                    $newOrder = 'asc';
                }

                $url = "query.php?selection=" . urlencode($_pick) .
                       "&sort=" . urlencode($dbCol) .
                       "&order=" . $newOrder;

                echo "<th><a href='$url' style='color:cyan; text-decoration:none;'>" .
                     htmlspecialchars($friendlyTitle) . $arrow .
                     "</a></th>";
            }
            echo "</tr>";

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

        $conn->close();
    }
}
?>
</div>

<!-- JavaScript: Live Search Filtering for Country Name -->
<script>
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("countrySearch");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll("#dataTable tr");

            for (let i = 1; i < rows.length; i++) { // Skip header
                const countryCell = rows[i].cells[0]; // Country Name column
                if (countryCell) {
                    const countryText = countryCell.textContent || countryCell.innerText;
                    rows[i].style.display = countryText.toLowerCase().includes(filter) ? "" : "none";
                }
            }
        });
    }
});
</script>

<br>


</body>
</html>
