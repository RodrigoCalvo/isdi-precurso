// botón "Salir" <-- innecesario? 
// pedir volver a jugar <-- ya hay reiniciar, innecesario?
// ¿quizás menú de portada?

// CONECTA 4 Pro
// Se tiene que añadir la opción de jugar contra la máquina. Antes de iniciar la partida se le pedirá al jugador si tiene un compañero con quien jugar o quiere jugar contra la máquina.

class Node{
    constructor(coordX, coordY, color){
        this.coordX = coordX;
        this.coordY = coordY;
        this.color = color;
    }
    checkN(gridArray){
        if(this.coordY > 2) return false;
        if(gridArray[this.coordX][this.coordY+1]!==undefined && gridArray[this.coordX][this.coordY+2]!==undefined && gridArray[this.coordX][this.coordY+3]!==undefined){
            if(gridArray[this.coordX][this.coordY+1].color === this.color && gridArray[this.coordX][this.coordY+2].color === this.color && gridArray[this.coordX][this.coordY+3].color === this.color){
                return true;
            }
        }else{
            return false;
        }
    }
    checkNE(gridArray){
        if(this.coordX > 3 || this.coordY > 2) return false;
        if(gridArray[this.coordX+1][this.coordY+1]!==undefined && gridArray[this.coordX+2][this.coordY+2]!==undefined && gridArray[this.coordX+3][this.coordY+3]!==undefined){
            if(gridArray[this.coordX+1][this.coordY+1].color === this.color && gridArray[this.coordX+2][this.coordY+2].color === this.color && gridArray[this.coordX+3][this.coordY+3].color === this.color){
                return true;
            }
        }else{
            return false;
        }
    }
    checkE(gridArray){
        if(this.coordX > 3) return false;
        if(gridArray[this.coordX+1][this.coordY]!==undefined && gridArray[this.coordX+2][this.coordY]!==undefined && gridArray[this.coordX+3][this.coordY]!==undefined){
            if(gridArray[this.coordX+1][this.coordY].color === this.color && gridArray[this.coordX+2][this.coordY].color === this.color && gridArray[this.coordX+3][this.coordY].color === this.color){
                return true;
            }
        }else{
            return false;
        }
    }
    checkSE(gridArray){
        if (this.coordX > 3 || this.coordY < 3) return false;
        if(gridArray[this.coordX+1][this.coordY-1]!==undefined && gridArray[this.coordX+2][this.coordY-2]!==undefined && gridArray[this.coordX+3][this.coordY-3]!==undefined){
            if(gridArray[this.coordX+1][this.coordY-1].color === this.color && gridArray[this.coordX+2][this.coordY-2].color === this.color && gridArray[this.coordX+3][this.coordY-3].color === this.color){
                return true;
            }
        }else{
            return false;
        }
    }
}
class Board{
    constructor(){
        this.gridArray = [[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"]];
        this.emptySquares = 42; //grid 7x6
    }
    setNode(coordX, color){
        let emptyCoordY = this.#getFirstEmptyPlace(coordX);
        if(emptyCoordY !== null){
            this.gridArray[coordX][emptyCoordY] = new Node(Number.parseInt(coordX), emptyCoordY, color);
            this.emptySquares--;
            return emptyCoordY;
        }else {
            return null;
        }
    }
    isLineFour(){
        for(let i = 0; i < this.gridArray.length; i++){
            for (let j = 0; j < this.gridArray[i].length-1; j++){ //-1 por los end
                if(this.gridArray[i][j] !== undefined){
                    if(this.gridArray[i][j].checkN(this.gridArray) || this.gridArray[i][j].checkNE(this.gridArray) || this.gridArray[i][j].checkE(this.gridArray) || this.gridArray[i][j].checkSE(this.gridArray)){
                        return [true, this.gridArray[i][j].color];
                    }
                }
            }
        }
        return [false, undefined];
    }
    #getFirstEmptyPlace(column){
        let coordY = 0
        while(this.gridArray[column][coordY]!==undefined) coordY++;
        return coordY < 6 ? coordY : null;
    }
}

class Game{
    constructor(){
        this.currentBoard = new Board();
        this.nextTurn = "red";
        this.addListeners();
        this.cleanBoard();
    }
    addListeners(){
        document.querySelector("#js-supboard-x0").addEventListener("click", this);
        document.querySelector("#js-supboard-x1").addEventListener("click", this);
        document.querySelector("#js-supboard-x2").addEventListener("click", this);
        document.querySelector("#js-supboard-x3").addEventListener("click", this);
        document.querySelector("#js-supboard-x4").addEventListener("click", this);
        document.querySelector("#js-supboard-x5").addEventListener("click", this);
        document.querySelector("#js-supboard-x6").addEventListener("click", this);
    }
    removeListeners(){
        document.querySelector("#js-supboard-x0").removeEventListener("click", this);
        document.querySelector("#js-supboard-x1").removeEventListener("click", this);
        document.querySelector("#js-supboard-x2").removeEventListener("click", this);
        document.querySelector("#js-supboard-x3").removeEventListener("click", this);
        document.querySelector("#js-supboard-x4").removeEventListener("click", this);
        document.querySelector("#js-supboard-x5").removeEventListener("click", this);
        document.querySelector("#js-supboard-x6").removeEventListener("click", this);
    }
    handleEvent(event){
        let coordX = event.target.id[event.target.id.length-1];
        let coordY = this.currentBoard.setNode(coordX, this.nextTurn);
        if (coordY !==null){
            document.querySelector(`#js-board-x${coordX}y${coordY}`).className = "board__token board__token--"+this.nextTurn;
            this.switchTurn();
            this.isAnyoneWinner();
        }
    }
    cleanBoard(){
        let htmlCollection = document.querySelectorAll(".board__playable-square");
        for (let i = 0; i < htmlCollection.length; i++){
            htmlCollection[i].firstChild.removeAttribute("class");
        }
        document.querySelector("#js-turn").innerHTML = 'Siguiente turno: <span class="turn__indicator turn__indicator--red" id="js-turn-indicator">red</span>.';
    }
    switchTurn(){
        if(this.nextTurn === "red"){
            this.nextTurn = "blue";
        }else {
            this.nextTurn = "red";
        }
        document.querySelector("#js-turn-indicator").innerHTML = this.nextTurn;
        document.querySelector("#js-turn-indicator").className = "turn__indicator turn__indicator--"+this.nextTurn;
    }
    isAnyoneWinner(){
        let results = this.currentBoard.isLineFour();
        if(results[0]){
            document.querySelector("#js-turn").innerHTML = `¡El jugador <span  class="turn__indicator turn__indicator--${results[1]}" id="js-turn-indicator">${results[1]}</span> gana la partida!`;
            this.removeListeners();
        }
        if(this.currentBoard.emptySquares === 0){
            document.querySelector("#js-turn").innerHTML = "¡Empate! La partida ha terminado sin ganador.";
            this.removeListeners();
        }
    }
}

let myGame = new Game();

document.querySelector("#js-reset-button").addEventListener("click", () => {
    myGame.removeListeners();
    myGame = new Game();
})