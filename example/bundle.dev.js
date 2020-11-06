
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UiModals = factory());
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

  var css_248z = ".uimodals-notification {\n  border-radius: 20px;\n  padding: 15px;\n  display: inline-flex;\n  align-items: center;\n  width: auto;\n  left: 50vw;\n  position: fixed;\n  transform: translate(-50%, 20%);\n  top: 0;\n  z-index: 100;\n  animation-name: uimodals-notification-enter;\n  animation-duration: 0.6s;\n  animation-timing-function: cubic-bezier(0.7, 0.01, 0.28, 1.29); }\n  .uimodals-notification * {\n    font-size: 20px; }\n  .uimodals-notification p,\n  .uimodals-notification button,\n  .uimodals-notification i,\n  .uimodals-notification img {\n    margin: 0;\n    padding: 0; }\n  .uimodals-notification i {\n    font-size: 30px;\n    margin-right: 30px; }\n  .uimodals-notification img {\n    margin-right: 30px;\n    height: 50px;\n    width: 50px;\n    object-fit: cover; }\n  .uimodals-notification p {\n    flex: 20; }\n  .uimodals-notification button {\n    margin-left: 30px;\n    border: none;\n    height: 50px;\n    width: 50px;\n    border-radius: 15px;\n    transition: filter 0.3s ease-in-out;\n    cursor: pointer; }\n  .uimodals-notification.dark {\n    background-color: #323232;\n    color: white; }\n    .uimodals-notification.dark button {\n      background-color: #323232;\n      color: white;\n      filter: brightness(1.2); }\n      .uimodals-notification.dark button:hover {\n        filter: brightness(1.4); }\n  .uimodals-notification.light {\n    background-color: #f0f0f0;\n    color: #323232; }\n    .uimodals-notification.light button {\n      background-color: #f0f0f0;\n      filter: brightness(0.95);\n      color: #323232; }\n      .uimodals-notification.light button:hover {\n        filter: brightness(0.85); }\n  .uimodals-notification.exit {\n    animation-name: uimodals-notification-exit;\n    animation-duration: 0.6s;\n    animation-timing-function: cubic-bezier(0.7, 0.01, 0.28, 1.29);\n    transform: translate(-50%, -120%); }\n\n@keyframes uimodals-notification-enter {\n  from {\n    transform: translate(-50%, -120%); }\n  to {\n    transform: translate(-50%, 20%); } }\n\n@keyframes uimodals-notification-exit {\n  from {\n    transform: translate(-50%, 20%); }\n  to {\n    transform: translate(-50%, -120%); } }\n";
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

          console.dir(config);

          // Provide errors if non-optional values aren't given
          if (!this.text) {
              console.error("Error: config.text is undefined.");
              console.warn("Try something like this: \n\nlet modal = new ModalsNotification({ text: 'This is the displayed text' }); \n\nFor more info visit: https://github.com/Jaaahn/UI-Modal-Library/");
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
          notification.classList.add("uimodals-notification");
          notification.classList.add(this.theme);

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
          this.notificationElement.classList.add("exit");
          setTimeout(() => {
              document.querySelector(this.element).removeChild(this.notificationElement);
              clearTimeout(this.closeTimeout);
          }, 1000 * 0.6);
      }
  }

  class Modal {
      constructor() {
          console.log("This is a modal");
      }
  }

  var bundle = {
      Notification,
      Modal,
  };

  return bundle;

})));
