class Display{
    constructor(elementId){
        this.elementId = "#"+elementId;
        this.currentDisplay = "";
        this.isResult = false;
    }
    addToDisplay(character) {
        if(this.isResult){
            this.currentDisplay = "";
            this.isResult = false;
        }
        if(this.currentDisplay.length <=10){
            this.currentDisplay += character;
            this.#updateDisplay();
        }    
    }
    deleteLast() {
        this.currentDisplay = this.currentDisplay.slice(0, -1);
        this.#updateDisplay();
    }
    cleanDisplay() {
        this.currentDisplay = "";
        this.#updateDisplay();
    }
    isThereAnOperationNumber(){
        if(this.currentDisplay === "") return false;
        if(this.currentDisplay === "0") return false;
        if(this.currentDisplay === "0,") return false;
        if(this.currentDisplay === "-") return false;
        return true;
    }
    #updateDisplay(){
        document.querySelector(this.elementId).innerHTML = this.currentDisplay;
    }
}
class Operation{
    constructor(firstOperand, operator){
        this.firstOperand = firstOperand;
        this.operator = operator;
        this.secondOperand;
    }
    addSecondOperand(secondOperand){
        this.secondOperand = secondOperand;
    }
    resolveOperation(){
        let operationResult;
        switch(this.operator){
            case "+":
                operationResult = this.firstOperand+this.secondOperand;
                break;
            case "-":
                operationResult = this.firstOperand-this.secondOperand;
                break;
            case "*":
                operationResult = this.firstOperand*this.secondOperand;
                break;
            case "/":
                operationResult = this.firstOperand/this.secondOperand;
                break;
        }
        return operationResult;
    }
}
class Calculator{
    constructor(elementTopDisplayId, elementBotDisplayId, elementAllButtonsClass){
        this.historyDisplay = new Display(elementTopDisplayId);
        this.inputDisplay = new Display(elementBotDisplayId);
        this.#addEventListeners(elementAllButtonsClass);
        this.currentOperation;
    }
    #addEventListeners(elementsClass){
        const elements = document.querySelectorAll("."+elementsClass);
        for (let i = 0; i < elements.length; i++){
            elements[i].addEventListener("click", this.#myHandleEvent);
        }
    }
    #myHandleEvent(event){
        const charButton = String(event.target.id[event.target.id.length -1]);
        console.log(this.inputDisplay);
        switch(charButton){
            case "c":
                this.inputDisplay.cleanDisplay();
                this.historyDisplay.cleanDisplay();
                break;
            case "r":
                this.inputDisplay.deleteLast();
                break;
            case ".":
                if (this.inputDisplay.currentDisplay.indexOf(charButton) === -1){
                    this.inputDisplay.addToDisplay(charButton);
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (this.inputDisplay.isThereAnOperationNumber()){
                    this.currentOperation = new Operation(this.currentDisplay, charButton);
                    this.historyDisplay.cleanDisplay();
                    this.historyDisplay.addToDisplay(this.currentDisplay+charButton);
                    this.inputDisplay.cleanDisplay();
                }
                break;
            case "=":
                if (this.currentOperation !== undefined){
                    if(this.inputDisplay.isThereAnOperationNumber()){
                        this.currentOperation.addSecondOperand(this.inputDisplay.currentDisplay);
                        this.historyDisplay.addToDisplay(this.inputDisplay.currentDisplay);
                        this.historyDisplay.cleanDisplay();
                        this.historyDisplay.addToDisplay(this.currentOperation.resolveOperation());
                        this.isResult = true;
                    }
                }
                break;
            case "0": //controlar no añadir 0 a la izquierda
                if (this.inputDisplay.currentDisplay !== ""){
                    this.inputDisplay.addToDisplay(charButton);
                }
                break;
            default:
                console.log(charButton);
                this.inputDisplay.addToDisplay(charButton);
                break;
        }
    }
}

function miMain(){
    const currentCalculator = new Calculator("history-display", "input-display", "calculator-button");
}


miMain();


// const numberButtons = document.querySelectorAll(".number-button");
// for (let i = 0; i < numberButtons.length; i++){
//     numberButtons[i].addEventListener("click", () => numberClicked(numberButtons[i].id));
// }
// const operationButtons = document.querySelectorAll(".operation-button");
// for (let i = 0; i < operationButtons.length; i++){
//     operationButtons[i].addEventListener("click", () => operationClicked(operationButtons[i].id));
// }
/*
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
*/