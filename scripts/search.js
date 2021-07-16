/**
 * search.js - Daniel Robinson 2021
 * Searches a PHP database for cocktails, either extending the table
 * or performing a specific search based on name or ingredients.
 */

/**
 * Create a SearchQueryHandler instance with the relevant arguements
 * to execute and maintain queries. Properties do not need to be edited outside of the object.
 */
class SearchQueryHandler{
    //class constants
    MIN_ID = 1;
    NUM_TO_LOAD = 15;

    //constructor constants
    MAX_ID;
    MYSQL_TABLE_NAME;
    HTML_TABLE_ID;

    //DOM elements
    moreButton;
    mainSearch;
    tbody;

    //variable properties
    highestId;
    lowestId;

    //get ids and assign properties etc etc
    constructor(mysqlTableName, htmlTableId, includesSearchbar){
        //set properties
        this.MYSQL_TABLE_NAME = mysqlTableName;
        this.HTML_TABLE_ID = htmlTableId;

        //fetch highest id from the table
        fetch(`/scripts/search.php?`
            + `table=${this.MYSQL_TABLE_NAME}`
            + `&findId=true`,
            {method:"get"})
        .then(foundId => foundId.text())

        //assign values to object properties
        .then(foundId =>{    
            //ids
            this.MAX_ID = foundId;
            this.highestId = foundId;
            this.lowestId = this.highestId - this.NUM_TO_LOAD + 1;
            
            //DOM elements
            this.moreButton = document.querySelector(`#${this.HTML_TABLE_ID} .moreButton`);
            this.mainSearch = document.getElementById("mainSearch");
            this.tbody = document.querySelector(`#${this.HTML_TABLE_ID} tbody`);
        })
        
        //do initial search
        .then(() => {
            this.ajaxSearch(this.lowestId,this.highestId,"",false);
            
            if(this.lowestId < this.MIN_ID)
                this.moreButton.hidden = true;
        })

        //apply event listeners
        .then(() => {
            this.moreButton.addEventListener("click",this.moreButtonEvent.bind(this));
            if(includesSearchbar == true)
                this.mainSearch.addEventListener("keyup",this.mainSearchEvent.bind(this));
        })

        .catch(err => console.log("REQUEST FAILED:",err))
    }

    //searches with a min id, max id and optional search (leave as "" for any).
    //also either clears or does not clear already existing results
    ajaxSearch(minId, maxId, search, isClear) {

        //query sql
        fetch(`/scripts/search.php?`
            + `table=${this.MYSQL_TABLE_NAME}`
            + `&min=${minId}`
            + `&max=${maxId}`
            + `&search=${search}`,
            {method:"get"})
        .then(response => response.text())

        //print results
        .then(response =>{
            //print and clear
            if(isClear)
                this.tbody.innerHTML = response;
            //print and do not clear
            else{
                let oldHTML = this.tbody.innerHTML;
                let newHTML = oldHTML + response;
                this.tbody.innerHTML = newHTML;
            }
        })

        //apply units.js script (relevant to the main part only)
        .then(() => {
            updateStoredUnitsAndHeadings();//units.js
            changeUnits();//units.js
        })
        
        .catch(err => console.log("REQUEST FAILED:",err))
    }

    //load n numbers of new items and hide moreButton if the end is reached
    moreButtonEvent(){
        this.ajaxSearch(this.lowestId -= this.NUM_TO_LOAD, this.highestId -= this.NUM_TO_LOAD,"",false);
        if(this.lowestId < this.MIN_ID)
            this.moreButton.hidden = true;
    }

    //load all values matching the search
    mainSearchEvent(){
        //search and hide moreButton
        if(this.mainSearch.value.length > 2){
            this.ajaxSearch(this.MIN_ID, this.MAX_ID,this.mainSearch.value,true);
            this.moreButton.hidden = true;
        }
        //when the searchbar is again blank, reload to how things were intially
        else{
            this.highestId = this.MAX_ID;
            this.lowestId = this.highestId - this.NUM_TO_LOAD + 1;
            this.ajaxSearch(this.lowestId,this.highestId,"",true);
            this.moreButton.hidden = false;
        }
    }
}