let timers = {
    study: {
      duration: 25 * 60,
      remaining: 25 * 60,
      interval: null,
      running: false,
      elementId: 'study-time'
    },
    break: {
      duration: 5 * 60,
      remaining: 5 * 60,
      interval: null,
      running: false,
      elementId: 'break-time'
    }
  };
  
  function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  function updateDisplay(type) {
    const timer = timers[type];
    document.getElementById(timer.elementId).textContent = formatTime(timer.remaining);
  }
  
  function startTimer(type) {
    const timer = timers[type];
    if (timer.running) return;
    timer.running = true;
    timer.interval = setInterval(() => {
      if (timer.remaining > 0) {
        timer.remaining--;
        updateDisplay(type);
      } else {
        clearInterval(timer.interval);
        timer.running = false;
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} time's up!`);
      }
    }, 1000);
  }
  
  function pauseTimer(type) {
    const timer = timers[type];
    if (timer.interval) {
      clearInterval(timer.interval);
      timer.running = false;
    }
  }
  
  function resetTimer(type) {
    const timer = timers[type];
    pauseTimer(type);
    timer.remaining = timer.duration;
    updateDisplay(type);
  }

const music = document.getElementById('calm-audio');

function playMusic() {
  music.play();
}

function pauseMusic() {
  music.pause();
}

function restartMusic() {
  music.currentTime = 0;
  music.play();
}

function createBubbleWrap() {
  const container = document.getElementById("bubble-wrap");
  container.innerHTML = ""; 

  for (let i = 0; i < 100; i++) { 
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.addEventListener("click", () => {
      popBubble(bubble)
      bubble.classList.add("popped");
    });
    container.appendChild(bubble);
  }
}

function popBubble(bubble) {
  if (!bubble.classList.contains('popped')) {
    bubble.classList.add('popped');
    const popSound = new Audio('pop.mp3'); 
    popSound.play();
  }
}

const emojiPool = ["🍎","🐶","🌟","🎵","⚡","🍩","🐱","🌸","🚀","🎲","🥑","🐢"];
let symbols = [];
let flipped = [];
let matchedCount = 0;

function initMemoryGame() {
  const grid = document.getElementById("memory-game");
  grid.innerHTML = "";
  matchedCount = 0;
  flipped = [];

  const selected = emojiPool.sort(() => 0.5 - Math.random()).slice(0, 6);
  symbols = [...selected, ...selected];

  symbols.sort(() => Math.random() - 0.5);

  symbols.forEach((symbol, idx) => {
    const tile = document.createElement("div");
    tile.classList.add("memory-tile");
    tile.dataset.symbol = symbol;
    tile.dataset.index = idx;
    tile.textContent = ""; 

    tile.addEventListener("click", () => flipTile(tile));
    grid.appendChild(tile);
  });
}

function flipTile(tile) {
  if (tile.classList.contains("flipped") || tile.classList.contains("matched")) return;
  if (flipped.length === 2) return;

  tile.classList.add("flipped");
  tile.textContent = tile.dataset.symbol;
  flipped.push(tile);

  if (flipped.length === 2) {
    const [first, second] = flipped;
    if (first.dataset.symbol === second.dataset.symbol) {
      first.classList.add("matched");
      second.classList.add("matched");
      flipped = [];
      matchedCount += 2;
      if (matchedCount === symbols.length) {
      }
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first.textContent = "";
        second.textContent = "";
        flipped = [];
      }, 800);
    }
  }
}

document.getElementById("reset-memory").addEventListener("click", initMemoryGame);

window.onload = () => {
  createBubbleWrap();
  document.getElementById("reset-bubbles").addEventListener("click", createBubbleWrap);
  initMemoryGame();
};



