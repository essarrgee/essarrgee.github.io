var frame = 39;

function expand() {
	var topNav = document.getElementById("topNav");
	if (topNav.className == "topNav") {
		topNav.className += " responsive";
		var interval = setInterval(expandTopNav, 1);
		frame = 40;
		function expandTopNav() {
			if (topNav && frame) {
				if (frame == 180 || frame == 39) {
					clearInterval(interval);
					frame = 40;
				}
				else {
					frame++;
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

