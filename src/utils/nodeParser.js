const nodeParser = (type, el, _options) => {
    switch (type) {
    case 'find-up-class': {
        const optionClass = _options.classname;
        let elmnt = el;
        if (!optionClass) return null;
        if (elmnt.className) {
            if (elmnt.className.indexOf(optionClass) > -1) {
                return elmnt;
            }
        }
        while (elmnt.parentNode) {
            elmnt = elmnt.parentNode;
            if (elmnt.className) {
                if (elmnt.className.indexOf(optionClass) > -1) {
                    return elmnt;
                }
            }
        }
        return null;
    }
    default:
        return null;
    }
};

export default nodeParser;
