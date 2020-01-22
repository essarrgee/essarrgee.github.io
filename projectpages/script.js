// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCSTz6BZ-W-Rps1jyMiEX3TVxuPaD_UctE",
	authDomain: "test-db-fb7fb.firebaseapp.com",
	databaseURL: "https://test-db-fb7fb.firebaseio.com",
	projectId: "test-db-fb7fb",
	storageBucket: "test-db-fb7fb.appspot.com",
	messagingSenderId: "688284452986",
	appId: "1:688284452986:web:f3bd889ea2bb64baeb93c3",
	measurementId: "G-LJZKR1RMSL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
let text = document.getElementById("test");
//text.innerHTML(database.collection("Items").doc("Item#001").data().Value);
var query = database.ref("Items").orderByKey();
query.once("value").then(function(snapshot) {
	snapshot.forEach(function(child) {
		console.log(child.key);
		text.innerHTML(child.val().Value);
	})
})
/*
var query = database.ref("Items").orderByKey();
query.once("value").then(function(snapshot) {
	snapshot.forEach(function(child) {
		console.log(child.key);
		text.innerHTML(child.val().Value);
	})
});
*/
