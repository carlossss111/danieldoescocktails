//Called when either button is pressed.
function switchTab(tab){
    var t1 = document.getElementById("firstTable");
    var t2 = document.getElementById("secondTable");
    if(tab.id === "firstTab"){
        let otherTab = document.getElementById("secondTab");
        tab.style.borderBottom = "2px solid #c32222";
        otherTab.style.borderBottom = "2px solid white";
        t1.style.display = "block";
        t2.style.display = "none";
    }
    else{
        let otherTab = document.getElementById("firstTab");
        tab.style.borderBottom ="2px solid #d88";
        otherTab.style.borderBottom = "2px solid white";
        t1.style.display = "none";
        t2.style.display = "block";
    }
}