import controller from "./core/controller";
import api from "./api/api";

/**
 * the main object for housing all
 * methods, events, and objects
 * @name App
 */
const App = {
    /**
     * The main initializing method
     * @event run pub/sub events
     * @memberof App
     */
    init() {
        // run subscription events
        this.api = api();
        // run publish events
        this.registerAPIControllers();
    },

    /**
     * Method for registering controllers
     * throught the controller module
     * @name registerAPIControllers
     * @event events are bound to the controller when
     * elements are found within the DOM.
     * @memberof App
     */
    registerAPIControllers() {
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

/**
 * waits for the DOM to beloaded before initializing
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});