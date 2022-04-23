var frame = 39;
let subIndex1Button = document.querySelector("#subIndex1Button");

function randomMainText() {
	var mainText = document.getElementById("mainText");
	var random = Math.floor(Math.random()*10);
	if (mainText) {
		mainText.innerHTML = "console.log('Hello!');";
		if (random == 1 || random == 6) {
			mainText.innerHTML = "print('Hello!')";
		}
		else if (random == 2 || random == 7) {
			mainText.innerHTML = 'printf("Hello!");';
		}
		else if (random == 3 || random == 8) {
			mainText.innerHTML = "print('Hello!');";
		}
		else if (random == 4 || random == 9) {
			mainText.innerHTML = 'System.out.println("Hello!");';
		}
		else if (random == 5 || random == 10) {
			mainText.innerHTML = 'Console.WriteLine("Hello!");';
		}
	}
}

randomMainText();

function indexViewMore()
{
	var subIndex1 = document.querySelector("#subIndex1");
	if (subIndex1 !== null && subIndex1 !== undefined) {
		subIndex1.scrollIntoView(true);
	}
}

if (subIndex1Button !== null && subIndex1Button !== undefined) {
	subIndex1Button.addEventListener("click", function(event) {
		indexViewMore();
	});
}


function expand() {
	var topNav = document.getElementById("topNav");
	if (topNav.className == "topNav") {
		topNav.className += " responsive";
		var interval = setInterval(expandTopNav, 1);
		frame = 40;
		function expandTopNav() {
			if (topNav && frame) {
				if (frame >= 180 || frame == 39) {
					clearInterval(interval);
					frame = 40;
				}
				else {
					frame += 5;
					topNav.style.height = frame + 'px';
				}
			}
		}
	}
	else {
		frame = 39;
		topNav.className = "topNav";
		topNav.style.height = frame + 'px';
	}
}

function resizeTopNav() {
	var topNav = document.getElementById("topNav");
	if (topNav && topNav.className != "topNav") {
		if (window.innerWidth >= 600) {
			frame = 39;
		}
		else if (window.innerWidth < 600) {
			frame = 180;
		}
		topNav.style.height = frame + 'px';
	}
}


let unloadedParentElements = 
	document.querySelectorAll(".unloadedParent");
let loadedElementSet = new Set();

function OnScroll()
{
	let windowHeight = window.innerHeight;
	// console.log(window.screenY);
	for (element of unloadedParentElements) {
		if (!loadedElementSet.has(element)) {
			let position = element.getBoundingClientRect();
			// console.log(position.top);
			if (position.top > -(windowHeight/2) && position.top < (windowHeight/1.2)) {
				// console.log(position.top);
				let unloadedElements = 
					element.querySelectorAll(".unloaded");
				for (subElement of unloadedElements) {
					subElement.classList.remove("unloaded");
				}
				loadedElementSet.add(element);
			}
		}
	}
}

document.addEventListener("scroll", function(event) {
	OnScroll();
});

function Start()
{
	OnScroll();
}

Start();

