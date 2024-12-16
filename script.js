"use strict";

//Generate random number between 1 - 20
let randomNumber = Math.trunc(Math.random() * 20 + 1);
const revealNumber = document.querySelector(".number");
let score = Number(document.querySelector(".score").textContent);
let attempts = Number(document.querySelector(".attempts").textContent);
let highscore = Number(document.querySelector(".highscore").textContent);
const checkBtn = document.querySelector(".check");
document.querySelector(".highscore").textContent = localStorage.getItem("highscore");

if (localStorage.getItem("highscore") === null) {
    localStorage.setItem("highscore", 0);
}


//Function to display a message in selected field
function displayMessage (content) {
    document.querySelector(".message").textContent = content;
}

//Make a guess
document.querySelector(".check").addEventListener('click', ()=>{
    // Convert guess input to number
    const guess = Number(document.querySelector(".guess").value);
    // Logic for empty input
    if(!guess) {
        displayMessage("⛔ No input!");
    }
    //Logic for correct entry
    else if (guess === randomNumber) {
        revealNumber.textContent = randomNumber;
        setTimeout(() => {
            revealNumber.textContent = "?";
            document.querySelector("body").classList.remove("win");
        }, 2000);
        displayMessage("🎉 You guessed correctly!");
        score++;
        attempts--;
        document.querySelector(".score").textContent = score;
        document.querySelector(".attempts").textContent = attempts;
        document.querySelector("body").classList.add("win");
        randomNumber = Math.trunc(Math.random() * 20 + 1);
    }
    else if (guess !== randomNumber) {
        displayMessage(guess < randomNumber ? "❄Too low!" : "🚀Too high!");
        attempts--;
        document.querySelector(".score").textContent = score;
        document.querySelector(".attempts").textContent = attempts;
    }
    if (attempts === 0) {
        if (highscore < score) {
            highscore = score;
            document.querySelector(".highscore").textContent = highscore;
            localStorage.setItem("highscore", highscore);
        }
        else if (highscore === score) {
            highscore = score;
            document.querySelector(".highscore").textContent = highscore;
            localStorage.setItem("highscore", highscore);
        } 
        if (highscore > score ) {
            highscore = Number(localStorage.getItem('highscore'));
            document.querySelector(".highscore").textContent = highscore;
        }
        checkBtn.classList.add("disabled");
        displayMessage(`Game Over! Your score is ${score}`);
    }
})

// Reset Game
document.querySelector(".again").addEventListener('click', function() {
    score = 0;
    attempts = 20;
    randomNumber = Math.trunc(Math.random() * 20 + 1);
    document.querySelector("body").style.backgroundColor = "#612d00";
    displayMessage("Start guessing...");
    document.querySelector(".guess").value = "";
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".attempts").textContent = attempts;
});