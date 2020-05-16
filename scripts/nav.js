//First word of the page title is stored.
var pageTitle = document.title;
var myLocation = pageTitle.split(" ")[0];

//index is in a different folder from the rest of the HTML, therefore needs slightly different links.
var nav = document.createElement("nav");
if (myLocation.toLowerCase() === "home"){
    nav.innerHTML = "<ul><li id='navlogo'><img src='./images/logo/Dan_Does_Cocktails_Light_Shadow.jpg' alt='danieldoescocktails'></li><li id='navfirst'><a href='#'>HOME</a></li><li><a href='./html/about.html'>ABOUT</a></li><li><a href='./html/cabinet.html'>CABINET</a></li><li><a href='./html/resources.html'>RESOURCES</a></li><li id='navlast'><a href='./html/blog.html'>BLOG</a></li></ul>";
}
else{
    nav.innerHTML = "<ul><li id='navlogo'><img src='../images/logo/Dan_Does_Cocktails_Light_Shadow.jpg' alt='danieldoescocktails'></li><li id='navfirst'><a href='../index.html'>HOME</a></li><li><a href='../html/about.html'>ABOUT</a></li><li><a href='../html/cabinet.html'>CABINET</a></li><li><a href='../html/resources.html'>RESOURCES</a></li><li id='navlast'><a href='../html/blog.html'>BLOG</a></li></ul>";
}

//Each link to another page is checked against the page title and put in bold if there is a match.
pageList = nav.querySelectorAll("a")
pageList.forEach(function(page){
    if (page.innerHTML.toLowerCase() === myLocation.toLowerCase()){
        console.log("MATCH")
        page.innerHTML = `<strong>${page.innerHTML}</strong>`;
        console.log("NEW: ", page.innerHTML)
    }
})

//HTML for the navbar is output as a child of the body.
document.body.appendChild(nav);