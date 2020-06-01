//Hides and views content depending on which tab has been clicked.
//Tabs must be ordered correctly in HTML for the script to function correctly.
var tabList = document.querySelectorAll(".tab");
var tabArray = [];//Needs to be in an array to use indexOf().
for (i = 0; i < tabList.length; i++){ tabArray.push(tabList[i]);}
var contentList = document.querySelectorAll(".tabcontent");
//Initially only shows first content.
for (i = 0; i < contentList.length; i++){
    if (i === 0){ 
        contentList[i].style.display = "block"; 
        tabArray[i].style.borderBottom = "2px solid #c32222";
    }
    else{ contentList[i].style.display = "none";}
}

//Called whenever a tab is pressed.
function tabHandler(event){
    //Finds index of which tab was clicked.
    var tab = event.target;
    var tabIndex = tabArray.indexOf(tab);
    //Uses that index to display the content with the matching index and to hide the content that does not match.
    contentList.forEach(function(content){
        if (contentList[tabIndex] === content){
            content.style.display = "block";
        }
        else{
            content.style.display = "none";
        }
    })

    //If there is no custom colours then change the border below.
    for (i = 0; i < tabArray.length; i++){
        if(tab === tabArray[i]){
            //If the tab has a default background colour, use that. If not change it seperated (for index.html).
            if(!event.target.style.backgroundColor){
                tab.style.borderBottom = "2px solid #c32222";
            }
            else{
                tab.style.borderBottom = `2px solid ${tab.style.backgroundColor}`;
            }
        }
        else{
            tabArray[i].style.borderBottom = "";
        }
    }
}

//Event listener added for each tab.
tabList.forEach( function(tab){
    //Onclick
    tab.addEventListener('click',tabHandler);
    tab.addEventListener('touchstart',tabHandler);
})