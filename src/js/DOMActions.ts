/**
 * Get single DOM element by id
 * @param {string} id id of an DOM elemeny to get
 */
const _getDOMElement = (id: string) => {
    return document.getElementById(id);
};

/**
 * Maps list of elements' ids to list of DOM elements
 * @param {Array<string>} listOfId List of ids of serached DOM elements
 * @returns {Map<string, HTMLElement | null>} map of DOM elements
 */
export const mapListToDOMElements = (listOfId: Array<string>) => {
    const _viewElements: Map<string, HTMLElement | null> = new Map<string, HTMLElement | null>();

    for (const id of listOfId) {
        _viewElements.set(id, _getDOMElement(id));
    }

    return _viewElements;
};
