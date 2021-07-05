function ajaxSearch(minId, maxId, search){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            document.querySelector("tbody").innerHTML = this.response;
    }
    ajax.open("GET",`./scripts/search.php?min=${minId}&max=${maxId}&search=${search}`,true);
    ajax.send();
}
ajaxSearch(1,2,""); //only show ids 1-2
//ajaxSearch(1,0xFFFF,"Cucumber Lemonade"); //only show cucumber lemonade
//ajaxSearch(1,0xFFFF,"raspberry"); //only show raspberry ingredients