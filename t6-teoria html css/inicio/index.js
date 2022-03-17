const words = [
  "doc",
  "cedo",
  "code",
  "codo",
  "déco",
  "doce",
  "cedro",
  "cerdo",
  "credo",
  "decor",
  "codero",
  "codeso",
  "deceso",
  "decoro",
  "deseco",
  "escodo",
  "recodo",
  "record",
  "récord",
  "cerdoso",
  "cocedor",
  "codorro",
  "cordero",
  "cosedor",
  "creedor",
  "cocedero",
  "corredor",
  "creedero",
  "decoroso",
  "descocer",
  "descoser",
  "corredero",
  "corroedor",
  "crecedero",
  "descorreo",
  "descorrer",
  "escorredor",
  "socorredor",
  "escorredero",
];

const guessedWords = [];

const gameLetters = ["c", "o", "d", "e", "r", "s"];

const requiredLetter = gameLetters[2];

const checkWord = (word, wordList, requiredLetter, guessedWords) => {
  if (guessedWords.includes(word)) {
    alert("You already used this word!");
    return;
  }
  if (word.length < 3) {
    alert("Minimum word length is 3 letters");
    return;
  }
  if (!word.includes(requiredLetter)) {
    alert(`You didn't use the required letter: ${requiredLetter}`);
    return;
  }
  if (!wordList.includes(word)) {
    alert("Wrong!");
    return;
  }
  guessedWords.push(word);

  addWordElementToHtml(word);

  alert("Correct!");
  return;
};

const getPoints = (wordsArray) => {
  const pointsArray = wordsArray.map((word) => {
    if (word.length === 3) {
      return 1;
    }
    if (word.length === 4) {
      return 2;
    }
    if (word.length >= 5) {
      return word.length;
    }
  });
  return pointsArray.reduce((a, b) => a + b);
};

const sendWord = () => {
  const textInput = document.querySelector("#text-input");
  const newWord = textInput.innerText;
  checkWord(newWord, words, requiredLetter, guessedWords);
  textInput.innerText = "";
};

const cleanWord = () => {
  const textInput = document.querySelector("#text-input");
  textInput.innerText = "";
};

const addEventListeners = () => {
  const sendButton = document.querySelector("#send-button");
  sendButton.addEventListener("click", sendWord);

  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", cleanWord);

  const textInput = document.querySelector("#text-input");
  const letterButtons = document.querySelectorAll(".test-shape");
  letterButtons.forEach((element) => {
    element.addEventListener("click", () => {
      textInput.innerText =
        textInput.innerText + element.innerText.toLowerCase();
    });
  });
};

const addWordElementToHtml = () => {
  const guessedParagraph = document.querySelector("#guessed-words");
  console.log(guessedWords, guessedParagraph);

  guessedParagraph.outerHTML = `<p id="guessed-words">You have guessed ${
    guessedWords.length
  } words: <strong>${guessedWords.sort().join(", ")}</strong></p>`;
};

const game = () => {
  addEventListeners();
  console.log("HI! You're playing  ISDI LOGIC");
};

game();
