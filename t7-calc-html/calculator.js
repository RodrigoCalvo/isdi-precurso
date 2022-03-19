class Display{
    constructor(elementId){
        this.elementId = elementId;
        this.currentDisplay = "";
    }
    addToDisplay(character) {
        if(this.currentDisplay.length <=10) this.currentDisplay += character;
        this.#updateDisplay();
    }
    deleteLast() {
        this.currentDisplay = this.currentDisplay.slice(0, -1);
        this.#updateDisplay();
    }
    cleanDisplay() {
        this.currentDisplay = "";
        this.#updateDisplay();
    }
    #updateDisplay(){
        document.querySelector(this.elementId).innerHTML = this.currentDisplay;
    }
}
const numberButtons = document.querySelectorAll(".number-button");
for (let i = 0; i < numberButtons.length; i++){
    numberButtons[i].addEventListener("click", () => numberClicked(numberButtons[i].id));
}
const operationButtons = document.querySelectorAll(".operation-button");
for (let i = 0; i < operationButtons.length; i++){
    operationButtons[i].addEventListener("click", () => operationClicked(operationButtons[i].id));
}

const inputDisplay = new Display("#input-display");
const historyDisplay = new Display("#history-display");


function numberClicked(numberButtonElementID){
    number = numberButtonElementID[numberButtonElementID.length - 1];
    switch(number){
        case "c":
            inputDisplay.cleanDisplay();
            historyDisplay.cleanDisplay();
            break;
        case "r":
            inputDisplay.deleteLast()
            break;
        case ".":
            if (inputDisplay.currentDisplay.indexOf(number) === -1){
                inputDisplay.addToDisplay(number);
            }
            break;
        case "0": //controlar no añadir 0 a la izquierda
            if (inputDisplay.currentDisplay !== ""){
                inputDisplay.addToDisplay(number);
            }
            break;
        default:
            inputDisplay.addToDisplay(number);
    }
}
function operationClicked(operationButtonElementID){
    operation = operationButtonElementID[numberButtonElementID.length - 1];
    switch(operation){

    }
}