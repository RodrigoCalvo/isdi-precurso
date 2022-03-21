class Display{
    constructor(elementId){
        this.elementId = "#"+elementId;
        this.currentDisplay = "0";
        this.isResult = false;
    }
    addToDisplay(character) {
        if(this.isResult){
            this.currentDisplay = "0";
            this.isResult = false;
        }
        if(this.currentDisplay.length <=10){
            if (this.currentDisplay === "0") this.deleteLast();
            this.currentDisplay += character;
            this.#updateDisplay();
        }    
    }
    deleteLast() {
        this.currentDisplay = this.currentDisplay.slice(0, -1);
        this.#updateDisplay();
    }
    cleanDisplay() {
        this.currentDisplay = "0";
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
            elements[i].addEventListener("click", this);
        }
    }
    handleEvent(event){
        const charButton = String(event.target.id[event.target.id.length -1]);
        this.#operate(charButton);
    }
    #operate(charButton){
        switch(charButton){
            case "c":
                this.inputDisplay.cleanDisplay();
                this.historyDisplay.cleanDisplay();
                this.inputDisplay.isResult = false;
                this.currentOperation = undefined;
                break;
            case "r":
                if(!this.inputDisplay.isResult){
                    this.inputDisplay.deleteLast();
                }
                break;
            case ".":
                if(this.inputDisplay.currentDisplay !== ""){
                    if (this.inputDisplay.currentDisplay.indexOf(charButton) === -1){
                        if(this.inputDisplay.currentDisplay === "0"){
                            this.inputDisplay.addToDisplay("0"+charButton);
                        }else {
                            this.inputDisplay.addToDisplay(charButton);
                        }
                    }
                }
                break;
            case "-":
                if(this.inputDisplay.currentDisplay==="0") this.inputDisplay.deleteLast();
                if(this.inputDisplay.currentDisplay===""){ //numeros negativos
                    this.inputDisplay.addToDisplay(charButton);
                    break;
                }
            case "+":
            case "*":
            case "/":
                if (this.inputDisplay.isThereAnOperationNumber()){
                    if(this.currentOperation === undefined){
                        this.currentOperation = new Operation(Number.parseFloat(this.inputDisplay.currentDisplay), charButton);
                        this.historyDisplay.cleanDisplay();
                        this.historyDisplay.addToDisplay(this.inputDisplay.currentDisplay+charButton);
                        this.inputDisplay.cleanDisplay();
                    }else { //si has hecho a+b+
                        this.currentOperation.addSecondOperand(Number.parseFloat(this.inputDisplay.currentDisplay));
                        this.historyDisplay.cleanDisplay();
                        this.historyDisplay.addToDisplay(this.#roundResults(this.currentOperation.resolveOperation()));
                        this.currentOperation = new Operation(Number.parseFloat(this.historyDisplay.currentDisplay),charButton)
                        this.historyDisplay.addToDisplay(charButton);
                        this.inputDisplay.cleanDisplay();
                    }
                }
                break;
            case "=":
                if (this.currentOperation !== undefined){
                    if(this.inputDisplay.isThereAnOperationNumber()){
                        this.currentOperation.addSecondOperand(Number.parseFloat(this.inputDisplay.currentDisplay));
                        this.historyDisplay.addToDisplay(this.inputDisplay.currentDisplay);
                        this.inputDisplay.cleanDisplay();
                        this.inputDisplay.addToDisplay(this.#roundResults(this.currentOperation.resolveOperation()));
                        this.inputDisplay.isResult = true;
                        this.currentOperation = undefined;
                    }
                }
                break;
            case "0":
                if (this.inputDisplay.currentDisplay !== "0"){ //no dobles 0 a la izq
                    this.inputDisplay.addToDisplay(charButton);
                }
                break;
            default:
                if (this.inputDisplay.currentDisplay === "0") this.inputDisplay.deleteLast();
                this.inputDisplay.addToDisplay(charButton);
                break;
        }
    }
    #roundResults(unroundedResult){
        let roundedResult;
        let stringNumber = String(unroundedResult);
        let integerPart = stringNumber.split(".")[0];
        let decimalPart = stringNumber.split(".")[1];
        if(integerPart.length > 10){
            roundedResult = 0;
            this.historyDisplay.cleanDisplay();
            this.historyDisplay.addToDisplay("Error:Num too large");
        }else {
            if (decimalPart !== undefined){
                if(integerPart.length+decimalPart.length <= 10){
                    roundedResult = unroundedResult;
                }else {
                    decimalPart = decimalPart.slice(0, (10 - integerPart.length));
                    roundedResult = Number.parseFloat(String(integerPart)+"."+String(decimalPart));
                }
            }else {
                roundedResult = unroundedResult;
            }
        }
        return roundedResult;
    }
}

const currentCalculator = new Calculator("history-display", "input-display", "calculator-button");