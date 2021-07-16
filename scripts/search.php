<?php
/**
 * search.php - Daniel Robinson 2021
 * Echoes cocktail database results based on arguements.
 */

//return maximum id in database
function getMaxId(){
	//connect
	include "./keys.php";
	if (!($conn = mysqli_connect($servername, $username, $password, $dbname)))
		die("Connection failed: " . mysqli_connect_error());

	//query
	$table = $_GET["table"];
	$query = "SELECT MAX(id) FROM $table;";
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_array($result);

	//close and return
	mysqli_close($conn);
	echo $row[0];
}

//given mysqli result, output rows file.
function outputCocktailResult(mysqli_result $res){
	if ($res->num_rows > 0) {
		while($row = mysqli_fetch_assoc($res)){
			//split ingredients over '/' delimiter and put into string
			$li = "";
			$ingredientArr = explode("/",$row["ingredients"]);
			foreach ($ingredientArr as $elem){
				$li .= "<li>$elem</li>";
			}
	
			//echo results row by row
			$image = $row["image"];	$name = $row["name"];
			$desc = $row["description"]; $date = $row["date"];
			echo	"<tr>";
			echo		"<td>";
			echo			"<img src='$image'>";
			echo		"</td>";
			echo		"<td class='itembox'>";
			echo			"<h2>$name</h2>";
			echo			"<ul class='ingredients'>";
			echo				"$li";
			echo			"</ul>";
			echo			"<p class='description'>";
			echo				"$desc";
			echo				"<span class='date'>$date</span>";
			echo			"</p>";
			echo		"</td>";
			echo	"</tr>";
		}
	}
	else {
		echo	"<tr>";
		echo		"<td colspan='2'>";
		echo			"<p style='text-align:center; font-size:1.35rem'>No results found</p>";
		echo		"</td>";
		echo	"</tr>";
	}
}

//given mysqli result, output rows file.
function outputTravelResult(mysqli_result $res){
	if ($res->num_rows > 0) {
		while($row = mysqli_fetch_assoc($res)){
			//echo results row by row
			$image = $row["image"];	$name = $row["name"];
			$location = $row["location"]; $link = $row["hyperlink"];
			$desc = $row["description"]; $date = $row["date"];
			echo	"<tr>";
			echo		"<td>";
			echo			"<img src='$image'>";
			echo		"</td>";
			echo		"<td class='itembox'>";
			echo			"<h2><a href='$link' target='_blank'>";
			echo				"$name - $location";
			echo			"</a></h2>";
			echo			"<p class='description'>";
			echo				"$desc";
			echo				"<span class='date'>$date</span>";
			echo			"</p>";
			echo		"</td>";
			echo	"</tr>";
		}
	}
	else
		echo "<tr><td colspan='2'>Error loading table</td></tr>";
}

//prepare query (pass by reference) and bind
function prepQuery(&$connRef, &$stmtRef, $hasSearch){
	//prep query
	$stmtRef = mysqli_stmt_init($connRef);
	$table = $_GET["table"];
	$query = "SELECT * FROM $table WHERE id >= ? AND id <= ?";
	if($hasSearch)
		$query .= " AND ( name LIKE ? OR ingredients LIKE ? )";
	$query .= " ORDER BY id DESC;";
	$stmtRef = mysqli_prepare($connRef, $query);

	//bind it
	if($hasSearch){
		mysqli_stmt_bind_param($stmtRef, 'ddss', $minId, $maxId, $searchName, $searchIngredients);
		$searchName = "%" . $_GET["search"] . "%";
		$searchIngredients = "%" . $_GET["search"] . "%";
	}
	else
		mysqli_stmt_bind_param($stmtRef, 'dd', $minId, $maxId);
	$minId = $_GET["min"];
	$maxId = $_GET["max"];
}

//i like having stuff in functions
function main(){
	//connect to mySQLi
	include "./keys.php";
	if (!($conn = mysqli_connect($servername, $username, $password, $dbname)))
		die("Connection failed: " . mysqli_connect_error());

	//prepare and bind query
	if($_GET["table"] == "cocktail")
		prepQuery($conn, $stmt, true);//search with custom searchbar result
	else
		prepQuery($conn, $stmt, false);//search by ids only

	//execute query
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	//echo results
	switch($_GET["table"]){
		case("cocktail"):
			outputCocktailResult($result);
			break;
		case("travel"):
			outputTravelResult($result);
			break;
		case("cabinet"):
			break;
		default:
			die();
	}

	//close mySQLi
	mysqli_stmt_close($stmt);
	mysqli_close($conn);
}

//MAIN
if(isset($_GET["findId"]))
	getMaxId();
else
	main();
?> 