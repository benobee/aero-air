import controller from "../core/controller";
import navbar from "../modules/navbar";
import subnav from "../modules/subnav";
import Scrollmap from "scrollmap";

/**
 * callbacks will be executed whenever the particular element is
 * detected inthe DOM. Using custom DOM element subscriber.
 * @name api
 * @example
 * controller.on("navbar", (el) => {
 *   navbar.init();
 * });
 */
const api = () => {
  controller.on("navbar", (parent) => {
    // abstracted for readability
    navbar(parent);
  });
  controller.on("portal", (parent) => {
    subnav.init(parent);
  });
  controller.on("homepage", () => {
    /**
     * uses custom element in viewport detection library.
     * Executes callbacks and adds data hooks for
     * CSS manipulation
     * @module Scrollmap
     */
    Scrollmap.trigger({
      target: ".Index-page--has-image:not(#intro)",
      surfaceVisible: 0.75
    });
  });
};

export default api;