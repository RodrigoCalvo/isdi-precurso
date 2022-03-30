class Node{
    constructor(coordX, coordY, color){
        this.coordX = coordX;
        this.coordY = coordY;
        this.color = color;
    }
    check(gridArray, pattern, direction){
        let shiftX = 1;
        let shiftY = 1;
        let exit = false;
        switch(direction){
            case "N":
                shiftX = 0;
                if(this.coordY > 2) exit = true;
                break;
            case "NE":
                if(this.coordX > 3 || this.coordY > 2) exit = true;
                break;
            case "E":
                shiftY = 0;
                if(this.coordX > 3) exit = true;
                break;
            case "SE":
                shiftY = -1;
                if(this.coordX > 3 || this.coordY < 3) exit = true;
                break;
        }
        if (exit) return false;
        let checked = true;
        let i = 0;
        do{
            if(pattern[i] !== gridArray[this.coordX+(shiftX*i)][this.coordY+(shiftY*i)].color){
                checked = false;
            }
            i++;
        }while (checked && i < pattern.length);
        return checked;
    }
}
class Board{
    constructor(){
        this.gridArray = this.fillGrid();
        this.emptySquares = 42; //grid 7x6
    }
    fillGrid(){
        let gridArray = [];
        for(let i = 0; i < 7; i++){
            let auxArray = [];
            for (let j = 0; j < 6; j++){
                auxArray.push(new Node(i, j, "white"));
            }
            gridArray.push(auxArray);
        }
        return gridArray;
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
        for(let i = 0; i < this.gridArray.length; i++){
            for (let j = 0; j < this.gridArray[i].length; j++){
                if(this.gridArray[i][j].check(this.gridArray, pattern, "N") ||
                 this.gridArray[i][j].check(this.gridArray, pattern, "NE") || 
                 this.gridArray[i][j].check(this.gridArray, pattern, "E") || 
                 this.gridArray[i][j].check(this.gridArray, pattern, "SE")){
                    return true;
                }
            }
        }
        return false;
    }
    getFirstEmptyPlace(column){
        let coordY = 0
        while(coordY < 6 && this.gridArray[column][coordY].color !== "white") coordY++;

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
        document.querySelectorAll(".board__control-square").forEach((element) => {
            element.addEventListener("click", this);
        });
    }
    removeListeners(){
        document.querySelectorAll(".board__control-square").forEach((element) => {
            element.removeEventListener("click", this);
        });
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
        if(this.currentBoard.isMatchPattern([this.playerColor, this.playerColor, this.playerColor, this.playerColor]) === true){
            winnerColor = this.playerColor;
            document.querySelector("#js-turn").innerHTML = `¡El jugador <span  class="turn__indicator turn__indicator--${winnerColor}" id="js-turn-indicator">${winnerColor}</span> gana la partida!`;
            document.querySelector("#js-exit-btn").value = "Salir";
            this.removeListeners();
        }else if(this.currentBoard.isMatchPattern([this.AIcolor, this.AIcolor, this.AIcolor, this.AIcolor]) === true){
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
        this.blankColor = "white";
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
            if (searchingBoard.isMatchPattern([color, color, color, color]) === true){
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
                searchPatternResults[0] = searchingBoard.isMatchPattern([color, color, color, this.blankColor]);
                searchPatternResults[1] = searchingBoard.isMatchPattern([color, color, this.blankColor, color]);
                searchPatternResults[2] = searchingBoard.isMatchPattern([color, this.blankColor, color, color]);
                searchPatternResults[3] = searchingBoard.isMatchPattern([this.blankColor, color, color, color]);
                for (let j = 0; j < searchPatternResults.length; j++){
                    if (searchPatternResults[j] === true) chosenColumns.push(i);
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
        let chosenColumn = 3; //default: middle
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
            }else { //cpu has lost, random not-full column
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
        bestColumn = this.getWinnerMove(board, this.AIcolor)
        if (bestColumn === undefined){
            bestColumn = this.getWinnerMove(board, this.playerColor)
        }
        if (bestColumn === undefined){
            bestColumn = this.getBestScore(board, this.AIcolor)
        }
        if (bestColumn === undefined){
            bestColumn = this.getBestScore(board, this.playerColor)
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
        document.querySelector("#js-play-one-vs-one-btn").addEventListener("click", this);
        document.querySelector("#js-play-vs-cpu-btn").addEventListener("click", this);
        document.querySelector("#js-exit-btn").addEventListener("click", this);
    }
    handleEvent(event){
        switch(event.target.id){
            case "js-play-vs-cpu-btn":
                this.showGame();
                this.myGame = new Game(true);
                document.querySelector("#js-exit-btn").value = "Rendirse";
                break;
            case "js-play-one-vs-one-btn":
                this.showGame();
                this.myGame = new Game(false);
                break;
            case "js-exit-btn":
                this.myGame.removeListeners();
                this.myGame = undefined;
                this.showMenu();
                break;
        }
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