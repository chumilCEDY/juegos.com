// Variables globales compartidas
let currentPage = 'home';

// Mostrar página principal
function showHome() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('memory-game').style.display = 'none';
    document.getElementById('rps-game').style.display = 'none';
    currentPage = 'home';
    
    // Detener temporizador si está activo
    if (typeof timerInterval !== 'undefined') {
        clearInterval(timerInterval);
        if (typeof isMemoryGameActive !== 'undefined') {
            isMemoryGameActive = false;
        }
    }
}

// Mostrar juego específico
function showGame(game) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('memory-game').style.display = 'none';
    document.getElementById('rps-game').style.display = 'none';
    
    if (game === 'memory') {
        document.getElementById('memory-game').style.display = 'block';
        currentPage = 'memory';
        if (typeof initializeMemoryGame !== 'undefined') {
            initializeMemoryGame();
        }
    } else if (game === 'rps') {
        document.getElementById('rps-game').style.display = 'block';
        currentPage = 'rps';
        if (typeof initializeRPSGame !== 'undefined') {
            initializeRPSGame();
        }
    }
}

// Inicializar la página al cargar
document.addEventListener('DOMContentLoaded', () => {
    showHome();
});