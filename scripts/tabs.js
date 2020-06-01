//Hides and views content depending on which tab has been clicked.
//Tabs must be ordered correctly in HTML for the script to function correctly.
var tabList = document.querySelectorAll(".tab");
var tabArray = [];//Needs to be in an array to use indexOf().
for (i = 0; i < tabList.length; i++){ tabArray.push(tabList[i]);}
var contentList = document.querySelectorAll(".tabcontent");

//Event listener added for each tab.
tabList.forEach( function(tab){
    //Onclick
    tab.addEventListener('click',function(event){
        //Finds index of which tab was clicked.
        var tabIndex = tabArray.indexOf(event.target);
        //Uses that index to display the content with the matching index and to hide the content that does not match.
        contentList.forEach(function(content){
            if (contentList[tabIndex] === content){
                content.style.display = "block";
            }
            else{
                content.style.display = "none";
            }
        })
    })
})