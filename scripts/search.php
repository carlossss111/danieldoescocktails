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
		//split ingredients over '/' delimiter and put into string
		$li = "";
		$ingredientArr = explode("/",$row["ingredients"]);
		foreach ($ingredientArr as $elem){
			$li .= "<li>$elem</li>";
		}

		//echo results row by row
		$image = $row["image"];			$name = $row["name"];
		$desc = $row["description"];	$date = $row["date"];
		echo	"<tr>										";
		echo	"	<td>									";
		echo	"		<img src='$image'>					";
		echo	"	</td>									";
		echo	"	<td class='itembox'>					";
		echo	"		<h2>$name</h2>						";
		echo	"		<ul class='ingredients'>			";
		echo	"			$li								";
		echo	"		</ul>								";
		echo	"		<p class='description'>				";
		echo	" 			$desc							";
		echo	"			<span class='date'>$date</span>	";
		echo	"		</p>								";
		echo	"	</td>									";
		echo	"</tr>										";
	}
}
else {
	echo	"<tr>								";
	echo	"	<td colspan='2'>				";
	echo	"		<h2>No results found</h2>	";
	echo	"	</td>							";
	echo	"</tr>								";
}

//close mySQLi
mysqli_close($conn);
?> 