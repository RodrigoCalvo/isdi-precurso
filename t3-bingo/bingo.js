function ScoreBoard(){
    const scoreBoard = [];
    function addScore(score){
        scoreBoard.push(score);
    }
    function showScoreBoard(){
        for (let i = 0; i < scoreBoard.length; i++){
            scoreBoard[i].showScore();
        }
    }
}
function Game(userName){
    this.userName = userName;
    this.board = generateBoard();
}
function Board(laneTop, laneMid, laneBot){
    this.laneTop = laneTop;
    this.laneMid = laneMid;
    this.laneBot = laneBot;
    let anyLaneMatched = false;
    function tryMatch(number){
        return (laneTop.tryMatch(number) || laneMid.tryMatch(number) || laneBot.tryMatch(number));
    }
    function checkLane(){
        if (anyLaneMatched){
            return anyLaneMatched;
        }
        anyLaneMatched = (laneTop.isLane() || laneMid.isLane() || laneBot.isLane());
        return anyLaneMatched;
    }
    function isBingo(){
        return (laneTop.isLane() && laneMid.isLane() && laneBot.isLane());
    }
    function showBoard(){
        return [laneTop.showLane(), laneMid.showLane(), laneBot.showLane()];
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
    let isMatched = false;
    function tryMatch(numberM){
        if (isMatched){
            return isMatched;
        }
        if(this.number == numberM){
            isMatched = true;
        }
        return isMatched;
    }
    function showSquare(){
        if (!isMatched){
            return number;
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
    //obj scoreBoard
    //obj game
}

function generateBoard(){
    let boardNumbers = easyBoardGenerator();
    let lanesObjs = [];
    for (let i = 0; i < boardNumbers.lenght; i++){
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