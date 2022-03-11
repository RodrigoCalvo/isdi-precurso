class Question {
    constructor(letter, answer, question) {
        this.letter = letter;
        this.answer = answer;
        this.question = question;
        this.isRight = undefined;
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
    tryResolve(answer) {
        if (this.answer === answer) {
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
        this.questionsArray = questionsArray; //array
        this.bookmark = 0;
    }
    getQuestion (){
        return this.questionsArray[this.bookmark].question();
    }
    tryResolveQuestion(answer){
        this.questionsArray[this.bookmark].tryResolve(answer);
        this.bookmark++;
    }
    skipQuestion(){ //pasapalabra
        this.bookmark++;
    }
    showRosco(){ //parejas letra-estado
        let showRosco = [];
        for (const question of this.questionsArray) {
            showRosco.push({letter:(question.question()), status:(question.status())});
        }
        return showRosco;
    }
}

class Game {

}

function pasapalabra(){
    //lalala...
    
}

const questionsAnswersDataBase = [
    { letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"}
];