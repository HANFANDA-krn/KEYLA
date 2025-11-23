let currentPage = 1;

const flipSound = document.getElementById("flipSound");
const page1 = document.querySelector(".page-1");

let slideshowInterval = null;

function nextPage() {
    if (currentPage === 1) {
        page1.classList.add("open");
        flipSound.play();   // mainkan suara flip
        currentPage = 2;
    }
}

function prevPage() {
    if (currentPage === 2) {
        page1.classList.remove("open");
        flipSound.play();  // sinkron suara dengan animasi
        currentPage = 1;
    }
}

document.getElementById("nextPage").onclick = nextPage;
document.getElementById("prevPage").onclick = prevPage;

/* Slideshow otomatis */
document.getElementById("startSlide").onclick = () => {
    if (slideshowInterval) return;

    slideshowInterval = setInterval(() => {
        if (currentPage === 1) nextPage();
        else prevPage();
    }, 3500);
};

document.getElementById("stopSlide").onclick = () => {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
};
