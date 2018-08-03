/**
 *
 * @name Element
 */
class Element {
    constructor (query) {
        this.isNodeList = false;
        this.root = document.querySelectorAll(query);
        if (this.root.length > 0) {
            this.isNodeList = true;
        }
        return this;
    }

    /**
     * returns only the root DOM element
     * @memberof Element
     * @returns {HTMLElement}
     */
    findOne () {
        this.isNodeList = false;
        this.root = this.root[ 0 ];

        return this;
    }

    /**
     * method for binding dom events. useful for binding multiple
     * elements within a node list.
     * @param {String} type the event type
     * @param {Object} callback the function to execute on listener trigger
     * @memberof Element
     */
    on (type, callback) {
        if (this.isNodeList) {
            for (const i in this.root) {
                if ((typeof this.root[ i ] === "object") && this.root[ i ]) {
                    this.root[ i ].addEventListener(type, (e) => {
                        callback(e);
                    });
                }
            }
        } else {
            this.root.addEventListener(type, (e) => {
                callback(e);
            });
        }
    }

    /**
     * @param {String} className the name of the class toggle
     * @memberof Element
     * @returns {Object}
     */
    toggleClass (className) {
        this.root.classList.toggle(className);

        return this;
    }

    /**
     * @memberof Element
     * @param {String} className the class name to add
     * @returns {Object}
     */
    addClass (className) {
        this.root.classList.add(className);

        return this;
    }

    /**
     * @memberof Element
     * @param {String} className the class name to remove
     * @returns {Object}
     */
    removeClass (className) {
        this.root.classList.remove(className);

        return this;
    }
}

/**
 * @param {String} query the initial selector to
 * use for creating the Element object
 * @returns {Object} the element object
 */
const dom = (query) => {
    const el = new Element(query);

    return el;
};

export default dom;