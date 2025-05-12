
const BACKEND_ENDPOINT = "/cocktails"
const BACKEND_PORT = ":5000"

const COCKTAIL_TABLE_ANCHOR_ID = "cocktailAnchor"
const COCKTAIL_TABLE_MORE_ID = "cocktailMoreButton"
const COCKTAIL_TABLE_SEARCH_ID = "mainSearch"

interface Dict<T> {
    [Key: string]: T;
}

interface TablePopulator {
    endpoint: string;
    port: string;
    latestIdentifier?: string | undefined;

    parseJson(item: Dict<string & string[]>) : string;
    search(searchTerm?: string, latestDate?: string): Promise<Dict<any>[]>;
    add(anchor: HTMLElement, searchTerm?: string): Promise<void>;
    replace(anchor: HTMLElement, searchTerm?: string): Promise<void>;
}

class CocktailTablePopulator implements TablePopulator {
    endpoint: string;
    port: string;
    latestDate?: string | undefined;

    constructor(endpoint: string, port: string) {
        this.endpoint = endpoint;
        this.port = port;
    }

    parseJson(item: Dict<string & string[]>) : string {
        const name : string          = item.name;
        const image : string         = item.image_path;
        const ingredients : string   = item.ingredients.map((x: string) => `<li>${x}</li>`).join("\n");
        const description : string   = item.description;
        const date : string          = item.date;

        this.latestDate = date

        return `<tr> 
                    <td>
                        <img src="${image}">
                    </td> 
                    <td class="itembox">
                        <h2>${name}</h2>
                        <ul class="ingredients">
                            ${ingredients}
                        </ul>
                        <p class="description">
                            ${description}
                            <span class="date">${date}</span>
                        </p>
                    </td>
                </tr>`;
    }

    async search(searchTerm?: string, latestDate?: string): Promise<Dict<any>[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (searchTerm) 
            params.append("search_term", searchTerm);
        if (latestDate)
            params.append("latest_date", latestDate);
    
        const response = await fetch(
            window.location.origin + this.port + this.endpoint + "?" + params.toString()
        );
        if (!response.ok) {
            console.log(`Bad response from backend API: ${response.status}`);
            throw new Error("Response was not ok.");
        }

        return await response.json();
    }

    async add(anchor: HTMLElement, searchTerm?: string): Promise<void> {
        let jsonCocktails: Dict<any>[];
        try {
            jsonCocktails = await this.search(searchTerm, this.latestDate);
        }
        catch (e) {
            console.log(`Failed to get cocktails!, ${e}`)
            return
        }

        jsonCocktails.forEach((jsonCocktail) => {
            let htmlCocktail: string = (this.parseJson(jsonCocktail));
            anchor.innerHTML += (htmlCocktail);
        });

        console.log("Cocktails received:");
        console.log(jsonCocktails);
    }

    async replace(anchor: HTMLElement, searchTerm?: string): Promise<void> {
        this.latestDate = undefined;
        anchor.innerHTML = "";

        this.add(anchor, searchTerm);
    }
}

class TableActionListener {
    tablePopulator: TablePopulator;
    tableAnchor: HTMLElement;
    searchBar: HTMLInputElement;
    moreButton: HTMLElement;
    query?: string | undefined

    constructor(tablePopulator: TablePopulator, tableAnchorId: string, searchBarId: string, moreButtonId: string) {
        let tableAnchor = document.getElementById(tableAnchorId);
        let searchBar = (<HTMLInputElement>document.getElementById(searchBarId));
        let moreButton = document.getElementById(moreButtonId);

        if (searchBar && moreButton && tableAnchor) {
            this.tablePopulator = tablePopulator
            this.tableAnchor = tableAnchor;
            this.searchBar = searchBar;
            this.moreButton = moreButton;

            searchBar.addEventListener("keyup", this.search.bind(this));
            moreButton.addEventListener("click", this.findMore.bind(this));

            this.pageLoad();
        }
        else {
            throw new DOMException("Could not find HTML elements for TableActionListener");
        }
    }

    pageLoad() : void { 
        console.log("Loading initial rows...");
        this.tablePopulator.add(this.tableAnchor);
    }

    search() : void { 
        console.log("Loading queried rows...");
        if(this.searchBar.value.length > 2){
            this.query = this.searchBar.value;
            this.tablePopulator.replace(this.tableAnchor, this.query);
        }
        else {
            this.query = undefined;
            this.tablePopulator.replace(this.tableAnchor);
        }
    }

    findMore() : void {
        console.log("Loading more...");
        this.tablePopulator.add(this.tableAnchor, this.query);
    }

}

const cocktailTablePopulator: TablePopulator 
            = new CocktailTablePopulator(BACKEND_ENDPOINT, BACKEND_PORT);
const cocktailTableListener: TableActionListener 
            = new TableActionListener(cocktailTablePopulator, COCKTAIL_TABLE_ANCHOR_ID, COCKTAIL_TABLE_SEARCH_ID, COCKTAIL_TABLE_MORE_ID);

