# UI-Modal-Library

UI-Modal-Library is a small library focused on making typical tasks like creating modals and UI notifications easy and fast.
It aims on providing an intuitive and stripped-down developer experience that allows for focusing on the task of creating a good app. You can start with the default configuration and later tweak the values to match your needs and the style of your application.

And please help me find a better name for this ;)

# Developing

1. Fork & Clone the repository
2. Run live reload example server `npm run dev`
3. Build for production `npm run build`
4. Submit a pull-request

More info on how to contribute can be found in the [CONTRIBUTING.md](https://github.com/Jaaahn/UI-Modal-Library/blob/master/CONTRIBUTING.md) file.

# Installation / CDN Setup

`Coming soon`

# Importing the Library

This is a UI library, please don't try this in node ;)

From CDN:  
`<script src="CDN-LINK-COMMING-SOON/bundle.dev.js"></script>`

Or as a ES6 Module:  
`import UiModals from "ui-modal-library"`

# The config:

The config has several options wich are mainly opional (if not, there is a info in the detailed documentation and there will be an error message if necesarry in your JS console).  
Details on what options are available can be found in the detailed documentation of each modal type below.

# Creating a Notification

## Simple example:

```
let test = new UiModals.Notification("Hello, how are you?", { theme: "dark" });
```

A more complex example can be found in `example/index.html`, we recommend running it with `npm run dev`

## Parameters

-   `text` : String => The text you want to display
-   `config` : Object => Your config (details below)

## Config

-   `element` : String => The DOM element where the Notification should be attached (works like you CSS selectors)
-   `icon` : Object => Can either contain a `class` or a `url` property. The url will be rendered in an `<img>` HTML Element
-   `closeBtn` : Boolean => Controls if a close button is shown or not
-   `theme` : String `light` or `dark` => Mainly affects the background color (See below for more information about custom CSS)
-   `delay` : Int => The delay the notification will wait before appearing on the users screen
-   `duration` : Int => Time the notification will stay visible to the user

# TODOS:

-   [ ] Add Modals
-   [ ] Add codepen example to "creating a notification" / "simple example"
