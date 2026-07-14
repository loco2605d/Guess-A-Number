let click=0
const btn=document.querySelector(".btn");
const resetbtn=document.querySelector(".resetbtn");
const lastBox = document.querySelector(".last");
const countBox = document.querySelector(".count");
const rangeBox = document.querySelector(".range");
const guessNum=document.querySelector("#input")
const winScreen = document.querySelector('.win');
let randomNumber=Math.floor(Math.random()*100+1)

function win(){
    
     rangeBox.innerText="You Win "
     btn.disabled=1
     btn.style.backgroundColor="red"
     winScreen.classList.add('winshow');
}


function game(randomNumber) {
  const guess = Number(guessNum.value);
  const difference = randomNumber - guess;

  

  // 1. Validate Input Range
  if (guess < 0 || guess > 100 || isNaN(guess)) {
    alert("Enter a valid Number between 0 and 100!");
    return; // Stop execution if input is invalid
  }

  // 2. Check Win Condition
  if (guess === randomNumber) {
    win();
    return;
  }

  // 3. Provide Hints Based on Difference
  if (difference < -10) {
    // Example: Target 50, Guess 70 -> Diff = -20
    
    rangeBox.innerText = "Too Big";
  } else if (difference >= -10 && difference < 0) {
    // Example: Target 50, Guess 55 -> Diff = -5
    
    rangeBox.innerText = "Close But Big";
  } else if (difference > 0 && difference <= 10) {
    // Example: Target 50, Guess 45 -> Diff = 5
    rangeBox.innerText = "Close but small";
  } else if (difference > 10) {
    // Example: Target 50, Guess 20 -> Diff = 30
    rangeBox.innerText = "Too Small";
  }
}
       
btn.addEventListener("click",()=>{
        click=click+1;   
        countBox.innerText=`Guesses:${click}`
        game(randomNumber)

})
resetbtn.addEventListener("click",()=>{
    randomNumber= Math.floor(Math.random() * 100) + 1;
    click=0;
    guessNum.value = '';
    btn.disabled = false;
    guessNum.disabled = false;
    countBox.innerText=`Guesses:${click}`
    rangeBox.innerText="Good Luck!"
    winScreen.classList.remove('winshow');
    btn.style.backgroundColor = "";
    
})