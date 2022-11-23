// Globala variabler

var wordList = ["tax", "labrador", "pudel", "sheltie", "collie", "boxer"];      // Array: med spelets alla ord
var selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
var numberOfLetters;
var wrongGuesses = 0;     // Number: håller antalet gissningar som gjorts
var rightGuesses = 0;
var letterIsFound = false;

var hangmanImg = document.querySelector("#hangman");      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
var msgHolderEl = document.querySelector("#message");     // DOM-nod: Ger meddelande när spelet är över
var welcomeMsgHolder = document.querySelector("#welcomeSection");
var startGameBtnEl = document.querySelector("#startGameBtn");  // DOM-nod: knappen som du startar spelet med;
var letterButtonEls = document.querySelectorAll('#letterButtons button'); // Array av DOM-noder: Knapparna för bokstäverna
var letterBoxEls = document.querySelector("#letterBoxes");    // Array av DOM-noder: Rutorna där bokstäverna ska stå
var gameBoard = document.querySelector("#gameBoard");

letterButtonEls.disabled = true;

//Eventlisteners
startGameBtnEl.addEventListener('click', startGame);




// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
    resetGame();
    generateRandomWord();
    startGameBtnEl.disabled = true;
    createLetterBoxes();
    hangmanImg.src = "images/start.png";

}


// Funktion som slumpar fram ett ord
function generateRandomWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)]; //väljer slumpässigt ord från arrayn på basen av indexet
    //window.alert(selectedWord);
}


// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
    numberOfLetters = selectedWord.length;
    for (let i = 0; i < numberOfLetters; i++) {
        var letterBox = document.createElement("li");
        letterBox.innerHTML = "<input type=\"text\" disabled=\"\" value=\"\">";
        letterBoxEls.append(letterBox);
    }
}


// Funktion som körs när du trycker på bokstäverna och gissar bokstav
gameBoard.addEventListener("click", (element) => {

    //kollar vilken bokstav som är den tryckta knappen
    if (element.target.nodeName == ("BUTTON")) {
        var guessedLetter = element.target.textContent.toLowerCase();
        element.target.disabled = true;

        //Kollar om gissad bokstav finns i selectedword
        letterIsFound = false;
        for (let i = 0; i < numberOfLetters; i++) {
            var currentletter = selectedWord.charAt(i);
            if (guessedLetter == currentletter) {
                rightGuesses++;
                index = i;
                addLetterToLetterBox(index, currentletter);
                msgHolderEl.textContent = "You guessed " + currentletter.toUpperCase() + ", that is correct :)"
                letterIsFound = true;
                checkIfWin();
            }

        }
        //Om gissade bokstaven inte finns i selectedword sker följande
        if (letterIsFound == false) {
            wrongGuesses++;
            hangmanImg.src = "images/h" + wrongGuesses + ".png";
            msgHolderEl.textContent = "Wrong guess loser"
            checkIfLoss();
        }
    }
});


//Funktion som hitttar letterbox vid rätt index och lägger in correct gissad bokstav
function addLetterToLetterBox(index, currentletter) {
    var correctLetter = currentletter.toUpperCase();
    var rightElement = letterBoxEls.getElementsByTagName("li")[index]; 
    rightElement.innerHTML = "<input type=\"text\" disabled=\"\" value=\"" + correctLetter + "\">";
}

//Funktion som kollar om man förlorat
function checkIfLoss() {
    if (wrongGuesses == 6) {
        msgHolderEl.textContent = "You lost! Mo ha ha ha haaa..."
        endGame();
    }
}


//Funktion som kollar om man vunnit
function checkIfWin() {
    if (rightGuesses == selectedWord.length){
        msgHolderEl.textContent = "You won!!"
        endGame();
    }
}

function endGame() {
    wrongGuesses = 0;
    rightGuesses = 0;
    startGameBtnEl.textContent = "Play again?"
    startGameBtnEl.disabled = false;
    disableLetterButtons();
}


//Funktion som inaktiverar bokstavsknapparna
function disableLetterButtons() {
    for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = true;
    }
}


function resetGame() {
    //Återställer bokstavsknapparna
    for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = false;
    }
    //Återställer bokstavslådorna för selectedword
    for (let i = 0; i < numberOfLetters; i++) {
        var letterBoxes = document.querySelector("#letterBoxes")
        letterBoxes.innerHTML = "";
    }
    welcomeMsgHolder.textContent = "";
    msgHolderEl.textContent = "";
}


