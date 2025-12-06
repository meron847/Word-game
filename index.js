const ANSWER_LENGTH = 5;

const loadingDiv = document.querySelector(".loading");
const ROUNDS=6;

async function init() {
    const letters = document.querySelectorAll(".cell");

  let currentGuess ='';
  let currentRow = 0;

 function backspace() {
  if (currentGuess.length > 0) {
    // remove last letter from string
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);

    // calculate the cell index
    const index = ANSWER_LENGTH * currentRow + currentGuess.length;

    // clear the box
    letters[index].innerText = "";
  }
}


//res is response 
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordparts = word.split("");
  let done = false;
  setLoading(false);
  isLoading = false;

  console.log(word);
   function addLetter (letter) {
         if (currentGuess.length < ANSWER_LENGTH) {
            //add letters to the end
            currentGuess += letter;
         }else {
            //replace the last letter
            currentGuess = currentGuess.substring(0, currentGuess.length -1)+ letter;
         }
         //show the text in screen 
          const index = currentRow * ANSWER_LENGTH + (currentGuess.length - 1);

          letters[index].innerText = letter;
          }

              

     async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            //do nothing 
            return;
        }
        isLoading = true;
        setLoading(true);
        const res = await fetch ("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({ word: currentGuess })
        });
         

        const resObj = await res.json();
        const validWord = resObj.validWord;
        //const { validWord } = resObj;same as the above one 

        isLoading = false;
        setLoading(false);

        if (!validWord) {
            markInvalidWord();
            return;
        }
       
        const guespart = currentGuess.split("")
        const wordparts = word.split("");
        const map = makeMap(wordparts);
        

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            //mark as correct
            if (guespart[i] === wordparts[i]){
                letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
                map[guespart[i]]--;
            } 
        }

        for (let i= 0; i < ANSWER_LENGTH; i++){
              if (guespart[i] === wordparts[i]){
                //do nothing 
              }else if (wordparts.includes(guespart[i]) && map[guespart[i]] > 0){
                letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
                map[guespart[i]]--;
              }else {
                 letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
              }
        }
           currentRow++;
            if (currentGuess === word){
            //win
            alert('you win');//i am not finished here 
            done = true;
            return;
        }else if (currentRow === ROUNDS) {
            alert('you lose, the word was ${DUVET}');
            done = true;
            return;
        }
        currentGuess = '';
     }
     function markInvalidWord () {
        alert('not a valid word');
     }

     document.addEventListener('keydown', function handleKeyPress (event){
          if (done || isLoading){
            //do nothing
            return;
          }

        const action = event.key;

        if (action === 'Enter'){
            commit();//it used to gueses and enter function 
        }else if (action === 'Backspace') {
            backspace();
        }else if (isLetter(action)) {
            addLetter(action.toUpperCase())
        }else{
            //do nothing
        }
     }); 
 }
 function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
 }
    
    /*
   function setLoding(isLoding) {
    if (isLoding) {
        //show the loading
        loadingDiv.classList.remove("hidden");
    }else {
        //hide the loading
        loadingDiv.classList.add("hidden")
        console.log("setLoading: HIDE");
    }
   }
    */
   // i am not sure about this code
   function setLoading(isLoading) {
    loadingDiv.classList.toggle('hidden', !isLoading)
   }

   function makeMap (array) {
    const obj = {};
    for (let i = 0; i< array.length; i++){
        const letter = array[i]
        if (obj[letter]){
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }
      return obj;
   }
init();
