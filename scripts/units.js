//array for storing the original metric units
var storedHeadings = [];
var storedUnits = [];

//get 1d list of headings from already existing HTML
function getHeadingListHTML(trList){
    var result = [];
    for(let i = 0; i < trList.length; i++){
        result.push(trList[i].querySelector("h2").innerText);
    }
    return result;
}

//get 1d list of ingredients from already existing HTML
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

function toMetric(trNum, ul){
    document.querySelector(".tickboxStyle").style.color = "#c32222";

    let n = 0;
    //if there is a measurement, rewrite it back to the original stored metric value
    for(let liNum = 0; liNum < ul.length; liNum++){
        let li = ul[liNum];
        if(li.innerText.search("oz") !== -1){
            li.innerText = `${storedUnits[trNum][n]}ml ${li.innerText.split("oz").pop()}`
            n++;
        }
    }
}

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

        //convert to fluid ounces and fractional unicode if appropriate
        let floz = Math.round((ml/29.574) /0.25) * 0.25;
        let flozStr = floz;
        switch(floz){
            case 0.25:
                flozStr = "\u00BC";// 1/4
                break;
            case 0.33:
                flozStr = "\u2153";//1/3
                break;
            case 0.5:
                flozStr = "\u00BD";// 1/2
                break;
            case 1.25:
                flozStr = "1\u00BC";//1 1/4
                break;
            case 1.5:
                flozStr = "1\u00BD";// 1 1/2
                break;
            case 1.75:
                flozStr = "1\u00BE"//1 3/4
                break;
        }
        //replace the measurement and append the original second half of the str
        li.innerText = `${flozStr}oz ${li.innerText.split("ml").pop()}`;
    }
}

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

document.getElementById("measurementTickbox").checked = true;
document.getElementById("measurementTickbox").addEventListener("change",changeUnits);