// create varibales for game (wordbank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)

var wordBank = ["United States", "Canada", "Australia", "Indonesia", "Thailand", "Cambodia", "Mexico"];
var wins = 0;
var losses = 0;
var pickedWord = " ";
var guessesLeft = 12;
var gameRunning = false;
var pickedWordPlaceHolderArray = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// Call all DOM Elements to write to the index

var domNewGameButton = document.getElementById("new-game-button");
var domPlaceHolders = document.getElementById("placeholders");
var domGuessedLetters = document.getElementById("guessed-letters");
var domGuessesLeft = document.getElementById("guesses-left");
var domWins = document.getElementById("wins");
var domLosses = document.getElementById("losses");

// Game running is set to false above because I want to use a new game button that resets the guessed word and guessed missed

// Run game 

function newGame() {

    gameRunning = true;
    guessesLeft =12;
    pickedWordPlaceHolderArray = [];
    guessedLetterBank = [];
    incorrectLetterBank = [];

    // computer picking a word with Math

    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Now for loop to create the underscores for the word length and a - for the space in one of the words

    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            pickedWordPlaceHolderArray.push("-");

        }
        else {
            pickedWordPlaceHolderArray.push("_");
        }


    }

    // varables that will be added to the dom
    domGuessesLeft.textContent = guessesLeft;
    domPlaceHolders.textContent = pickedWordPlaceHolderArray.join(" ");
    domGuessedLetters.textContent = guessedLetterBank;

}

function letterGuess(letter) {
    console.log(letter);
    // running game inside this funtion
    
    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {

        guessedLetterBank.push(letter);
        
    //for loop checking if guessed letter is a lowercased letter and if it matches picked word
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
            pickedWordPlaceHolderArray[i] = pickedWord[i];
        }     
    }
    
    domPlaceHolders.textContent = pickedWordPlaceHolderArray.join("  ");
    checkIfCorrect(letter);
    }

    else{
        alert("You have already guessed that letter or Click button to start new game");
    }
}

function checkIfCorrect(letter) {
    if (pickedWordPlaceHolderArray.indexOf(letter.toLowerCase())=== -1 &&
    pickedWordPlaceHolderArray.indexOf(letter.toUpperCase())=== -1){

        guessesLeft --;
        incorrectLetterBank.push(letter);
        domGuessedLetters.textContent = incorrectLetterBank.join(" ");
        domGuessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

function checkLoss(){
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false; 
        domLosses.textContent = losses;
        domPlaceHolders.textContent = pickedWord;
        alert("Sorry! You lose!")
    }
    checkWin();

}

function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceHolderArray.join("").toLowerCase()) {
        wins++;
        gameRunning = false;
        domWins.textContent = wins;
        alert("You Won!")
        
    }
    
}




domNewGameButton.addEventListener("click", newGame);



// adding on key up event for computer to see what keys are pushed

document.onkeyup = function (event){
    console.log(event.keyCode)
    if (event.keyCode >=65 && event.keyCode <=90){
        console.log(event)
        letterGuess(event.key);
    } 
           
}

