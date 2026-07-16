let click = 0;
const btn = document.querySelector(".btn");
const resetbtn = document.querySelector(".resetbtn");
const hintbtn = document.querySelector(".hintbtn");
const lastBox = document.querySelector(".last");
const countBox = document.querySelector(".count");
const rangeBox = document.querySelector(".range");
const guessNum = document.querySelector("#input");
const winScreen = document.querySelector(".win");

let randomNumber = Math.floor(Math.random() * 100) + 1;

function win() {
  rangeBox.innerText = "You Win ";
  btn.disabled = true;
  guessNum.disabled = true;
  hintbtn.disabled = true;
  btn.style.backgroundColor = "red";
  winScreen.classList.add("winshow");
}

function game() {
  const value = guessNum.value.trim();

  // 1. Validate Input Presence & Range
  if (value === "" || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100) {
    alert("Enter a valid Number between 0 and 100!");
    return; // Stop execution if input is invalid
  }

  const guess = Number(value);
  const difference = randomNumber - guess;

  // Count only valid guesses
  click = click + 1;
  countBox.innerText = `Guesses:${click}`;

  // 2. Check Win Condition
  if (guess === randomNumber) {
    win();
    return;
  }

  // 3. Provide Hints Based on Difference
  if (difference < -10) {
    rangeBox.innerText = "Too Big";
  } else if (difference >= -10 && difference < 0) {
    rangeBox.innerText = "Close But Big";
  } else if (difference > 0 && difference <= 10) {
    rangeBox.innerText = "Close but small";
  } else if (difference > 10) {
    rangeBox.innerText = "Too Small";
  }
}

btn.addEventListener("click", () => {
  game();
});

hintbtn.addEventListener("click", () => {
  const lower = Math.floor((randomNumber - 1) / 10) * 10;
  const upper = lower + 10;
  rangeBox.innerText = `Number is between ${lower} and ${upper}`;

  // trigger the fill animation
  hintbtn.classList.add("filling");
  hintbtn.disabled = true; // one hint per round

  // hide the hint text after 3 seconds, but only if nothing else changed it
  setTimeout(() => {
    if (rangeBox.innerText.startsWith("Number is between")) {
      rangeBox.innerText = "Good Luck!";
    }
  }, 3000);
});

resetbtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  click = 0;
  guessNum.value = "";
  btn.disabled = false;
  guessNum.disabled = false;
  hintbtn.disabled = false;
  hintbtn.classList.remove("filling"); // reset fill animation for next round
  countBox.innerText = `Guesses:${click}`;
  rangeBox.innerText = "Good Luck!";
  winScreen.classList.remove("winshow");
  btn.style.backgroundColor = "";
});