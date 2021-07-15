/**
 * search.js - Daniel Robinson 2021
 * Searches a PHP database for cocktails, either extending the table
 * or performing a specific search based on name or ingredients.
 */

//absolute lowest and highest search values
const MIN_ID = 1;
const NUM_TO_LOAD = 15;

//number of cocktails to load at once
var MAX_ID;   //absolute maximum
let highestId;//maximum shown (dynamic)
let lowestId;

//searches with a min id, max id and optional search (leave as "" for any).
//also either clears or does not clear already existing results
function ajaxSearch(minId, maxId, search, isClear) {
    fetch(`./scripts/search.php?min=${minId}&max=${maxId}&search=${search}`,{method:"get"})
    .then(response => response.text())
    .then(response =>{
        //clear and show values returned
        if(isClear)
            document.querySelector("#firstTable tbody").innerHTML = response;
        //keep already shown values and append new values returned
        else{
            let oldHTML = document.querySelector("#firstTable tbody").innerHTML;
            let newHTML = oldHTML + response;
            document.querySelector("#firstTable tbody").innerHTML = newHTML;
        }
        return response;
    })
    .then(() => {
        updateStoredUnitsAndHeadings();//units.js
        changeUnits();//units.js
    })
    .catch(err => console.log("REQUEST FAILED:",err))
}

//load "NUM_TO_LOAD" values
function moreButtonEvent(){
    ajaxSearch(lowestId -= NUM_TO_LOAD, highestId -= NUM_TO_LOAD,"",false);
    if(MIN_ID >= lowestId)
        this.hidden = true;
}

//search values (and clear old results)
function mainSearchEvent(){
    //if blank, reload to initial values
    if(this.value.length < 3){
        highestId = MAX_ID;
        lowestId = highestId - NUM_TO_LOAD + 1;
        ajaxSearch(lowestId,highestId,"",true);
        document.getElementById("moreButton").hidden = false;
    }
    //if not blank, conduct a custom search
    else{
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