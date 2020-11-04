import "../src/Notification.scss";

// TODO: Clean up variables and names (also variable names to create consistent names)
// TODO: Add comments

export default class Notification {
    constructor(config) {
        this.element = config.element || "body";
        this.text = config.text;
        this.icon = config.icon || {};
        this.closeBtn = config.closeBtn || true;
        this.theme = config.theme || "light";
        this.delay = config.delay || 0;
        this.duration = config.duration || 1000 * 5;

        if (!this.text) {
            console.error("Error: config.text is undefined.");
            console.warn("Try something like this: \n\nlet modal = new ModalsNotification({ text: 'This is the displayed text' }); \n\nFor more info visit: GITHUB LINK COMING SOON");
            return;
        }

        this.notificationElement;
        this.present();
    }

    present() {
        setTimeout(() => this.create(), this.delay);
        this.closeTimeout = setTimeout(() => this.close(), this.delay + this.duration);
    }

    create() {
        // Create container / background
        let notification = document.createElement("div");
        notification.classList.add("modal-notification");
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
        this.notificationElement.classList.add("exit");
        setTimeout(() => {
            document.querySelector(this.element).removeChild(this.notificationElement);
        }, 1000 * 0.6);
    }
}
