const navbar = (parent) => {
    // convert nodelist to array and cache the nav items
    const navItems = [].slice.call(parent.querySelectorAll(".Header-nav-item"));
    const megaNavItems = [].slice.call(parent.querySelectorAll(".Mega-menu-nav-item"));

    // toggle classnames for an elements in an element list
    const activeState = (nodeList, className, bool) => {
        nodeList.forEach((item) => {
            if (bool) {
                item.classList.add(className);
            } else {
                item.classList.remove(className);
            }
        });
    };

    // binds the mouse interaction with enter and leave
    // looks for the the same index from diffent nav elements
    const listen = (el) => {
        el.addEventListener("mouseenter", (e) => {
            const index = e.currentTarget.dataset.index;

            if (index) {
                activeState(navItems, "active", false);
                activeState(megaNavItems, "active", false);
                navItems[ index - 1 ].classList.add("active");
                megaNavItems[ index - 1 ].classList.add("active");
            }
        });
        el.addEventListener("mouseleave", () => {
            activeState(navItems, "active", false);
            activeState(megaNavItems, "active", false);
        });
    };

    // bind event listeners in the nav for displaying
    // the active classname. Needs to happen since, the
    // mega menu isn't a child element.
    navItems.forEach((item) => {
        listen(item);
    });
    megaNavItems.forEach((item) => {
        listen(item);
    });
};

export default navbar;