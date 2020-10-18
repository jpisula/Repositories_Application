import { mapListToDOMElements } from './DOMActions.js';
import { AppRequests } from './requests.js';

/**
 * Main class of application
 */
class ReposApplication {
    private viewElements : Map<string, HTMLElement | null>;
    private appRequests : AppRequests;

    /**
     * Initialize class fields and runs init method
     */
    constructor() {
        this.viewElements = new Map<string, HTMLElement | null>();
        this.appRequests = new AppRequests();
        this.init();    
    }

    /**
     * Runs methods responsible for proper working of the site; 
     * run methods: connectDOMElements(), setupListeners() and changeReposTag()
     */
    private init = () => {
        this.connectDOMElements();
        this.setupListeners();
        this.changeReposTag();
    }

    private connectDOMElements = () => {
        const listOfIds : Array<string> = [...document.querySelectorAll('[id]')]
            .map(elem => elem.id);

        this.viewElements = mapListToDOMElements(listOfIds);
    }

    private setupListeners = () => {
        this.viewElements.get('searchForRepo')?.addEventListener('click', this.onReposSearchBtnClick);
    }

    private onReposSearchBtnClick = (event: Event) => {
        event.preventDefault();
        const userName : string = (<HTMLInputElement>this.viewElements.get('userName')).value;
        const dataString : string = (<HTMLInputElement>this.viewElements.get('updatedBy')).value;
        const searchRepoSection : HTMLElement | null | undefined = this.viewElements.get('searchRepo');
        const reposElement : HTMLElement = document.createElement('repos');
        reposElement.dataset.user = userName;
        reposElement.dataset.update = dataString;
        if(searchRepoSection) {
            searchRepoSection.appendChild(reposElement);
        }
    }

    private changeReposTag = () => {
        const prosElements = [...document.querySelectorAll('repos')].reverse();

        for(let element of prosElements) {
            if(element instanceof HTMLElement) {
                let p : HTMLElement = document.createElement('p');
                p.innerText = element.dataset.user ? element.dataset.user  : '';
                element.insertBefore(p, element.firstChild);
                element.outerHTML = element.innerHTML;
            }    
        }
    }
}

const runScripts = () => {
    const reposApplication = new ReposApplication();
}

document.addEventListener('DOMContentLoaded', runScripts);