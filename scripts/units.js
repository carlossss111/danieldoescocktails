//array for storing the original metric units
var storedHeadings = [];
var storedUnits = [];

//get 1d list of headings from incoming PHP
function getHeadingListString(raw){
    var result = [];
    var trList = raw.match(/(?<=<tr>)(.*?)(?=<\/tr>)/mg);
    for(let i = 0; i < trList.length; i++){
        result.push(trList[i].match(/(?<=<h2>)(.*?)(?=<\/h2>)/mg)[0]);
    }
    return result;
}

//get 1d list of headings from already existing HTML
function getHeadingListHTML(trList){
    var result = [];
    for(let i = 0; i < trList.length; i++){
        result.push(trList[i].querySelector("h2").innerText);
    }
    return result;
}

//get 1d list of ingredients from already existing HTML
function getIngredientListHTML(ul){

}

//Updates the stored units and headings to be current and up-to-date
//called when an ajax request is made or when a search is cleared
function updateStoredUnitsAndHeadings(){
    console.log("loaded...");
    var trList = document.querySelectorAll("#firstTable tbody tr");

    //get already existing items
    listHTML = getHeadingListHTML(trList);

    var i = 0;
    //loop through table rows
    while(i < listHTML.length){
        //only update cocktails not already in storage
        if(storedHeadings[i] != listHTML[i]){
            storedHeadings[i] = listHTML[i];
        }
        i++;
    }
    //cut off the end of storage to fit
    storedHeadings.splice(i, storedHeadings.length);
    console.log(storedHeadings);

}

function changeUnits(){
    var tickbox = document.getElementById("measurementTickbox");
    var trList = document.querySelectorAll("#firstTable tbody tr")

    //if changing to metric
    if(tickbox.checked == true){

    }


    //if changing to imperial
}


/*

//given a nodelist of lis, convert them all to fluid ounces
function toImperial(metricArr, trNum, ul){
    document.querySelector(".tickboxStyle").style.color = "transparent";

    //loop through every list item in the ul
    for(let liNum = 0; liNum < ul.length; liNum++){
        let li = ul[liNum];

        //if there is no ml measurement, skip this list item
        if(li.innerText.search("ml") == -1)
            continue;
        
        //split str between 'ml' and return first half
        let ml = li.innerText.split("ml").shift();
        //store the original value
        metricArr[trNum].push(ml);

        //convert to fluid ounces and fractional unicode if appropriate
        let floz = Math.round((ml/29.574) /0.25) * 0.25;
        let flozStr = floz;
        switch(floz){
            case 0.25:
                flozStr = "\u00BC";// 1/4
                break;
            case 0.5:
                flozStr = "\u00BD";// 1/2
                break;
            case 0.75:
                flozStr = "\u00BE";// 3/4
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
    //return the array of original metric values for later use
    return metricArr;
}

//given a nodelist of lis, convert them all back to their original values (metric)
function toMetric(metricArr, trNum, ul){
    document.querySelector(".tickboxStyle").style.color = "#c32222";

    let n = 0;
    //if there is a measurement, rewrite it back to the original stored metric value
    for(let liNum = 0; liNum < ul.length; liNum++){
        let li = ul[liNum];
        if(li.innerText.search("oz") !== -1){
            li.innerText = `${metricArr[trNum][n]}ml ${li.innerText.split("oz").pop()}`
            n++;
        }

    }
}

//event handler for changing units
function changeUnits(){
    tickbox = document.getElementById("measurementTickbox");
    var trList = document.querySelectorAll("#firstTable tbody tr");

    //loop through every table row and call the functions the content
    for (let trNum = 0; trNum < (trList.length); trNum++) { 
        var ingredients = trList[trNum].querySelector(".ingredients");
        var ul = ingredients.querySelectorAll("li");
        storedUnits.push([]);//to 2D
        
        if(tickbox.checked == false)
            storedUnits = toImperial(storedUnits, trNum, ul);
        else
            toMetric(storedUnits, trNum, ul);
    }
}

document.getElementById("measurementTickbox").checked = true;
document.getElementById("measurementTickbox").addEventListener("change",changeUnits);
*/