//The tickbox is labelled to be true if in metric. So Starts with that default.
tickbox = document.getElementById("measurementTickbox");
tickbox.checked = true;

//initialValue[] holds the initial ml measurements and is used when flipping back to metric.
var initialValue = [];
//Listener is called whenever the tickbox value changes.
tickbox.addEventListener('change',function(){

    //Every table tow is looped through (except the heading and footer).
    var tr = document.querySelectorAll("#firstTable tr");
    for (i = 1; i < (tr.length-1); i++) { 
        //Each line of ingredients is stored in a nodeList.
        let cocktailIngredients = tr[i].querySelector(".ingredients");
        let li = cocktailIngredients.querySelectorAll("li");

        //The metric array pushes another array inside itself, making it two dimensional.
        initialValue.push([]);
            
        //If imperial...
        if(tickbox.checked === false){
            //For each line (in the given row):
            li.forEach(function(line){
                //If there is no 'ml' in a line, it will return -1, hence those results are discarded.
                if(line.innerText.search("ml") !== -1){
                    let milliliters = line.innerText.split("ml").shift();//Splits between 'ml', and returns the first half (using shift).

                    //initialValue 2D array has the milliliter values stored for later.
                    initialValue[i-1].push(milliliters);

                    //ml converted to floz and rounded to a multiple of 0.25.
                    let fluidOunces = Math.round((milliliters/29.574) /0.25) * 0.25;
                    //Unicode changes the string to a fraction.
                    let fluidOuncesStr = fluidOunces;
                    if (fluidOunces === 0.25){ fluidOuncesStr = "\u00BC"}// 1/4
                    else if (fluidOunces === 0.5){ fluidOuncesStr = "\u00BD"}// 1/2
                    else if (fluidOunces === 0.75){ fluidOuncesStr = "\u00BE"}// /3/4
                    else if (fluidOunces === 1.25){ fluidOuncesStr = "1\u00BC"}// 1 1/4
                    else if (fluidOunces === 1.5){ fluidOuncesStr = "1\u00BD"}// 1 1/2
                    else if (fluidOunces === 1.75){ fluidOuncesStr = "1\u00BE"}// 1 3/4

                    //The text of the line is changes with the new measurements, and the original second half of the text.
                    line.innerText = `${fluidOuncesStr}oz ${line.innerText.split("ml").pop()}`;
                        
                }
            })
        }
        //If metric...
        else{
            //In each line, use initialValue[] to revert each line to how it was initially.
            let n = 0;
            li.forEach(function(line){
                if(line.innerText.search("oz") !== -1){
                    line.innerText = `${initialValue[i-1][n]}ml ${line.innerText.split("oz").pop()}`
                }
            })
        }
            

    }
    //Once a cycle of metric-->imperial-->metric is complete clear the array (otherwise it will become too long.)
    if(tickbox.checked){
        initialValue = [];

        //For styling only.
        document.querySelector(".tickboxStyle").style.color = "#c32222";
    }

    //For styling only.
    if(tickbox.checked === false){
        document.querySelector(".tickboxStyle").style.color = "transparent";
    }
})