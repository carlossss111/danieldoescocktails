/**
 * units.js - Daniel Robinson 2021
 * Converts between ml (originally stored) and floz (calculated).
 */

//array for storing the original metric units
var storedHeadings = [];
var storedUnits = [];

//get list of headings from already existing HTML
function getHeadingListHTML(trList){
    var result = [];
    for(let i = 0; i < trList.length; i++){
        result.push(trList[i].querySelector("h2").innerText);
    }
    return result;
}

//get list of ingredients from already existing HTML
function getIngredientListHTML(tr){
    var result = [];
    var ul = tr.querySelectorAll("li");
    for(let i = 0; i < ul.length; i++){
        let ml = ul[i].innerText.split("ml").shift();
        result.push(ml);
        
    }
    return result;
}

//Updates the stored units and headings to be current and up-to-date
//called when an ajax request is made only
function updateStoredUnitsAndHeadings(){
    var trList = document.querySelectorAll("#firstTable tbody tr");

    //get already existing items
    listHTML = getHeadingListHTML(trList);

    var i = 0;
    //loop through table rows
    while(i < listHTML.length){
        //only update cocktails not already in storage
        if(storedHeadings[i] != listHTML[i]){
            storedHeadings[i] = listHTML[i];
            storedUnits[i] = getIngredientListHTML(trList[i]);
        }
        i++;
    }
    //cut off the end of storage to fit
    storedHeadings.splice(i, storedHeadings.length);
    storedUnits.splice(i, storedUnits.length);
}

//convert list of lis to original metric values
function toMetric(trNum, ul){
    document.querySelector(".tickboxStyle").style.color = "#c32222";

    //if there is a measurement, rewrite it back to the original stored metric value
    for(let liNum = 0; liNum < ul.length; liNum++){
        let li = ul[liNum];
        if(li.innerText.search("oz") !== -1){
            li.innerText = `${storedUnits[trNum][liNum]}ml ${li.innerText.split("oz").pop()}`
        }
    }
}

//convert list of lis to imperial
function toImperial(trNum, ul){
    document.querySelector(".tickboxStyle").style.color = "transparent";

    //loop through every list item in the ul
    for(let liNum = 0; liNum < ul.length; liNum++){
        let li = ul[liNum];

        //if there is no ml measurement, skip this list item
        if(li.innerText.search("ml") == -1)
            continue;
        
        //split str between 'ml' and return first half
        let ml = li.innerText.split("ml").shift();

        //round to 1/3s and 1/4s 
        floz = ml/29.574;
        let thirds = Math.round(floz / (1/3)) * (1/3);
        let quarters = Math.round(floz / 0.25) * 0.25;
        thirds = Math.floor(thirds * 100)/100;
        if(Number.isInteger(thirds) == false)//rounding in programming is trash
            thirds.toFixed(2);

        //pick 1/3s or 1/4s
        if(Math.abs(floz - quarters) < Math.abs(floz - thirds))
            floz = quarters;
        else
            floz = thirds;

        //map to unicode fractions
        let flozStr = floz;
        const unicodeMap = new Map([
            [0.25, "\u00BC"], [0.33, "\u2153"],
            [0.5, "\u00BD"], [0.66, "\u2154"],
            [0.75, "\u00BE"], [1.25, "1\u00BC"],
            [1.33, "1\u2153"], [1.5, "1\u00BD"],
            [1.66, "1\u2154"], [1.75, "1\u00BE"],
            [2.5, "2\u00BD"]
        ]);
        
        if(unicodeMap.get(floz))
            flozStr = unicodeMap.get(floz);

        //replace the measurement and append the original second half of the str
        li.innerText = `${flozStr}oz ${li.innerText.split("ml").pop()}`;
    }
}

//change the units over
//called by ajax and by the tickbox event
function changeUnits(){
    var tickbox = document.getElementById("measurementTickbox");
    var trList = document.querySelectorAll("#firstTable tbody tr")

    //loop through every table row and call the functions the content
    for (let trNum = 0; trNum < (trList.length); trNum++) { 
        var ingredients = trList[trNum].querySelector(".ingredients");
        var ul = ingredients.querySelectorAll("li");
        
        if(tickbox.checked == false)
            toImperial(trNum, ul);
        else
            toMetric(trNum, ul);
    }
}

//MAIN
document.getElementById("measurementTickbox").checked = true;
document.getElementById("measurementTickbox").addEventListener("change",changeUnits);