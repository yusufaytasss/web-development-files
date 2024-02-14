// pages of content
const pages = [
	[
		"Carrot",
		"Tomato",
		"Broccoli",
		"Cucumber",
		"Spinach"
	],[
		"Potato",
		"Pepper",
		"Eggplant",
		"Lettuce",
		"Onion",
	], [
		"Zucchini",
		"Cauliflower",
		"Kale",
		"Cabbage",
		"Mushroom"
	], [
		"Asparagus",
		"Artichoke",
		"Radish",
		"Beet",
		"Okra"
	], [
		"Brussels Sprouts",
		"Green Bean",
		"Butternut Squash",
		"Turnip",
		"Chard",
	]
]
// important elements
const mainEl = document.querySelector(".vegetables")
const dotEl = document.querySelector(".selectordotanim")
let pageEls = []

// function to generate the elements of the pages of cards
function addcontent() {
	for (let page = 0; page < pages.length; page++) {
		const contentEl = document.createElement("div")
		contentEl.classList.add("page")
		contentEl.innerHTML = pages[page].map((item, index) => itemcard(item, index)).join("")
		contentEl.style.setProperty("--translate", page * 100 + "vh");
		mainEl.appendChild(contentEl)
		
		pageEls.push({box: undefined, content: contentEl})
	}
	
	for (let page = 0; page < pages.length; page++) {
		const boxEl = document.createElement("div")
		boxEl.classList.add("pagescroller")
		mainEl.appendChild(boxEl)
		
		pageEls[page].box = boxEl
	}
}

// elements for a single card
function itemcard(name, index) {
	return `
		<li style="transition: transform ${500 + index * 50}ms ease ${index * 10}ms">
			<div class="image"></div>
			<div class="name">${name}</div>
   		<div class="order">Buy now</div>
		</li>
	`
}

addcontent()


// scroll animations
let currentpage = 0
let prevscroll = 0;
mainEl.addEventListener("scroll", (event) => {
	// get the position of the elements on screen and the scroll position
	const mainBox = mainEl.getBoundingClientRect()
	const currentBox = pageEls[currentpage].box.getBoundingClientRect()
	const scrollamt = mainBox.top - pageEls[0].box.getBoundingClientRect().top
	// if the screen is scrolling to the next page below, start the transition
	if (currentBox.top + 5 < mainBox.top && scrollamt > prevscroll) {
		console.log("scrolled down")
		currentpage = Math.min(currentpage + Math.ceil((scrollamt - prevscroll) / mainBox.height), pageEls.length - 1)
		updatedot()
		for (let page = 0; page < pageEls.length; page++) {
			pageEls[page].content.style.setProperty('--translate', (page - currentpage) * 100 + "vh");
		}
	}
	// if the screen is scrolling to the previous page above, start the transition
	if (currentBox.top - 5 > mainBox.top && scrollamt < prevscroll) {
		console.log("scrolled up")
		currentpage = Math.max(currentpage - Math.ceil( -1 * (scrollamt - prevscroll) / mainBox.height), 0)
		updatedot()
		for (let page = 0; page < pageEls.length; page++) {
			pageEls[page].content.style.setProperty('--translate', (page - currentpage) * 100 + "vh");
		}
	}
	// update the last scroll position to keep track of the scrolling speed
	prevscroll = scrollamt
})

// functions that scroll to a certain page when the pagination buttons are clicked
function scrolltopage(page) {
	pageEls[page].box.scrollIntoView();
}
function previouspage() {
	if (currentpage == 0) {return}
	pageEls[currentpage - 1].box.scrollIntoView();
}
function nextpage() {
	if (currentpage == pages.length - 1) {return}
	pageEls[currentpage + 1].box.scrollIntoView();
}

// function that animates the orange dot when changing page
function updatedot() {
	dotEl.style.setProperty("--page", currentpage)
	dotEl.classList.add("pop")
	dotEl.addEventListener("animationend", () => dotEl.classList.remove("pop"))
}

/* Older attempt at animating the cards which didnt work well

mainEl.addEventListener("scroll", (event) => {
	const mainBox = mainEl.getBoundingClientRect()
	for (let page = 0; page < pageEls.length; page++) {
		// get the position of the page on screen between -1 (off screen above) and 1 (off screen below)
		const pageBox = pageEls[page].box.getBoundingClientRect()
		const relativepos = Math.min(Math.max(-1.0, (
			(pageBox.top - mainBox.top) / pageBox.height
		)), 1.0);
		
		// move the cards accordingly, in a staggered way 
		const contentEl = pageEls[page].content
		const cardEls = contentEl.children
		
		const animlength = 1;
		const animoffset = 0.2;
		
		// const relativelength = animlength / (animlength + animoffset * (cardEls.length - 1))
		// const relativeoffset = animoffset / (animlength + animoffset * (cardEls.length - 1))
		const relativelength = 0.6
		const relativeoffset = 0.1
		
		
		for (let card = 0; card < cardEls.length; card++) {
			// cardEls[card].style.transform = `translateY(${Math.sin(animprogress * Math.Pi * 0.5) * 100}%)`
			let animprogress = 0
			if (relativepos > 0) {
				animprogress = Math.max(1 - (((1 - relativepos) - relativeoffset * card) / relativelength), 0)
				cardEls[card].style.transform = `translateY(${(Math.cos(animprogress * Math.PI) - 1) * -50}vh)`
				console.log("transform", Math.cos(animprogress * Math.PI * 0.5) * -100)
			} else {
				translate = Math.min(animprogress, 0)
			}
		}
	}
})
*/