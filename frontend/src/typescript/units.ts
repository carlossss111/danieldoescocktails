
const TICKBOX_FILLED = "#c32222";
const TICKBOX_CLEAR = "transparent";

const FRACTION_UNICODE = new Map(
    [
        [0.25, "\u00BC"], [0.33, "\u2153"],
        [0.5, "\u00BD"], [0.66, "\u2154"],
        [0.75, "\u00BE"], [1.25, "1\u00BC"],
        [1.33, "1\u2153"], [1.5, "1\u00BD"],
        [1.66, "1\u2154"], [1.75, "1\u00BE"],
        [2.5, "2\u00BD"]
    ]);



class UnitsManager{
    storedHeadings: string[] = [];
    storedUnits: string[][] = [];

    constructor(tickboxId: string) {
        let tickbox = (<HTMLInputElement>document.getElementById(tickboxId));
        if (!tickbox){
            console.log("Could not find required HTML elements.")
        }

        tickbox.checked = true;
        tickbox.addEventListener("change", this.changeUnits.bind(this));
    }

    //get list of headings from already existing HTML
    _getHeadingListHTML(trList: NodeListOf<Element>) : string[] {
        let result: string[] = [];

        for(let i = 0; i < trList.length; i++){
            let heading = trList[i].querySelector("h2");
            if (heading) {
                result.push(heading.innerText);
            }
        }

        return result;
    }

    //get list of ingredients from already existing HTML
    _getIngredientListHTML(tr: HTMLElement) : string[] {
        let result: string[] = [];
        let ul = tr.querySelectorAll("li");

        for(let i = 0; i < ul.length; i++){
            let ml = ul[i].innerText.split("ml").shift();
            if (ml) {
                result.push(ml);
            }

        }

        return result;
    }

    //Updates the stored units and headings to be current and up-to-date
    //called when an ajax request is made only
    updateStoredUnitsAndHeadings() : void {
        let trList = document.querySelectorAll("#firstTable tbody tr");

        //get already existing items
        let listHTML = this._getHeadingListHTML(trList);

        let i = 0;
        //loop through table rows
        while(i < listHTML.length){
            //only update cocktails not already in storage
            if(this.storedHeadings[i] != listHTML[i]){
                this.storedHeadings[i] = listHTML[i];
                this.storedUnits[i] = this._getIngredientListHTML((<HTMLElement>trList[i]));
            }
            i++;
        }
        //cut off the end of storage to fit
        this.storedHeadings.splice(i, this.storedHeadings.length);
        this.storedUnits.splice(i, this.storedUnits.length);
    }

    //convert list of lis to original metric values
    _toMetric(trNum: number, ul: NodeListOf<HTMLElement>) : void {
        let tickbox: HTMLElement | null = document.querySelector(".tickboxStyle");
        if (tickbox) {
            tickbox.style.color = TICKBOX_FILLED;
        }

        //if there is a measurement, rewrite it back to the original stored metric value
        for (let liNum = 0; liNum < ul.length; liNum++){
            let li = ul[liNum];
            if(li.innerText.search("oz") !== -1){
                li.innerText = `${this.storedUnits[trNum][liNum]}ml ${li.innerText.split("oz").pop()}`
            }
            //special case: 1 barspoon = 5ml
            else if(li.innerText.search("barspoon") !== -1){
                li.innerText = `${this.storedUnits[trNum][liNum]}ml ${li.innerText.split("barspoon of").pop()}`
            }
        }
    }

    //convert list of lis to imperial
    _toImperial(ul: NodeListOf<HTMLElement>) : void {
        let tickbox: HTMLElement | null = document.querySelector(".tickboxStyle");
        if (tickbox) {
            tickbox.style.color = TICKBOX_CLEAR;
        }

        //loop through every list item in the ul
        for(let liNum = 0; liNum < ul.length; liNum++){
            let li = ul[liNum];

            //if there is no ml measurement, skip this list item
            if(li.innerText.search("ml") == -1)
                continue;

            //split str between 'ml' and return first half
            let mlStr: string | undefined = li.innerText.split("ml").shift();
            if (!mlStr) {
                console.log("Error reading ml from ingredients list.");
                continue;
            }
            let ml: number = parseFloat(mlStr)

            //special case: 5ml = 1 barspoon
            if(ml == 5){
                li.innerText = `1 barspoon of ${li.innerText.split("ml").pop()}`;
                continue;
            }

            //round to 1/3s and 1/4s
            let floz = ml/29.574;
            let thirds = Math.round(floz / (1/3)) * (1/3);
            let quarters = Math.round(floz / 0.25) * 0.25;
            thirds = Math.floor(thirds * 100)/100;
            if(Number.isInteger(thirds) == false)
                thirds.toFixed(2);

            //pick 1/3s or 1/4s
            if(Math.abs(floz - quarters) < Math.abs(floz - thirds))
                floz = quarters;
            else
                floz = thirds;

            //map to unicode fractions
            let flozStr: string;
            let fraction: string | undefined = FRACTION_UNICODE.get(floz);
            if(fraction) { 
                flozStr = fraction;
            }
            else {
                flozStr = String(floz);
            }

            //replace the measurement and append the original second half of the str
            li.innerText = `${flozStr}oz ${li.innerText.split("ml").pop()}`;
        }
    }

    //change the units over
    //called by ajax and by the tickbox event
    changeUnits() : void {
        let tickbox = (<HTMLInputElement>document.getElementById("measurementTickbox"));
        let trList = document.querySelectorAll("#firstTable tbody tr");
        if (!tickbox || !trList) {
            console.log("Could not find tickbox or rows.");
            return;
        }

        //loop through every table row and call the functions the content
        for (let trNum = 0; trNum < (trList.length); trNum++) {
            let ingredients = trList[trNum].querySelector(".ingredients");
            if (ingredients){
                let ul = ingredients.querySelectorAll("li");
                if(tickbox.checked == false)
                    this._toImperial(ul);
                else
                    this._toMetric(trNum, ul);
            }
        }
    }

}

