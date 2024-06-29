// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('restartBtn');
    const messageElement = document.getElementById('message');
    const board = document.getElementById('board');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let gameActive = true;
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const handleCellClick = (event) => {
      const cell = event.target;
      const cellIndex = cell.getAttribute('data-index');
  
      if (boardState[cellIndex] !== null || !gameActive) {
        return;
      }
  
      boardState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
  
      if (checkWinner()) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (!boardState.includes(null)) {
        messageElement.textContent = "It's a tie!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  
    const checkWinner = () => {
      return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] !== null && boardState[a] === boardState[b] && boardState[a] === boardState[c];
      });
    };
  
    const restartGame = () => {
      boardState.fill(null);
      cells.forEach(cell => (cell.textContent = ''));
      currentPlayer = 'X';
      gameActive = true;
      messageElement.textContent = '';
    };
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
  });

  