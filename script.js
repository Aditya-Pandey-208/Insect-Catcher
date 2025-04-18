// const screens = document.querySelectorAll('.screen');
// const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
// const start_btn = document.getElementById('start-btn')
// const game_container = document.getElementById('game-container')
// const timeEl = document.getElementById('time')
// const scoreEl = document.getElementById('score')
// const message = document.getElementById('message')
// let seconds = 0
// let score = 0
// let selected_insect = {}

// start_btn.addEventListener('click', () => screens[0].classList.add('up'))

// choose_insect_btns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const img = btn.querySelector('img')
//         const src = img.getAttribute('src')
//         const alt = img.getAttribute('alt')
//         selected_insect = { src, alt }
//         screens[1].classList.add('up')
//         setTimeout(createInsect, 1000)
//         startGame()
//     })
// })

// function startGame() {
//     setInterval(increaseTime, 1000)
// }

// function increaseTime() {
//     let m = Math.floor(seconds / 60)
//     let s = seconds % 60
//     m = m < 10 ? `0${m}` : m
//     s = s < 10 ? `0${s}` : s
//     timeEl.innerHTML = `Time: ${m}:${s}`
//     seconds++
// }

// function createInsect() {
//     const insect = document.createElement('div')
//     insect.classList.add('insect')
//     const { x, y } = getRandomLocation()
//     insect.style.top = `${y}px`
//     insect.style.left = `${x}px`
//     insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

//     insect.addEventListener('click', catchInsect)

//     game_container.appendChild(insect)
// }

// function getRandomLocation() {
//     const width = window.innerWidth
//     const height = window.innerHeight
//     const x = Math.random() * (width - 200) + 100
//     const y = Math.random() * (height - 200) + 100
//     return { x, y }
// }

// function catchInsect() {
//     increaseScore()
//     this.classList.add('caught')
//     setTimeout(() => this.remove(), 2000)
//     addInsects()
// }

// function addInsects() {
//     setTimeout(createInsect, 1000)
//     setTimeout(createInsect, 1500)
// }

// function increaseScore() {
//     score++
//     if(score > 19) {
//         message.classList.add('visible')
//     }
//     scoreEl.innerHTML = `Score: ${score}`
// }

const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');

let seconds = 0;
let score = 0;
let selected_insect = {};
let timerInterval;
let nextMessageScore = 20;

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_insect_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selected_insect = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  timerInterval = setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

  insect.addEventListener('click', catchInsect);
  game_container.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  if (score >= nextMessageScore) {
    message.classList.add('visible');
    nextMessageScore += 20; // set next target score
  }
  scoreEl.innerHTML = `Score: ${score}`;
}

// Continue Button
continueBtn.addEventListener('click', () => {
  message.classList.remove('visible');
});

// Restart Button
restartBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  seconds = 0;
  score = 0;
  nextMessageScore = 20;
  selected_insect = {};
  timeEl.innerHTML = 'Time: 00:00';
  scoreEl.innerHTML = 'Score: 0';
  game_container.innerHTML = `
    <h3 id="time" class="time">Time: 00:00</h3>
    <h3 id="score" class="score">Score: 0</h3>
    <div id="message" class="message">
      <h5>Are you annoyed yet? <br> You are playing an impossible game!!</h5>
      <button class="btn message-btn" id="continue-btn">Continue</button>
      <button class="btn message-btn" id="restart-btn">Restart</button>
    </div>
  `;
  screens[1].classList.remove('up');
  screens[0].classList.remove('up');

  // Re-attach event listeners to the buttons
  document.getElementById('continue-btn').addEventListener('click', () => {
    document.getElementById('message').classList.remove('visible');
  });

  document.getElementById('restart-btn').addEventListener('click', () => {
    location.reload();
  });
});
