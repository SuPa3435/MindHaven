const affirmations = [
    { text: "You are capable of amazing things!", font: "'Lobster', cursive" },
    { text: "You are more than enough, just as you are.", font: "'Playfair Display', serif" },
    { text: "Take it one step at a time — you’re doing great.", font: "'Roboto', sans-serif" },
    { text: "Your kindness makes a difference in the world.", font: "'Pacifico', cursive" },
    { text: "It’s okay to rest. You deserve peace.", font: "'Indie Flower', cursive" },
    { text: "Your feelings are valid and important.", font: "'Shadows Into Light', cursive" },
    { text: "You are resilient, even when it’s hard.", font: "'Roboto', sans-serif" },
    { text: "Someone out there is grateful for you.", font: "'Pacifico', cursive" },
    { text: "This moment will pass — brighter days are ahead.", font: "'Playfair Display', serif" },
    { text: "Your presence brings comfort to others.", font: "'Indie Flower', cursive" },
    { text: "You are worthy of love and good things.", font: "'Lobster', cursive" },
    { text: "Progress, not perfection, is what matters.", font: "'Roboto', sans-serif" },
    { text: "You are learning and growing every day.", font: "'Shadows Into Light', cursive" },
    { text: "Even small wins are worth celebrating.", font: "'Pacifico', cursive" },
    { text: "You have the strength to face today.", font: "'Playfair Display', serif" }
];

const affirmationText = document.getElementById("affirmationText");

function showRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const chosen = affirmations[randomIndex];

    affirmationText.textContent = chosen.text;
    affirmationText.style.fontFamily = chosen.font;
}

function scheduleNextAffirmation() {
    const delay = 30000 + Math.random() * 15000; 
    setTimeout(() => {
        showRandomAffirmation();
        scheduleNextAffirmation();
    }, delay);
}

showRandomAffirmation();
scheduleNextAffirmation();

let offsetX, offsetY, draggedCard = null;

document.querySelectorAll(".draggable").forEach(card => {
    card.addEventListener("mousedown", (e) => {
        draggedCard = card;
        offsetX = e.clientX - card.getBoundingClientRect().left;
        offsetY = e.clientY - card.getBoundingClientRect().top;
        card.style.cursor = "grabbing";
    });
});

document.addEventListener("mousemove", (e) => {
    if (draggedCard) {
        draggedCard.style.left = `${e.clientX - offsetX}px`;
        draggedCard.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    if (draggedCard) draggedCard.style.cursor = "grab";
    draggedCard = null;
});

