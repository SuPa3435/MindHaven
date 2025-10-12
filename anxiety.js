// Define tasks linked to image types
const tasks = [
  { text: "Find something yellow", type: "yellow", img: "yellow.png" },
  { text: "Find a fluffy dog", type: "dog", img: "dog.png" },
  { text: "Find a shiny star", type: "star", img: "star.png" },
  { text: "Find something blue", type: "blue", img: "blue.png" },
  { text: "Find a furry cat", type: "cat", img: "cat.png" },
  { text: "Find a cloud", type: "texture", img: "cloud.png" },
  { text: "Find a shiny diamond", type: "object", img: "diamond.png" },
  { text: "Find a green leaf", type: "color", img: "leaf.png" },
  { text: "Find a warm cup of tea", type: "comfort", img: "tea.png" },
  { text: "Find a glowing sun", type: "nature", img: "sun.png" },
];

function generateTasks() {
  const list = document.getElementById("sensory-list");
  const itemArea = document.getElementById("item-area");
  list.innerHTML = "";
  itemArea.innerHTML = "";


  const shuffled = tasks.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  selected.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.type = task.type;
    list.appendChild(li);


    const img = document.createElement("img");
    img.src = task.img;
    img.dataset.type = task.type;


    const paddingLeft = 380; 
    const paddingTop = 80;   

    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;

    const x = paddingLeft + Math.random() * (maxX - paddingLeft);
    const y = paddingTop + Math.random() * (maxY - paddingTop);

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    img.addEventListener("click", () => {
      li.textContent = `${li.textContent} ✔ Found!`;
      img.classList.add("found");
    });

    itemArea.appendChild(img);
  });
}

const sounds = {
  rain: new Audio("rain.mp3"),
  waves: new Audio("waves.mp3"),
  birds: new Audio("birds.mp3"),
  fire: new Audio("fire.mp3")
};

function playSound(type) {
  Object.values(sounds).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });

  sounds[type].loop = true;
  sounds[type].play();
}


document.getElementById("reset-sensory").addEventListener("click", generateTasks);

generateTasks();
