
// Tutorial - youtube.com/watch?v=9ynjM3c6nHk

const letterSpacing = getComputedStyle(
    document.querySelector(":root")
  ).getPropertyValue("--letter-spacing-x");
  
  var cursor = document.querySelector(".cursor");
  var cursorLink = document.querySelector(".link");
  var cursorIcon = document.querySelector(".icon");
  
  var iconMap = {
    Home: "fa-house",
    Services: "fa-bell",
    About: "fa-user",
    Contact: "fa-envelope"
  };
  
  document.addEventListener("mousemove", (event) => {
    cursor.style.left = event.clientX - cursor.offsetWidth / 2 + "px";
    cursor.style.top = event.clientY - cursor.offsetHeight / 2 + "px";
  
    cursor.classList.remove("active");
    cursorLink.innerHTML = "";
    cursorIcon.innerHTML = "";
  
    let elements = document.elementsFromPoint(event.clientX, event.clientY);
    elements.forEach((elem) => {
      if (elem.tagName == "A") {
        cursor.classList.add("active");
  
        elem.innerHTML.split("").forEach((letter, i) => {
          var circleLetter = document.createElement("div");
          circleLetter.classList.add("circle-letter");
          circleLetter.innerHTML = letter;
          circleLetter.style.transform = "rotate(" + i * letterSpacing + "deg)";
  
          var circleLetterBottom = document.createElement("div");
          circleLetterBottom.classList.add("circle-letter-bottom");
          circleLetterBottom.innerHTML = letter;
          circleLetter.appendChild(circleLetterBottom);
  
          cursorLink.appendChild(circleLetter);
        });
  
        if (iconMap[elem.innerHTML]) {
          var circleIcon = document.createElement("i");
          circleIcon.classList.add("fa");
          circleIcon.classList.add(iconMap[elem.innerHTML]);
          cursorIcon.appendChild(circleIcon);
        }
      }
    });
  });
  