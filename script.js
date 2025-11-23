let currentPage = 1;
const totalPages = 2;

const page1 = document.querySelector(".page-1");
const flipSound = document.getElementById("flipSound");

let slideshowInterval = null;

// Fungsi buka halaman
function nextPage() {
    if (currentPage === 1) {
        page1.classList.add("open");
        flipSound.play();
        currentPage = 2;
    }
}

// Fungsi tutup halaman
function prevPage() {
    if (currentPage === 2) {
        page1.classList.remove("open");
        flipSound.play();
        currentPage = 1;
    }
}

document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("prevPage").addEventListener("click", prevPage);

// SLIDESHOW OTOMATIS
document.getElementById("startSlide").addEventListener("click", () => {
    if (slideshowInterval) return; // Cegah duplikasi timer

    slideshowInterval = setInterval(() => {
        if (currentPage === 1) {
            nextPage();
        } else {
            prevPage();
        }
    }, 3000);
});

document.getElementById("stopSlide").addEventListener("click", () => {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
});
