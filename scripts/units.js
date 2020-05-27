tickbox = document.getElementById("measurementTickbox");

//Listens for changes in the tickbox.
tickbox.addEventListener('change',function(){
    //Loops through table and changes
    var tr = document.querySelectorAll("#firstTable tr");
    for (i = 1; i < (tr.length-1); i++) { 
        let cocktailIngredients = tr[i].querySelector(".ingredients");
        let li = cocktailIngredients.querySelectorAll("li");
        li.forEach(function(line){
            if(line.innerText.search("ml") !== -1){
                let milliliters = line.innerText.split("ml").shift()//gets the milliliters for each line.
                console.log("ML:",milliliters);
                let fluidOunces = Math.round((milliliters/29.574) /0.25) * 0.25;
                console.log(fluidOunces);
                let fluidOuncesStr = fluidOunces;
                if (fluidOunces === 0.25){ fluidOuncesStr = "\u00BC"}// 1/4
                else if (fluidOunces === 0.5){ fluidOuncesStr = "\u00BD"}// 1/2
                else if (fluidOunces === 0.75){ fluidOuncesStr = "\u00BE"}// /3/4
                else if (fluidOunces === 1.25){ fluidOuncesStr = "1\u00BC"}// 1 1/4
                else if (fluidOunces === 1.5){ fluidOuncesStr = "1\u00BD"}// 1 1/2
                else if (fluidOunces === 1.75){ fluidOuncesStr = "1\u00BE"}// 1 3/4
                console.log(fluidOuncesStr);
                line.innerText = `${fluidOuncesStr}oz ${line.innerText.split("ml").pop()}`;
                
            }
        })
        
    }
})