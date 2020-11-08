
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HyperModals = factory());
}(this, (function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".hypermodals-notification {\n  border-radius: 20px;\n  padding: 15px;\n  display: inline-flex;\n  align-items: center;\n  width: auto;\n  left: 50vw;\n  position: fixed;\n  transform: translate(-50%, 20%);\n  top: 0;\n  z-index: 100;\n  animation-name: hypermodals-notification-enter;\n  animation-duration: 0.6s;\n  animation-timing-function: cubic-bezier(0.7, 0.01, 0.28, 1.29); }\n  .hypermodals-notification * {\n    font-size: 20px; }\n  .hypermodals-notification p,\n  .hypermodals-notification button,\n  .hypermodals-notification i,\n  .hypermodals-notification img {\n    margin: 0;\n    padding: 0; }\n  .hypermodals-notification i {\n    font-size: 30px;\n    margin-right: 30px; }\n  .hypermodals-notification img {\n    margin-right: 30px;\n    height: 50px;\n    width: 50px;\n    object-fit: cover; }\n  .hypermodals-notification p {\n    flex: 20; }\n  .hypermodals-notification button {\n    margin-left: 30px;\n    border: none;\n    height: 50px;\n    width: 50px;\n    border-radius: 15px;\n    transition: filter 0.3s ease-in-out;\n    cursor: pointer; }\n  .hypermodals-notification.hypermodals-notification-dark {\n    background-color: #323232;\n    color: white; }\n    .hypermodals-notification.hypermodals-notification-dark button {\n      background-color: #323232;\n      color: white;\n      filter: brightness(1.2); }\n      .hypermodals-notification.hypermodals-notification-dark button:hover {\n        filter: brightness(1.4); }\n  .hypermodals-notification.hypermodals-notification-light {\n    background-color: #f0f0f0;\n    color: #323232; }\n    .hypermodals-notification.hypermodals-notification-light button {\n      background-color: #f0f0f0;\n      color: #323232;\n      filter: brightness(0.95); }\n      .hypermodals-notification.hypermodals-notification-light button:hover {\n        filter: brightness(0.85); }\n  .hypermodals-notification.hypermodals-notification-exit {\n    animation-name: hypermodals-notification-exit;\n    animation-duration: 0.6s;\n    animation-timing-function: cubic-bezier(0.7, 0.01, 0.28, 1.29);\n    transform: translate(-50%, -120%); }\n\n@keyframes hypermodals-notification-enter {\n  from {\n    transform: translate(-50%, -120%); }\n  to {\n    transform: translate(-50%, 20%); } }\n\n@keyframes hypermodals-notification-exit {\n  from {\n    transform: translate(-50%, 20%); }\n  to {\n    transform: translate(-50%, -120%); } }\n";
  styleInject(css_248z);

  // TODO: Clean up variables and names (also variable names to create consistent names)

  class Notification {
      constructor(text, config = {}) {
          // Store config and text in class
          this.text = text;

          this.element = config.element || "body";
          this.icon = config.icon || {};
          this.closeBtn = config.closeBtn != undefined ? config.closeBtn : true; // This is a boolean value, so if closeBtn is false, it would automatically take the "default" value which would be true
          this.theme = config.theme || "light";
          this.delay = config.delay || 0;
          this.duration = config.duration || 1000 * 5;

          /* console.dir(config); */

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
          notification.classList.add("hypermodals-notification-" + this.theme);

          // Create main text
          let text = document.createElement("p");
          text.innerText = this.text;

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
          notification.appendChild(text);
          if (closeBtn) notification.appendChild(closeBtn);

          this.notificationElement = notification;

          // Append to DOM
          document.querySelector(this.element).appendChild(notification);
      }

      close() {
          // Add animation class
          this.notificationElement.classList.add("hypermodals-notification-exit");
          setTimeout(() => {
              document.querySelector(this.element).removeChild(this.notificationElement);
              clearTimeout(this.closeTimeout);
          }, 1000 * 0.6);
      }
  }

  var css_248z$1 = ".hypermodals-modal {\n  padding: 15px;\n  padding-top: 65px;\n  border-radius: 20px;\n  align-items: center;\n  z-index: 99;\n  background-color: #ffffff;\n  box-sizing: border-box;\n  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.1);\n  position: fixed;\n  transform: translate(-50%, -50%);\n  left: 50vw;\n  top: 50vh;\n  max-height: 80vh;\n  width: calc(100vw - 40px);\n  animation-name: hypermodals-modal-enter;\n  animation-duration: 0.5s;\n  /* animation-timing-function: cubic-bezier(0.1, 0, 0.58, 1); */\n  animation-timing-function: cubic-bezier(0.7, 0.01, 0.4, 1); }\n  .hypermodals-modal * {\n    font-size: 20px; }\n  .hypermodals-modal p,\n  .hypermodals-modal button,\n  .hypermodals-modal i,\n  .hypermodals-modal img {\n    margin: 0;\n    padding: 0; }\n  .hypermodals-modal .hypermodals-modal-closebtn {\n    position: absolute;\n    right: 15px;\n    top: 15px;\n    height: 50px;\n    width: 50px;\n    border-radius: 15px;\n    border: none;\n    transition: filter 0.3s ease-in-out;\n    cursor: pointer;\n    color: #323232;\n    background-color: #ffffff;\n    filter: brightness(0.97); }\n    .hypermodals-modal .hypermodals-modal-closebtn:hover {\n      filter: brightness(0.89); }\n  .hypermodals-modal .hypermodals-modal-content {\n    padding-top: 15px; }\n  .hypermodals-modal.hypermodals-modal-exit {\n    animation-name: hypermodals-modal-exit;\n    animation-duration: 0.6s;\n    animation-timing-function: cubic-bezier(0.7, 0.01, 0.28, 1.29);\n    transform: translate(-50%, -120%); }\n\n@keyframes hypermodals-modal-enter {\n  0% {\n    transform: translate(-50%, 50vh);\n    opacity: 0;\n    box-shadow: none; }\n  30% {\n    opacity: 0; }\n  100% {\n    transform: translate(-50%, -50%);\n    opacity: 1;\n    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.1); } }\n\n@keyframes hypermodals-modal-exit {\n  0% {\n    transform: translate(-50%, -50%);\n    opacity: 1;\n    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.1); }\n  70% {\n    opacity: 0; }\n  100% {\n    transform: translate(-50%, 50vh);\n    opacity: 0;\n    box-shadow: none; } }\n\n@media only screen and (min-width: 800px) {\n  .hypermodals-modal {\n    width: 80vw; } }\n\n@media only screen and (min-width: 1100px) {\n  .hypermodals-modal {\n    width: 60vw; } }\n\n@media only screen and (min-width: 1500px) {\n  .hypermodals-modal {\n    width: 800px; } }\n";
  styleInject(css_248z$1);

  // TODO: Clean up variables and names (also variable names to create consistent names)

  class Modal {
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

  var bundle = {
      Notification,
      Modal,
  };

  return bundle;

})));
