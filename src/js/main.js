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
            this.changeReposTag();
            this.setupListeners();
        };
        this.connectDOMElements = () => {
            const listOfIds = [...document.querySelectorAll('[id]')].map((elem) => elem.id);
            this.viewElements = mapListToDOMElements(listOfIds);
        };
        this.setupListeners = () => {
            window.addEventListener('scroll', this.onPageScroll);
            this.viewElements.get('searchForRepo')?.addEventListener('click', this.onReposSearchBtnClick);
            this.observer.observe(document.body, { attributes: true, childList: true, subtree: true });
        };
        this.onPageScroll = () => {
            this.viewElements.get('pageNavbar')?.classList.toggle("sticky", window.scrollY > 0);
        };
        this.onReposSearchBtnClick = (event) => {
            event.preventDefault();
            const userName = this.viewElements.get('userName').value;
            const dataString = this.viewElements.get('updatedBy').value;
            const searchRepoSection = this.viewElements.get('searchRepo');
            console.log();
            if (searchRepoSection?.lastChild &&
                searchRepoSection?.children[searchRepoSection?.childElementCount - 1]
                    .getAttribute('class') === 'user-repos-result') {
                this.lastChildToRemove = searchRepoSection?.lastChild;
            }
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
                    this.appRequests
                        .getUserRepositories(element.dataset.user)
                        .then((response) => this.changeReposTagOnDOM(element, response, updatedAfter));
                }
            }
        };
        this.viewElements = new Map();
        this.appRequests = new AppRequests();
        this.lastChildToRemove = null;
        this.observer = new MutationObserver(list => {
            for (const listElement of list) {
                if (listElement.addedNodes.length > 0 && list[0].target.id === 'searchRepo') {
                    this.changeReposTag();
                }
            }
        });
        this.init();
    }
    changeReposTagOnDOM(element, reposArr, updatedAfter) {
        const reposArray = reposArr
            .filter((element) => {
            const elementDate = new Date(element.updated_at);
            const afterDate = new Date(updatedAfter);
            return elementDate > afterDate;
        })
            .map((element) => ({
            name: element.name,
            updated_at: new Date(element.updated_at).toDateString(),
            description: element.description ? element.description : 'No description',
            git_url: element.git_url,
        }))
            .sort((a, b) => {
            return +new Date(b.updated_at) - +new Date(a.updated_at);
        });
        let divElement = document.createElement('div');
        divElement.setAttribute('class', 'user-repos-result');
        let h3Element = document.createElement('h3');
        h3Element.innerText = element.dataset.user
            ? `Github repositories of user \'${element.dataset.user}\' updated after ${updatedAfter}`
            : `Couldn't find username`;
        let repositoriesTable = this.generateRepositoriesTable(reposArray);
        divElement.appendChild(h3Element);
        divElement.appendChild(repositoriesTable);
        element.insertBefore(divElement, element.firstChild);
        element.outerHTML = element.innerHTML;
        if (this.lastChildToRemove) {
            const searchRepoSection = this.viewElements.get('searchRepo');
            if (searchRepoSection) {
                searchRepoSection.removeChild(this.lastChildToRemove);
                this.lastChildToRemove = null;
            }
        }
    }
    ;
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
                case 'description':
                    key = 'Description';
                    break;
                case 'git_url':
                    key = 'URL to download';
                    break;
            }
            let th = document.createElement('th');
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
        return table;
    }
    ;
}
const runScripts = () => {
    const reposApplication = new ReposApplication();
};
document.addEventListener('DOMContentLoaded', runScripts);
