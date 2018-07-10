import controller from "./core/controller";
import api from "./api/api";

const App = {
    /**
     * @name init
     * @event run pub/sub events
     * @memberof App
     */
    init () {
        // run subscription events
        this.api = api();
        // run publish events
        this.registerAPIControllers();
    },

    //
    /**
     * @name registerAPIControllers
     * @event events are bound to the controller when
     * elements are found within the DOM.
     * @memberof App
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