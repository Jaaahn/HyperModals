
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

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  // Older browsers don't support event options, feature detect it.

  // Adopted and modified solution from Bohdan Didukh (2017)
  // https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

  var hasPassiveEvents = false;
  if (typeof window !== 'undefined') {
    var passiveTestOptions = {
      get passive() {
        hasPassiveEvents = true;
        return undefined;
      }
    };
    window.addEventListener('testPassive', null, passiveTestOptions);
    window.removeEventListener('testPassive', null, passiveTestOptions);
  }

  var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


  var locks = [];
  var documentListenerAdded = false;
  var initialClientY = -1;
  var previousBodyOverflowSetting = void 0;
  var previousBodyPaddingRight = void 0;

  // returns true if `el` should be allowed to receive touchmove events.
  var allowTouchMove = function allowTouchMove(el) {
    return locks.some(function (lock) {
      if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
        return true;
      }

      return false;
    });
  };

  var preventDefault = function preventDefault(rawEvent) {
    var e = rawEvent || window.event;

    // For the case whereby consumers adds a touchmove event listener to document.
    // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
    // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
    // the touchmove event on document will break.
    if (allowTouchMove(e.target)) {
      return true;
    }

    // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
    if (e.touches.length > 1) return true;

    if (e.preventDefault) e.preventDefault();

    return false;
  };

  var setOverflowHidden = function setOverflowHidden(options) {
    // If previousBodyPaddingRight is already set, don't set it again.
    if (previousBodyPaddingRight === undefined) {
      var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
      var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

      if (_reserveScrollBarGap && scrollBarGap > 0) {
        previousBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = scrollBarGap + 'px';
      }
    }

    // If previousBodyOverflowSetting is already set, don't set it again.
    if (previousBodyOverflowSetting === undefined) {
      previousBodyOverflowSetting = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  };

  var restoreOverflowSetting = function restoreOverflowSetting() {
    if (previousBodyPaddingRight !== undefined) {
      document.body.style.paddingRight = previousBodyPaddingRight;

      // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
      // can be set again.
      previousBodyPaddingRight = undefined;
    }

    if (previousBodyOverflowSetting !== undefined) {
      document.body.style.overflow = previousBodyOverflowSetting;

      // Restore previousBodyOverflowSetting to undefined
      // so setOverflowHidden knows it can be set again.
      previousBodyOverflowSetting = undefined;
    }
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
  var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
    return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
  };

  var handleScroll = function handleScroll(event, targetElement) {
    var clientY = event.targetTouches[0].clientY - initialClientY;

    if (allowTouchMove(event.target)) {
      return false;
    }

    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
      // element is at the top of its scroll.
      return preventDefault(event);
    }

    if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
      // element is at the bottom of its scroll.
      return preventDefault(event);
    }

    event.stopPropagation();
    return true;
  };

  var disableBodyScroll = function disableBodyScroll(targetElement, options) {
    // targetElement must be provided
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
      return;
    }

    // disableBodyScroll must not have been called on this targetElement before
    if (locks.some(function (lock) {
      return lock.targetElement === targetElement;
    })) {
      return;
    }

    var lock = {
      targetElement: targetElement,
      options: options || {}
    };

    locks = [].concat(_toConsumableArray(locks), [lock]);

    if (isIosDevice) {
      targetElement.ontouchstart = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          initialClientY = event.targetTouches[0].clientY;
        }
      };
      targetElement.ontouchmove = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          handleScroll(event, targetElement);
        }
      };

      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = true;
      }
    } else {
      setOverflowHidden(options);
    }
  };

  var enableBodyScroll = function enableBodyScroll(targetElement) {
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
      return;
    }

    locks = locks.filter(function (lock) {
      return lock.targetElement !== targetElement;
    });

    if (isIosDevice) {
      targetElement.ontouchstart = null;
      targetElement.ontouchmove = null;

      if (documentListenerAdded && locks.length === 0) {
        document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = false;
      }
    } else if (!locks.length) {
      restoreOverflowSetting();
    }
  };

  var css_248z$1 = ".hypermodals-modal-container {\n  overflow: scroll;\n  width: 100vw;\n  height: 100vh;\n  position: absolute;\n  z-index: 99;\n  top: 0;\n  left: 0; }\n  .hypermodals-modal-container .hypermodals-modal {\n    padding: 25px;\n    padding-top: 65px;\n    border-radius: 20px;\n    align-items: center;\n    background-color: #ffffff;\n    box-sizing: border-box;\n    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);\n    position: relative;\n    transform: translate(-50%, 0%);\n    left: 50vw;\n    margin: 10vh 0;\n    width: Min(95%, 1000px);\n    animation-name: hypermodals-modal-enter;\n    animation-duration: 0.5s;\n    animation-timing-function: cubic-bezier(0.7, 0.01, 0.4, 1); }\n    .hypermodals-modal-container .hypermodals-modal p,\n    .hypermodals-modal-container .hypermodals-modal button,\n    .hypermodals-modal-container .hypermodals-modal i,\n    .hypermodals-modal-container .hypermodals-modal img {\n      margin: 0;\n      padding: 0; }\n    .hypermodals-modal-container .hypermodals-modal .hypermodals-modal-closebtn {\n      position: absolute;\n      right: 15px;\n      top: 15px;\n      height: 50px;\n      width: 50px;\n      border-radius: 15px;\n      border: none;\n      transition: filter 0.3s ease-in-out;\n      cursor: pointer;\n      color: #323232;\n      background-color: #ffffff;\n      filter: brightness(0.97);\n      font-size: 20px; }\n      .hypermodals-modal-container .hypermodals-modal .hypermodals-modal-closebtn:hover {\n        filter: brightness(0.89); }\n    .hypermodals-modal-container .hypermodals-modal .hypermodals-modal-content {\n      padding-top: 15px; }\n    .hypermodals-modal-container .hypermodals-modal.hypermodals-modal-exit {\n      animation-name: hypermodals-modal-exit;\n      animation-duration: 0.6s;\n      animation-timing-function: cubic-bezier(0.7, 0.01, 0.28, 1.29);\n      transform: translate(-50%, -120%); }\n\n@keyframes hypermodals-modal-enter {\n  0% {\n    transform: translate(-50%, 50vh);\n    opacity: 0;\n    box-shadow: none; }\n  30% {\n    opacity: 0; }\n  100% {\n    transform: translate(-50%, 0%);\n    opacity: 1;\n    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6); } }\n\n@keyframes hypermodals-modal-exit {\n  0% {\n    transform: translate(-50%, 0%);\n    opacity: 1;\n    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6); }\n  70% {\n    opacity: 0; }\n  100% {\n    transform: translate(-50%, 50vh);\n    opacity: 0;\n    box-shadow: none; } }\n";
  styleInject(css_248z$1);

  class Modal {
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

  var bundle = {
      Notification,
      Modal,
  };

  return bundle;

})));
