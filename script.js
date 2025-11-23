// Elements for login and main page
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Hardcoded credentials
const VALID_USERNAME = 'KEYLA';
const VALID_PASSWORD = 'KEYLA POOKIE';

// Handle login form submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    loginError.textContent = '';
    sessionStorage.setItem('isLoggedIn', 'true');
    showMainPage();
  } else {
    loginError.textContent = 'Username atau Password salah!';
  }
});

// Show main page, hide login page
function showMainPage() {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
}

// On load, cek session login
if (sessionStorage.getItem('isLoggedIn') === 'true') {
  showMainPage();
} else {
  loginPage.classList.remove('hidden');
  mainPage.classList.add('hidden');
}

// --- Kubus interaktif dan efek buih ---

const cube = document.getElementById('cube');
const bubbleContainer = document.getElementById('bubble-container');

let rotationX = -20;
let rotationY = 20;
let lastX = 0;
let lastY = 0;
let dragging = false;

const sensitivity = 0.4;

let velocityX = 0;
let velocityY = 0;
let prevTime = null;
let prevPos = null;

function createBubble(x, y) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = 10 + Math.random() * 15;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  bubbleContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 3000);
}

function updateBubbleAmount() {
  const speed = Math.sqrt(velocityX*velocityX + velocityY*velocityY);
  const bubbleCount = Math.min(15, Math.floor(speed / 5));
  
  for (let i=0; i < bubbleCount; i++) {
    const rect = cube.getBoundingClientRect();
    const x = rect.left + rect.width/2 + (Math.random() - 0.5)*rect.width;
    const y = rect.top + rect.height/2 + (Math.random() - 0.5)*rect.height;
    createBubble(x, y);
  }
}

function onPointerDown(e) {
  dragging = true;
  lastX = e.clientX || e.touches?.[0].clientX;
  lastY = e.clientY || e.touches?.[0].clientY;
  prevTime = performance.now();
  prevPos = {x: lastX, y: lastY};
  cube.style.transition = 'none';
}

function onPointerMove(e) {
  if (!dragging) return;
  const currentX = e.clientX || e.touches?.[0].clientX;
  const currentY = e.clientY || e.touches?.[0].clientY;
  const deltaX = currentX - lastX;
  const deltaY = currentY - lastY;
  rotationY += deltaX * sensitivity;
  rotationX -= deltaY * sensitivity;
  rotationX = Math.min(Math.max(rotationX, -90), 90);
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  const now = performance.now();
  const timeDelta = now - prevTime;
  if (timeDelta > 0) {
    velocityX = (currentX - prevPos.x) / timeDelta * 1000;
    velocityY = (currentY - prevPos.y) / timeDelta * 1000;
  }
  prevTime = now;
  prevPos = {x: currentX, y: currentY};

  lastX = currentX;
  lastY = currentY;

  updateBubbleAmount();
}

function onPointerUp(e) {
  dragging = false;
  cube.style.transition = 'transform 0.3s ease-out';
}

cube.addEventListener('mousedown', onPointerDown);
document.addEventListener('mouseup', onPointerUp);
document.addEventListener('mousemove', onPointerMove);

cube.addEventListener('touchstart', onPointerDown);
document.addEventListener('touchend', onPointerUp);
document.addEventListener('touchmove', onPointerMove, {passive: false});

cube.addEventListener('touchmove', e => e.preventDefault());

cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
