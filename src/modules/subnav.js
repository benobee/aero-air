import PubSub from "../core/pubsub";

const events = new PubSub();
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
    cacheDOM (el) {
        this.parent = el.querySelector(".Index");
        this.subnavContainer = el.querySelector("#portal-sub-nav");
        this.subnavMobileToggle = el.querySelector("p");
        this.subnav = this.toArray(this.parent.querySelectorAll("#portal-sub-nav li"));
        this.indexPages = this.toArray(this.parent.querySelectorAll(".Index-page:not(#portal-sub-nav)"));
    },
    pushInitialState () {
        this.subnav[ 0 ].classList.add("active");
        this.indexPages[ 0 ].classList.add("active");
        history.pushState({ selector: "#flight-ops-home", index: 0 }, null, location.pathname + location.search);
    },
    subscriptions () {
        events.on("url-change", (data) => {
            if (data.state && data.state.selector) {
                const target = document.querySelector(data.state.selector);

                this.toggleActivePages(target);
                this.toggleActiveSubnav(data.state.index);
            }
        });
    },
    findSubnavIndex (el) {
        let itemIndex = null;

        this.subnav.forEach((item, index) => {
            if (item.childNodes[ 0 ].data === el.childNodes[ 0 ].data) {
                itemIndex = index;
            }
        });

        return itemIndex;
    },
    findSubnavFolderByIndex (index) {
        return this.slugify(this.subnav[ index ].childNodes[ 0 ].data);
    },
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
    slugify (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/[^\w-]+/g, "") // Remove all non-word chars
            .replace(/^-+/, "") // Trim - from start of text
            .replace(/-+$/, "") // Trim - from end of text
            .replace(/---+/g, "-")
            .replace(/--+/g, "-");
    },
    toArray (list) {
        return [].slice.call(list);
    },
    toggleActiveSubnav (index) {
        this.subnav.forEach((item) => {
            item.classList.remove("active");
        });

        this.subnav[ index ].classList.add("active");
    },
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