class Question {
    constructor(letter, answer, question) {
        this.letter = letter;
        this.answer = answer;
        this.question = question;
        this.status = undefined; //isRight
    }
    get letter(){
        return this.letter;
    }
    get status(){
        return this.status;
    }
    get question(){
        return this.question;
    }
    get answer(){
        return this.answer;
    }
    tryResolve(answer) {
        if (this.answer.toUpperCase() === answer.toUpperCase()) {
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
        return this.questionsArray[this.bookmark].question();
    }
    tryResolveQuestion(answer){
        let solved = this.questionsArray[this.bookmark].tryResolve(answer);
        this.lastAnswer = this.questionsArray[this.bookmark].answer();
        this.bookmark++;
        return solved;
    }
    showLastAnswer(){
        return this.lastAnswer;
    }
    skipQuestion(){ //pasapalabra
        this.bookmark++;
        let escapeCount = 0;
        while (this.questionsArray[this.bookmark].status != undefined && escapeCount < this.questionsArray.length){
            this.bookmark++; //pasa hasta primera sin responder
            escapeCount++;
        }
    }
    showRosco(){ //parejas letra-estado
        let showRosco = [];
        for (const question of this.questionsArray) {
            showRosco.push({letter:(question.letter()), status:(question.status())});
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
        this.playerName;
        this.currentRosco = new Rosco(autoChooseQuestions());
        this.answeredQuestions = 0;
        this.scoreInt = 0;
    }
    showInfo(){}
    askQuestion(){} //prompt
    handleAnswer(answer){}
    endOfGame(){} //... + scoreBoard.push

    autoChooseQuestions(){
        const choosedQuestions = [];
        const abecedary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        for (const letter of abecedary){
            let questionsWithALetter = questionsAnswersDataBase.filter(question => question.letter.toUpperCase() === letter.toUpperCase());
            choosedQuestions.push(questionsWithALetter[Math.floor(Math.random * questionsWithALetter.length)]);
        }
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

function pasapalabra(){
    //lalala...
    
}

function autoChooseQuestions(){
    const choosedQuestions = [];
    const abecedary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (const letter of abecedary){
        let questionsWithALetter = questionsAnswersDataBase.filter(question => question.letter.toUpperCase() === letter.toUpperCase());
        choosedQuestions.push(questionsWithALetter[Math.floor(Math.random * questionsWithALetter.length)]);
    }
    const choosedQuestionsObjs = [];
    for (const chQuestion of choosedQuestions){
        //crear question, meterla en choosedquestionobjs
        choosedQuestionsObjs.push(new Question(chQuestion.letter, chQuestion.answer,chQuestion.question));
    }
    return choosedQuestionsObjs;
}


const questionsAnswersDataBase = [
    { letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"}
];