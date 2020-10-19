/**
 * Get single DOM element by id
 * @param {string} id id of an DOM elemeny to get
 */
const _getDOMElement = (id) => {
    return document.getElementById(id);
};
/**
 * Maps list of elements' ids to list of DOM elements
 * @param {Array<string>} listOfId List of ids of serached DOM elements
 * @returns {Map<string, HTMLElement | null>} map of DOM elements
 */
export const mapListToDOMElements = (listOfId) => {
    const _viewElements = new Map();
    for (const id of listOfId) {
        _viewElements.set(id, _getDOMElement(id));
    }
    return _viewElements;
};
