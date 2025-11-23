// STATUS HALAMAN
let currentPage = 1; // 1 = halaman depan (page-1 visible), 2 = page-2 visible

// DOM
const cover = document.getElementById('cover');
const openBookBtn = document.getElementById('openBook');
const bookArea = document.getElementById('bookArea');
const page1 = document.querySelector('.page-1');
const page2 = document.querySelector('.page-2');
const nextBtn = document.getElementById('nextPage');
const prevBtn = document.getElementById('prevPage');
const flipSound = document.getElementById('flipSound');

// Fungsi untuk menampilkan buku setelah cover diklik
function showBook() {
  // sembunyikan cover, tampilkan area buku
  cover.style.display = 'none';
  bookArea.style.display = 'block';
  bookArea.setAttribute('aria-hidden', 'false');
  // ensure initial state
  page1.classList.remove('open');
  currentPage = 1;
  updateControls();
}

// Main open/close page functions (memainkan suara saat animasi dimulai)
function openToNext() {
  if (currentPage !== 1) return;
  // mainkan suara terlebih dahulu agar sinkron dengan animasi
  playFlipSound();
  // beri jeda sangat kecil agar suara terdengar bersamaan dengan transform
  requestAnimationFrame(() => {
    page1.classList.add('open');
    // setelah animasi, set state
    setTimeout(() => {
      currentPage = 2;
      updateControls();
    }, 900); // sama dengan durasi CSS transition
  });
}

function closeToPrev() {
  if (currentPage !== 2) return;
  playFlipSound();
  requestAnimationFrame(() => {
    page1.classList.remove('open');
    setTimeout(() => {
      currentPage = 1;
      updateControls();
    }, 900);
  });
}

// Play flip sound with small volume and reset to start
function playFlipSound() {
  if (!flipSound) return;
  try {
    flipSound.pause();
    flipSound.currentTime = 0;
    flipSound.volume = 0.9;
    // beberapa browser menolak autoplay until user gesture -
    // kita memicu suara hanya setelah user klik (cover/button)
    flipSound.play().catch(()=>{ /* ignore promise rejection */ });
  } catch (e) {
    // ignore errors
    console.warn('Audio play error', e);
  }
}

// Update tombol (disable jika tidak perlu)
function updateControls() {
  if (nextBtn) nextBtn.disabled = (currentPage === 2);
  if (prevBtn) prevBtn.disabled = (currentPage === 1);
}

// Event listeners
openBookBtn.addEventListener('click', showBook);
nextBtn.addEventListener('click', openToNext);
prevBtn.addEventListener('click', closeToPrev);

// Pastikan controls initial state
updateControls();
