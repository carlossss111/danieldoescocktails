/**
 * search.js - Daniel Robinson 2021
 * Searches a PHP database for cocktails, either extending the table
 * or performing a specific search based on name or ingredients.
 */

class SearchQueryHandler{
    //class constants
    MIN_ID = 1;

    //constructor constants
    MAX_ID;
    NUM_TO_LOAD = 15;

    //variable properties
    highestId;
    lowestId;

    //first fetch the highest ID and assign it to global variables
    //then fetch the first search and add listeners for future searches
    constructor(){
        fetch(`./scripts/search.php?findId=true`,{method:"get"})
        .then(foundId => foundId.text())
        .then(foundId =>{    
            this.MAX_ID = foundId;
            this.highestId = foundId;
            this.lowestId = this.highestId - this.NUM_TO_LOAD + 1;
            this.ajaxSearch(this.lowestId,this.highestId,"",false);
        })
        .then(() => {
            //lmao look at all the different 'this's meaning different things. thanks JS
            document.getElementById("moreButton").addEventListener("click",this.moreButtonEvent.bind(this),this);
            document.getElementById("mainSearch").addEventListener("keyup",this.mainSearchEvent.bind(this),this);
        })
        .catch(err => console.log("REQUEST FAILED:",err))
    }

    //searches with a min id, max id and optional search (leave as "" for any).
    //also either clears or does not clear already existing results
    ajaxSearch(minId, maxId, search, isClear) {
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
    moreButtonEvent(button){
        this.ajaxSearch(this.lowestId -= this.NUM_TO_LOAD, this.highestId -= this.NUM_TO_LOAD,"",false);
        if(this.MIN_ID >= this.lowestId)
            button.target.hidden = true;
    }

    //search values (and clear old results)
    mainSearchEvent(searchbar){
        //if blank, reload to initial values
        if(searchbar.target.value.length < 3){
            this.highestId = this.MAX_ID;
            this.lowestId = this.highestId - this.NUM_TO_LOAD + 1;
            this.ajaxSearch(this.lowestId,this.highestId,"",true);
            document.getElementById("moreButton").hidden = false;
        }
        //if not blank, conduct a custom search
        else{
            this.ajaxSearch(this.MIN_ID, this.MAX_ID,searchbar.target.value,true);
            document.getElementById("moreButton").hidden = true;
        }
    }
}

const searchtest1 = new SearchQueryHandler();