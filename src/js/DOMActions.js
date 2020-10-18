const _getDOMElement = (id) => {
    return document.getElementById(id);
};
export const mapListToDOMElements = (listOfId) => {
    const _viewElements = new Map();
    for (const id of listOfId) {
        _viewElements.set(id, _getDOMElement(id));
    }
    return _viewElements;
};
