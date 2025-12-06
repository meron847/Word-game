const ANSWER_LENGTH = 5;
const loadingDiv = document.querySelector(".loading");
const ROUNDS = 6;

async function init() {
  const letters = document.querySelectorAll(".cell");

  let currentGuess = "";
  let currentRow = 0;
  let done = false;
  let isLoading = false;

  // Load daily word
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordparts = word.split("");

  console.log("WORD:", word);

  setLoading(false);

  //   BACKSPACE
  // ---------------------------
  function backspace() {
    if (currentGuess.length === 0) return;

    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    const index = ANSWER_LENGTH * currentRow + currentGuess.length;

    letters[index].innerText = "";
  }

  //   ADD LETTER
  // ---------------------------
  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      // replace last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    const index = currentRow * ANSWER_LENGTH + (currentGuess.length - 1);
    letters[index].innerText = letter;
  }

  //   COMMIT WORD (NO VALIDATION)
  // ---------------------------
  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) return;

    const guessParts = currentGuess.split("");
    const map = makeMap(wordparts);

    // FIRST PASS → CORRECT (GREEN)
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordparts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    // SECOND PASS → CLOSE (YELLOW) or WRONG (GRAY)
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordparts[i]) {
        // already marked correct
      } else if (wordparts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    // Move to next row
    if (currentGuess === word) {
      alert("You win!");
      document.querySelector('h1').classList.add("winner");

      document.querySelector('.loading').classList.remove("hidden");
      done = true;
      return;
    }

    currentRow++;

    if (currentRow === ROUNDS) {
      alert(`You lose! The word was: ${word}`);
      done = true;
      return;
    }

    currentGuess = "";
  }
   
  // LISTEN FOR KEYBOARD
  document.addEventListener("keydown", (event) => {
    if (done || isLoading) return;

    const key = event.key;

    if (key === "Enter") {
      commit();
    } else if (key === "Backspace") {
      backspace();
    } else if (isLetter(key)) {
      addLetter(key.toUpperCase());
    }
  });
}

// HELPERS
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle("hidden", !isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let letter of array) {
    if (obj[letter]) obj[letter]++;
    else obj[letter] = 1;
  }
  return obj;
}

init();
