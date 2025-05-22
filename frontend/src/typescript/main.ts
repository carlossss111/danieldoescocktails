const COCKTAIL_BACKEND_ENDPOINT = "/cocktails"
const TRAVEL_BACKEND_ENDPOINT = "/travel"
const BACKEND_PORT = ":5000"
const COCKTAIL_TABLE_ANCHOR_ID = "cocktailAnchor";
const COCKTAIL_TABLE_MORE_ID = "cocktailMoreButton";
const COCKTAIL_TABLE_SEARCH_ID = "mainSearch";
const COCKTAIL_UNIT_TICKBOX_ID = "measurementTickbox";
const TRAVEL_TABLE_ANCHOR_ID = "travelAnchor";
const TRAVEL_TABLE_MORE_ID = "travelMoreButton";

const TAB_CLASS = ".tab";
const TAB_CONTENT_CLASS = ".tabcontent";

const NAV_BUTTON_ID = "hamburgerBtn";
const NAV_CONTENT_CLASS = ".slide";


function main() {
    try {
        const tabManager: TabManager
                    = new TabManager(TAB_CLASS, TAB_CONTENT_CLASS);
    }
    catch (err) {
        if (!(err instanceof ReferenceError))
            new Error(err)
        console.log("(tabs.js not included in HTML)");
    }

    try {
        const cocktailTableManager: TableRowGetter 
                    = new CocktailGetter(COCKTAIL_BACKEND_ENDPOINT, BACKEND_PORT);
        const travelTableManager: TableRowGetter
                    = new TravelGetter(TRAVEL_BACKEND_ENDPOINT, BACKEND_PORT);
        const unitsManager: UnitsManager 
                    = new UnitsManager(COCKTAIL_UNIT_TICKBOX_ID);
        const cocktailTableListener: TableActionListener 
                    = new TableActionListener(cocktailTableManager, unitsManager, COCKTAIL_TABLE_ANCHOR_ID, COCKTAIL_TABLE_SEARCH_ID, COCKTAIL_TABLE_MORE_ID);
        const travelTableListener: TableActionListener 
                    = new TableActionListener(travelTableManager, unitsManager, TRAVEL_TABLE_ANCHOR_ID, COCKTAIL_TABLE_SEARCH_ID, TRAVEL_TABLE_MORE_ID);
    }
    catch (err) {
        if (!(err instanceof ReferenceError))
            new Error(err)
        console.log("(units.js or cocktail_table.js not included in HTML)")
    }

    try { 
        const navManager: Navbar
                    = new Navbar(NAV_BUTTON_ID, NAV_CONTENT_CLASS);
    }
    catch (err) {
        if (!(err instanceof ReferenceError))
            new Error(err)
        console.warn("nav.js not included in HTML.")
    }
}

main();

