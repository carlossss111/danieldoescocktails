<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include "./keys.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT * FROM $table;";
$result = mysqli_query($conn,$query);

$out = "";
if ($result->num_rows > 0) {
  while($row = mysqli_fetch_assoc($result)){
    $out .= "<td>";
    $out .= " <img src=\"" . $row["image"] . "\">";
    $out .= "</td>";
    $out .= "<td class=\"itembox\">";
    $out .= " <h2>" . $row["name"] . "</h2>";
    $out .= " <ul class=\"ingredients\">";
    $ingredientArr = explode("/",$row["ingredients"]);
    foreach ($ingredientArr as $elem){
      $out .= "   <li>$elem</li>";
    }
    $out .= " </ul>";
    $out .= " <p class=\"description\">" . $row["description"];
    $out .= " <span class=\"date\">" . $row["date"] . "</span></p>";
    $out .= "</td>";
  }
}
else {
  $out = "0 results";
}

mysqli_close($conn);

echo $out;
?> 