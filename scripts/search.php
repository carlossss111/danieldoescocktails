<?php
//given mysqli result, output rows file.
function outputResult(mysqli_result $res){
	if ($res->num_rows > 0) {
		while($row = mysqli_fetch_assoc($res)){
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
}

//connect to mySQLi
include "./keys.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

//prepare and bind query
$stmt = mysqli_stmt_init($conn);
$query = "SELECT * FROM cocktail WHERE"
	. " id >= ?"
	. " OR name = ?"
	. " OR ingredients LIKE ?"
	. " ORDER BY id DESC";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, 'dss', $minId, $searchName, $searchIngredients);

//define query conditions
$minId = 1;
$searchName = "N/A";
$searchIngredients = "%N/A%";

//execute query
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

//echo results
outputResult($result);

//close mySQLi
mysqli_stmt_close($stmt);
mysqli_close($conn);
?> 