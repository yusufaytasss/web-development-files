var splitText = new SplitText("h1", { type: "chars" });

var tl = gsap.timeline();

tl.from(splitText.chars, {
  duration: 0.5,
  opacity: 0,
  stagger: 0.125,
  ease: "power1. In"
});


//Header animation
setTimeout(function () {
  var header = document.getElementById("main-header1");
  header.style.top = "0px";
}, 100);

setTimeout(function () {
  var header = document.getElementById("main-header2");
  header.style.top = "0px";
}, 500);

setTimeout(function () {
  var header = document.getElementById("main-header3");
  header.style.top = "0px";
}, 900);

setTimeout(function () {
  var header = document.getElementById("bottom-header");
  header.style.bottom = "26%";
}, 200);



//Image slidein animation
setTimeout(function () {
  var image1 = document.getElementById("image1-js");
  image1.style.right = "0px";

  
  
  
  //var image2 = document.getElementById("image2-js");
  //image2.style.left = "0px";
  
  

  
}, 1200);