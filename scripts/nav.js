/**
 * nav.js - Daniel Robinson
 * Navigation bar template and mobile sliding
 *
 */

//create nav template because links are the same for each page
function createNav(){
    var nav = document.createElement("nav");
    nav.innerHTML = ""
        +   "<ul>"
        +       "<li id='navlogoContainer'>"
        +           "<img src='/images/logo/Dan_Does_Cocktails_Light_Shadow_Small.jpg' alt='danieldoescocktails' id='navlogo'>"
        +           "<img src='/images/buttons/hamburgerButton.png' alt='button' id='hamburgerBtn' onclick='openNav()'/>"
        +       "</li>"
        +       "<li id='navfirst' class='slide'>"
        +           "<a href='/index.html'>Home</a>"
        +       "</li>"
        +       "<li class='slide'>"
        +           "<a href='/pages/cabinet.html'>Cabinet</a>"
        +       "</li>"
        +       "<li class='slide'>"
        +           "<a href='/pages/about.html'>About</a>"
        +       "</li>"
        +       "<li id='navlast' class='slide'>"
        +           "<a href='/pages/resources.html'>Resources</a>"
        +       "</li>"
        +   "</ul>";

    document.body.appendChild(nav);
    return nav;
}

//embolden current page and remove unneeded hyperlink
function highlightCurrentPage(nav){
    var currentPage = window.location.pathname.split("/").pop();
    var pageList = nav.querySelectorAll("a");

    pageList.forEach(function(givenPage){
        var href = givenPage.href;
        href = href.split("/").pop();
        if(href == currentPage){
            givenPage.innerHTML = `<strong>${givenPage.innerHTML}</strong>`
            givenPage.href = "#";
        }
    })
}

//resize the nav on window change
function resizeNav(){
    if(window.innerWidth < 601)
        nav.style.height = "55px";
    else
        nav.style.height = "";
}
window.onresize = resizeNav;

//for mobile, open/close the nav when the burger button is pressed
var hiddenNav = true;
function openNav(){
    var buttons = document.querySelectorAll(".slide");

    if(hiddenNav == true){
        buttons.forEach(function(element){
            element.style.top = "0px";
        })
        nav.style.height = "";
        hiddenNav = false;
    }
    else{
        buttons.forEach(function(element){
            element.style.top = "-250px";
        })
        setTimeout(function(){nav.style.height = "55px";},500);
        hiddenNav = true;
    }
}

//MAIN
var nav = createNav();
highlightCurrentPage(nav);
resizeNav();

