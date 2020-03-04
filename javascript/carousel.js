var carouselBG = document.getElementById("carouselBG");
var carouselBG2 = document.getElementById("carouselBG2");
var carouselProjectTitle = document.getElementById("projectTitle");
var carouselViewButton = document.getElementById("carouselViewButton");

function setCarouselBG(element) {
	if (carouselViewButton && carouselBG && carouselBG2 && element) {
		carouselBG.classList.toggle("carousel-hidden");
		carouselBG2.classList.toggle("carousel-hidden");
		if (carouselBG.classList.contains("carousel-hidden")) {
			carouselBG2.src = element.src;
		}
		else {
			carouselBG.src = element.src;
		}
		carouselProjectTitle.innerHTML = element.id;
		carouselViewButton.href = element.getAttribute("stored_href");
	}
}