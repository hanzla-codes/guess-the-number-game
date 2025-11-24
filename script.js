let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 5;

function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);
    const result = document.getElementById("result");
    const attemptsText = document.getElementById("attempts");
    const table = document.getElementById("guessTable");

    if (!guess) {
        result.innerText = "Please enter a number!";
        return;
    }

    attempts++;

    let feedback = "";

    if (guess < randomNumber) {
        feedback = "Go Up ⬆";
    }
    else if (guess > randomNumber) {
        feedback = "Go Down ⬇";
    }
    else {
        feedback = "Correct 🎉";
        result.innerText = "Hurray 🎉! You guessed it!";
        result.classList.add("correct");   // glow animation
        addToTable(attempts, guess, feedback);

        setTimeout(() => {
            result.classList.remove("correct");
            startResetAnimation();
        }, 5000);

        return;
    }

    addToTable(attempts, guess, feedback);
    result.innerText = feedback;

    attemptsText.innerText = `Attempts: ${attempts} / ${maxAttempts}`;

    if (attempts >= maxAttempts) {
        result.innerText = `Game Over ❌! The correct number was ${randomNumber}. \n Game will be Reset in 5 Seoconds.`;

        setTimeout(() => {
            startResetAnimation();
        }, 5000);
    }
}

function addToTable(attempt, guess, feedback) {
    const table = document.getElementById("guessTable");
    const row = table.insertRow();
    row.insertCell(0).innerText = attempt;
    row.insertCell(1).innerText = guess;
    row.insertCell(2).innerText = feedback;
}

function startResetAnimation() {
    const container = document.querySelector(".container");
    container.classList.add("fade");

    setTimeout(() => {
        container.classList.remove("fade");
        resetGame();
    }, 1000);
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById("attempts").innerText = "";
    document.getElementById("result").innerText = "";
    document.getElementById("guessInput").value = "";

    const table = document.getElementById("guessTable");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}
