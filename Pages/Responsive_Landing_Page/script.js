// Tiny Slider

var slider = tns({
    container: ".slider",
    items: 3,
    speed: 500,
    mouseDrag: true,
    autoplay: false,
    center: true,
    loop: false,
    nav: false,
    controlsContainer: "#custom-control",
    controlsPosition: "bottom",
  });
  
  // ScrollReveal JS
  
  ScrollReveal({ distance: "30px", easing: "ease-in" });
  
  ScrollReveal().reveal(".title", {
    delay: 300,
    origin: "top",
  });
  
  ScrollReveal().reveal(".paragraph", {
    delay: 800,
    origin: "top",
  });
  
  ScrollReveal().reveal("#form", {
    delay: 1200,
    origin: "bottom",
  });
  
  // Form
  
  const emailId = document.getElementById("email-id");
  const error = document.getElementById("error");
  const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  //! get the cursor position in the input
  emailId.addEventListener("keyup", (e) => {
    console.log("Caret at: ", e.target.selectionStart);
  });
  
  //! show whether the email address is valid or not with an outline
  emailId.addEventListener("input", (e) => {
    const emailInputValue = e.currentTarget.value;
    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailInputValue) !=
      true
    ) {
      emailId.style.outline = "2px dotted rgb(117, 152, 242)";
    } else {
      emailId.style.outline = "2px dotted rgb(118, 167, 63)";
    }
  });
  
  //! if email address is empty, remove the outline from the input
  function checkEmpty() {
    if (emailId.value == "") {
      emailId.style.outline = "none";
    }
  }
  
  //! submit the email address
  form.addEventListener("submit", (e) => {
    if (emailId.value.match(mailRegex)) {
      e.preventDefault();
      form.innerHTML = `<p style="font-size: 2rem; font-weight: 500; color: rgb(118, 167, 63);">Subscribed! 🎉</p>`;
       // setTimeout("location.reload(true);", 2000);
      setTimeout(() => { 
        window.location.href = "#card-container";
  }, 1700);
    } else {
      e.preventDefault();
      alert("Oops! Please check your email");
    }
  });
  
  //! typing animation for the placeholder
  let i = 0;
  let placeholder = "";
  const txt = "example@domain.com";
  const speed = 150;
  
  setTimeout(() => {
    type();
  }, 1600);
  
  function type() {
    placeholder += txt.charAt(i);
    emailId.setAttribute("placeholder", placeholder);
    i++;
    setTimeout(type, speed);
  }
  
  // Vanilla-Tilt JS
  
  var VanillaTilt = (function () {
    "use strict";
  
    /**
     * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
     * Original idea: https://github.com/gijsroge/tilt.js
     * MIT License.
     * Version 1.8.1
     */
  
    class VanillaTilt {
      constructor(element, settings = {}) {
        if (!(element instanceof Node)) {
          throw (
            "Can't initialize VanillaTilt because " + element + " is not a Node."
          );
        }
  
        this.width = null;
        this.height = null;
        this.clientWidth = null;
        this.clientHeight = null;
        this.left = null;
        this.top = null;
  
        // for Gyroscope sampling
        this.gammazero = null;
        this.betazero = null;
        this.lastgammazero = null;
        this.lastbetazero = null;
  
        this.transitionTimeout = null;
        this.updateCall = null;
        this.event = null;
  
        this.updateBind = this.update.bind(this);
        this.resetBind = this.reset.bind(this);
  
        this.element = element;
        this.settings = this.extendSettings(settings);
  
        this.reverse = this.settings.reverse ? -1 : 1;
        this.resetToStart = VanillaTilt.isSettingTrue(
          this.settings["reset-to-start"]
        );
        this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
        this.glarePrerender = VanillaTilt.isSettingTrue(
          this.settings["glare-prerender"]
        );
        this.fullPageListening = VanillaTilt.isSettingTrue(
          this.settings["full-page-listening"]
        );
        this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
        this.gyroscopeSamples = this.settings.gyroscopeSamples;
  
        this.elementListener = this.getElementListener();
  
        if (this.glare) {
          this.prepareGlare();
        }
  
        if (this.fullPageListening) {
          this.updateClientSize();
        }
  
        this.addEventListeners();
        this.reset();
  
        if (this.resetToStart === false) {
          this.settings.startX = 0;
          this.settings.startY = 0;
        }
      }
  
      static isSettingTrue(setting) {
        return setting === "" || setting === true || setting === 1;
      }
  
      /**
       * Method returns element what will be listen mouse events
       * @return {Node}
       */
      getElementListener() {
        if (this.fullPageListening) {
          return window.document;
        }
  
        if (typeof this.settings["mouse-event-element"] === "string") {
          const mouseEventElement = document.querySelector(
            this.settings["mouse-event-element"]
          );
  
          if (mouseEventElement) {
            return mouseEventElement;
          }
        }
  
        if (this.settings["mouse-event-element"] instanceof Node) {
          return this.settings["mouse-event-element"];
        }
  
        return this.element;
      }
  
      /**
       * Method set listen methods for this.elementListener
       * @return {Node}
       */
      addEventListeners() {
        this.onMouseEnterBind = this.onMouseEnter.bind(this);
        this.onMouseMoveBind = this.onMouseMove.bind(this);
        this.onMouseLeaveBind = this.onMouseLeave.bind(this);
        this.onWindowResizeBind = this.onWindowResize.bind(this);
        this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);
  
        this.elementListener.addEventListener(
          "mouseenter",
          this.onMouseEnterBind
        );
        this.elementListener.addEventListener(
          "mouseleave",
          this.onMouseLeaveBind
        );
        this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);
  
        if (this.glare || this.fullPageListening) {
          window.addEventListener("resize", this.onWindowResizeBind);
        }
  
        if (this.gyroscope) {
          window.addEventListener(
            "deviceorientation",
            this.onDeviceOrientationBind
          );
        }
      }
  
      /**
       * Method remove event listeners from current this.elementListener
       */
      removeEventListeners() {
        this.elementListener.removeEventListener(
          "mouseenter",
          this.onMouseEnterBind
        );
        this.elementListener.removeEventListener(
          "mouseleave",
          this.onMouseLeaveBind
        );
        this.elementListener.removeEventListener(
          "mousemove",
          this.onMouseMoveBind
        );
  
        if (this.gyroscope) {
          window.removeEventListener(
            "deviceorientation",
            this.onDeviceOrientationBind
          );
        }
  
        if (this.glare || this.fullPageListening) {
          window.removeEventListener("resize", this.onWindowResizeBind);
        }
      }
  
      destroy() {
        clearTimeout(this.transitionTimeout);
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
  
        this.element.style.willChange = "";
        this.element.style.transition = "";
        this.element.style.transform = "";
        this.resetGlare();
  
        this.removeEventListeners();
        this.element.vanillaTilt = null;
        delete this.element.vanillaTilt;
  
        this.element = null;
      }
  
      onDeviceOrientation(event) {
        if (event.gamma === null || event.beta === null) {
          return;
        }
  
        this.updateElementPosition();
  
        if (this.gyroscopeSamples > 0) {
          this.lastgammazero = this.gammazero;
          this.lastbetazero = this.betazero;
  
          if (this.gammazero === null) {
            this.gammazero = event.gamma;
            this.betazero = event.beta;
          } else {
            this.gammazero = (event.gamma + this.lastgammazero) / 2;
            this.betazero = (event.beta + this.lastbetazero) / 2;
          }
  
          this.gyroscopeSamples -= 1;
        }
  
        const totalAngleX =
          this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
        const totalAngleY =
          this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
  
        const degreesPerPixelX = totalAngleX / this.width;
        const degreesPerPixelY = totalAngleY / this.height;
  
        const angleX =
          event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
        const angleY =
          event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
  
        const posX = angleX / degreesPerPixelX;
        const posY = angleY / degreesPerPixelY;
  
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
  
        this.event = {
          clientX: posX + this.left,
          clientY: posY + this.top,
        };
  
        this.updateCall = requestAnimationFrame(this.updateBind);
      }
  
      onMouseEnter() {
        this.updateElementPosition();
        this.element.style.willChange = "transform";
        this.setTransition();
      }
  
      onMouseMove(event) {
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
  
        this.event = event;
        this.updateCall = requestAnimationFrame(this.updateBind);
      }
  
      onMouseLeave() {
        this.setTransition();
  
        if (this.settings.reset) {
          requestAnimationFrame(this.resetBind);
        }
      }
  
      reset() {
        this.onMouseEnter();
  
        if (this.fullPageListening) {
          this.event = {
            clientX:
              ((this.settings.startX + this.settings.max) /
                (2 * this.settings.max)) *
              this.clientWidth,
            clientY:
              ((this.settings.startY + this.settings.max) /
                (2 * this.settings.max)) *
              this.clientHeight,
          };
        } else {
          this.event = {
            clientX:
              this.left +
              ((this.settings.startX + this.settings.max) /
                (2 * this.settings.max)) *
                this.width,
            clientY:
              this.top +
              ((this.settings.startY + this.settings.max) /
                (2 * this.settings.max)) *
                this.height,
          };
        }
  
        let backupScale = this.settings.scale;
        this.settings.scale = 1;
        this.update();
        this.settings.scale = backupScale;
        this.resetGlare();
      }
  
      resetGlare() {
        if (this.glare) {
          this.glareElement.style.transform =
            "rotate(180deg) translate(-50%, -50%)";
          this.glareElement.style.opacity = "0";
        }
      }
  
      getValues() {
        let x, y;
  
        if (this.fullPageListening) {
          x = this.event.clientX / this.clientWidth;
          y = this.event.clientY / this.clientHeight;
        } else {
          x = (this.event.clientX - this.left) / this.width;
          y = (this.event.clientY - this.top) / this.height;
        }
  
        x = Math.min(Math.max(x, 0), 1);
        y = Math.min(Math.max(y, 0), 1);
  
        let tiltX = (
          this.reverse *
          (this.settings.max - x * this.settings.max * 2)
        ).toFixed(2);
        let tiltY = (
          this.reverse *
          (y * this.settings.max * 2 - this.settings.max)
        ).toFixed(2);
        let angle =
          Math.atan2(
            this.event.clientX - (this.left + this.width / 2),
            -(this.event.clientY - (this.top + this.height / 2))
          ) *
          (180 / Math.PI);
  
        return {
          tiltX: tiltX,
          tiltY: tiltY,
          percentageX: x * 100,
          percentageY: y * 100,
          angle: angle,
        };
      }
  
      updateElementPosition() {
        let rect = this.element.getBoundingClientRect();
  
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = rect.left;
        this.top = rect.top;
      }
  
      update() {
        let values = this.getValues();
  
        this.element.style.transform =
          "perspective(" +
          this.settings.perspective +
          "px) " +
          "rotateX(" +
          (this.settings.axis === "x" ? 0 : values.tiltY) +
          "deg) " +
          "rotateY(" +
          (this.settings.axis === "y" ? 0 : values.tiltX) +
          "deg) " +
          "scale3d(" +
          this.settings.scale +
          ", " +
          this.settings.scale +
          ", " +
          this.settings.scale +
          ")";
  
        if (this.glare) {
          this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
          this.glareElement.style.opacity = `${
            (values.percentageY * this.settings["max-glare"]) / 100
          }`;
        }
  
        this.element.dispatchEvent(
          new CustomEvent("tiltChange", {
            detail: values,
          })
        );
  
        this.updateCall = null;
      }
  
      /**
       * Appends the glare element (if glarePrerender equals false)
       * and sets the default style
       */
      prepareGlare() {
        // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
        if (!this.glarePrerender) {
          // Create glare element
          const jsTiltGlare = document.createElement("div");
          jsTiltGlare.classList.add("js-tilt-glare");
  
          const jsTiltGlareInner = document.createElement("div");
          jsTiltGlareInner.classList.add("js-tilt-glare-inner");
  
          jsTiltGlare.appendChild(jsTiltGlareInner);
          this.element.appendChild(jsTiltGlare);
        }
  
        this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
        this.glareElement = this.element.querySelector(".js-tilt-glare-inner");
  
        if (this.glarePrerender) {
          return;
        }
  
        Object.assign(this.glareElementWrapper.style, {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          "pointer-events": "none",
          "border-radius": "inherit",
        });
  
        Object.assign(this.glareElement.style, {
          position: "absolute",
          top: "50%",
          left: "50%",
          "pointer-events": "none",
          "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
          transform: "rotate(180deg) translate(-50%, -50%)",
          "transform-origin": "0% 0%",
          opacity: "0",
        });
  
        this.updateGlareSize();
      }
  
      updateGlareSize() {
        if (this.glare) {
          const glareSize =
            (this.element.offsetWidth > this.element.offsetHeight
              ? this.element.offsetWidth
              : this.element.offsetHeight) * 2;
  
          Object.assign(this.glareElement.style, {
            width: `${glareSize}px`,
            height: `${glareSize}px`,
          });
        }
      }
  
      updateClientSize() {
        this.clientWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
  
        this.clientHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
      }
  
      onWindowResize() {
        this.updateGlareSize();
        this.updateClientSize();
      }
  
      setTransition() {
        clearTimeout(this.transitionTimeout);
        this.element.style.transition =
          this.settings.speed + "ms " + this.settings.easing;
        if (this.glare)
          this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
  
        this.transitionTimeout = setTimeout(() => {
          this.element.style.transition = "";
          if (this.glare) {
            this.glareElement.style.transition = "";
          }
        }, this.settings.speed);
      }
  
      extendSettings(settings) {
        let defaultSettings = {
          reverse: false,
          max: 10,
          startX: 0,
          startY: 0,
          perspective: 1000,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          scale: 1,
          speed: 300,
          transition: true,
          axis: null,
          glare: false,
          "max-glare": 1,
          "glare-prerender": false,
          "full-page-listening": false,
          "mouse-event-element": null,
          reset: true,
          "reset-to-start": true,
          gyroscope: true,
          gyroscopeMinAngleX: -45,
          gyroscopeMaxAngleX: 45,
          gyroscopeMinAngleY: -45,
          gyroscopeMaxAngleY: 45,
          gyroscopeSamples: 10,
        };
  
        let newSettings = {};
        for (var property in defaultSettings) {
          if (property in settings) {
            newSettings[property] = settings[property];
          } else if (this.element.hasAttribute("data-tilt-" + property)) {
            let attribute = this.element.getAttribute("data-tilt-" + property);
            try {
              newSettings[property] = JSON.parse(attribute);
            } catch (e) {
              newSettings[property] = attribute;
            }
          } else {
            newSettings[property] = defaultSettings[property];
          }
        }
  
        return newSettings;
      }
  
      static init(elements, settings) {
        if (elements instanceof Node) {
          elements = [elements];
        }
  
        if (elements instanceof NodeList) {
          elements = [].slice.call(elements);
        }
  
        if (!(elements instanceof Array)) {
          return;
        }
  
        elements.forEach((element) => {
          if (!("vanillaTilt" in element)) {
            element.vanillaTilt = new VanillaTilt(element, settings);
          }
        });
      }
    }
  
    if (typeof document !== "undefined") {
      /* expose the class to window */
      window.VanillaTilt = VanillaTilt;
  
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    }
  
    return VanillaTilt;
  })();
  