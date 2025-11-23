// rps-game.js - Lógica específica del juego Piedra, Papel, Tijera

// Variables para Piedra, Papel, Tijera
let gameMode = 'twoPlayers'; // 'twoPlayers' o 'vsComputer'
let player1Choice = null;
let player2Choice = null;
let player1Score = 0;
let player2Score = 0;
let drawScore = 0;
let roundResult = '';
let isGameActive = true;
let currentPlayer = 'player1';

// Inicializar juego de Piedra, Papel, Tijera
function initializeRPSGame() {
    player1Choice = null;
    player2Choice = null;
    player1Score = 0;
    player2Score = 0;
    drawScore = 0;
    roundResult = '';
    isGameActive = true;
    currentPlayer = 'player1';
    
    // Actualizar la interfaz
    document.getElementById('player1-choice').textContent = '?';
    document.getElementById('player2-choice').textContent = '?';
    document.getElementById('round-result').textContent = '';
    document.getElementById('score-player1').textContent = player1Score;
    document.getElementById('score-player2').textContent = player2Score;
    document.getElementById('score-draw').textContent = drawScore;
    
    // Habilitar botones
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.disabled = false;
    });
    
    // Actualizar nombres según el modo de juego
    updatePlayerNames();
}

// Establecer modo de juego
function setGameMode(mode) {
    gameMode = mode;
    
    // Actualizar botones de modo
    document.getElementById('two-players-mode').classList.toggle('active', mode === 'twoPlayers');
    document.getElementById('vs-computer-mode').classList.toggle('active', mode === 'vsComputer');
    
    // Reiniciar el juego
    initializeRPSGame();
}

// Actualizar nombres de jugadores según el modo
function updatePlayerNames() {
    if (gameMode === 'twoPlayers') {
        document.getElementById('player1-name').textContent = 'Jugador 1';
        document.getElementById('player2-name').textContent = 'Jugador 2';
        document.getElementById('player1-score-label').textContent = 'Jugador 1';
        document.getElementById('player2-score-label').textContent = 'Jugador 2';
        
        // Mostrar botones para el jugador 2
        document.getElementById('player2-choices').style.display = 'flex';
    } else {
        document.getElementById('player1-name').textContent = 'Jugador';
        document.getElementById('player2-name').textContent = 'Máquina';
        document.getElementById('player1-score-label').textContent = 'Jugador';
        document.getElementById('player2-score-label').textContent = 'Máquina';
        
        // Ocultar botones para el jugador 2
        document.getElementById('player2-choices').style.display = 'none';
    }
}

// Realizar una elección en Piedra, Papel, Tijera
function makeChoice(choice, player) {
    if (!isGameActive) return;
    
    // Asignar la elección al jugador correspondiente
    if (player === 'player1') {
        player1Choice = choice;
        document.getElementById('player1-choice').textContent = getChoiceEmoji(choice);
        
        // Deshabilitar botones del jugador 1
        const player1Buttons = document.querySelectorAll('#player1-choices .choice-btn');
        player1Buttons.forEach(button => {
            button.disabled = true;
        });
        
        // Si es modo contra la máquina, la máquina elige automáticamente
        if (gameMode === 'vsComputer') {
            setTimeout(() => {
                makeComputerChoice();
            }, 500);
        }
    } else if (player === 'player2' && gameMode === 'twoPlayers') {
        player2Choice = choice;
        document.getElementById('player2-choice').textContent = getChoiceEmoji(choice);
        
        // Deshabilitar botones del jugador 2
        const player2Buttons = document.querySelectorAll('#player2-choices .choice-btn');
        player2Buttons.forEach(button => {
            button.disabled = true;
        });
    }
    
    // Si ambos jugadores han hecho su elección, determinar el resultado
    if (player1Choice && (player2Choice || gameMode === 'vsComputer')) {
        setTimeout(determineRoundResult, 500);
    }
}

// La máquina elige una opción aleatoria
function makeComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    player2Choice = choices[randomIndex];
    document.getElementById('player2-choice').textContent = getChoiceEmoji(player2Choice);
}

// Obtener emoji correspondiente a la elección
function getChoiceEmoji(choice) {
    switch(choice) {
        case 'rock': return '✊';
        case 'paper': return '✋';
        case 'scissors': return '✌️';
        default: return '?';
    }
}

// Determinar el resultado de la ronda
function determineRoundResult() {
    if (!player1Choice || !player2Choice) return;
    
    // Determinar el ganador
    if (player1Choice === player2Choice) {
        roundResult = '¡Empate!';
        drawScore++;
    } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'paper' && player2Choice === 'rock') ||
        (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
        roundResult = '¡Jugador 1 gana!';
        player1Score++;
    } else {
        roundResult = gameMode === 'twoPlayers' ? '¡Jugador 2 gana!' : '¡La máquina gana!';
        player2Score++;
    }
    
    // Actualizar la interfaz
    document.getElementById('round-result').textContent = roundResult;
    document.getElementById('score-player1').textContent = player1Score;
    document.getElementById('score-player2').textContent = player2Score;
    document.getElementById('score-draw').textContent = drawScore;
    
    // Comprobar si hay un ganador del juego
    if (player1Score >= 5 || player2Score >= 5) {
        isGameActive = false;
        let winnerMessage = '';
        
        if (player1Score >= 5) {
            winnerMessage = gameMode === 'twoPlayers' ? '¡Jugador 1 gana el juego!' : '¡Felicidades! Has ganado el juego!';
        } else {
            winnerMessage = gameMode === 'twoPlayers' ? '¡Jugador 2 gana el juego!' : '¡La máquina gana el juego!';
        }
        
        setTimeout(() => {
            alert(winnerMessage);
            resetRPSGame();
        }, 1000);
    } else {
        // Preparar para la siguiente ronda
        setTimeout(() => {
            resetRound();
        }, 2000);
    }
}

// Reiniciar la ronda
function resetRound() {
    player1Choice = null;
    player2Choice = null;
    
    document.getElementById('player1-choice').textContent = '?';
    document.getElementById('player2-choice').textContent = '?';
    document.getElementById('round-result').textContent = '';
    
    // Habilitar botones nuevamente
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.disabled = false;
    });
}

// Reiniciar juego de Piedra, Papel, Tijera
function resetRPSGame() {
    initializeRPSGame();
}