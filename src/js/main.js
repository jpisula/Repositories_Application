import { mapListToDOMElements } from './DOMActions.js';
import { AppRequests } from './requests.js';
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
            for (let element of prosElements) {
                if (element instanceof HTMLElement) {
                    let p = document.createElement('p');
                    p.innerText = element.dataset.user ? element.dataset.user : '';
                    element.insertBefore(p, element.firstChild);
                    element.outerHTML = element.innerHTML;
                }
            }
        };
        this.viewElements = new Map();
        this.appRequests = new AppRequests();
        this.init();
    }
}
const runScripts = () => {
    const reposApplication = new ReposApplication();
};
document.addEventListener('DOMContentLoaded', runScripts);
