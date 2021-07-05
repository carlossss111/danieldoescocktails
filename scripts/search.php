<?php
//return maximum id in database
function getMaxId(){
	//connect
	include "./keys.php";
	if (!($conn = mysqli_connect($servername, $username, $password, $dbname)))
		die("Connection failed: " . mysqli_connect_error());

	//query
	$query = "SELECT MAX(id) FROM cocktail;";
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_array($result);

	//close and return
	mysqli_close($conn);
	return $row[0];
}

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

//prepare query (pass by reference)
function prepQuery(&$connRef, &$stmtRef){
	$stmtRef = mysqli_stmt_init($connRef);
	$query = "SELECT * FROM cocktail WHERE"
		. " id >= ?"
		. " AND id <= ?"
		. " AND ( name LIKE ?"
		. " OR ingredients LIKE ? )"
		. " ORDER BY id DESC";
	$stmtRef = mysqli_prepare($connRef, $query);
	return $query;
}

//i like having stuff in functions
function main(){
	//connect to mySQLi
	include "./keys.php";
	if (!($conn = mysqli_connect($servername, $username, $password, $dbname)))
		die("Connection failed: " . mysqli_connect_error());

	//prepare and bind query
	prepQuery($conn, $stmt);

	//define query conditions
	mysqli_stmt_bind_param($stmt, 'ddss', $minId, $maxId, $searchName, $searchIngredients);
	$minId = $_GET["min"];
	$maxId = $_GET["max"];
	$searchName = "%" . $_GET["search"] . "%";
	$searchIngredients = "%" . $_GET["search"] . "%";

	//execute query
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	//echo results
	outputResult($result);

	//close mySQLi
	mysqli_stmt_close($stmt);
	mysqli_close($conn);
}

//MAIN
if(isset($_GET["findId"]))
	echo getMaxId();
else
	main();
?> 