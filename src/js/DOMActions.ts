const _getDOMElement = (id: string) => {
    return document.getElementById(id);
};

export const mapListToDOMElements = (listOfId: Array<string>) => {
    const _viewElements: Map<string, HTMLElement | null> = new Map<string, HTMLElement | null>();

    for (const id of listOfId) {
        _viewElements.set(id, _getDOMElement(id));
    }

    return _viewElements;
};
