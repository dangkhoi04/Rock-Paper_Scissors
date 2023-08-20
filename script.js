// Storing a reference to elements
const scoreInfo = document.getElementById('scoreInfo');
const scoreMessage = document.getElementById('scoreMessage');
const playerSign = document.getElementById('playerSign');
const computerSign = document.getElementById('computerSign');
const rockButton = document.getElementById('rockButton');
const paperButton = document.getElementById('paperButton');
const scissorButton = document.getElementById('scissorButton');
const buttons = document.querySelectorAll('.btn-square');
const playerScorePara = document.getElementById('playerScore');
const computerScorePara = document.getElementById('computerScore');
const gameEndText = document.getElementById('gameEndText');
const fightAgainButton = document.getElementById('fightAgainButton');

// Create playerScore, computerScore and initialize them to be 0
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

// Add event listener when player click rock, paper, scissor buttons
rockButton.addEventListener("click", () => handleClick("ROCK"));
paperButton.addEventListener("click", () => handleClick("PAPER"));
scissorButton.addEventListener("click", () => handleClick("SCISSOR"));

function handleClick(playerSelection) {
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    updateScore();
    updateQuestionMark(playerSelection, computerSelection);
    endGame(playerScore, computerScore);
}

// Call resetGame to reset the game
resetGame();

// Generate a random result among rock, paper, scissor for computerSelection
function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * 3);
    if (randomNum === 0) {
        return "ROCK";
    }
    else if (randomNum === 1) {
        return "PAPER";
    }
    else {
        return "SCISSOR";
    }
}

// Compare the selection of player and computer, and generate roundWinner 
// for each round. Then call updateScoreMessage() to update message for each round
function playRound(playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        roundWinner = "tie";
    }

    if ( playerSelection.toLowerCase() == "rock" && computerSelection.toLowerCase() == "scissor"
        || playerSelection.toLowerCase() == "scissor" && computerSelection.toLowerCase() == "paper"
        || playerSelection.toLowerCase() == "paper" && computerSelection.toLowerCase() == "rock") {
            playerScore++;
            roundWinner = "player";
    }
    
    if ( computerSelection.toLowerCase() == "rock" && playerSelection.toLowerCase() == "scissor"
        || computerSelection.toLowerCase() == "scissor" && playerSelection.toLowerCase() == "paper"
        || computerSelection.toLowerCase() == "paper" && playerSelection.toLowerCase() == "rock") {
            computerScore++;
            roundWinner = "computer";
    }

    updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

// Update upper messages for each round (who wins)
function updateScoreMessage(roundWinner, playerSelection, computerSelection) {
    if (roundWinner === "player") {
        scoreMessage.textContent = `${playerSelection} beats ${computerSelection}`;
        scoreInfo.textContent = "You won!";
        return;
    }
    else if (roundWinner === "computer") {
        scoreMessage.textContent = `${computerSelection} beats ${playerSelection}`;
        scoreInfo.textContent = "Computer won!";
        return;
    }
    else {
        scoreMessage.textContent = `${playerSelection} ties with ${computerSelection}`;
        scoreInfo.textContent = "It\'s a fucking tie!";
        return;
    }
}

// Update the score of player and computer
function updateScore() {
        playerScorePara.textContent = `Player: ${playerScore}`;
        computerScorePara.textContent = `Computer: ${computerScore}`;
}

// Update the question mark by the image that player and computer choose
function updateQuestionMark(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "ROCK":
            playerSign.innerHTML = '<img src="images/stone.png" alt="Rock">';
            break;
        case "PAPER":
            playerSign.innerHTML = '<img src="images/paper.png" alt="Paper">';
            break;
        case "SCISSOR":
            playerSign.innerHTML = '<img src="images/scissor.png" alt="Scissor">';
            break;
        default:
            playerSign.textContent = "?";
    }

    switch (computerSelection) {
        case "ROCK":
            computerSign.innerHTML = '<img src="images/stone.png" alt="Rock">';
            break;
        case "PAPER":
            computerSign.innerHTML = '<img src="images/paper.png" alt="Paper">';
            break;
        case "SCISSOR":
            computerSign.innerHTML = '<img src="images/scissor.png" alt="Scissor">';
            break;
        default:
            computerSign.textContent = "?";
    }
}

function endGame(playerScore, computerScore) {
    if  (playerScore === 5 || computerScore === 5) {
        buttons.forEach((button) => {
            button.setAttribute('disabled', '');
            button.classList.add('disabled-button', 'opacity')
        });
        if (playerScore > computerScore) {
            gameEndText.textContent = "You Won This Battle!";
            gameEndText.style.color = '#62b49c';
        }
        else {
            gameEndText.textContent = "You Lost This Battle!";
            gameEndText.style.color = '#b96b78';
        }

        fightAgainButton.style.visibility = 'visible';
    }
}

function resetGame() {
    fightAgainButton.addEventListener('click', () => {
        window.location.reload();
    });
}