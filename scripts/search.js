//absolute lowest and highest search values
const MIN_ID = 1;
const NUM_TO_LOAD = 15;

//number of cocktails to load at once
var MAX_ID;   //absolute maximum
let highestId;//maximum shown (dynamic)
let lowestId;

//for holding HTML between searches and non-searches
let storedHTML = "";
let stored = false;

//if all cocktails have been displayed
let reachedEnd = false;

//searches with a min id, max id and optional search (leave as "" for any).
function ajaxSearch(minId, maxId, search, isClear) {
    fetch(`./scripts/search.php?min=${minId}&max=${maxId}&search=${search}`,{method:"get"})
    .then(response => response.text())
    .then(response =>{
        if(isClear)
            document.querySelector("tbody").innerHTML = response;
        else{
            let oldHTML = document.querySelector("tbody").innerHTML;
            let newHTML = oldHTML + response;
            document.querySelector("tbody").innerHTML = newHTML;
        }
        return response;
    })
    .then(response => {
        updateStoredUnitsAndHeadings();//units.js
        changeUnits();//units.js
    })
    .catch(err => console.log("REQUEST FAILED:",err))
}

//load "NUM_TO_LOAD" values
function moreButtonEvent(){
    ajaxSearch(lowestId -= NUM_TO_LOAD, highestId -= NUM_TO_LOAD,"",false);
    if(MIN_ID >= lowestId){
        reachedEnd = true;
        this.hidden = true;
    }
}

//search values (and clear old results)
function mainSearchEvent(){
    //if blank, go back to how much of the page was loaded before
    if(this.value.length < 3){
        if(stored){
            document.querySelector("tbody").innerHTML = storedHTML;
            updateStoredUnitsAndHeadings();//units.js
        }
        stored = false;
        if(!reachedEnd)
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
}

//first fetch the highest ID and assign it to global variables
//then fetch the first search and add listeners for future searches
fetch(`./scripts/search.php?findId=true`,{method:"get"})
.then(foundId => foundId.text())
.then(foundId =>{    
    MAX_ID = foundId;
    highestId = foundId;
    lowestId = highestId - NUM_TO_LOAD + 1;
    ajaxSearch(lowestId,highestId,"",false);
})
.then(() => {
    document.getElementById("moreButton").addEventListener("click",moreButtonEvent);
    document.getElementById("mainSearch").addEventListener("keyup",mainSearchEvent);
})
.catch(err => console.log("REQUEST FAILED:",err))