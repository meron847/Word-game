
const ANSWER_LENGTH = 5;
async function init() {
    const letters = document.querySelectorAll(".cell");

  let currentGuess ='';
  let currentRow = 0;
    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            //add letters to the end
            currentGuess += letter;
         }else {
            //replace the last letter
            currentGuess = currentGuess.substring(0, currentGuess.length -1)+ letter;
            
         }
         //show the text in screen 
        
       letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
        
     }

     function backspace() {
     if (currentGuess.length > 0) {
        // erase letter from the grid
        const index = ANSWER_LENGTH * currentRow + (currentGuess.length - 1);
        letters[index].innerText = "";

        // erase last letter
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
      }
     }


     async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            //do nothing 
            return;
        }
        //ToDo did they win or lose?
        currentRow++;
        currentGuess = '';
     }

     document.addEventListener('keydown', function handleKeyPress (event){
        const action = event.key;

        console.log(action);

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
init();
