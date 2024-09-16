const X_CLASS = 'X';
const O_CLASS = 'O';
let oTurn;

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartBtn');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
startGame();

// Restart game when the restart button is clicked
restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    messageElement.innerText = "X's turn";
    
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.classList.remove('win'); // Remove win highlighting
        cell.textContent = ''; // Clear text content
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        highlightWinningCells(currentClass);  // Highlight winning cells
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setMessage();
    }
}

// Place mark (X or O) in the clicked cell and show it visually
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass; // Set the text content to "X" or "O"
}

// Swap between X's and O's turn
function swapTurns() {
    oTurn = !oTurn;
}

// Set the message to show whose turn it is
function setMessage() {
    messageElement.innerText = `${oTurn ? "O's" : "X's"} turn`;
}

// Check if the current player has won
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for a draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

// Highlight the winning cells
function highlightWinningCells(currentClass) {
    WINNING_COMBINATIONS.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains(currentClass))) {
            combination.forEach(index => cells[index].classList.add('win')); // Add win class to the winning cells
        }
    });
}

// End the game
function endGame(draw, winner) {
    if (draw) {
        messageElement.innerText = "It's a draw!";
    } else {
        messageElement.innerText = `${winner} wins!`;
    }
}
