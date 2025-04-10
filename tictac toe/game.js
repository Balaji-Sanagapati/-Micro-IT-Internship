// game.js
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const winnerMessage = document.getElementById("winner-message");
const playerTurnSpan = document.getElementById("player-turn").querySelector("span");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Get player names from localStorage
const player1 = localStorage.getItem('player1');
const player2 = localStorage.getItem('player2');

// Set initial player info
playerTurnSpan.textContent = player1 + " (X)";

// Check for winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            setTimeout(() => {
                winnerMessage.textContent = `${currentPlayer === "X" ? player1 : player2} Wins!`;
                winnerMessage.style.display = "block";
                highlightWinningCells(pattern);
            }, 100);
            isGameActive = false;
            return true;
        }
    }

    if (!gameBoard.includes("")) {
        setTimeout(() => alert("It's a draw!"), 100);
        isGameActive = false;
        return true;
    }

    return false;
};

// Highlight winning cells
const highlightWinningCells = (pattern) => {
    pattern.forEach(index => {
        cells[index].classList.add("winner");
    });
};

// Handle cell clicks
const handleCellClick = (index) => {
    if (gameBoard[index] === "" && isGameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerTurnSpan.textContent = currentPlayer === "X" ? player1 + " (X)" : player2 + " (O)";
        }
    }
};

// Restart the game
const restartGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    winnerMessage.style.display = "none";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
    playerTurnSpan.textContent = player1 + " (X)";
};

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
});

restartButton.addEventListener("click", restartGame);
