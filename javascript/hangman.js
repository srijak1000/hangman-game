// Fruits array with different word lengths
var fruits = {
    'easy': ['APPLE', 'BANANA', 'KIWI', 'PEAR'],
    'medium': ['ORANGE', 'GRAPES', 'MANGO', 'PLUM', 'AVOCADO'],
    'hard': ['STRAWBERRY', 'PINEAPPLE', 'WATERMELON', 'PEACH', 'CHERRY', 'BLUEBERRY', 'RASPBERRY', 'BLACKBERRY', 'POMEGRANATE', 'COCONUT']
};

// Selected difficulty level
let selectedDifficulty = 'easy';

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = fruits[Math.floor(Math.random() * fruits.length)]; //Generating a random word to be compared
}

function setDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    document.getElementById('easyBtn').classList.remove('selected-difficulty');
    document.getElementById('mediumBtn').classList.remove('selected-difficulty');
    document.getElementById('hardBtn').classList.remove('selected-difficulty');

    // Add 'selected-difficulty' class to the current button with a slight delay
    setTimeout(() => {
        document.getElementById(difficulty + 'Btn').classList.add('selected-difficulty');
    }, 0);

    // Update the current difficulty display
    document.getElementById('currentDifficulty').innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    reset();
}

function getRandomWord() {
    answer = fruits[selectedDifficulty][Math.floor(Math.random() * fruits[selectedDifficulty].length)];
}

function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2 alphabet-button"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPicture').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = '<p class="won">You Won!!!</p>';
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = '<p class="lost">You Lost!!!</p>';
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPicture').src = './images/0.jpg';

    getRandomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

getRandomWord();
generateButtons();
guessedWord();