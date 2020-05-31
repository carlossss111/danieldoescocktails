//First word of the page title is stored.
var pageTitle = document.title;
var myLocation = pageTitle.split(" ")[0];

//index is in a different folder from the rest of the HTML, therefore needs slightly different links.
var nav = document.createElement("nav");
if (myLocation.toLowerCase() === "home"){
    nav.innerHTML = "<ul><li id='navlogoContainer'><img src='./images/logo/Dan_Does_Cocktails_Light_Shadow.jpg' alt='danieldoescocktails' id='navlogo'><img src='./images/buttons/hamburgerButton.png' alt='button' id='hamburgerBtn' onclick='openNav()'/></li><li id='navfirst' class='slide'><a href='#'>Home</a></li><li class='slide'><a href='./pages/about.html'>About</a></li><li class='slide'><a href='./pages/cabinet.html'>Cabinet</a></li><li class='slide'><a href='./pages/resources.html'>Resources</a></li><li id='navlast' class='slide'><a href='./pages/blog.html'>Blog</a></li></ul>";
}
else{
    nav.innerHTML = "<ul><li id='navlogoContainer'><img src='../images/logo/Dan_Does_Cocktails_Light_Shadow.jpg' alt='danieldoescocktails' id='navlogo'><img src='../images/buttons/hamburgerButton.png' alt='button' id='hamburgerBtn' onclick='openNav()'/></li><li id='navfirst' class='slide'><a href='../index.html'>Home</a></li><li class='slide'><a href='./about.html'>About</a></li><li class='slide'><a href='./cabinet.html'>Cabinet</a></li><li class='slide'><a href='./resources.html'>Resources</a></li><li id='navlast' class='slide'><a href='./blog.html'>Blog</a></li></ul>";
}

//Each link to another page is checked against the page title and put in bold if there is a match.
pageList = nav.querySelectorAll("a")
pageList.forEach(function(page){
    if (page.innerHTML.toLowerCase() === myLocation.toLowerCase()){
        page.innerHTML = `<strong>${page.innerHTML}</strong>`;
    }
})

//HTML for the navbar is output as a child of the body.
document.body.appendChild(nav);