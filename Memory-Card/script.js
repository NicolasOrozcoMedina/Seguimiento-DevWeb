// Elementos del DOM
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

// Variables del juego
let cards;
let interval;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let winCount = 0;

// Array de imágenes
const items = [
    { name: "bee", image: "assets/bee.png" },
    { name: "crocodile", image: "assets/crocodile.png" },
    { name: "macaw", image: "assets/macaw.png" },
    { name: "gorilla", image: "assets/gorilla.png" },
    { name: "tiger", image: "assets/tiger.png" },
    { name: "monkey", image: "assets/monkey.png" },
    { name: "chameleon", image: "assets/chameleon.png" },
    { name: "piranha", image: "assets/piranha.png" },
    { name: "anaconda", image: "assets/anaconda.png" },
    { name: "sloth", image: "assets/sloth.png" },
    { name: "cockatoo", image: "assets/cockatoo.png" },
    { name: "toucan", image: "assets/toucan.png" },
];

// Temporizador
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Tiempo:</span>${minutesValue}:${secondsValue}`;
};

// Contador de movimientos
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Pasos:</span>${movesCount}`;
};

// Generar cartas aleatorias
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

// Barajar cartas
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Generar matriz del juego
const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues = shuffleArray(cardValues);
    
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
            <div class="card-container" data-card-value="${cardValues[i].name}">
                <div class="card-before">?</div>
                <div class="card-after">
                    <img src="${cardValues[i].image}" class="image"/>
                </div>
            </div>
        `;
    }
    
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    cards = document.querySelectorAll(".card-container");
    cards.forEach(card => card.addEventListener("click", flipCard));
};

// Voltear carta
const flipCard = () => {
    if (lockBoard || this === firstCard || this.classList.contains("matched")) return;
    
    this.classList.add("flipped");
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;
    movesCounter();
    checkForMatch();
};

// Verificar coincidencia
const checkForMatch = () => {
    const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
    
    if (isMatch) {
        disableCards();
        winCount++;
        if (winCount === (cards.length / 2)) {
            stopGame();
            result.innerHTML = `<h2>Ganaste SIIIUUUU</h2><h4>Pasos: ${movesCount}</h4><h4>Tiempo: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}</h4>`;
        }
    } else {
        unflipCards();
    }
};

// Deshabilitar cartas coincidentes
const disableCards = () => {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
};

// Voltear cartas no coincidentes
const unflipCards = () => {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
};

// Reiniciar tablero
const resetBoard = () => {
    [firstCard, secondCard, lockBoard] = [null, null, false];
};

// Iniciar juego
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    moves.innerHTML = `<span>Pasos:</span> ${movesCount}`;
    interval = setInterval(timeGenerator, 1000);
    initializer();
});

// Detener juego
const stopGame = () => {
    clearInterval(interval);
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
};

stopButton.addEventListener("click", stopGame);

// Inicializar juego
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    resetBoard();
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};