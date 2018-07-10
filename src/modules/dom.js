/**
 * a simple DOM caching module
 * @name DOM
 * @module DOM
 */
const DOM = {
    /**
     * returns only one element
     * @param {String} query the dom selector
     * @memberof DOM
     * @returns {HTMLElement}
     */
    findOne(query) {
        return document.querySelector(query);
    },

    /**
     * returns an a node list of all available elements
     * @param {String} query the dom selector
     * @memberof DOM
     * @returns {NodeList}
     */
    find(query) {
        return document.querySelectorAll(query);
    }
};

export default DOM;