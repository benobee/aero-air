import controller from "./core/controller";
import api from "./api/api";

const App = {
    init () {
        this.api = api();
        this.registerAPIControllers();
    },

    /**
     * events are bound to the controller when
     * elements are found within the DOM.
     */
    registerAPIControllers () {
        controller.watch([{
                name: "navbar",
                el: ".Header.Header--top"
            },
            {
                name: "homepage",
                el: "#collection-5b3a7db62b6a28e875d2d759"
            }
        ]);
    }
};

// on dom content load
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});