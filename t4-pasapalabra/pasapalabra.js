class Question {
    constructor(letter, answer, question) {
        this.letter = letter;
        this.answer = answer;
        this.question = question;
        this.status = undefined; //isRight
    }
    tryResolve(answer) {
        if (String(this.answer).toUpperCase() === String(answer).toUpperCase()) {
            this.status = true;
            return true;
        }else {
            this.status = false;
            return false;
        }
    }
}
class Rosco {
    constructor (questionsArray){
        this.questionsArray = questionsArray;
        this.bookmark = 0;
        this.lastAnswer;
    }
    getQuestion (){
        return this.questionsArray[this.bookmark].question;
    }
    getLength(){
        return this.questionsArray.length;
    }
    tryResolveQuestion(answer){
        let solved = this.questionsArray[this.bookmark].tryResolve(answer);
        this.lastAnswer = this.questionsArray[this.bookmark].answer;
        this.moveBookmark();
        return solved;
    }
    showLastAnswer(){
        return this.lastAnswer;
    }
    skipQuestion(){ //pasapalabra
        this.moveBookmark();
    }
    moveBookmark(){ //busca la próxima sin responder
        let escapeCount = 0; //control para no dar vueltas sin fin
        do{ 
            this.bookmark++; 
            if (this.bookmark === this.questionsArray.length) this.bookmark = 0; //vuelta
            escapeCount++;
        }while (this.questionsArray[this.bookmark].status != undefined && escapeCount < this.questionsArray.length);
    }
    showRosco(){ //parejas letra-estado
        let showRosco = [];
        for (const question of this.questionsArray) {
            showRosco.push({letter:(question.letter), status:(question.status)});
        }
        return showRosco;
    }
}

class Score {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
    toString() {
        return this.name + ": " + this.score + " puntos\n";
    }
}

class Game {
    constructor(playerName){
        this.playerName = playerName;
        this.currentRosco = new Rosco(this.autoChooseQuestions());
        this.answeredQuestions = 0;
        this.currentScore = 0;
    }
    showInfo(){
        console.log("Contesta a las preguntas con la pista de la letra correspondiente.");
        console.log("currentRosco length "+this.currentRosco.getLength()); // traza
    }
    askQuestion(){
        console.log(this.currentRosco.getQuestion());
        return window.prompt("¿Respuesta?");
        
    }
    handleAnswer(givenAnswer){
        if (givenAnswer === null) return null;
        if (givenAnswer.toUpperCase() === "END") return null;
        if (givenAnswer.toUpperCase() === "PASAPALABRA"){
            console.log("La pregunta ha sido saltada.")
            this.currentRosco.skipQuestion();
            return undefined;
        }
        if (this.currentRosco.tryResolveQuestion(givenAnswer)){ //si acierta
            this.currentScore++; //recibe un punto
            this.answeredQuestions++; //pregunta contestada
            console.log("¡Respuesta correcta! ¡Enhorabuena!");
        }else { //si falla
            this.answeredQuestions++
            console.log("¡Ooooh...! Has fallado...\nLa respuesta correcta era "+this.currentRosco.showLastAnswer());
        }
    }
    showGameStatus(){
        let showGameArray = this.currentRosco.showRosco();
        for (const showItem of showGameArray){
            let str = "Pregunta con letra "+showItem.letter+" está ";
            if(showItem.status === undefined){
                str = str+"sin contestar.";
            }else if(showItem.status === true){
                str = str+"correcta.";
            }else {
                str = str+"incorrecta.";
            }
            console.log(str);
        }
    }
    endOfGame(){
        let end = this.answeredQuestions === this.currentRosco.getLength() ? true : false;
        if (end) scoreBoard.addScore(new Score(this.playerName, this.currentScore));
        return end;
    }

    autoChooseQuestions(){
        const choosedQuestions = [];
        const abecedary = ["a", "b", "c"]; //, "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        
        for (const letterLoop of abecedary){
            let questionsWithALetter = questionsAnswersDataBase.filter(question => question.letter === letterLoop);
            choosedQuestions.push(questionsWithALetter[Math.floor(Math.random() * questionsWithALetter.length)]);
        }
        console.log(choosedQuestions); // traza
        const choosedQuestionsObjs = [];
        for (const chQuestion of choosedQuestions){
            //crear question, meterla en choosedquestionobjs
            choosedQuestionsObjs.push(new Question(chQuestion.letter, chQuestion.answer,chQuestion.question));
        }
        return choosedQuestionsObjs;
    }
}

class ScoreBoard {
    constructor() {
        this.scoreBoard = [];
    }
    addScore(score){
        this.scoreBoard.push(score);
        this.scoreBoard.sort((a, b) => b.getScore() - a.getScore());
    };
    showScoreBoard(){
        let stringScores = "";
        for (const score of this.scoreBoard){
            stringScores += score.toString();
        }
        return stringScores;
    };
}

const scoreBoard = new ScoreBoard();
const questionsAnswersDataBase = [
    { letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"}
];

function pasapalabra(){
    console.log("Bienvenido a PASAPALABRA");
    const currentGame = new Game("Jacinto"); //window.prompt("Introduce tu nombre de jugador:"));
    currentGame.showInfo();
    let endGame = false;
    while (!endGame){
        if(currentGame.handleAnswer(currentGame.askQuestion()) === null){
            console.log("Programa interrumpido por el usuario.");
            console.log("Puntuación alcanzada: "+currentGame.currentScore);
            return undefined;
        }
        currentGame.showGameStatus();
        endGame = currentGame.endOfGame();
    }
    console.log(scoreBoard.showScoreBoard());
}