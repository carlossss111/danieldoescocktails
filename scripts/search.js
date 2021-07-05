//absolute lowest and highest search values
const MIN_ID = 1;
const MAX_ID = 7;//NEEDS A SEARCH OR SOMETHING
const NUM_TO_LOAD = 3;

//number of cocktails to load at once
let highestId = MAX_ID;
let lowestId = highestId - NUM_TO_LOAD + 1;

//for holding HTML between searches and non-searches
let storedHTML = "";
let stored = false;

//searches with a min id, max id and optional search (leave as "" for any).
function ajaxSearch(minId, maxId, search, isClear){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            if(isClear)
                document.querySelector("tbody").innerHTML = this.response;
            else{
                let oldHTML = document.querySelector("tbody").innerHTML;
                let newHTML = oldHTML + this.response;
                document.querySelector("tbody").innerHTML = newHTML;
            }
            storedHTML = document.querySelector("tbody").innerHTML;
        }
    }
    ajax.open("GET",`./scripts/search.php?min=${minId}&max=${maxId}&search=${search}`,true);
    ajax.send();
}

//load "NUM_TO_LOAD" values
document.getElementById("moreButton").addEventListener("click",function (){
    ajaxSearch(lowestId -= NUM_TO_LOAD, highestId -= NUM_TO_LOAD,"",false);
})

//search values (and clear old results)
document.getElementById("mainSearch").addEventListener("keyup",function (){
    //if blank, go back to how much of the page was loaded before
    if(this.value.length < 3){
        document.querySelector("tbody").innerHTML = storedHTML;
        stored = false;
        document.getElementById("moreButton").hidden = false;
    }
    //if not blank, store the page (unless already stored) and do search
    else{
        if(!stored)
            storedHTML = document.querySelector("tbody").innerHTML;
        stored = true;
        ajaxSearch(MIN_ID, MAX_ID,this.value,true);
        document.getElementById("moreButton").hidden = true;
    }
})

//MAIN - do once without any button presses or anything
ajaxSearch(lowestId,highestId,"");