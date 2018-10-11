// Declaring Variables
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var guessesSoFar = [];
// string of words
var gameWords = ["weasely", "voldemort", "hagrid", "dumbledore", "harry", "hedwig", "nagini", "bellatrix", "sirus", "kreacher", "dobby", "ollivander", "hermione", "mcgonagall", "tonks", "crookshanks", "flitwick", "snape"];
var randomWord;
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersInWord = [];
var blanks = [];

function initialize() {
    randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    // get randomWord and set blanks on HTML page
    lettersInWord = randomWord.split("")
    blanks = [];
    guessesSoFar = [];
    for (var i = 0; i < lettersInWord.length; i++) {
        blanks.push("_")
    }
    guessesLeft = 10;
    document.getElementById("goalWord").innerHTML = blanks.join(" ")
    // reset guessesLeft and display on HTML
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    // reset guessesSoFar and display on HTML
    document.getElementById("losses").innerHTML = "Losses: " + losses;

    document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;

    document.getElementById("lettersGuessed").innerHTML = "Letters Guessed: ";
    // split randomWord into lettersInWord array
};

function checkLetters(letter) {
    // Go through word and compare letters in word to letter we are passing through function to see if it exists in array
   var letterCorrect = false;
    //if it does exist, where does it exist so we can replace blank space with letter
    if (letter) {
        for (var i = 0; i < blanks.length; i++) {
            if (randomWord[i] == letter) {
                blanks[i] = letter;
                document.getElementById("goalWord").innerHTML = blanks.join(" ")
                letterCorrect = true;
            }
        }
    }
    if (!letterCorrect) {
        guessesLeft--;
    };
    //if it doesn't exist we will need to move on to next guess 
    guessesSoFar.push(letter)
    document.getElementById("lettersGuessed").innerHTML = "Letters Guessed: " + guessesSoFar.join(" ");
    //subtract from guessesLeft
    document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;
    //push letter into guesses so far 
    // BONUS: if letter has already been presses, setup  a don't subtract from guesses left situation


}

//for loop for lettersGuessed array and check if letter exists in array. if exists, alert you already guessed letter, else allow checkletters to run make a separate function. 
document.onkeypress = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(letterGuessed)) {
        if (guessesSoFar.indexOf(letterGuessed) === -1) {
            checkLetters(letterGuessed);
        } else {
            alert("You have already guessed that letter! Please try another one!")
        }
    } else {
        alert("Invalid game key! Please press a letter!")
    }
    //update guessesLeft
    //update guessesSoFar
    //if player guesses all letters in word correctly, then win, update wins, run initialize, else if guessesLeft <= 0, player loses, update losses, initialize
    gameOver();
}

function gameOver() {
    console.log(lettersInWord.toString());
    console.log(blanks.toString());
    if (lettersInWord.toString() === blanks.toString()) {
        wins++;
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        document.getElementById("goalWord").innerHTML= randomWord;
        alert("You win!");
        initialize();
    } else if (guessesLeft <= 0) {
        losses++;
        document.getElementById("losses").innerHTML = "Losses: " + losses;
        alert("Sorry, you lost! The word was: " + randomWord);
        initialize();
    }

}
// document.getElementbyId("playGame").click(function(){
//     initialize();
// });
initialize();