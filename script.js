const gameBoard = document.querySelector(".grid__game");
const gameSquare = document.querySelectorAll(".game__box");
const playerSpan = document.querySelector(".player");
const winnerText = document.querySelector(".winner");
const btnReset = document.querySelector(".btn__reset");

let arrayBoard = Array(9).fill(null);
let player = true;
let gameFinished = false;

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("DOMContentLoaded", (e) => {
  playerSpan.textContent = player ? "X" : "O";
});

gameSquare.forEach((square, index) => {
  square.addEventListener("click", (e) => {
    handleSquareClick(square, index);
  });
});

const handleSquareClick = (square, index) => {
  if (arrayBoard[index] != null || gameFinished) return;

  const playerGame = player ? "X" : "O";
  arrayBoard[index] = playerGame;
  square.textContent = arrayBoard[index];

  const winner = winnerPlayer(arrayBoard);

  if (winner) {
    winnerText.textContent = "El ganador es: " + winner;
    gameFinished = true;
    return;
  } else if (checkDraw(arrayBoard)) {
    gameFinished = false;
    winnerText.textContent = "EMPATE";
    return;
  }

  changePlayer();
};

const changePlayer = () => {
  player = !player;
  playerSpan.textContent = player ? "X" : "O";
};

const winnerPlayer = (boardToCheck) => {
  for (const combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  return null;
};

const checkDraw = (board) => {
  return board.every((cell) => cell !== null) && winnerPlayer(board) === null;
};

const resetGame = () => {
  arrayBoard = Array(9).fill(null);
  gameFinished = false;
  winnerText.textContent = "";

  gameSquare.forEach((square, index) => {
    square.textContent = "";
  });
};

btnReset.addEventListener("click", (e) => {
  resetGame();
});
