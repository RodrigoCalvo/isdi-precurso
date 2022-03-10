class Question {
    constructor(letter, answer, question) {
        this.letter = letter;
        this.index = letter.toUpperCase().charCodeAt(0) - 64; //convertir a:1 b:2 c:3...
        this.answer = answer;
        this.question = question;
        this.status = 0;
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
            this.status = 1;
            return true;
        }else {
            this.status = -1;
            return false;
        }
    }
}
class Rosco {
    constructor (questions){
        this.questions = questions; //array
        this.bookmark = 1;
    }
    getQuestion (){
        return questions[bookmark-1].question();
    }

    skipQuestion(){ //pasapalabra
        this.bookmark++;
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