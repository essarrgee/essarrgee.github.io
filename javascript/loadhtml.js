var screenwidth = $(window).width();

$(document).ready(function(){
	$('#topNav').load("/sharedhtml/topNav.html");
});

if (screenwidth <= 600) {
	$("#unityWebGL").remove();
}