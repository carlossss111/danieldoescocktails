
const COCKTAIL_TABLE_ANCHOR_ID = "cocktailAnchor"
const COCKTAIL_TABLE_MORE_ID = "cocktailMoreButton"
const COCKTAIL_TABLE_SEARCH_ID = "mainSearch"
const COCKTAIL_UNIT_TICKBOX_ID = "measurementTickbox"


function main() {
    const unitsManager: UnitsManager 
                = new UnitsManager(COCKTAIL_UNIT_TICKBOX_ID);
    const cocktailTablePopulator:TableRowGetter 
                = new CocktailGetter(BACKEND_ENDPOINT, BACKEND_PORT);
    const cocktailTableListener: TableActionListener 
                = new TableActionListener(cocktailTablePopulator, unitsManager, COCKTAIL_TABLE_ANCHOR_ID, COCKTAIL_TABLE_SEARCH_ID, COCKTAIL_TABLE_MORE_ID);
}

main();

