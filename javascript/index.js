var frame = 1;

function expand() {
	var topNav = document.getElementById("topNav");
	if (topNav.className == "topNav") {
		topNav.className += " responsive";
		setInterval(expandTopNav, 5);
		frame = 1;
		function expandTopNav() {
			if (topNav && frame) {
				if (frame == 150 || frame == 0) {
					clearInterval(interval);
					frame = 1;
				}
				else {
					frame++;
					topNav.style.height = frame + 'px';
				}
			}
		}
	}
	else {
		frame = 0;
		topNav.className = "topNav";
	}
}

