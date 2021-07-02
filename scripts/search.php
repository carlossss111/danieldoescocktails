<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

//connect to mySQLi
include "./keys.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

//query mySQLi
$query = "SELECT * FROM $table;";
$result = mysqli_query($conn,$query);

//print results
if ($result->num_rows > 0) {
	while($row = mysqli_fetch_assoc($result)){
		echo "<td>";
		echo "	<img src=\"" . $row["image"] . "\">";
		echo "</td>";
		echo "<td class=\"itembox\">";
		echo "	<h2>" . $row["name"] . "</h2>";
		echo " 	<ul class=\"ingredients\">";
		$ingredientArr = explode("/",$row["ingredients"]);
		foreach ($ingredientArr as $elem){
			echo "	<li>$elem</li>";
		}
		echo "	</ul>";
		echo "	<p class=\"description\">" . $row["description"];
		echo "	<span class=\"date\">" . $row["date"] . "</span></p>";
		echo "</td>";
	}
}
else {
	echo "0 results";
}

//close mySQLi
mysqli_close($conn);
?> 