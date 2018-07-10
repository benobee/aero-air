<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [App][1]
    -   [init][2]
    -   [registerAPIControllers][3]
-   [Controller][4]
    -   [elementIsActive][5]
        -   [Parameters][6]
    -   [watch][7]
        -   [Parameters][8]
-   [DOM][9]
    -   [findOne][10]
        -   [Parameters][11]
    -   [find][12]
        -   [Parameters][13]
-   [api][14]
    -   [Examples][15]
-   [Scrollmap][16]
-   [navbar][17]
    -   [Parameters][18]

## App

the main object for housing all
methods, events, and objects

### init

The main initializing method for
establishign pub / sub events

### registerAPIControllers

Method for registering controllers
throught the controller module

## Controller

Bind events to active DOM elements
through publish / subscribe

### elementIsActive

Tests whether the node is active in the DOM

#### Parameters

-   `query` **[String][19]** query selector

Returns **[HTMLElement][20]** DOM Node

### watch

emit event when the DOM element is active

#### Parameters

-   `array` **[Array][21]** list of nodes

## DOM

a simple DOM caching module

### findOne

returns only one element

#### Parameters

-   `query` **[String][19]** the dom selector

Returns **[HTMLElement][20]** 

### find

returns an a node list of all available elements

#### Parameters

-   `query` **[String][19]** the dom selector

Returns **[NodeList][22]** 

## api

callbacks will be executed whenever the particular element is 
detected inthe DOM. Using custom DOM element subscriber.

### Examples

```javascript
controller.on("navbar", (el) => {
  navbar.init();
});
```

## Scrollmap

using custom element in viewport detection library. 
Executes callbacks and adds data hooks for 
CSS manipulation

## navbar

Interaction events bound to the navbar
this module abstracted out of the api
module for readability

### Parameters

-   `parent` **[Element][23]** the root element bound to the controller

[1]: #app

[2]: #init

[3]: #registerapicontrollers

[4]: #controller

[5]: #elementisactive

[6]: #parameters

[7]: #watch

[8]: #parameters-1

[9]: #dom

[10]: #findone

[11]: #parameters-2

[12]: #find

[13]: #parameters-3

[14]: #api

[15]: #examples

[16]: #scrollmap

[17]: #navbar

[18]: #parameters-4

[19]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[20]: https://developer.mozilla.org/docs/Web/HTML/Element

[21]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[22]: https://developer.mozilla.org/docs/Web/API/NodeList

[23]: https://developer.mozilla.org/docs/Web/API/Element
