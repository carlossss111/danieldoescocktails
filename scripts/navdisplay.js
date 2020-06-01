var hidden = true;

if(window.innerWidth < 601){
    document.querySelector("nav ul").style.height = "55px";
    console.log(window.innerWidth);
}

function openNav(){
    var buttons = document.querySelectorAll(".slide");

    if(hidden === true){
        buttons.forEach(function(element){
            element.style.top = "0px";
        })
        document.querySelector("nav ul").style.height = "";
        hidden = false;
    }
    else{
        buttons.forEach(function(element){
            element.style.top = "-250px";
        })
        setTimeout(function(){document.querySelector("nav ul").style.height = "55px";},500);
        hidden = true;
    }

}