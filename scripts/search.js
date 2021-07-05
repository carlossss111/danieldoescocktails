//number of cocktails to load at once
let highestId = 7;
const numToLoad = 3;
let lowestId = highestId - numToLoad + 1;

//absolute lowest and highest search values
const MIN_ID = 1;
const MAX_ID = 0xFFFF;

//searches with a min id, max id and optional search (leave as "" for any).
function ajaxSearch(minId, maxId, search){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            document.querySelector("tbody").innerHTML = this.response;
    }
    ajax.open("GET",`./scripts/search.php?min=${minId}&max=${maxId}&search=${search}`,true);
    ajax.send();
}

//load "numToLoad" values
document.getElementById("moreButton").addEventListener("click",function (){
    ajaxSearch(lowestId -= numToLoad, highestId -= numToLoad,"");
})

//search values
document.getElementById("mainSearch").addEventListener("keyup",function (){;
    ajaxSearch(MIN_ID, MAX_ID,this.value);
})

//MAIN - do once without any button presses or anything
ajaxSearch(lowestId,highestId,"");