import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import "../src/Modal.scss";

export default class Modal {
    constructor(templateId, config = {}) {
        // Store config and html in class
        this.template = document.querySelector(templateId);

        this.element = config.element || "body";
        this.bgColor = config.bgColor;
        this.delay = config.delay || 0;
        this.callbacks = config.callbacks || {};

        // Provide errors if non-optional values aren't given
        if (this.element == undefined) {
            console.error("Error: templateId param is undefined.");
            console.warn("Try something like this: \n\nlet modal = new HyperModals.Modal('#myModalTemplate'); \n\nFor more info visit: https://github.com/Jaaahn/HyperModals/");
            return;
        }

        // Init the variable where the modal's element will be stored
        this.modalElement;

        this.present();

        // Return promise to user
        return new Promise((resolve, reject) => {
            let instance = this;

            // Called by user for resolving promise => fires .then() listener
            this.resolvePromise = function () {
                instance.close();
                let args = Array.prototype.slice.call(arguments);

                // If only one parameter is provided, then don't pass that one as an array (Or don't pass any param if no param is provided)
                if (args.length == 1) {
                    resolve(args[0]);
                } else if (args.length == 0) {
                    resolve();
                } else {
                    resolve(args);
                }
            };

            // Called by user for rejecting promise => fires .catch() listener
            this.rejectPromise = function () {
                instance.close();
                let args = Array.prototype.slice.call(arguments);

                // If only one parameter is provided, then don't pass that one as an array (Or don't pass any param if no param is provided)
                if (args.length == 1) {
                    reject(args[0]);
                } else if (args.length == 0) {
                    reject();
                } else {
                    reject(args);
                }
            };
        });
    }

    present() {
        // Call create after timeout & call close after timeout
        setTimeout(() => this.create(), this.delay);
    }

    create() {
        // Create container
        let container = document.createElement("div");
        container.classList.add("hypermodals-modal-container");

        // Create modal / background
        let modal = document.createElement("div");
        modal.classList.add("hypermodals-modal");

        // Create close btn
        let closeBtn = document.createElement("button");
        closeBtn.classList.add("hypermodals-modal-closebtn");
        closeBtn.innerText = "X"; // TODO
        closeBtn.addEventListener("click", () => {
            this.rejectPromise({ code: "dismissed", message: "User dismissed modal" });
        });
        modal.appendChild(closeBtn);

        // Apply background color
        if (this.bgColor) {
            modal.style = "background-color:" + this.bgColor;
        }

        // Fill modal with provided template html
        let content = document.createElement("div");
        content.classList.add("hypermodals-modal-content");
        content.appendChild(this.template.content.cloneNode(true));

        // Stick elements together
        modal.appendChild(content);
        container.appendChild(modal);
        this.modalElement = container;
        disableBodyScroll(container);

        // Add callbacks
        modal.addEventListener("click", (event) => {
            event.stopPropagation();

            // Handle if using dedicated resolve & reject attributes
            if (event.target.dataset.hmResolve !== undefined) {
                this.resolvePromise();
                return;
            } else if (event.target.dataset.hmReject !== undefined) {
                this.rejectPromise();
                return;
            }

            // Proceed with any type of callbacks
            let callbackName = event.target.dataset.hmCallback;

            // In case the clicked element has no callback
            if (callbackName == undefined) {
                return;
            }

            let callback = this.callbacks[callbackName];

            // Check if callback exists
            if (callback == undefined) {
                console.error("Error: templateId param is undefined.");
                console.warn("Try something like this: \n\nlet modal = new HyperModals.Modal('#myModalTemplate'); \n\nFor more info visit: https://github.com/Jaaahn/HyperModals/");
                return;
            }

            // Execute callback
            callback(this.resolvePromise, this.rejectPromise, event);
        });

        // Append to DOM
        document.querySelector(this.element).appendChild(container);
    }

    close() {
        // Add animation class
        this.modalElement.children[0].classList.add("hypermodals-modal-exit");
        setTimeout(() => {
            document.querySelector(this.element).removeChild(this.modalElement);
            enableBodyScroll(this.modalElement);
        }, 1000 * 0.5);
    }
}
