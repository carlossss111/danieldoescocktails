function searchTable() {
    //Input and Table rows are defined.
    var input = document.getElementById("mainInput");
    var tr = document.querySelectorAll("#firstTable tr");
    var found = false;

    //For loop goes through each row and checks if they match the input. If not, they are removed.
    //Starts at 1 because the heading needs to be skipped!
    //Ends 1 early as the footer needs to be skipped!
    for (i = 1; i < (tr.length-1); i++) { 
        //Checks which radio button is active.
        let cocktailName = tr[i].querySelector("h2").innerText;
        let cocktailIngredients = tr[i].querySelector(".ingredients").innerText;

        //Searches for cocktails which match by name or ingredients.
        if((cocktailName.toUpperCase().indexOf(input.value.toUpperCase()) > -1) || (cocktailIngredients.toUpperCase().indexOf(input.value.toUpperCase()) > -1)){
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