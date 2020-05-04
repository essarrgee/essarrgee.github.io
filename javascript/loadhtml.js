var screenwidth = window.width();

document.ready(function(){
	$('#topNav').load("/sharedhtml/topNav.html");
	$('#tictactoeGame').load("/sharedhtml/tictactoeGame.html");
});

if (screenwidth <= 600) {
	$("#unityWebGL").remove();
}