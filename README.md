# UI-Modal-Library

UI-Modal-Library is a small library focused on making common tasks like creating modals and UI notifications easy and fast.

# Installation / CDN Setup

Coming soon

# Developing

1. Install the dependencies `npm i`
2. Run live reload example server `npm run dev`
3. Build for production `npm run build`

# The config object:

The config object is the attribute that you pass to the class when creating a new instance.  
The config has several options wich are mainly opional.  
Details on what options are available can be found in the detailed documentation of each modal type below.

# Creating a Notification

## Simple example:

```
let test = new UiModals.Notification({
    text: "Hello, how are you?",
});
```

## Config object

-   `element` => The DOM element where the Notification should be attached
-   `text` => The Text that should be displayed in the notification (NOT optional)
-   `icon` => JavaScript Object which can either contain a `class` or a `url` property. The url will be rendered in a `<img>` HTML Element
-   `closeBtn` => Boolean, controls if a close button is shown or not
-   `theme` => `light` or `dark`. Mainly affects the background color (See below for more information about custom CSS)
-   `delay` => The delay the notification will wait before appearing on the users screen
-   `duration` => Time the notification will stay visible to the user

# TODOS:

-   [ ] Add Modals