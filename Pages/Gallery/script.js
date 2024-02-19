const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start,end,t) => start * (1-t) + end * t;

function updateScroll() {
  startY = lerp(startY,endY,easing);
  gallery.style.height = `${track.clientHeight}px`;
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();
  raf = requestAnimationFrame(updateScroll);
  if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}

function startScroll() {
  endY = window.scrollY; 
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const {top} = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
  activateParallax();
  startScroll();
}

window.addEventListener('load',updateScroll,false);
window.addEventListener('scroll',init,false);
window.addEventListener('resize',updateScroll,false);