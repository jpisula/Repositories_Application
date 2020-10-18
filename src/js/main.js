import { mapListToDOMElements } from './DOMActions.js';
import { AppRequests } from './appRequests.js';
/**
 * Main class of application
 */
class ReposApplication {
    /**
     * Initialize class fields and runs init method
     */
    constructor() {
        /**
         * Runs methods responsible for proper working of the site;
         * run methods: connectDOMElements(), setupListeners() and changeReposTag()
         */
        this.init = () => {
            this.connectDOMElements();
            this.setupListeners();
            this.changeReposTag();
        };
        this.connectDOMElements = () => {
            const listOfIds = [...document.querySelectorAll('[id]')]
                .map(elem => elem.id);
            this.viewElements = mapListToDOMElements(listOfIds);
        };
        this.setupListeners = () => {
            this.viewElements.get('searchForRepo')?.addEventListener('click', this.onReposSearchBtnClick);
        };
        this.onReposSearchBtnClick = (event) => {
            event.preventDefault();
            const userName = this.viewElements.get('userName').value;
            const dataString = this.viewElements.get('updatedBy').value;
            const searchRepoSection = this.viewElements.get('searchRepo');
            const reposElement = document.createElement('repos');
            reposElement.dataset.user = userName;
            reposElement.dataset.update = dataString;
            if (searchRepoSection) {
                searchRepoSection.appendChild(reposElement);
            }
        };
        this.changeReposTag = () => {
            const prosElements = [...document.querySelectorAll('repos')].reverse();
            for (const element of prosElements) {
                if (element instanceof HTMLElement && element.dataset.user && element.dataset.update) {
                    const updatedAfter = element.dataset.update;
                    this.appRequests.getUserRepositories(element.dataset.user)
                        .then(response => this.changeReposTagOnDOM(element, response, updatedAfter));
                }
            }
        };
        this.viewElements = new Map();
        this.appRequests = new AppRequests();
        this.init();
    }
    changeReposTagOnDOM(element, reposArr, updatedAfter) {
        const reposArray = reposArr.filter(element => {
            const elementDate = new Date(element.updated_at);
            const afterDate = new Date(updatedAfter);
            return elementDate > afterDate;
        }).map(element => ({
            name: element.name,
            updated_at: (new Date(element.updated_at)).toDateString(),
            git_url: element.git_url
        }));
        let divElement = document.createElement('div');
        divElement.setAttribute('class', 'user-repos-result');
        let h3Element = document.createElement('h3');
        h3Element.innerText = element.dataset.user ? `Repository of user: ${element.dataset.user}` : `Couldn't find username`;
        let repositoriesTable = this.generateRepositoriesTable(reposArray);
        divElement.appendChild(h3Element);
        divElement.appendChild(repositoriesTable);
        element.insertBefore(divElement, element.firstChild);
        element.outerHTML = element.innerHTML;
    }
    generateRepositoriesTable(reposArr) {
        const arrayKeys = Object.keys(reposArr[0]);
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
        for (let key of arrayKeys) {
            switch (key) {
                case 'name':
                    key = 'Repository name';
                    break;
                case 'updated_at':
                    key = 'Last update';
                    break;
                case 'git_url':
                    key = 'URL to download';
                    break;
            }
            ;
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
};
document.addEventListener('DOMContentLoaded', runScripts);
