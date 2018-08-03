import PubSub from "../core/pubsub";

// Pub sub pattern for activating events
const events = new PubSub();
// sub nav module for activating various pages
// within the portal index

/**
 * @name subnav
 */
const subnav = {
    init (el) {
        this.cacheDOM(el);
        this.bindEvents();
        this.subscriptions();
        this.pushInitialState();
        if (location.search) {
            this.parseUrl();
        }
    },
    /**
     * gets the value from the parameter name
     * in the url search
     * @param {String} paramName url search name
     * @memberof subnav
     * @returns {String}
     */
    getParameter (paramName) {
        const searchString = window.location.search.substring(1);
        const params = searchString.split("&");

        for (let i = 0; i < params.length; i++) {
            const val = params[ i ].split("=");

            if (val[ 0 ] === paramName) {
                return val[ 1 ];
            }
        }
        return null;
    },

    /**
     * method for extacting the search query from the url
     * to make selected subnav or pages active within
     * the index
     * @memberof subnav
     */
    parseUrl () {
        this.currentIndex = this.getParameter("index");
        this.currentFolder = this.findSubnavFolderByIndex(this.currentIndex);

        const page = this.getParameter("page");

        if (this.currentFolder) {
            const target = document.querySelector(`#${page}`);

            this.toggleActivePages(target);
            this.toggleActiveSubnav(this.currentIndex);
        } else {
            const target = document.querySelector("#flight-ops-home");

            this.toggleActivePages(target);
            this.toggleActiveSubnav(0);
        }
    },

    /**
     * Caching elements for quicker use
     * @param {Object} el the parent DOM element
     * @memberof subnav
     */
    cacheDOM (el) {
        this.parent = el.querySelector(".Index");
        this.subnavContainer = el.querySelector("#portal-sub-nav");
        this.subnavMobileToggle = el.querySelector("p");
        this.subnav = this.toArray(this.parent.querySelectorAll("#portal-sub-nav li"));
        this.indexPages = this.toArray(this.parent.querySelectorAll(".Index-page:not(#portal-sub-nav)"));
    },

    /**
     * For the history api that has no state stored
     * the first first imems in the subnav and index
     * will be made active. If however the url has
     * parameters, those items will be active
     * @memberof subnav
     */
    pushInitialState () {
        this.subnav[ 0 ].classList.add("active");
        this.indexPages[ 0 ].classList.add("active");
        history.pushState({ selector: "#flight-ops-home", index: 0 }, null, location.pathname + location.search);
    },

    /**
     * subscription events for binding listeners
     * @memberof subnav
     */
    subscriptions () {
        events.on("url-change", (data) => {
            if (data.state && data.state.selector) {
                const target = document.querySelector(data.state.selector);

                this.toggleActivePages(target);
                this.toggleActiveSubnav(data.state.index);
            }
        });
    },

    /**
     * finds the index value of the markdown list
     * @param {HTMLElement} el item in list element
     * @returns {Number}
     * @memberof subnav
     */
    findSubnavIndex (el) {
        let itemIndex = null;

        this.subnav.forEach((item, index) => {
            if (item.childNodes[ 0 ].data === el.childNodes[ 0 ].data) {
                itemIndex = index;
            }
        });

        return itemIndex;
    },

    /**
     * returns the value name when queried
     * with the index number of the subnav list
     * @param {Number} index index number
     * @private
     * @returns {String}
     */
    findSubnavFolderByIndex (index) {
        return this.slugify(this.subnav[ index ].childNodes[ 0 ].data);
    },

    /**
     * bind all DOM events for the subnav
     * @memberof subnav
     */
    bindEvents () {
        this.subnav.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                const selector = this.slugify(item.childNodes[ 0 ].data);
                const currTarget = e.currentTarget;
                let target = this.parent.querySelector(`#${selector}`);

                if (target) {
                    this.currentFolder = selector;
                    this.subnavContainer.classList.toggle("active");
                    this.currentIndex = this.findSubnavIndex(currTarget);

                    this.toggleActiveSubnav(this.currentIndex);
                    this.toggleActivePages(target);
                    history.pushState({
                        selector: `#${selector}`,
                        index: this.currentIndex
                    }, null, `/portal?page=${selector}&index=${this.currentIndex}`);
                } else {
                    if (window.innerWidth < 881) {
                        this.subnavContainer.classList.toggle("active");
                    }
                    target = this.parent.querySelector(`#${this.currentFolder}-${selector}`);
                    this.toggleActivePages(target);
                    history.pushState({
                        selector: `#${this.currentFolder}-${selector}`,
                        index: this.currentIndex
                    }, null, `/portal?page=${this.currentFolder}-${selector}&index=${this.currentIndex}`);
                }
                window.scrollTo(0, 0);
            });
        });
        this.subnavMobileToggle.addEventListener("click", () => {
            this.subnavContainer.classList.toggle("active");
        });
        window.addEventListener("popstate", (e) => {
            if (e.state) {
                events.emit("url-change", { state: e.state });
            } else {
                history.back();
            }
        });
    },

    /**
     * returns a string formatted to be used in the url
     * @param {String} text Any string
     * @private
     * @returns {String}
     */
    slugify (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/[^\w-]+/g, "") // Remove all non-word chars
            .replace(/^-+/, "") // Trim - from start of text
            .replace(/-+$/, "") // Trim - from end of text
            .replace(/---+/g, "-")
            .replace(/--+/g, "-");
    },

    /**
     * converts the DOM node list to a real array.
     * Useful for filtering, sorting, iterating etc.
     * @param {NodeList} list any DOM node list
     * @returns {Array}
     * @private
     */
    toArray (list) {
        return [].slice.call(list);
    },

    /**
     * makes a certain item in the subnav active
     * @param {Number} index number of subnav
     * @private
     */
    toggleActiveSubnav (index) {
        this.subnav.forEach((item) => {
            item.classList.remove("active");
        });

        this.subnav[ index ].classList.add("active");
    },

    /**
     * makes a certain page active within
     * the index.
     * @param {HTMLElement} page within the index
     * @private
     */

    toggleActivePages (page) {
        this.indexPages.forEach((item) => {
            item.classList.remove("active");
        });
        if (page) {
            page.classList.add("active");
        }
    }
};

export default subnav;