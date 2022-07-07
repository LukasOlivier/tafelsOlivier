document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector(".image").addEventListener("click", showGallery)
    document.querySelector("body").addEventListener("click", hideGallery)
}

function hideGallery(e) {
    if (!e.target.classList.contains("image") && e.target.closest("nav") == null) {
        document.querySelector("body").classList.remove("overlay");
        document.querySelector("main").classList.remove("reduce-opacity");
        document.querySelector(".gallery").classList.add("hidden");
    }
}

function showGallery() {
    document.querySelector("body").classList.add("overlay");
    document.querySelector("main").classList.add("reduce-opacity");
    document.querySelector(".gallery").classList.remove("hidden");
}