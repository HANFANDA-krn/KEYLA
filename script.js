let currentPage = 0;

const flipSound = document.getElementById("flipSound");
const cover = document.getElementById("cover");
const bookWrapper = document.getElementById("bookWrapper");

const page1 = document.querySelector(".page-1");

document.getElementById("openAlbum").onclick = () => {
    cover.classList.add("hidden");
    bookWrapper.classList.remove("hidden");
};

function flipForward() {
    if (currentPage === 0) {
        flipSound.currentTime = 0;
        flipSound.play();

        setTimeout(() => {
            page1.classList.add("open");
        }, 100);

        currentPage = 1;
    }
}

function flipBackward() {
    if (currentPage === 1) {
        flipSound.currentTime = 0;
        flipSound.play();

        setTimeout(() => {
            page1.classList.remove("open");
        }, 100);

        currentPage = 0;
    }
}

document.getElementById("nextPage").onclick = flipForward;
document.getElementById("prevPage").onclick = flipBackward;
