var carouselBG = document.getElementById("carouselBG");
var carouselBG2 = document.getElementById("carouselBG2");
var carouselProjectTitle = document.getElementById("projectTitle");
var carouselViewButton = document.getElementById("carouselViewButton");

function setCarouselBG(element) {
	if (carouselViewButton && carouselBG && carouselBG2 && element) {
		let screenshot = element.src;
		carouselBG.classList.toggle("carousel-hidden");
		carouselBG2.classList.toggle("carousel-hidden");
		if (element.getAttribute("stored_img")) {
			screenshot = element.getAttribute("stored_img");
		}
		if (carouselBG.classList.contains("carousel-hidden")) {
			carouselBG2.src = screenshot;
		}
		else {
			carouselBG.src = screenshot;
		}
		carouselProjectTitle.innerHTML = element.id;
		carouselViewButton.href = element.getAttribute("stored_href");
	}
}


let previousTime = 0;

function Update(time)
{
	if (previousTime !== undefined) {
		
	}
	previousTime = time;
	
	if (carouselContainer !== null) {
		carouselContainer.scroll({top: 0, 
			left: carouselContainer.scrollLeft+(100*carouselScrolling), 
			behavior: "smooth"});
	}
	window.requestAnimationFrame(Update);
}

let requestAnimationId = window.requestAnimationFrame(Update);


let carouselContainer = document.querySelector(".carousel-container");
let carouselScrollLeft = document.querySelector("#carousel-scroll-left");
let carouselScrollRight = document.querySelector("#carousel-scroll-right");
let carouselScrolling = 0;

if (carouselContainer !== null && 
carouselScrollLeft !== null && carouselScrollRight !== null) {
	console.log(carouselContainer);
	carouselScrollLeft.addEventListener("mouseover",function(event) {
		carouselScrolling = -1;
		requestAnimationId = window.requestAnimationFrame(Update);
	});
	carouselScrollRight.addEventListener("mouseover",function(event) {
		carouselScrolling = 1;
		requestAnimationId = window.requestAnimationFrame(Update);
	});
	carouselScrollLeft.addEventListener("mouseout",function(event) {
		carouselScrolling = 0;
		window.cancelAnimationFrame(requestAnimationId);
	});
	carouselScrollRight.addEventListener("mouseout",function(event) {
		carouselScrolling = 0;
		window.cancelAnimationFrame(requestAnimationId);
	});
}