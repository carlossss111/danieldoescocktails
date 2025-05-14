
const BACKEND_ENDPOINT = "/cocktails"
const BACKEND_PORT = ":5000"

const ERROR_ROW = "<tr><td colspan='2'>Look's like part of my website is down, " + 
    "if the issue persists please get in touch.</td></tr>"

interface Dict<T> {
    [Key: string]: T;
}

interface TableRowGetter {
    endpoint: string;
    port: string;
    latestIdentifier?: string | undefined;
    reachedEnd: boolean;

    _parseJson(item: Dict<string & string[]>) : string;
    _search(searchTerm?: string, latestDate?: string): Promise<Dict<any>[]>;
    queryRows(searchTerm?: string): Promise<string>;
    resetLatestDate() : void;
}

class CocktailGetter implements TableRowGetter {
    endpoint: string;
    port: string;
    latestDate?: string | undefined;
    reachedEnd: boolean;

    constructor(endpoint: string, port: string) {
        this.endpoint = endpoint;
        this.port = port;
        this.reachedEnd = false;
    }

    _convertToDisplayDate(isoDateStr: string) : string {
        let isoDate: Date = new Date(isoDateStr);

        let day = isoDate.getDate();
        let month = isoDate.getMonth() + 1; // zero-indexed
        let year = isoDate.getFullYear() - 2000; // will break in 2100 haha

        return `${day}/${month}/${year}`
    }

    _parseJson(item: Dict<string & string[]>) : string {
        const name: string          = item.name;
        const image: string         = item.image_path;
        const ingredients: string   = item.ingredients.map((x: string) => `<li>${x}</li>`).join("\n");
        const description: string   = item.description;
        const date: string          = item.date;
        const displayDate: string   = this._convertToDisplayDate(date)

        this.latestDate = date;

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
                            <span class="date">${displayDate}</span>
                        </p>
                    </td>
                </tr>`;
    }

    async _search(searchTerm?: string, latestDate?: string): Promise<Dict<any>[]> {
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

    async queryRows(searchTerm?: string): Promise<string> {
        let jsonResponse: Dict<any>[]
        let jsonCocktails: any[];

        try { 
            jsonResponse = await this._search(searchTerm, this.latestDate);
            jsonCocktails = jsonResponse["cocktails"]
            this.reachedEnd = jsonResponse["is_last"]
        }
        catch (e) {
            console.log("Failed to query backend for rows: " + e);
            return ERROR_ROW;
        }

        console.log("Cocktails received:");
        console.log(jsonCocktails);

        let htmlCocktails = "";
        jsonCocktails.forEach((jsonCocktail) => {
            htmlCocktails += this._parseJson(jsonCocktail);
        });

        return htmlCocktails
    }

    resetLatestDate() : void {
        this.latestDate = undefined;
    }
}

class TableActionListener {
    table: TableRowGetter;
    tableAnchor: HTMLElement;
    searchBar: HTMLInputElement;
    moreButton: HTMLElement;
    unitsManager: UnitsManager;
    query?: string | undefined

    constructor(table: TableRowGetter, unitsManager: UnitsManager, tableAnchorId: string, searchBarId: string, moreButtonId: string) {
        let tableAnchor = document.getElementById(tableAnchorId);
        let searchBar = (<HTMLInputElement>document.getElementById(searchBarId));
        let moreButton = document.getElementById(moreButtonId);

        if (searchBar && moreButton && tableAnchor) {
            this.table = table;
            this.unitsManager = unitsManager;
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

    _updateUI() : void {
        this.unitsManager.updateStoredUnitsAndHeadings();
        this.unitsManager.changeUnits();

        if (this.table.reachedEnd) {
            this.moreButton.hidden = true;
        }
        else { 
            this.moreButton.hidden = false;
        }
    }

    async pageLoad() : Promise<void> { 
        console.log("Loading initial rows...");

        this.table.resetLatestDate();
        let rows = await this.table.queryRows();

        this.tableAnchor.innerHTML = rows;

        this._updateUI()
    }

    async search() : Promise<void> { 
        console.log("Loading queried rows...");

        this.table.resetLatestDate();

        if(this.searchBar.value.length > 2){
            this.query = this.searchBar.value;
            let rows = await this.table.queryRows(this.query)

            this.tableAnchor.innerHTML = rows;
        }
        else {
            this.query = undefined;
            let rows = await this.table.queryRows()

            this.tableAnchor.innerHTML = rows;
        }

        this._updateUI()
    }

    async findMore() : Promise<void> {
        console.log("Loading more...");

        let rows = await this.table.queryRows(this.query)

        this.tableAnchor.innerHTML += rows;

        this._updateUI()
    }

}

