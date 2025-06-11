// Variables del juego
let p1Score = 0;
let p2Score = 0;
let winningScore = parseInt(document.getElementById('playto').value);
let gameOver = false;

// Elementos del DOM
const p1Button = document.getElementById('p1Button');
const p2Button = document.getElementById('p2Button');
const resetButton = document.getElementById('reset');
const p1Display = document.getElementById('p1Display');
const p2Display = document.getElementById('p2Display');
const playtoSelect = document.getElementById('playto');

// Event Listeners
p1Button.addEventListener('click', () => {
    if (!gameOver) {
        p1Score++;
        updateScores();
        checkWinner();
    }
});

p2Button.addEventListener('click', () => {
    if (!gameOver) {
        p2Score++;
        updateScores();
        checkWinner();
    }
});

resetButton.addEventListener('click', resetGame);

playtoSelect.addEventListener('change', () => {
    winningScore = parseInt(playtoSelect.value);
    resetGame();
});

// Funciones del juego
function updateScores() {
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
}

function checkWinner() {
    if (p1Score >= winningScore || p2Score >= winningScore) {
        // Verificar diferencia de al menos 2 puntos
        if (Math.abs(p1Score - p2Score) >= 2) {
            gameOver = true;
            
            // Cambiar colores de los marcadores
            if (p1Score > p2Score) {
                p1Display.classList.add('has-text-success');
                p2Display.classList.add('has-text-danger');
            } else {
                p2Display.classList.add('has-text-success');
                p1Display.classList.add('has-text-danger');
            }
            
            // Deshabilitar botones
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
    }
}

function resetGame() {
    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    
    // Resetear displays
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    
    // Quitar clases de color
    p1Display.classList.remove('has-text-success', 'has-text-danger');
    p2Display.classList.remove('has-text-success', 'has-text-danger');
    
    // Habilitar botones
    p1Button.disabled = false;
    p2Button.disabled = false;
}