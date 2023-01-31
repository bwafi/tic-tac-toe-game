let playerText = document.querySelector('.playerText');
const restartaBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let spaces = Array(9).fill(null);

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winnerColor');

const XText = 'X';
const OText = 'O';
let currentPlayer = XText;

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    if (playerHasWon() !== false) {
      playerText = `${currentPlayer} Has Won!`;
      let winningBlocks = playerHasWon();

      winningBlocks.map(box => (boxes[box].style.backgroundColor = winnerIndicator));

      return;
    }

    currentPlayer = currentPlayer == XText ? OText : XText;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartaBtn.addEventListener('click', restart);

function restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerHTML = '';
    box.style.backgroundColor = '';
  });

  currentPlayer = XText;
}

startGame();
