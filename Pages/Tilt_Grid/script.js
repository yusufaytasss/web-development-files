document.addEventListener("DOMContentLoaded", function () {
	const heroGrid = document.querySelector(".tiltgrid");
	const hero = document.querySelector(".hero");
	const tiltDegree = 7;
	function isElementInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.bottom > 0 &&
			rect.right > 0 &&
			rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
			rect.top < (window.innerHeight || document.documentElement.clientHeight)
		);
	}
	function mapRange(value, inMin, inMax, outMin, outMax) {
		return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	}
	function updateScrollPos() {
		const scrollPos = window.scrollY;
		const rect = heroGrid.getBoundingClientRect();
		const scrollPercent = (scrollPos * 100) / rect.height;

		let mappedValue = mapRange(scrollPercent, 0, 100, tiltDegree * -1, tiltDegree);
		heroGrid.style.setProperty("--scroll-tilt", `${mappedValue}`);
		let heroOpacity = mapRange(scrollPercent, 0, 10, 1, 0);
		let heroScale = mapRange(scrollPercent, 0, 10, 1, 0);
		let heroTransformY = mapRange(scrollPercent, 0, 10, 0, -100);
		let heroBlur = mapRange(scrollPercent, 0, 10, 0, 20);
		hero.style.opacity = heroOpacity;
		hero.style.filter = `blur(${heroBlur}px)`;
		hero.style.transform = `translateY(${heroTransformY}px)`;
	}

	function handleScroll() {
		if (heroGrid && isElementInViewport(heroGrid)) {
			updateScrollPos();
		}
	}

	window.addEventListener("scroll", handleScroll);

	handleScroll();
});
