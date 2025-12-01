const ANSWER_LENGTH = 5;

const loadingDiv = document.querySelector(".loading");


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
  setLoading(false);

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
        const guespart = currentGuess.split("")
        const workparts = word.split("");

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guespart[i] === wordparts[i]){
                letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
            }
            
        }
        //ToDo did they win or lose?
        currentRow++;
        currentGuess = '';
     }

     document.addEventListener('keydown', function handleKeyPress (event){
        const action = event.key;

        

        if (action === 'Enter'){
            commit();//it used to gueses
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
init();
