import { mapListToDOMElements } from './DOMActions.js';
import { AppRequests } from './appRequests.js';

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

        for(const element of prosElements) {
            if(element instanceof HTMLElement && element.dataset.user && element.dataset.update) {
                const updatedAfter : string = element.dataset.update;
                this.appRequests.getUserRepositories(element.dataset.user)
                .then(response => this.changeReposTagOnDOM(element, response, updatedAfter));
            }    
        }
    }

    private changeReposTagOnDOM(element: HTMLElement, reposArr: Array<any>, updatedAfter: string) {
        const reposArray = reposArr.filter(element =>{
            const elementDate : Date = new Date(element.updated_at);
            const afterDate : Date = new Date(updatedAfter);
            return elementDate > afterDate
        }).map(element => ({
            name: element.name,
            updated_at: (new Date(element.updated_at)).toDateString(),
            git_url: element.git_url
        }));

        let divElement : HTMLElement = document.createElement('div');
        divElement.setAttribute('class', 'user-repos-result');

        let h3Element : HTMLElement = document.createElement('h3');
        h3Element.innerText = element.dataset.user ? `Repository of user: ${element.dataset.user}` : `Couldn't find username` ;

        let repositoriesTable : HTMLElement = this.generateRepositoriesTable(reposArray);

        divElement.appendChild(h3Element);
        divElement.appendChild(repositoriesTable);

        element.insertBefore(divElement, element.firstChild);
        element.outerHTML = element.innerHTML;
    }

    generateRepositoriesTable(reposArr : Array<any>) {
        const arrayKeys : Array<string> = Object.keys(reposArr[0]);
        let table = document.createElement('table');
        table.setAttribute('class', 'repos-table');

        for (const element of reposArr) {
            let row = table.insertRow();
            for (const key in element) {
              let cell = row.insertCell();
              let text = document.createTextNode(element[key]);
              cell.appendChild(text);
            }
          }

        let tHead = table.createTHead();
        let row = tHead.insertRow();
        for(let key of arrayKeys) {

            switch (key) {
                case 'name':
                    key = 'Repository name'
                    break;
                case 'updated_at':
                    key = 'Last update'
                    break;
                case 'git_url':
                    key = 'URL to download'
                    break;
            };

            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }

        return table;
    }
}

const runScripts = () => {
    const reposApplication = new ReposApplication();
}

document.addEventListener('DOMContentLoaded', runScripts);