# HyperModals

HyperModals is a small library focused on making typical tasks like creating modals and UI notifications easy and fast.
It aims on providing an intuitive and stripped-down developer experience that allows for focusing on the task of creating a good app. You can start with the default configuration and later tweak the values to match your needs and the style of your application.

## Disclaimer

This library is still in development. Only Notifications are currently available, but I will do my best to finish the modals ASAP 🙃.

# Developing

1. Fork & Clone the repository
2. Run live reload example server `npm run dev`
3. Build for production `npm run build`
4. Submit a pull-request

More info on how to contribute can be found in the [CONTRIBUTING.md](https://github.com/Jaaahn/HyperModals/blob/master/CONTRIBUTING.md) file.

# Installation via NPM

`npm i hyper-modals`

# Importing the Library

This is a UI library, please don't try this in node ;)

From CDN:  
`<script src="https://cdn.jsdelivr.net/npm/hyper-modals/dist/hyper-modals.min.js"></script>`  
Or go to [jsDelivr](https://www.jsdelivr.com/package/npm/hyper-modals) to view more options.

Or as a ES Module:  
`import HyperModals from "hyper-modals"`

# The config:

The config has several options wich are mainly opional (if not, there is a info in the detailed documentation and there will be an error message if necesarry in your JS console).  
Details on what options are available can be found in the detailed documentation of each modal type below.

# Creating a Notification

## Simple example:

```
let test = new HyperModals.Notification("Hello, how are you?", { theme: "dark" });
```

A more complex example can be found in `example/index.html`, we recommend running it with `npm run dev`.

## Parameters

| Option name | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| `text`      | String | The text you want to display         |
| `config`    | Object | Your config (details below) OPTIONAL |

## Config

| Option name | Type        | Default value | Description                                                                                                  |
| ----------- | ----------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `element`   | String      | `"body"`      | The DOM element where the Notification should be attached (works like you CSS selectors)                     |
| `icon`      | Object      | `{}`          | Can either contain a `class` or a `url` property. The url will be rendered in an `<img>` HTML Element        |
| `closeBtn`  | Boolean     | `true`        | Controls if a close button is shown or not                                                                   |
| `theme`     | String      | `"light"`     | `"light"` or `"dark"`. Mainly affects the background color (See below for more information about custom CSS) |
| `delay`     | Int (in ms) | `0`           | The delay the notification will wait before appearing on the screen                                          |
| `duration`  | Int (in ms) | `5000`        | Time the notification woll stay visible to the user                                                          |

# Creating a Modal

Coming soon. I try to finish this ASAP.

# Custom CSS

Coming soon.

# TODOS:

-   [ ] Add Modals
-   [ ] Add codepen (?) example to "creating a notification" / "simple example"
