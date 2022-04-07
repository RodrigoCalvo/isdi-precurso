/**
 * Objeto que representa cada uno de los cuadrados numerados de un cartón de bingo
 * 
 * @param number el número inscrito en el cuadrado
 */
class Square {
    constructor(number) {
        this.number = number;
        this.isMatched = false;
    }
    tryMatchSquare(numberToMatch) {
            if (this.number === numberToMatch) {
                this.isMatched = true;
                return true;
            }
            return false;
    }
    isMatchedSquare() {
            return this.isMatched;
    }
    showSquare() {
            if (!this.isMatched) {
                return String(this.number);
            } else {
                return "X";
            }
    }
    showUnmatchedSquare() {
            return this.number;
    }
}

/**
 * Objeto que representa una línea de un cartón de bingo, formada por cuadrados (ver Square)
 *
 * @param squares array de objetos de tipo Square
 */
class Line {
    constructor(squares) {
        this.squares = squares;
        this.lineDone = false;
    }
    tryMatchLine(number) {
        let matched = false;
        let counter = 0;
        while (!matched && counter < this.squares.length) {
            matched = this.squares[counter].tryMatchSquare(number);
            counter++;
        }
        return matched;
    }
    isFullLine() {
        let counter = 0;
        let fullLine = true;
        while (!this.lineDone && fullLine && counter < this.squares.length) {
            fullLine = this.squares[counter].isMatchedSquare();
            counter++;
        }
        if (fullLine) {
            this.lineDone = true;
        }
        return this.lineDone;
    }
    showLine() {
        let returnedArray = [];
        for (let i = 0; i < this.squares.length; i++) {
            returnedArray.push(this.squares[i].showSquare());
        }
        return returnedArray;
    }
}

/**
 * Objeto que representa un cartón completo de bingo, formado por líneas (Line) a su vez formadas por cuadrados (Square)
 * 
 * @param lines array de objetos de tipo Line
 */
class Board {
    constructor(lines) {
        this.lines = lines;
        this.anyLineMatched = false;
    }
    tryMatchBoard(number) {
        let matched = false;
        let counter = 0;
        while (!matched && counter < this.lines.length) {
            matched = this.lines[counter].tryMatchLine(number);
            counter++;
        }
        return matched;
    }
    isFirstLine() {
        if (this.anyLineMatched)
            return false; //solo canta linea la primera vez
        let counter = 0;
        while (!this.anyLineMatched && counter < this.lines.length) {
            this.anyLineMatched = this.lines[counter].isFullLine();
            counter++;
        }
        return this.anyLineMatched;
    }
    isBingoBoard() {
        let isBingo = true;
        let counter = 0;
        while (isBingo && counter < this.lines.length) {
            isBingo = this.lines[counter].isFullLine();
            counter++;
        }
        return isBingo;
    }
    showBoard() {
        let returnedArray = [];
        for (let i = 0; i < this.lines.length; i++) {
            returnedArray.push(this.lines[i].showLine());
        }
        return returnedArray;
    }
}

/**
 * Objeto que representa una puntuación de juego almacenada
 * 
 * @param name el nombre del jugador
 * @param score la puntación conseguida por el jugador
 */
class Score {
    constructor(name, score) {
        this.name = name;
        this.score = score;
        //date?
        this.getScore = function () {
            return this.score;
        };
        this.showScore = function () {
            return this.name + ": " + this.score + " puntos\n";
        };
    }
}

/**
 * Objeto que representa una partida de bingo, para un jugador dado, con un cartón y un bombo (drum) de números,
 * así como las funcionalidades de sacar un número y actualizar dinámicamente la puntuación
 * 
 * @param userName nombre del jugador, se almacenará como puntuación
 * @param disposableBoard boolean que indica si el jugador podrá desechar los cartones generados hasta quedarse con uno
 */
class Game {
    constructor(userName, disposableBoard) {
        this.userName = userName;
        this.board = generateBoard(disposableBoard);
        this.drum = [];
        this.score = 100;
    }
    show() {
        return this.board.showBoard();
    }
    tryMatch(number) {
        return this.board.tryMatchBoard(number);
    }
    isFirstLineGame() {
        return this.board.isFirstLine();
    }
    isBingo() {
        return this.board.isBingoBoard();
    }
    fillDrum() {
        this.drum.length = 0;
        for (let i = 1; i <= 90; i++) {
            this.drum[i - 1] = i;
        }
    }
    drawNumber() {
        return (this.drum.splice((Math.floor(Math.random() * this.drum.length)), 1))[0];
    }
    updateScore() {
        this.score--;
    }
    getScore() {
        return new Score(this.userName, this.score);
    }
}

/**
 * Objeto que representa la tabla de puntuaciones permanente en la que se registra el histórico de puntuaciones generadas por los juegos
 * 
 * 
 */
class ScoreBoard {
    constructor() {
        this.scoreBoard = [];
    }
    addScore(score) {
        this.scoreBoard.push(score);
        this.scoreBoard.sort((a, b) => b.getScore() - a.getScore());
    }
    showScoreBoard() {
        let stringReturned = "";
        for (let i = 0; i < this.scoreBoard.length; i++) {
            stringReturned += this.scoreBoard[i].showScore();
        }
        return stringReturned;
    }
}

/**
 * Función que inicia el bingo y gestiona la creación de nuevos juegos y el almacenamiento de puntuaciones
 * 
 * @return undefined
 */
function bingo(){
    //quizás scoreBoard debiera ser global para poder llamar a bingo() varias veces sin perder las puntuaciones
    const scoreBoard = new ScoreBoard(); 
    let exitMenu = false;
    while (!exitMenu){
        let endOfGame = false;
        let lineDone = false;
        console.log("Este bingo registra tu puntuación.\nCada jugador comienza con 100 puntos y se le descuenta por cada número sacado.\nCuanto antes cantes bingo, ¡mayor puntuación tendrás!");
        console.log("La actual tabla de puntuaciones es la siguiente:\n"+scoreBoard.showScoreBoard());
        const playerName = window.prompt("Introduce tu nombre de jugador.");
        if (playerName == null) return undefined; //exit on cancel prompt
        //const currentGame = new Game(playerName);
        const currentGame = new Game(playerName, true);
        currentGame.fillDrum();
        console.log("\n^*^*^*^*^ COMIENZA LA PARTIDA ^*^*^*^*^\n\n");
        while (!endOfGame){
            let currentNumber = currentGame.drawNumber();
            console.log("Ha salido el número "+currentNumber);
            if (currentGame.tryMatch(currentNumber)){
                console.log("Lo has tachado, "+playerName+"!");
            }else {
                console.log(playerName+", ese número no estaba en tu cartón.");
            }
            if (!lineDone){
                if (currentGame.isFirstLineGame()){
                    console.log("\t\tLínea!");
                    lineDone = true;
                }
            }
            if (currentGame.isBingo()){
                console.log("\n\t\tBingo!!\n\n");
                endOfGame = true;
            }
            console.table(currentGame.show());
            currentGame.updateScore();
        }
        scoreBoard.addScore(currentGame.getScore());
        console.log(scoreBoard.showScoreBoard());
        exitMenu = !(window.confirm("¿Quieres jugar otra partida?"));
    }

}

/**
 * Función que genera un cartón para el juego. Si la opción de desechar está activada, pregunta al usuario si desea
 * conservarlo o generar otro.
 * 
 * @param {*} disposableBoard booleano que indica si el jugador puede desechar cartones
 * @return {*} generatedBoard un objeto de tipo Board que representa el cartón de juego
 */
function generateBoard(disposableBoard){
    let confirmedBoard = disposableBoard ? false : true;
    let generatedBoard;
    do {
        let boardNumbers = easyBoardGenerator();
        let linesObjs = [];
        for (let i = 0; i < boardNumbers.length; i++){
            let squaresObjs = [];
            for (let j = 0; j < boardNumbers[i].length; j++){
                squaresObjs.push(new Square(boardNumbers[i][j]));
            }
            linesObjs.push(new Line(squaresObjs));
        }
        generatedBoard = new Board(linesObjs);
        if(disposableBoard){
            console.log("Este será tu cartón de juego:");
            console.table(generatedBoard.showBoard());
            confirmedBoard = window.confirm("¿Deseas conservar el cartón que se te ha mostrado?");
            if (!confirmedBoard){
                console.log("Cartón desechado, se genera un cartón nuevo.");
            }else {
                console.log("Cartón confirmado.")
            }
        }
    }while (!confirmedBoard);
    return generatedBoard;
}

/**
 * Función que genera una colección de 15 números aleatorios no repetidos entre el 1 y el 90 para un cartón de bingo,
 * organizados en 3 filas de 5 números cada una
 * 
 * @return chosenNumbers un array de arrays que representan las filas, y a su vez contienen los números 
 */
function easyBoardGenerator(){
    let allNumbers = [];
    let chosenNumbers = [[],[],[]];
    for (let h = 1; h <= 90; h++){
        allNumbers[h-1] = h;
    }
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 5; j++){
            chosenNumbers[i][j] = (allNumbers.splice((Math.floor(Math.random() * allNumbers.length)), 1))[0];
        }
    }
    return chosenNumbers;
}