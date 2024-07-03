let playerTurn = '';
let start = false;
let win = false;
let tie = false;
let winPlayer = '';
let gameOver = false;

const gameArray = [{
  cellNo: 1,
  cellValue: ''
}, {
  cellNo: 2,
  cellValue: ''
}, {
  cellNo: 3,
  cellValue: ''
}, {
  cellNo: 4,
  cellValue: ''
}, {
  cellNo: 5,
  cellValue: ''
}, {
  cellNo: 6,
  cellValue: ''
}, {
  cellNo: 7,
  cellValue: ''
}, {
  cellNo: 8,
  cellValue: ''
}, {
  cellNo: 9,
  cellValue: ''
},];

let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
  score = [{
    win: 0,
    lose: 0
  }, {
    win: 0,
    lose: 0
  }];
}

changeTurn();
updateScore();

function playGame(cell) {
  let cellElement = document.querySelector(`.js-btn-${cell}`);

  if (cellElement.innerHTML === 'X' || cellElement.innerHTML === 'O') {
    checkReset();
  }
  else {
    if (!gameOver) {
      cellElement.innerHTML = playerTurn;

      // gameArray.forEach((value) => {
      //   if (value.cellNo === cell) {
      //     value.cellValue = playerTurn;
      //     return;
      //   }
      // });

      for (let value of gameArray) {
        if (value.cellNo === cell) {
          value.cellValue = playerTurn;
          break;
        }
      }

      checkWin();
      checkTie();
      if (!win) {
        if (!tie) {
          changeTurn();
        }
        else {
          gameOver = true;
          changeTurn();
          declareResult();
          return;
        }
      }
      else {
        gameOver = true;
        changeTurn();
        declareResult();
        return;
      }
    }
  }
}


function checkWin() {
  if ((gameArray[0].cellValue === gameArray[1].cellValue) && (gameArray[1].cellValue === gameArray[2].cellValue) && (gameArray[0].cellValue != '')) {
    winPlayer = gameArray[0].cellValue;
    win = true;
  }
  else if ((gameArray[3].cellValue === gameArray[4].cellValue) && (gameArray[4].cellValue === gameArray[5].cellValue) && (gameArray[3].cellValue != '')) {
    winPlayer = gameArray[3].cellValue;
    win = true;
  }
  else if ((gameArray[6].cellValue === gameArray[7].cellValue) && (gameArray[7].cellValue === gameArray[8].cellValue) && (gameArray[6].cellValue != '')) {
    winPlayer = gameArray[6].cellValue;
    win = true;
  }
  else if ((gameArray[0].cellValue === gameArray[3].cellValue) && (gameArray[3].cellValue === gameArray[6].cellValue) && (gameArray[0].cellValue != '')) {
    winPlayer = gameArray[0].cellValue;
    win = true;
  }
  else if ((gameArray[1].cellValue === gameArray[4].cellValue) && (gameArray[4].cellValue === gameArray[7].cellValue) && (gameArray[1].cellValue != '')) {
    winPlayer = gameArray[1].cellValue;
    win = true;
  }
  else if ((gameArray[2].cellValue === gameArray[5].cellValue) && (gameArray[5].cellValue === gameArray[8].cellValue) && (gameArray[2].cellValue != '')) {
    winPlayer = gameArray[2].cellValue;
    win = true;
  }
  else if ((gameArray[0].cellValue === gameArray[4].cellValue) && (gameArray[4].cellValue === gameArray[8].cellValue) && (gameArray[0].cellValue != '')) {
    winPlayer = gameArray[0].cellValue;
    win = true;
  }
  else if ((gameArray[2].cellValue === gameArray[4].cellValue) && (gameArray[4].cellValue === gameArray[6].cellValue) && (gameArray[2].cellValue != '')) {
    winPlayer = gameArray[2].cellValue;
    win = true;
  }
  else {
    console.log("no");
  }
}

function declareResult() {
  if (win) {
    let winPlayerName = '';

    if (winPlayer === 'X') {
      winPlayerName = 'Player 1';
      score[0].win += 1;
      score[1].lose += 1;
    }
    else {
      winPlayerName = 'Player 2';
      score[1].win += 1;
      score[0].lose += 1;
    }

    const resultElement = document.querySelector('.js-result-display');
    resultElement.innerHTML =
      `
    <div result-info>
    <span class="win-player-icon">${winPlayer}</span>
    <span class="other-text">WIN</span>
    </div>
    <div class="win-player-name">(${winPlayerName})</div>
    `;
    updateScore();
  }
  else if (tie) {
    const resultElement = document.querySelector('.js-result-display');
    resultElement.innerHTML =
      `
    <div class="result-tie">GAME TIE</div>
    `;
    updateScore();
  }

}

const checkTie = () => {
  if ((gameArray[0].cellValue !== '') &&
    (gameArray[1].cellValue !== '') &&
    (gameArray[2].cellValue !== '') &&
    (gameArray[3].cellValue !== '') &&
    (gameArray[4].cellValue !== '') &&
    (gameArray[5].cellValue !== '') &&
    (gameArray[6].cellValue !== '') &&
    (gameArray[7].cellValue !== '') &&
    (gameArray[8].cellValue !== '')) {
    tie = true;
  }
}

function changeTurn() {
  let playerName = '';
  if (gameOver) {
    playerName = '';
    playerTurn = '';
  }
  else if (!start) {
    playerTurn = 'X';
    playerName = '(Player 1)';
    start = true;
  }
  else if (playerTurn === 'X') {
    playerTurn = 'O';
    playerName = '(Player 2)';
  }
  else {
    playerTurn = 'X';
    playerName = '(Player 1)';
  }
  document.querySelector('.js-turn-icon').innerHTML = playerTurn;
  document.querySelector('.js-turn-player-name').innerHTML = playerName;
}

function updateScore() {
  let scoreElementPlayer1 = document.querySelector('.js-score-info-player1');
  let scoreElementPlayer2 = document.querySelector('.js-score-info-player2');

  scoreElementPlayer1.innerHTML =
    `
  <div class="player-score-info">Win : ${score[0].win}</div>
  <div class="player-score-info">Lose : ${score[0].lose}</div>
  `;
  scoreElementPlayer2.innerHTML =
    `
  <div class="player-score-info">Win : ${score[1].win}</div>
  <div class="player-score-info">Lose : ${score[1].lose}</div>
  `;

  localStorage.setItem('score', JSON.stringify(score));

  console.log(JSON.stringify(score));
}

document.querySelector('.js-new-game-btn').addEventListener('click', () => {
  console.log('yespp');
  startNewGame();
});

function startNewGame() {
  gameArray.forEach((value, index) => {
    value.cellValue = '';
    console.log(value);
  });

  for (let i = 1; i <= 9; i++) {
    document.querySelector(`.js-btn-${i}`).innerHTML = '';
  }

  const resultElement = document.querySelector('.js-result-display');
  resultElement.innerHTML = '';

  gameOver = false;
  win = false;
  tie = false;
  start = false;

  changeTurn();
}

document.querySelector('.js-reset-score-btn').addEventListener('click', () => {
  resetScore();
});


let reset = true;
function resetScore() {

  if (reset) {
    document.querySelector('.js-confirmation').innerHTML +=
      `
      <span class="text-confirm">Do you want to continue to reset</span>
      <button class="js-yes-btn yes-btn"> Yes </button>
      <button class="js-no-btn no-btn"> No </button>
    `;
    reset = false;
  }

  document.querySelector('.js-yes-btn').addEventListener('click', () => {
    score[0].win = 0;
    score[1].win = 0;
    score[0].lose = 0;
    score[1].lose = 0;
    updateScore();
    document.querySelector('.js-confirmation').innerHTML = '';
    startNewGame();
    reset = true;
  });

  document.querySelector('.js-no-btn').addEventListener('click', () => {
    document.querySelector('.js-confirmation').innerHTML = '';
    startNewGame();
    reset = true;
  });
}