const game = document.querySelector(".grid__game");
const gridSquare = document.querySelectorAll(".game__box");
const playerSpan = document.querySelector(".player");
const winnerText = document.querySelector(".winner");
const btnReset = document.querySelector(".btn__reset");
let Square = Array(9).fill(null);
let player = true;
let gameFinished = false;
let squaresX = [];

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

const changePlayer = () => {
  // player ? (player = false) : (player = true);
  player = !player;
  playerSpan.textContent = player ? "X" : "O";
};

const emptyGame = (boardToCheck) => {
  for (const combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo;
    if (boardToCheck[a] !== boardToCheck[b] && boardToCheck)
      return console.log("Empate");
  }
};

const winnerPlayer = (boardToCheck) => {
  for (const combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      // winnerText.textContent = boardToCheck[a];

      return boardToCheck[a];
    }
  }

  return null;
};

const resetGame = () => {
  Square = Array(9).fill(null);
  gameFinished = false;
  winnerText.textContent = "";

  gridSquare.forEach((square, index) => {
    square.textContent = "";
  });
};

const checkDraw = (board) => {
  return board.every((cell) => cell !== null) && winnerPlayer(board) === null;
};

gridSquare.forEach((square, index) => {
  square.addEventListener("click", (e) => {
    if (Square[index] != null || gameFinished) return;

    const playerGame = player ? "X" : "O";
    Square[index] = playerGame;
    square.textContent = Square[index];

    const winner = winnerPlayer(Square);

    if (winner) {
      winnerText.textContent = "El ganador es: " + winner;
      gameFinished = true;
      return;
    } else if (checkDraw(Square)) {
      gameFinished = false;
      winnerText.textContent = "EMPATE";
      return;
    }

    changePlayer();
  });
});

btnReset.addEventListener("click", (e) => {
  resetGame();
});
