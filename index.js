const roll = document.querySelector("#roll");
const shut = document.querySelector("#shut");
const dice1 = document.querySelector("#dice-1");
const dice2 = document.querySelector("#dice-2");
const roundBox = document.querySelector(".round");
const playerBox = document.querySelector(".playing");
const backdrop = document.querySelector(".backdrop");
const EditPlayersModal = document.querySelector(".edit-players");
const EditPlayersBtn = document.querySelector(".edit-players-btn");
const closeModalBtn = document.querySelector(".edit-players-close");
const EditPlayersForm = document.querySelector(".edit-players form");

const shutItems = document.querySelectorAll(".shut-item");
const dicesStart = document.querySelector(".dices-start");
const dicesItems = document.querySelector(".dices-items");

let diceSum = 0;
let isPlaying = false;
let canRoll = true;
let shuted = false;
let round = 1;
let totalRound = 2;
let playerTurn = 1;
let nextPlayer = playerTurn === 2 ? 1 : playerTurn + 1;

let player1Score = 0;
let player2Score = 0;
let playerOne = "Player 1";
let playerTwo = "Player 2";

shutItems.forEach((item) => {
  item.addEventListener("click", selectShut);
});

roll.addEventListener("click", function () {
  if (canRoll) {
    let random1 = Math.floor(Math.random() * 6) + 1;
    let random2 = Math.floor(Math.random() * 6) + 1;
    rollDiceDisplay();
    dice1.src = `image/dice-${random1}.png`;
    dice2.src = `image/dice-${random2}.png`;

    diceSum = random1 + random2;
    canRoll = false;
  } else {
    alert("You can't roll again! Please shut");
  }
});

let shutScore = 0;
let shuttedSum = 0;

shut.addEventListener("click", function () {
  canRoll = true;
  let shuts = [];
  let shutsSum = 0;

  shutItems.forEach((item) => {
    if (item.classList.contains("selected")) {
      console.log(item.textContent);
      shuts.push(item);
      shutsSum += Number(item.textContent);
      shuttedSum += Number(item.textContent);
    }
  });

  if (shutsSum === diceSum) {
    shuts.forEach((item) => {
      item.classList.add("inactive");
      item.classList.remove("selected");
    });
  } else {
    //calcalate remaining points
    document.querySelectorAll(".shut-item").forEach((item) => {
      if (!item.classList.contains("inactive")) {
        console.log(item.textContent);
        shutScore += Number(item.textContent);
      }
    });

    console.log(shutScore);
    resetGame();

    diceSum = 0;

    if (playerTurn === 1) {
      player1Score += shutScore;
      playerTurn = 2;
    } else if (playerTurn === 2) {
      player2Score += shutScore;
      playerTurn = 1;
      if (round === totalRound) {
        finishGame();
      } else {
        round++;
      }
    }
    updateScores();
    updateGame();
    shutScore = 0;
  }
});

function selectShut(item) {
  if (!item.target.classList.contains("inactive") && !(diceSum === 0)) {
    item.target.classList.toggle("selected");
  }
}

function resetGame() {
  shutItems.forEach((item) => {
    item.classList.remove("inactive");
    item.classList.remove("selected");
  });

  diceSum = 0;
}

function rollDiceDisplay() {
  for (let i = 0; i <= 12; i++) {
    let random = Math.floor(Math.random() * 6) + 1;
    let random2 = Math.floor(Math.random() * 6) + 1;

    dice1.src = `image/dice-${random}.png`;
    dice2.src = `image/dice-${random2}.png`;
  }
}

function updateGame() {
  playerBox.textContent = `Playing:  ${
    playerTurn === 1 ? playerOne : playerTwo
  }`;
  roundBox.textContent = `Round ${round}/${totalRound}`;
}

window.addEventListener("load", function () {
  updateGame();
  updateScores();
  resetGame();
});

function updateScores() {
  console.log(player1Score);
  document.querySelector(
    ".player-one-score"
  ).textContent = `${playerOne} score: ${player1Score}`;
  document.querySelector(
    ".player-two-score"
  ).textContent = `${playerTwo} score: ${player2Score}`;
}

function finishGame() {
  player1Score = 0;
  player2Score = 0;
  round = 1;
  if (player1Score > player2Score) {
    alert(playerTwo + " wins!");
  } else {
    alert(playerOne + " wins!");
  }
}

backdrop.addEventListener("click", closeModal);
EditPlayersBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

EditPlayersForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let name1 = e.target.player1.value;
  let name2 = e.target.player2.value;
  playerOne = name1;
  playerTwo = name2;
  updateGame();
  updateScores();
  closeModal();
});

function closeModal() {
  EditPlayersModal.classList.add("hidden");
  backdrop.classList.add("hidden");
}

function openModal() {
  EditPlayersModal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

window.addEventListener("keydown", function (event) {
  let key = event.keyCode - 49 + 1;

  if (key >= 1 && key <= 9) {
    shutItems.forEach((el) => {
      if (el.textContent === key.toString() && !(diceSum === 0)) {
        el.classList.toggle("selected");
      }
    });
  }
});
