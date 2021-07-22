![Logo](/images/logo/Dan_Does_Cocktails_Heavy_Shadow.jpg)

# danieldoescocktails.com
My first web-dev project where I host an SQL database of cocktails and ingredients.

Everything is on github so I have a backup and so scripts and styling can be reused and adapted for other projects.

## Scripts
__keys.php__ _is not included_, define `$servername`, `$username`, `$password` and `$dbname` to access a database in search.php.

__nav.js__ contains the template for the navigation bar and some dynamic styling for mobile usage. It should be included underneath the `<body>` tag.

__search.js__ has a SearchQueryHandler class that should be instantiated with the appropriate arguments when there is to be a table search. On creation, the object first gets the `MAX_ID` of the SQL table and then performs the first proper search.

Searches can be called when a `class="moreButton"` button is clicked on the page. This will cause `NUM_TO_LOAD` new entries to be requested from search.php, going down the list of ids. When the `MIN_ID` is hit, there are no more entries to load and the more-button is hidden.

Searches can also be called with a `id="mainSearch"` search bar whenever a character is added or removed in it. A search with the name/ingredients is then executed in search.php or, if the bar is emptied, the results returns to their initial state.

Containing this in a class allows multiple searches to take place on one page (see index.html).

__search.php__ is initially called to return the maximum id in a table with `SELECT MAX(id) FROM $table;`. The next time it is called the main function prepares an SQL statement depending on the value of `table=<name>` in the GET request sent my search.js. The outputs also change depending on the table.

Depending on the query, the file might need the `min` id, `max` id and `search`. Here is an example request for the file to handle:

`http://82.42.206.156/scripts/search.php?table=cocktail&min=1&max=59 &search=tequila`

The file only accepts prepared queries and whitelisted tables.

__units.js__ is called whenever a search is made or whenever a `id="measurementTickbox"` button is clicked (i.e in the main table in index.html). It has two purposes: changing between ml & oz and storing the original ml measurement that is held in the database.

Global arrays `storedHeadings` and `storedIngredients` hold the original headings and ingredients respectively and use eachother to update properly when the table changes as a result of a search.

The `toImperial` function finds each ingredient `<li>` and does the maths to convert ml to ozs (or 5ml = 1 barspoon exceptionally).
The `toMetric` function finds each ingredient `<li>` and converts it back to ml using the `storedIngredients` array. It does not calculate the metric itself because that would mean that after changing back-and-forth, the values could end up very different (due to rounding etc) which is not suitable for this fine-margin recipes.

Note that units.js may be called by search.js when it is not needed (like in cabinet.html), this is harmless.

__tabs.js__ collects an array of `class="tab"` buttons and a list of `class=tabcontent` divs. When a tab is pressed, the tab content shown/hidden is switched to the correct tab. Makesure when using this script that the number of tab and tabcontent elements is the same and that they are in the same order.

## Global Namespace
I use functions quite a bit, but some values need to be stored persistently between calls. Also I haven't updated tabs.js for a year.

### JavaScript
* nav (node)
* hiddenNav (boolean)
* tabList (nodeList)
* tabArray (array)
* contentList (nodeList)
* storedHeadings (array)
* storedIngredients (array)

### PHP
* $servername
* $username
* $password
* $dbname

## Database
The database consists of three tables so far. The first contains index.html's main cocktails, the second is it's travel cocktails and the third is cabinet.html's ingredients. Each table is called to produce a slightly different output.

The InnoDB database runs using MySQLi. Backups are included in /sql.

## Utilities
Updating the main database needs to be as easy as possible so I can be lazy. Both shell files need to be run on the server.

__addCocktail.sh__ allows a cocktail to be added to the main table through a series of inputs. It parses everything so that the `INSERT` can be done properly (i.e escaping quotemarks and putting delimiters on the ingredients).

__editCocktail.sh__ makes it so that a cocktail from the main table can have one of it's features edited using Vi. It does this by creating a file in /tmp and deleting it after it's been sent off.

## Hosting
The site is hosted on an [apache webserver](https://httpd.apache.org/).

## Author
* All code and commentary by Daniel Robinson, 2020-21.
* Logo drawn by Matthew Boyd, 2020.
* Images in resources.html with explicit permission from their respective owners.

Project under GNU GPL version 3
