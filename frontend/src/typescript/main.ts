
const COCKTAIL_TABLE_ANCHOR_ID = "cocktailAnchor"
const COCKTAIL_TABLE_MORE_ID = "cocktailMoreButton"
const COCKTAIL_TABLE_SEARCH_ID = "mainSearch"
const COCKTAIL_UNIT_TICKBOX_ID = "measurementTickbox"
const TAB_CLASS = ".tab"
const TAB_CONTENT_CLASS = ".tabcontent"


function main() {
    const tabManager: TabManager
                = new TabManager(TAB_CLASS, TAB_CONTENT_CLASS);
    const unitsManager: UnitsManager 
                = new UnitsManager(COCKTAIL_UNIT_TICKBOX_ID);
    const cocktailTableManager:TableRowGetter 
                = new CocktailGetter(BACKEND_ENDPOINT, BACKEND_PORT);
    const cocktailTableListener: TableActionListener 
                = new TableActionListener(cocktailTableManager, unitsManager, COCKTAIL_TABLE_ANCHOR_ID, COCKTAIL_TABLE_SEARCH_ID, COCKTAIL_TABLE_MORE_ID);
}

main();

