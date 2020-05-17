function searchTable() {
    //Input and Table rows are defined.
    var input = document.getElementById("myInput");
    var tr = document.querySelectorAll("#firstTable tr");
    var found = false;

    //For loop goes through each row and checks if they match the input. If not, they are removed.
    //Starts at 1 because the heading needs to be skipped!
    //Ends 1 early as the footer needs to be skipped!
    for (i = 1; i < (tr.length-1); i++) { 
        let cocktail = tr[i].querySelector("h2").innerText;;

        if(cocktail.toUpperCase().indexOf(input.value.toUpperCase()) > -1){
            tr[i].style.display = "";
            found = true;
        }
        else{
            tr[i].style.display = "none";
        }
    }

    //Message at the end of the table.
    if (found){
        document.getElementById("tableFoot").innerHTML = "End of table."
    }
    else{
        document.getElementById("tableFoot").innerHTML = "No results found."
    }
}