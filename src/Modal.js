import "../src/Modal.scss";

// TODO: Clean up variables and names (also variable names to create consistent names)

export default class Modal {
    constructor(html, config = {}) {
        // Store config and html in class
        this.html = html;

        this.element = config.element || "body";
        this.bgColor = config.bgColor; // TODO: Change default color
        this.delay = config.delay || 0;

        console.dir(config);

        // Provide errors if non-optional values aren't given
        if (!this.html) {
            console.error("Error: html param is undefined.");
            console.warn("Try something like this: \n\nlet modal = new HyperModals.Modal('<p>This is a basic modal</p>', { theme: 'dark' }); \n\nFor more info visit: https://github.com/Jaaahn/HyperModals/");
            return;
        }

        // Init the variable where the html will be strore
        this.modalElement;

        this.present();
    }

    present() {
        // Call create after timeout & call close after timeout
        setTimeout(() => this.create(), this.delay);
    }

    create() {
        // Create container / background
        let modal = document.createElement("div");
        modal.classList.add("hypermodals-modal");

        // Create close btn
        let closeBtn = document.createElement("button");
        closeBtn.classList.add("hypermodals-modal-closebtn");
        closeBtn.innerText = "X";
        closeBtn.addEventListener("click", () => {
            this.close();
        });
        modal.appendChild(closeBtn);

        // Apply background color
        if (this.bgColor) {
            modal.style = "background-color:" + this.bgColor;
        }

        // Fill modal with provided html
        let content = document.createElement("div");
        content.classList.add("hypermodals-modal-content");
        content.innerHTML = this.html;
        modal.appendChild(content);

        this.modalElement = modal;

        // Append to DOM
        document.querySelector(this.element).appendChild(modal);
    }

    close() {
        // Add animation class
        this.modalElement.classList.add("hypermodals-modal-exit");
        setTimeout(() => {
            document.querySelector(this.element).removeChild(this.modalElement);
        }, 1000 * 0.5);
    }
}
