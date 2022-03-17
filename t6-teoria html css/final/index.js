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

  addWordElementToHtml();

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

  const letterButtons = document.querySelectorAll(".hex");

  letterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      document.querySelector("#text-input").innerText =
        document.querySelector("#text-input").innerText +
        event.target.innerText;
    });
  });
};

const addWordElementToHtml = () => {
  const guessedWordsParagraph = document.querySelector("#word-count");

  guessedWordsParagraph.outerHTML = `<p id='word-count'>You have guessed ${
    guessedWords.length
  } words:<span class="word-count__accent">${guessedWords
    .map((e) => " " + e)
    .sort()}</span></p>`;
};

const game = () => {
  addEventListeners();
  console.log("HI! You're playing  ISDI LOGIC");
};

game();
