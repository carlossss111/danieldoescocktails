
interface Dictionary<T> {
    [Key: string]: T;
}

class SearchHandler{
    #endpoint: string;

    constructor(endpoint: string){
        this.#endpoint = endpoint;
    }

    #parseJson(cocktail: Dictionary<string & string[]>) : string {
        const name : string          = cocktail.name;
        const image : string         = cocktail.image_path;
        const ingredients : string   = cocktail.ingredients.map((x: string) => `<li>${x}</li>`).join("\n");
        const description : string   = cocktail.description;
        const date : string          = cocktail.date;

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

    async #search(searchTerm?: string, latestDate?: string): Promise<Dictionary<any>[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (searchTerm) 
            params.append("search_term", searchTerm);
        if (latestDate)
            params.append("latest_date", latestDate);
    
        const response = await fetch(this.#endpoint + params.toString());
        if (!response.ok) {
            console.log(`Bad response from backend API: ${response.status}`);
            throw new Error("Response was not ok.");
        }

        return await response.json();
    }

    async addCocktails(anchor: HTMLElement, searchTerm?: string): Promise<void> {
        let jsonCocktails: Dictionary<any>[] = await this.#search(searchTerm);

        jsonCocktails.forEach((jsonCocktail) => {
            let htmlCocktail: string = (this.#parseJson(jsonCocktail))
            anchor.append(htmlCocktail)
        });

        console.log("Cocktails received:")
        console.log(jsonCocktails)
    }
}

// On page load
let tableHead = document.getElementById("cocktailAnchor")
if (tableHead) {
    new SearchHandler("/cocktails").addCocktails(tableHead)
}
else {
    console.log("Could not find head of the table to insert cocktails into.")
}

