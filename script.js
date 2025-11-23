// ======= LOGIN =======

const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

const VALID_PASSWORD = 'KEYLA';

// Login handler
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value.trim();

  if (password === VALID_PASSWORD) {
    loginError.textContent = '';
    sessionStorage.setItem('isLoggedIn', 'true');
    showMainPage();
  } else {
    loginError.textContent = 'Password salah!';
  }
});

// Toggle display main vs login page
function showMainPage() {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  mainPage.setAttribute('aria-hidden', 'false');
  loginPage.setAttribute('aria-hidden', 'true');
}

// Initial check
if (sessionStorage.getItem('isLoggedIn') === 'true') {
  showMainPage();
} else {
  loginPage.classList.remove('hidden');
  mainPage.classList.add('hidden');
  mainPage.setAttribute('aria-hidden', 'true');
  loginPage.setAttribute('aria-hidden', 'false');
}

// ======= KUBUS & BUIH =======

const cube = document.getElementById('cube');
const bubbleContainer = document.getElementById('bubble-container');

let rotationX = -20;
let rotationY = 20;
let lastX = 0;
let lastY = 0;
let dragging = false;
const sensitivity = 0.35;

let velocityX = 0;
let velocityY = 0;
let prevTime = null;
let prevPos = null;

function createBubble(x, y) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = 10 + Math.random() * 12;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  bubbleContainer.appendChild(bubble);

  setTimeout(() => bubble.remove(), 3000);
}

function updateBubbleAmount() {
  const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  const bubbleCount = Math.min(12, Math.floor(speed / 6)); // moderate bubble count

  for (let i = 0; i < bubbleCount; i++) {
    // Position bubbles near bottom area of cube container, random horizontal spread inside container
    const rect = bubbleContainer.getBoundingClientRect();
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + rect.height / 1.2 + (Math.random() - 0.5) * 10; // near bottom
    createBubble(x, y);
  }
}

// Pointer and touch handlers

function onPointerDown(e) {
  dragging = true;
  lastX = e.clientX || (e.touches && e.touches[0].clientX);
  lastY = e.clientY || (e.touches && e.touches[0].clientY);
  prevTime = performance.now();
  prevPos = { x: lastX, y: lastY };
  cube.style.transition = 'none';
}

function onPointerMove(e) {
  if (!dragging) return;
  const currentX = e.clientX || (e.touches && e.touches[0].clientX);
  const currentY = e.clientY || (e.touches && e.touches[0].clientY);

  const deltaX = currentX - lastX;
  const deltaY = currentY - lastY;

  rotationY += deltaX * sensitivity;
  rotationX -= deltaY * sensitivity;

  // Clamp rotation X between -90 and 90 but allow smooth continuous Y rotation without wrap bug:
  rotationX = Math.min(Math.max(rotationX, -89), 89);

  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  const now = performance.now();
  const timeDelta = now - prevTime;

  if (timeDelta > 0) {
    velocityX = (currentX - prevPos.x) / timeDelta * 1000;
    velocityY = (currentY - prevPos.y) / timeDelta * 1000;
  }

  prevTime = now;
  prevPos = { x: currentX, y: currentY };

  lastX = currentX;
  lastY = currentY;

  updateBubbleAmount();
}

function onPointerUp() {
  dragging = false;
  cube.style.transition = 'transform 0.25s ease-out';
}

// Mouse events
cube.addEventListener('mousedown', onPointerDown);
document.addEventListener('mouseup', onPointerUp);
document.addEventListener('mousemove', onPointerMove);

// Touch events
cube.addEventListener('touchstart', onPointerDown, { passive: true });
document.addEventListener('touchend', onPointerUp);
document.addEventListener('touchmove', onPointerMove, { passive: false });
cube.addEventListener('touchmove', e => e.preventDefault());

// Initialize cube transform
cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
