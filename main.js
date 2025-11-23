// main.js - Funciones comunes de navegación

// Variables globales compartidas
let currentPage = 'home';

// Mostrar página principal
function showHome() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('memory-game').style.display = 'none';
    document.getElementById('rps-game').style.display = 'none';
    currentPage = 'home';
}

// Mostrar juego específico
function showGame(game) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('memory-game').style.display = 'none';
    document.getElementById('rps-game').style.display = 'none';
    
    if (game === 'memory') {
        document.getElementById('memory-game').style.display = 'block';
        currentPage = 'memory';
        initializeMemoryGame();
    } else if (game === 'rps') {
        document.getElementById('rps-game').style.display = 'block';
        currentPage = 'rps';
        initializeRPSGame();
    }
}

// Inicializar la página al cargar
document.addEventListener('DOMContentLoaded', () => {
    showHome();
});