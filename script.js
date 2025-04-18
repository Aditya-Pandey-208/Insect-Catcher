const screens       = document.querySelectorAll('.screen');
const chooseBtns    = document.querySelectorAll('.choose-insect-btn');
const startBtn      = document.getElementById('start-btn');
let   gameContainer = document.getElementById('game-container');
let   timeEl        = document.getElementById('time');
let   scoreEl       = document.getElementById('score');
let   message       = document.getElementById('message');

let seconds     = 0;
let score       = 0;
let spawnDelay  = 2000;
let timerId;
let spawnIds    = [];
let selectedInsect = {};

// 1) Start the game
startBtn.addEventListener('click', () => {
  screens[0].classList.add('up');
});

// 2) Choose insect & begin
chooseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    selectedInsect = { src: img.src, alt: img.alt };
    screens[1].classList.add('up');
    schedule(createInsect, 1000);
    startTimer();
  });
});

// 3) Timer
function startTimer() {
  clearInterval(timerId);
  seconds = 0;
  timeEl.textContent = 'Time: 00:00';
  timerId = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timeEl.textContent = `Time: ${m}:${s}`;
  }, 1000);
}

// 4) Create insect
function createInsect() {
  if (!selectedInsect.src) return;
  const insect = document.createElement('div');
  insect.className = 'insect';
  const { x, y } = getRandomLoc();
  insect.style.left = `${x}px`;
  insect.style.top  = `${y}px`;
  insect.innerHTML  = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}">`;
  insect.addEventListener('click', () => catchInsect(insect));
  gameContainer.appendChild(insect);
}

// Helpers
function getRandomLoc() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    x: Math.random() * (w - 200) + 100,
    y: Math.random() * (h - 200) + 100
  };
}

function schedule(fn, delay) {
  const id = setTimeout(fn, delay);
  spawnIds.push(id);
}

function clearSpawns() {
  spawnIds.forEach(clearTimeout);
  spawnIds = [];
}

// 5) Catch insect
function catchInsect(el) {
  el.remove();
  increaseScore();
  schedule(createInsect, spawnDelay);
  schedule(createInsect, spawnDelay + 500);
}

// 6) Score & difficulty
function increaseScore() {
  score++;
  scoreEl.textContent = `Score: ${score}`;
  if (score % 20 === 0) {
    clearInterval(timerId);
    clearSpawns();
    showMessage();
  }
  spawnDelay = Math.max(1500, spawnDelay - 25);
}

// 7) Milestone message
function showMessage() {
  message.classList.add('visible');
  const wrap = document.createElement('div');
  wrap.className = 'message-buttons';
  wrap.innerHTML = `
    <button class="btn" id="continue-btn">Continue</button>
    <button class="btn" id="restart-btn">Restart</button>
  `;
  message.appendChild(wrap);

  document.getElementById('continue-btn')
    .addEventListener('click', () => {
      message.classList.remove('visible');
      wrap.remove();
      startTimer();
      schedule(createInsect, 500);
    });

  document.getElementById('restart-btn')
    .addEventListener('click', resetGame);
}

// 8) Reset everything cleanly
function resetGame() {
  // Remove only insect nodes
  document.querySelectorAll('.insect').forEach(i => i.remove());
  // Stop timer and pending spawns
  clearInterval(timerId);
  clearSpawns();

  // Reset state
  seconds      = 0;
  score        = 0;
  spawnDelay   = 2000;
  selectedInsect = {};

  // Reset UI
  timeEl.textContent  = 'Time: 00:00';
  scoreEl.textContent = 'Score: 0';
  message.classList.remove('visible');
  message.innerHTML = 'Are you annoyed yet? <br> You are playing an impossible game!!';

  // Return to start screens
  screens[0].classList.remove('up');
  screens[1].classList.remove('up');
}
