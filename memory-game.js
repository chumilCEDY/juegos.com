// Variables específicas del juego de memoria
let memoryCards = [];
let flippedCards = [];
let moves = 0;
let matchedPairs = 0;
let timer = 0;

// Emojis para el juego de memoria
const memoryEmojis = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉', '🍑'];

// Inicializar juego de memoria
function initializeMemoryGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    
    // Crear pares de cartas
    memoryCards = [...memoryEmojis, ...memoryEmojis];
    
    // Barajar las cartas
    shuffleArray(memoryCards);
    
    // Crear elementos de cartas
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.innerHTML = `
            <div class="front">${emoji}</div>
            <div class="back">?</div>
        `;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    
    // Reiniciar variables del juego
    flippedCards = [];
    moves = 0;
    matchedPairs = 0;
    timer = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = timer;
    
    // Iniciar temporizador
    isMemoryGameActive = true;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (isMemoryGameActive) {
            timer++;
            document.getElementById('timer').textContent = timer;
        }
    }, 1000);
}

// Barajar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Voltear carta en el juego de memoria
function flipCard() {
    // No hacer nada si la carta ya está volteada o emparejada
    if (this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }
    
    // No permitir voltear más de 2 cartas a la vez
    if (flippedCards.length >= 2) {
        return;
    }
    
    // Voltear la carta
    this.classList.add('flipped');
    flippedCards.push(this);
    
    // Comprobar si hay dos cartas volteadas
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        
        // Comprobar si las cartas coinciden
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Cartas coinciden
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;
            
            // Comprobar si el juego ha terminado
            if (matchedPairs === memoryEmojis.length) {
                setTimeout(() => {
                    alert(`¡Felicidades! Has completado el juego en ${moves} movimientos y ${timer} segundos.`);
                    isMemoryGameActive = false;
                    clearInterval(timerInterval);
                }, 500);
            }
        } else {
            // Cartas no coinciden, voltear de nuevo después de un tiempo
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// Reiniciar juego de memoria
function resetMemoryGame() {
    initializeMemoryGame();
}