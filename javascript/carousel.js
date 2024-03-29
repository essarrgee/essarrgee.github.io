var carouselBG = document.getElementById("carouselBG");
var carouselBG2 = document.getElementById("carouselBG2");
var carouselProjectTitle = document.querySelector("#projectTitle");
var carouselProjectDesc = document.querySelector("#projectDescription");
var carouselViewButton = document.getElementById("carouselViewButton");
let carouselItems = document.querySelectorAll(".carousel-item");
let defaultCarouselItem = document.querySelector(".carousel-item,.default");

// Firefox check found in: 
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
var isFirefox = typeof InstallTrigger !== 'undefined';


function setCarouselBG(element) {
	if (carouselViewButton && carouselBG && carouselBG2 && element) {
		let screenshot = element.src;
		let desc = "";
		carouselBG.classList.toggle("carousel-hidden");
		carouselBG2.classList.toggle("carousel-hidden");
		if (element.getAttribute("stored_img")) {
			screenshot = element.getAttribute("stored_img");
		}
		if (element.getAttribute("stored_desc")) {
			desc = element.getAttribute("stored_desc");
		}
		if (carouselBG.classList.contains("carousel-hidden")) {
			carouselBG2.src = screenshot;
		}
		else {
			carouselBG.src = screenshot;
		}
		selectCarouselItem(element);
		carouselProjectTitle.innerHTML = element.id;
		carouselProjectDesc.innerHTML = desc;
		carouselViewButton.href = element.getAttribute("stored_href");
	}
}

if (defaultCarouselItem !== null && defaultCarouselItem !== undefined) {
	setCarouselBG(defaultCarouselItem);
}

function selectCarouselItem(element)
{
	for (item of carouselItems) {
		item.classList.remove("selected");
	}
	if (element !== null && element !== undefined) {
		element.classList.add("selected");
	}
}


let previousTime = 0;

function Update(time)
{
	if (time > previousTime+5) {
		previousTime = time;
		if (carouselContainer !== null && carouselScrolling !== 0) {
			if (!isFirefox) {
				carouselContainer.scrollLeft += (10*carouselScrolling);
			}
			else {
				carouselContainer.scroll({top: 0, 
					left: carouselContainer.scrollLeft+(100*carouselScrolling),
					behavior: "smooth"});
			}
		}
	}
	window.requestAnimationFrame(Update);
}

let requestAnimationId = window.requestAnimationFrame(Update);


let carouselContainer = document.querySelector(".carousel-container");
let carouselScrollLeft = document.querySelector("#carousel-scroll-left");
let carouselScrollRight = document.querySelector("#carousel-scroll-right");
let carouselScrolling = 0;

function ChangeScrolling(value, scrollElement)
{
	carouselScrolling = value;
	if (scrollElement !== null) {
		if (value != 0) {
			scrollElement.childNodes[1].classList.add("flash");
		}
		else {
			scrollElement.childNodes[1].classList.remove("flash");
		}
	}
}

if (carouselContainer !== null && 
carouselScrollLeft !== null && carouselScrollRight !== null) {
	carouselScrollLeft.addEventListener("mouseover",function(event) {
		ChangeScrolling(-1, carouselScrollLeft);
	});
	carouselScrollRight.addEventListener("mouseover",function(event) {
		ChangeScrolling(1, carouselScrollRight);
	});
	carouselScrollLeft.addEventListener("mouseout",function(event) {
		ChangeScrolling(0, carouselScrollLeft);
	});
	carouselScrollRight.addEventListener("mouseout",function(event) {
		ChangeScrolling(0, carouselScrollRight);
	});
}