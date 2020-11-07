import "../src/Notification.scss";

// TODO: Clean up variables and names (also variable names to create consistent names)

export default class Notification {
    constructor(text, config = {}) {
        // Store config and text in class
        this.text = text;

        this.element = config.element || "body";
        this.icon = config.icon || {};
        this.closeBtn = config.closeBtn != undefined ? config.closeBtn : true; // This is a boolean value, so if closeBtn is false, it would automatically take the "default" value which would be true
        this.theme = config.theme || "light";
        this.delay = config.delay || 0;
        this.duration = config.duration || 1000 * 5;

        console.dir(config);

        // Provide errors if non-optional values aren't given
        if (!this.text) {
            console.error("Error: text param is undefined.");
            console.warn("Try something like this: \n\nlet modal = new HyperModals.Notification('This ist the displayed text', { theme: 'dark' }); \n\nFor more info visit: https://github.com/Jaaahn/HyperModals/");
            return;
        }

        // Init the variable where the html will be strore
        this.notificationElement;

        this.present();
    }

    present() {
        // Call create after timeout & call close after timeout
        setTimeout(() => this.create(), this.delay);
        this.closeTimeout = setTimeout(() => this.close(), this.delay + this.duration);
    }

    create() {
        // Create container / background
        let notification = document.createElement("div");
        notification.classList.add("hypermodals-notification");
        notification.classList.add(this.theme);

        // Create main text
        let text = document.createElement("p");
        text.innerText = this.text;

        // Create icon if specified
        let icon;
        if (icon) {
            if (this.icon.hasOwnProperty("url")) {
                icon = document.createElement("img");
                icon.src = this.icon.url;
            } else if (this.icon.hasOwnProperty("class")) {
                icon = document.createElement("i");
                x;
                this.icon.class.split(" ").forEach((e) => icon.classList.add(e));
            }
        }

        // Create close btn if specified
        let closeBtn;
        if (this.closeBtn) {
            closeBtn = document.createElement("button");
            closeBtn.innerText = "X";
            closeBtn.addEventListener("click", () => {
                this.close();
                clearTimeout(this.closeTimeout);
            });
        }

        // Add Elements to Container
        if (icon) notification.appendChild(icon);
        notification.appendChild(text);
        if (closeBtn) notification.appendChild(closeBtn);

        this.notificationElement = notification;

        // Append to DOM
        document.querySelector(this.element).appendChild(notification);
    }

    close() {
        // Add animation class
        this.notificationElement.classList.add("exit");
        setTimeout(() => {
            document.querySelector(this.element).removeChild(this.notificationElement);
            clearTimeout(this.closeTimeout);
        }, 1000 * 0.6);
    }
}
