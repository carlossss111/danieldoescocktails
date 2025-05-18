const CONTENT_SHOW_TOP = "0px";
const CONTENT_HIDDEN_TOP = "-250px";


class Navbar {
    wasNavHidden: boolean = true;
    buttons: NodeListOf<HTMLElement>;
    nav: HTMLElement;

    constructor(navbar_id: string, buttons_class: string) {
        this.buttons = document.querySelectorAll(buttons_class);

        let nav = document.getElementById(navbar_id);
        if (!nav) {
            console.log("Could not find navbar!");
            return
        }
        this.nav = nav;

        nav.addEventListener("click", this._openNav.bind(this));
    }

    _openNav(){
        if(this.wasNavHidden){
            this.buttons.forEach((elem: Element) => {
                let content= (<HTMLElement>elem);
                content.style.top = CONTENT_SHOW_TOP;
            })

            this.wasNavHidden = false;
        }
        else{
            this.buttons.forEach((elem: Element) => {
                let content= (<HTMLElement>elem);
                content.style.top = CONTENT_HIDDEN_TOP;
            })

            this.wasNavHidden = true;
        }
    }
}
