const letters = document.querySelectorAll('box')
async function init() {


    document.addEventListener('keydown', function handleKeyPress (event){
        const action = event.key;

        console.log(action);

        if (action === 'Enter'){
            commit();
        }else if (action === 'Backspace') {
            backspace();
        }else if (isLetter(action)) {
            addLetter(action.toUpperCase())
        }else{
            //do nothing
        }
    }); 

    
}
init();