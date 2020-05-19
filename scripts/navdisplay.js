var hidden = true;
function openNav(){
    var buttons = document.querySelectorAll(".slide");

    if(hidden === true){
        buttons.forEach(function(element){
            element.style.top = "0px";
        })
        hidden = false;
    }
    else{
        buttons.forEach(function(element){
            element.style.top = "-250px";
        })
        hidden = true;
    }
}