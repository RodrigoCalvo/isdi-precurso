function Square(number){
    this.number = number;
    this.isMatched = false;
    this.tryMatchSquare = function(numberToMatch){
        if(this.number === numberToMatch){
            this.isMatched = true;
            return true;
        }
        return false;
    }
    this.isMatchedSquare = function(){
        return this.isMatched;
    }
    this.showSquare = function(){
        if (!this.isMatched){
            return String(this.number);
        }else {
            return "X";
        }
    }
    this.showUnmatchedSquare = function(){
        return this.number;
    }
}

function Lane(squares){
    this.squares = squares; //array obj Square
    this.laneDone = false;
    this.tryMatchLane = function (number){
        let matched = false;
        let counter = 0;
        while (!matched && counter < this.squares.length){
            matched = this.squares[counter].tryMatchSquare(number);
            counter++;
        }
        return matched;
    }
    this.isFullLane = function(){
        let counter = 0;
        let fullLane = true;
        while (!this.laneDone && fullLane && counter < this.squares.length){
            fullLane = this.squares[counter].isMatchedSquare();
            counter++;
        }
        if (fullLane){
            this.laneDone = true;
        }
        return this.laneDone;
    }
    this.showLane = function(){
        let returnedArray = [];
        for (let i = 0; i < this.squares.length; i++){
            returnedArray.push(this.squares[i].showSquare());
        }
        return returnedArray;
    }
}

function Board(lanes){
    this.lanes = lanes; //array obj Lane
    this.anyLaneMatched = false;
    this.tryMatchBoard = function(number){
        let matched = false;
        let counter = 0;
        while (!matched && counter < this.lanes.length){
            matched = this.lanes[counter].tryMatchLane(number);
            counter++;
        }
        return matched;
    }
    this.isFirstLane = function(){
        if (this.anyLaneMatched) return false; //solo canta linea la primera vez
        let counter = 0;
        while (!this.anyLaneMatched && counter < this.lanes.length){
            this.anyLaneMatched = this.lanes[counter].isFullLane();
            counter++;
        }
        return this.anyLaneMatched;
    }
    this.isBingoBoard = function(){
        let isBingo = true;
        let counter = 0;
        while (isBingo && counter < this.lanes.length){
            isBingo = this.lanes[counter].isFullLane();
            counter++;
        }
        return isBingo;
    }
    this.showBoard = function(){
        let returnedArray = [];
        for (let i = 0; i < this.lanes.length; i++){
            returnedArray.push(this.lanes[i].showLane());
        }
        return returnedArray;
    }
}

function Game(userName){
    this.userName = userName;
    this.board = generateBoard();
    this.drum = [];
    this.score = 100;
    this.show = function(){
        return this.board.showBoard();
    }
    this.tryMatch = function(number){
        return this.board.tryMatchBoard(number);
    }
    this.isFirstLaneGame = function(){
        return this.board.isFirstLane(); 
    }
    this.isBingo = function(){
        return this.board.isBingoBoard();
    }
    this.fillDrum = function(){
        this.drum.length = 0;
        for (let i = 1; i <= 90; i++){
            this.drum[i-1] = i;
        }
    }
    this.drawNumber = function(){
        return (this.drum.splice((Math.floor(Math.random() * this.drum.length)), 1))[0];
    }
    this.updateScore = function(){
        this.score--;
    }
    this.getScore = function(){
        return new Score(this.userName, this.score);
    }
}

function Score(name, score){
    this.name = name;
    this.score = score;
    //date?
    this.showScore = function(){
        return this.name+": "+this.score+" puntos\n";
    }
}

function ScoreBoard(){
    this.scoreBoard = [];
    this.addScore = function(score){
        this.scoreBoard.push(score);
    }
    this.showScoreBoard = function(){
        let stringReturned = "";
        for (let i = 0; i < this.scoreBoard.length; i++){
            stringReturned += this.scoreBoard[i].showScore();
        }
        return stringReturned;
    }
}

// main
function bingo(){
    const scoreBoard = new ScoreBoard();
    let exitMenu = false;
    while (!exitMenu){
        let endOfGame = false;
        let laneDone = false;
        const playerName = window.prompt("Introduce tu nombre de jugador.");
        const currentGame = new Game(playerName);
        console.log(currentGame.show()); // traza
        currentGame.fillDrum();
        while (!endOfGame){
            let currentNumber = currentGame.drawNumber();
            console.log("Ha salido el número "+currentNumber);
            if (currentGame.tryMatch(currentNumber)){
                console.log("Lo has tachado!");
            }else {
                console.log("Ese número no estaba en tu cartón.");
            }
            if (!laneDone){
                if (currentGame.isFirstLaneGame()){
                    console.log("\t\tLínea!");
                    laneDone = true;
                }
            }
            if (currentGame.isBingo()){
                console.log("\n\t\tBingo!!\n\n");
                endOfGame = true;
            }
            console.table(currentGame.show()); // mirar el console.table
            currentGame.updateScore();
        }
        scoreBoard.addScore(currentGame.getScore());
        console.log(scoreBoard.showScoreBoard());
        exitMenu = !(window.confirm("Otra?"));
    }        

}

function generateBoard(){
    let boardNumbers = easyBoardGenerator();
    let lanesObjs = [];
    for (let i = 0; i < boardNumbers.length; i++){
        let squaresObjs = [];
        for (let j = 0; j < boardNumbers[i].length; j++){
            squaresObjs.push(new Square(boardNumbers[i][j]));
        }
        lanesObjs.push(new Lane(squaresObjs));
    }
    return new Board(lanesObjs);
}
//genera un array de 3 arrays de 5 de enteros no repetidos entre 1 y 90
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
function boardGenerator(){
    //ya tal
}