
const CONTENT_DISPLAY = "block";
const CONTENT_HIDE  = "none";

const BORDER_COLOUR = "2px solid #c32222";
const BORDER_NONE = "";


class TabManager {
    tabList: NodeListOf<HTMLElement>;
    contentList: NodeListOf<HTMLElement>;

    constructor(tabClass: string, contentClass: string) {
        this.tabList = document.querySelectorAll(tabClass);
        this.contentList = document.querySelectorAll(contentClass);

        if (this.tabList.length != this.contentList.length) {
            console.log("Number of tabs != number of content");
            return;
        }

        for (let i = 0; i < this.tabList.length; i++) {
            this.tabList[i].addEventListener("click", this._changeContent.bind(this));
            this.tabList[i].addEventListener("click", this._changeTabColour.bind(this));
        }
    }

    _changeContent(event: Event) {
        let tabSelected = (<HTMLElement | undefined> event.target);
        if (!tabSelected)
            return;
        let tabIndex = Array.from(this.tabList).indexOf(tabSelected);

        let contentSelected = this.contentList[tabIndex];
        contentSelected.style.display = CONTENT_DISPLAY;

        this.contentList.forEach((content: HTMLElement) => {
            if (this.contentList[tabIndex] != content) {
                content.style.display = CONTENT_HIDE;
            }
        });
    }

    _changeTabColour(event: Event) {
        let tabSelected = (<HTMLElement | undefined> event.target);
        if (!tabSelected)
            return;

        if (!tabSelected.style.backgroundColor) {
            tabSelected.style.borderBottom = BORDER_COLOUR;
        }
        else {
            tabSelected.style.borderBottom = `2px solid ${tabSelected.style.backgroundColor}`;
        }

        this.tabList.forEach((tab: HTMLElement) => {
            if (tabSelected != tab) {
                tab.style.borderBottom = BORDER_NONE;
            }
        });
    }

}

