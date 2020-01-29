let imageGallery = document.getElementsByClassName("gamePageImageGallery");
let imageModal = document.getElementById("imageModal");
let imageModalImage = document.getElementById("modalGalleryImage");
let overlay = document.getElementById("overlay");

//Get all images in Image Gallery
if (imageGallery && imageGallery[0]) {
	let images = imageGallery[0].childNodes;
	for (i=0; i<images.length; i++) {
		let imageButton = images[i];
		if (imageButton.src) {
			imageButton.addEventListener("click", 
				function() {
					openEntryModal(imageButton)
				});
		}
	}
}

function openEntryModal(imageButton) {
	if (imageModal) {
		imageModalImage.src = imageButton.src;
		overlay.style.opacity = 0.9;
		overlay.style["pointer-events"] = "auto";
		imageModal.style.transform = "translate(-50%, -50%)";
	}
}

function closeEntryModal() {
	if (imageModal) {
		imageModal.style.transform = "translate(-50%, -300%)";
		overlay.style["pointer-events"] = "none";
		overlay.style.opacity = 0;
	}
}