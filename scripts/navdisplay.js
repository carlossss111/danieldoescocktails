var hidden = true;
function openNav(){
    var buttons = document.querySelectorAll("nav li");

    if(hidden === true){
        buttons.forEach(function(element){
            element.style.display = "block";
        })
        hidden = false;
    }
    else{
        buttons.forEach(function(element){
            if(element !== buttons[0]){
                element.style.display = "none";
            }
        })
        hidden = true;
    }
}