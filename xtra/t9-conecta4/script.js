// botón "Salir" <-- innecesario? 
// pedir volver a jugar <-- ya hay reiniciar, innecesario?
// ¿quizás menú de portada?

// CONECTA 4 Pro <-- aquí sí que hace falta menú
// Se tiene que añadir la opción de jugar contra la máquina. Antes de iniciar la partida se le pedirá al jugador si tiene un compañero con quien jugar o quiere jugar contra la máquina.

class Node{
    constructor(coordX, coordY, color){
        this.coordX = coordX;
        this.coordY = coordY;
        this.color = color;
    }
    check(gridArray, pattern){
        let checked = true;
        let i = 0;
        do{
            if(pattern[i] === undefined){
                checked = gridArray[this.coordX][this.coordY+i] === undefined; 
            }else {
                if(gridArray[this.coordX][this.coordY+i] === undefined){
                    checked = false;
                }else {
                    checked = pattern[i] === gridArray[this.coordX][this.coordY+i].color;
                }
            }
            i++;
        }while (checked && i < pattern.length);
        return checked;
    }
    checkN(gridArray, pattern){
        if(this.coordY > 2) return false;
        let checked = true;
        let i = 0;
        do{
            if(pattern[i] === undefined){
                checked = gridArray[this.coordX][this.coordY+i] === undefined; 
            }else {
                if(gridArray[this.coordX][this.coordY+i] === undefined){
                    checked = false;
                }else {
                    checked = pattern[i] === gridArray[this.coordX][this.coordY+i].color;
                }
            }
            i++;
        }while (checked && i < pattern.length);
        return checked;
    }
    checkNE(gridArray, pattern){
        if(this.coordX > 3 || this.coordY > 2) return false;
        let checked = true;
        let i = 0;
        do{
            if(pattern[i] === undefined){
                checked = gridArray[this.coordX+i][this.coordY+i] === undefined; 
            }else {
                if(gridArray[this.coordX+i][this.coordY+i] === undefined){
                    checked = false;
                }else {
                    checked = pattern[i] === gridArray[this.coordX+i][this.coordY+i].color;
                }
            }
            i++;
        }while (checked && i < pattern.length);
        return checked;
    }
    checkE(gridArray, pattern){
        if(this.coordX > 3) return false;
        let checked = true;
        let i = 0;
        do{
            if(pattern[i] === undefined){
                checked = gridArray[this.coordX+i][this.coordY] === undefined; 
            }else {
                if(gridArray[this.coordX+i][this.coordY] === undefined){
                    checked = false;
                }else {
                    checked = pattern[i] === gridArray[this.coordX+i][this.coordY].color;
                }
            }
            i++;
        }while (checked && i < pattern.length);
        return checked;
    }
    checkSE(gridArray, pattern){
        if(this.coordX > 3 || this.coordY < 3) return false;
        let checked = true;
        let i = 0;
        do{
            if(pattern[i] === undefined){
                checked = gridArray[this.coordX+i][this.coordY-i] === undefined; 
            }else {
                if(gridArray[this.coordX+i][this.coordY-i] === undefined){
                    checked = false;
                }else {
                    checked = pattern[i] === gridArray[this.coordX+i][this.coordY-i].color;
                }
            }
            i++;
        }while (checked && i < pattern.length);
        return checked;
    }
}
class Board{
    constructor(){
        this.gridArray = [[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"],[,,,,,,"end"]];
        this.emptySquares = 42; //grid 7x6
    }
    setNode(coordX, color){
        let emptyCoordY = this.getFirstEmptyPlace(coordX);
        if(emptyCoordY !== null){
            this.gridArray[coordX][emptyCoordY] = new Node(Number.parseInt(coordX), emptyCoordY, color);
            this.emptySquares--;
            return emptyCoordY;
        }else {
            return null;
        }
    }
    isMatchPattern(pattern){
        if (pattern[0] !== undefined){
            for(let i = 0; i < this.gridArray.length; i++){
                for (let j = 0; j < this.gridArray[i].length-1; j++){ //-1 por los end
                    if(this.gridArray[i][j] !== undefined){
                        if(this.gridArray[i][j].checkN(this.gridArray, pattern) || this.gridArray[i][j].checkNE(this.gridArray, pattern) || this.gridArray[i][j].checkE(this.gridArray, pattern) || this.gridArray[i][j].checkSE(this.gridArray, pattern)){
                            return [true, i];
                        }
                    }
                }
            }
        }else { //patrones undefined color color color
            //
        }
        return [false, undefined];
    }
    getFirstEmptyPlace(column){
        let coordY = 0
        while(this.gridArray[column][coordY]!==undefined) coordY++;
        return coordY < 6 ? coordY : null;
    }
}

class Game{
    constructor(playVsCPU){
        this.playerColor = "red";
        this.AIcolor = "blue" //also second player
        this.currentBoard = new Board();
        this.playVsCPU = playVsCPU;
        if(playVsCPU) this.myAI = new ArtificialIntelligence(this.AIcolor, this.playerColor);
        this.nextTurn = this.playerColor;
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
            if (this.playVsCPU === true){
                this.doCPUmovement();
            }else {
                this.switchTurn();
            }
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
        if(this.nextTurn === this.playerColor){
            this.nextTurn = this.AIcolor;
        }else {
            this.nextTurn = this.playerColor;
        }
        document.querySelector("#js-turn-indicator").innerHTML = this.nextTurn;
        document.querySelector("#js-turn-indicator").className = "turn__indicator turn__indicator--"+this.nextTurn;
    }
    doCPUmovement(){
        let coordX = this.myAI.getBestColumn(this.currentBoard);
        let coordY = this.currentBoard.setNode(coordX, this.AIcolor);
        document.querySelector(`#js-board-x${coordX}y${coordY}`).className = "board__token board__token--"+this.AIcolor;
    }
    isAnyoneWinner(){
        let winnerColor;
        if(this.currentBoard.isMatchPattern([this.playerColor, this.playerColor, this.playerColor, this.playerColor])[0] === true){
            winnerColor = this.playerColor;
            document.querySelector("#js-turn").innerHTML = `¡El jugador <span  class="turn__indicator turn__indicator--${winnerColor}" id="js-turn-indicator">${winnerColor}</span> gana la partida!`;
            document.querySelector("#js-exit-btn").value = "Salir";
            this.removeListeners();
        }else if(this.currentBoard.isMatchPattern([this.AIcolor, this.AIcolor, this.AIcolor, this.AIcolor])[0] === true){
            winnerColor = this.AIcolor;
            if(this.playVsCPU){
                document.querySelector("#js-turn").innerHTML = `¡La CPU gana la partida!`;
            }else {
                document.querySelector("#js-turn").innerHTML = `¡El jugador <span  class="turn__indicator turn__indicator--${winnerColor}" id="js-turn-indicator">${winnerColor}</span> gana la partida!`;
            }
            this.removeListeners();
        }else if(this.currentBoard.emptySquares === 0){
            document.querySelector("#js-turn").innerHTML = "¡Empate! La partida ha terminado sin ganador.";
            this.removeListeners();
        }
    }
}

/*
 * El algoritmo de juego que implementa esta clase es el siguiente:
 * 
 * La IA realiza los siguientes pasos
 * - Si existe un movimiento que da la victoria, se realiza
 * - Si existe un movimiento que impide la victoria al adversario, se realiza
 * 
 *     A partir de este momento, el resto de movimientos tienen una comprobación
 *     previa: Si el siguiente movimiento da la victoria al adversario, no se
 *     realiza. Esta comprobación continua hasta el último paso
 * 
 * - Si existen movimientos que aproximan la victoria (movimientos BestScore) de la IA,
 *   tras los cuales habrá líneas con tres fichas del color de la IA y un espacio
 *   a los lados o entre las fichas, se realiza uno de esos movimientos al azar
 * - Si existen movimientos que aproximan la victoria (movimientos BestScore) del jugador,
 *   tras los cuales habrá líneas con tres fichas del color del jugador y un espacio
 *   a los lados o entre las fichas, se bloquea con el movimiento de IA una de esas
 *   posibilidades al azar
 * - Si se puede efectuar movimiento en la columna central, se realiza
 * - Se elige un movimiento al azar en una columna no llena
 * - Se elige un movimiento al azar en una columna no llena que conlleva perder la partida
 * 
 */

class ArtificialIntelligence{
    constructor(AIcolor, playerColor){
        this.AIcolor = AIcolor;
        this.playerColor = playerColor;
    }
    copyBoard(board){
        let copiedBoard = new Board();
        copiedBoard.gridArray = [...(board.gridArray)].map(row => [...row]);
        copiedBoard.emptySquares = board.emptySquares;
        return copiedBoard;
    }
    getWinnerMove(board, color){
        let searchingBoard;
        let winnerColumn;
        for (let i = 0; i < board.gridArray.length; i++){
            searchingBoard = this.copyBoard(board);
            searchingBoard.setNode(i, color);
            if (searchingBoard.isMatchPattern([color, color, color, color][0]) === true){
                winnerColumn = i;
                break;
            }
        }
        return winnerColumn;
    }
    isGivingWinMove(board, column){ //from cpu to player
        let guessingBoard = this.copyBoard(board);
        guessingBoard.setNode(column, this.AIcolor);
        if (this.getWinnerMove(guessingBoard, this.playerColor) !== undefined){
            return true;
        }else {
            return false;
        }
    }
    getBestScore(board, color){
        let chosenColumns = [];
        let searchingBoard;
        for(let i = 0; i < board.gridArray.length; i++){
            searchingBoard = this.copyBoard(board);
            if(searchingBoard.setNode(i, color) !== null){
                let searchPatternResults = [];
                searchPatternResults[0] = searchingBoard.isMatchPattern([color, color, color, undefined]);
                searchPatternResults[1] = searchingBoard.isMatchPattern([color, color, undefined, color]);
                searchPatternResults[2] = searchingBoard.isMatchPattern([color, undefined, color, color]);
                searchPatternResults[3] = searchingBoard.isMatchPattern([undefined, color, color, color]);
                for (let j = 0; j < searchPatternResults.length; j++){
                    if (searchPatternResults[j][0] === true) chosenColumns.push(i);
                }
            }
        }
        if (chosenColumns.length !== 0){
            let chosenColumn;
            let avalaibleColumn = false;
            do{
                chosenColumn = (chosenColumns.splice(Math.random() * chosenColumns.length, 1))[0]; //getBestValue(chosenColumns)
                avalaibleColumn = !this.isGivingWinMove(board, chosenColumn);
            } while(!avalaibleColumn && chosenColumns.length > 0);
            if(avalaibleColumn === true){
                return chosenColumn;
            }else {
                return undefined;
            }
        }else {
            return undefined;
        }
    }
    getPartialRandomColumn(board){
        let chosenColumn = 3; //por defecto, el centro
        let posibleColumns = [0, 1, 2, 4, 5, 6];
        if (board.getFirstEmptyPlace(chosenColumn) === null){
            let avalaibleColumn = false;
            do{
                chosenColumn = (posibleColumns.splice(Math.random() * posibleColumns.length, 1))[0];
                if (board.getFirstEmptyPlace(chosenColumn) !== null){
                    avalaibleColumn = !this.isGivingWinMove(board, chosenColumn);
                }
            } while(!avalaibleColumn && posibleColumns.length > 0);
            if (avalaibleColumn === true){
                return chosenColumn;
            }else { //cpu ha perdido, columna al azar no llena
                posibleColumns = [0, 1, 2, 4, 5, 6];
                do{
                    chosenColumn = (posibleColumns.splice(Math.random() * posibleColumns.length, 1))[0];
                }while(board.getFirstEmptyPlace(chosenColumn) === null && posibleColumns.length > 0);
            }
        }
        return chosenColumn;
    }
    getBestColumn(board){
        let bestColumn = undefined;
        bestColumn = this.getWinnerMove(board, this.AIcolor) //cpu
        if (bestColumn === undefined){
            bestColumn = this.getWinnerMove(board, this.playerColor) //player
        }
        if (bestColumn === undefined){
            bestColumn = this.getBestScore(board, this.AIcolor) //cpu
        }
        if (bestColumn === undefined){
            bestColumn = this.getBestScore(board, this.playerColor) //player
        }
        if (bestColumn === undefined){
            bestColumn = this.getPartialRandomColumn(board);
        }
        return bestColumn;
    }
}

class Menu{
    constructor(){
        this.myGame;
        this.CPUplayer;
        this.addListeners();
        this.showMenu();
    }
    addListeners(){
        // document.querySelector("#js-reset-button").addEventListener("click", this);
        document.querySelector("#js-play-one-vs-one-btn").addEventListener("click", this);
        document.querySelector("#js-play-vs-cpu-btn").addEventListener("click", this);
        document.querySelector("#js-exit-btn").addEventListener("click", this);
    }
    handleEvent(event){
        switch(event.target.id){
            case "js-play-vs-cpu-btn":
                this.playOne();
                break;
            case "js-play-one-vs-one-btn":
                this.playTwo()
                break;
            case "js-exit-btn":
                this.exitGame();
                this.showMenu();
                break;
        }
    }
    exitGame(){
        this.myGame.removeListeners();
        this.myGame = undefined;
        this.showMenu();
    }
    playOne(){
        this.showGame();
        this.myGame = new Game(true);
        document.querySelector("#js-exit-btn").value = "Rendirse";
    }
    playTwo(){
        this.showGame();
        this.myGame = new Game(false);
    }
    showMenu(){
        document.querySelector("#js-board").className = "board board--hidden";
        document.querySelector("#js-turn").className = "turn turn--hidden";
        document.querySelector("#js-exit-btn").className = "exit exit--hidden";
        document.querySelector("#js-exit-btn").value = "Salir";
        document.querySelector("#js-menu").className = "menu";
    }
    showGame(){
        document.querySelector("#js-board").className = "board";
        document.querySelector("#js-turn").className = "turn";
        document.querySelector("#js-exit-btn").className = "exit";
        document.querySelector("#js-menu").className = "menu menu--hidden";
    }
}

const myMenu = new Menu();