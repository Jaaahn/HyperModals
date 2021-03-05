# HyperModals

HyperModals is a small library focused on making typical tasks like creating modals and UI notifications easy and fast.
It aims on providing an intuitive and stripped-down developer experience that allows for focusing on the task of creating a good app. You can start with the default configuration and later tweak the values to match your needs and the style of your application.

## Information

This library is still in development. Modals are now out in alpha.

## Important

-   Modals are in very early development! The API, looks and behaviour may change!
-   I might remove "light" theme option of notifications and rename them to "alerts".

# Developing

1. Fork & Clone the repository
2. Install dev dependencies `npm i`
3. Run live reload example server `npm run dev`
4. Build for production `npm run build`
5. Submit a pull-request

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

# Creating a Modal

## Simple example:

```html
<template id="template">
    <h2>This is my modal!</h2>
    <button data-hm-callback="test">Callback</button>
    <button data-hm-resolve>Just resolve</button>
    <button data-hm-reject>Just reject</button>
</template>
```

If you experience problems with the template tag, you can alternatively use a `<div class="hm-fallback">` tag. You must also set the `useDivFallback` option in the config to `true`.

```js
new HyperModals.Modal("#template", {
    callbacks: {
        test: function (resolve, reject, event) {
            console.log("Received test callback, resolving now");
            resolve("hello1");
            // resolve("hello1", "hello2")
            // => Would later print out ["hello1", "hello2"] inside the then function
            // => You can of course also resolve with the event as a parameter
        },
    },
})
    .then((arguments) => {
        // alert("Promise resolved");
        console.log(arguments); // => "hello1"
    })
    .catch((error) => {
        alert("Promise rejected");
        console.warn(error);
        // If you change resolve("hello1") to reject("hello1") in the test callback, than error would be "hello1"
    });
```

Or with async/await:

```js
try {
    let result = await new HyperModals.Modal("#template", {
        callbacks: {
            test: function (resolve, reject, event) {
                console.log("Received test callback, resolving now");
                resolve("hello1");
                // resolve("hello1", "hello2")
                // => Would later print out ["hello1", "hello2"]
                // => You can of course also resolve with the event as a parameter
            },
        },
    });

    console.log(result); // => "hello1"
} catch (error) {
    alert("Promise rejected");
    console.warn(error);
    // If you change resolve("hello1") to reject("hello1") in the test callback, then error would be "hello1"
}
```

## Parameters

| Option name  | Type   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| `templateId` | String | Query selector string of your template object |
| `config`     | Object | Your config (details below) OPTIONAL          |

## Config

| Option name      | Type   | Default value | Description                                                                              |
| ---------------- | ------ | ------------- | ---------------------------------------------------------------------------------------- |
| `element`        | String | `"body"`      | The DOM element where the Notification should be attached (works like you CSS selectors) |
| `bgColor`        | String | `""`          | CSS Color value as an easy way of switching the background color                         |
| `delay`          | Number | `0`           | The delay the modal will wait before appearing on the screen                             |
| `callbacks`      | Object | `{}`          | JS Object of callbacks, more details below                                               |
| `useDivFallback` | Bool   | `false`       | If you want to use a `div` instead of a `template` tag for your modal template           |

## Understanding callbacks

-   There are three types of callbacks that you can define using the datalist attribute. Essentially, the datalist lets you define custom html attributes, that start with "data-". We use these to fire our callbacks.
-   Inside of a callback, you can get three parameters, the resolve, the reject function and the click event that led to your callback. While calling the resolve or the reject function, you can pass multiple parameters. These parameters will then be available in `.then()` or `.catch()`. Mind you: due to technical restrictions, if passing multiple parameters to the resolve (or reject) function inside a callback, these will be put into an array and therefore passed as one parameter to the handler functions (See comments in the example above). If you pass only one parameter, no array will be used.
-   If the user clicks on the dedicated close button, the modal will fire the reject function.
-   By resolving or rejecting the promise, the modal will be closed automatically.

### Types of callbacks that are available:

-   `data-hm-callback="anyCallbackNameYouImagine"`
-   `data-hm-resolve`
-   `data-hm-reject`

(Examples can be found in the "simple example" section above).

### `data-hm-callback`

This one fires a callback from your callbacks object inside the config. So if you have `data-hm-callback="anyCallbackNameYouImagine"`, it will try to fire the `anyCallbackNameYouImagine` function which is hopefully definded in your config.
In the example above, the callback is named `"test"`.

### `data-hm-resolve`

This just resolves the promise (the one you can catch with `.then(function() {})`) with no parameter.

### `data-hm-reject`

Just rejects the promise (the one you can catch with `.catch(function() {})`) with no parameter.

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

# Custom CSS

Coming soon.
