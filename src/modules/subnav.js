import "../../stylesheets/subnav.less";

const subnav = {
    init (el) {
        this.cacheDOM(el);
        this.bindEvents();
        this.subnav[ 0 ].classList.add("active");
        this.indexPages[ 0 ].classList.add("active");
        console.log(this);
    },
    cacheDOM (el) {
        this.parent = el.querySelector(".Index");
        this.subnavContainer = el.querySelector("#portal-sub-nav");
        this.subnavMobileToggle = el.querySelector("p");
        this.subnav = this.toArray(this.parent.querySelectorAll("#portal-sub-nav li"));
        this.indexPages = this.toArray(this.parent.querySelectorAll(".Index-page:not(#portal-sub-nav)"));
    },
    bindEvents () {
        this.subnav.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                const selector = this.slugify(item.childNodes[ 0 ].data);
                let target = this.parent.querySelector(`#${selector}`);

                if (target) {
                    this.currentFolder = selector;
                    this.subnavContainer.classList.toggle("active");
                    this.toggleActiveSubnav(e.currentTarget);
                    this.toggleActivePages(target);
                } else {
                    target = this.parent.querySelector(`#${this.currentFolder}-${selector}`);
                    console.log(`#${this.currentFolder}-${selector}`);
                    this.toggleActivePages(target);
                }

                window.scrollTo(0, 0);
            });
        });
        this.subnavMobileToggle.addEventListener("click", () => {
            this.subnavContainer.classList.toggle("active");
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
    toggleActiveSubnav (el) {
        this.subnav.forEach((item) => {
            item.classList.remove("active");
        });
        el.classList.add("active");
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