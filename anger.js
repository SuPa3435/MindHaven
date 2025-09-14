
const recordBtn = document.getElementById("record-btn");
const statusText = document.getElementById("status-text");

let mediaRecorder;
let audioChunks = [];

recordBtn.addEventListener("click", async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Microphone not supported in this browser!");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const audio = document.createElement("audio");
      audio.controls = true;

      const ctx = new AudioContext();
      const src = ctx.createMediaElementSource(audio);
      const distortion = ctx.createWaveShaper();
      distortion.curve = makeDistortionCurve(400);
      distortion.oversample = "4x";
      src.connect(distortion);
      distortion.connect(ctx.destination);

      audio.src = URL.createObjectURL(blob);
      document.body.appendChild(audio);
      audio.play();
      statusText.textContent = "Your scream echoes back...";
    };

    mediaRecorder.start();
    statusText.textContent = "Recording... scream loud!";
    setTimeout(() => {
      mediaRecorder.stop();
      statusText.textContent = "Processing scream...";
    }, 3000);
  } catch (err) {
    alert("Error accessing microphone: " + err);
  }
});

function makeDistortionCurve(amount) {
  const n_samples = 44100, curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  let x;
  for (let i = 0; i < n_samples; ++i) {
    x = i * 2 / n_samples - 1;
    curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}


const startWhackBtn = document.getElementById("start-whack");
const pauseWhackBtn = document.getElementById("pause-whack");
const whackGame = document.getElementById("whack-game");
const whackScore = document.getElementById("whack-score");

let score = 0;
let gameInterval = null;

function spawnEmoji() {
  const emoji = document.createElement("div");
  emoji.textContent = ["😡", "😤", "👿", "💢"][Math.floor(Math.random() * 4)];
  emoji.classList.add("stress-emoji");
  emoji.style.top = Math.random() * 150 + "px";
  emoji.style.left = Math.random() * 250 + "px";

  emoji.addEventListener("click", () => {
    score++;
    whackScore.textContent = score;
    emoji.remove();
  });

  whackGame.appendChild(emoji);
  setTimeout(() => { if (emoji.parentNode) emoji.remove(); }, 1500);
}

startWhackBtn.addEventListener("click", () => {
  if (!gameInterval) {
    gameInterval = setInterval(spawnEmoji, 1000);
  }
});

pauseWhackBtn.addEventListener("click", () => {
  clearInterval(gameInterval);
  gameInterval = null;
});

// --- Anger Journal ---
const shredBtn = document.getElementById("shred-btn");
const angerInput = document.getElementById("anger-input");
const shredAnimation = document.getElementById("shred-animation");

shredBtn.addEventListener("click", () => {
  if (!angerInput.value.trim()) {
    alert("Write something first!");
    return;
  }
  angerInput.style.display = "none";
  shredBtn.style.display = "none";
  shredAnimation.style.display = "block";

  setTimeout(() => {
    shredAnimation.style.display = "none";
    angerInput.value = "";
    angerInput.style.display = "block";
    shredBtn.style.display = "inline-block";
  }, 3000); 
});
