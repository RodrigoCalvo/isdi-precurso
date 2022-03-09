function ScoreBoard(){
    this.scoreBoard = [];
    function addScore(score){
        this.scoreBoard.push(score);
    }
    function showScoreBoard(){
        for (let i = 0; i < this.scoreBoard.length; i++){
            return this.scoreBoard[i].showScore();
        }
    }
}
function Score(name, score){
    this.name = name;
    this.score = score;
    //date?
    function showScore(){
        return name+": "+score+" puntos";
    }
}
function Game(userName){
    this.userName = userName;
    this.board = generateBoard();
    this.drum = [];
    this.score = 100;
    function showBoard(){
        return this.board.showBoard();
    }
    function tryMatch(number){
        return this.board.tryMatch(number);
    }
    function isLane(){
        return this.board.isLane();
    }
    function isBingo(){
        return this.board.isBingo();
    }
    function fillDrum(){
        this.drum.length = 0;
        for (let i = 1; i <= 90; i++){
            this.drum[i-1] = i;
        }
    }
    function drawNumber(){
        return (drum.splice((Math.floor(Math.random() * drum.length)), 1))[0];
    }
    function updateScore(){
        this.score--;
    }
    function getScore(){
        return new Score(this.userName, this.score);
    }
}
function Board(laneTop, laneMid, laneBot){
    this.laneTop = laneTop;
    this.laneMid = laneMid;
    this.laneBot = laneBot;
    let anyLaneMatched = false;
    function tryMatch(number){
        return (this.laneTop.tryMatch(number) || this.laneMid.tryMatch(number) || this.laneBot.tryMatch(number));
    }
    function isLane(){
        if (this.anyLaneMatched){
            return this.anyLaneMatched;
        }
        this.anyLaneMatched = (this.laneTop.isLane() || this.laneMid.isLane() || this.laneBot.isLane());
        return this.anyLaneMatched;
    }
    function isBingo(){
        return (this.laneTop.isLane() && this.laneMid.isLane() && this.laneBot.isLane());
    }
    function showBoard(){
        return [this.laneTop.showLane(), this.laneMid.showLane(), this.laneBot.showLane()];
    }
}
function Lane(square1, square2, square3, square4, square5){
    this.square1 = square1;
    this.square2 = square2;
    this.square3 = square3;
    this.square4 = square4;
    this.square5 = square5;
    function tryMatch(number){
        return (square1.tryMatch(number) || square2.tryMatch(number) || square3.tryMatch(number) || square4.tryMatch(number) || square5.tryMatch(number))
    }
    function isLane(){
        return (square1.isMatched() && square2.isMatched() && square3.isMatched() && square4.isMatched() && square5.isMatched());
    }
    function showLane(){
        return [square1.showSquare(), square2.showSquare(), square3.showSquare(), square4.showSquare(), square5.showSquare()];
    }
}
function Square(number){
    this.number = number;
    this.isMatched = false;
    function tryMatch(newNumber){
        if(this.number == newNumber){
            this.isMatched = true;
            return true;
        }
        return false;
    }
    function isMatched(){
        return this.isMatched;
    }
    function showSquare(){
        if (!this.isMatched){
            return String(this.number);
        }else {
            return "X";
        }
    }
    function showUnmatchedSquare(){
        return number;
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
        currentGame.fillDrum();
        while (!endOfGame){
            let currentNumber = currentGame.drawNumber();
            // console sale tal numero
            currentGame.tryMatch(currentNumber);
            if (!laneDone){
                if (currentGame.isLane()){
                    //console linea
                    laneDone = true;
                }
            }
            if (currentGame.isBingo()){
                //console bingo
                endOfGame = true;
            }
            console.table(currentGame.showBoard()); // mirar el formato
            currentGame.updateScore();
        }
        scoreBoard.addScore(currentGame.getScore());
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
        lanesObjs.push(new Lane(...squaresObjs));
    }
    return new Board(...lanesObjs[0]);
}

function easyBoardGenerator(){
    //genera un array de 3x5 de enteros no repetidos entre 1 y 90
    return [[],[]];
}
function boardGenerator(){
    //ya tal
}