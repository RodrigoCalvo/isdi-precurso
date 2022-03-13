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

import questions from "./preguntas.js";
const scoreBoard = new ScoreBoard();
const questionsAnswersDataBase = questions;

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

/*
const questionsAnswersDataBase = [
    {letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    {letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    {letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"},
    {letter: "d", answer: "diarrea", question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    {letter: "e", answer: "ectoplasma", question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    {letter: "f", answer: "facil", question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    {letter: "g", answer: "galaxia", question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    {letter: "h", answer: "harakiri", question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    {letter: "i", answer: "iglesia", question: "CON LA I. Templo cristiano"},
    {letter: "j", answer: "jabali", question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    {letter: "k", answer: "kamikaze", question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    {letter: "l", answer: "licantropo", question: "CON LA L. Hombre lobo"},
    {letter: "m", answer: "misantropo", question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    {letter: "n", answer: "necedad", question: "CON LA N. Demostración de poca inteligencia"},
    {letter: "ñ", answer: "señal", question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    {letter: "o", answer: "orco", question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    {letter: "p", answer: "protoss", question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    {letter: "q", answer: "queso", question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    {letter: "r", answer: "raton", question: "CON LA R. Roedor"},
    {letter: "s", answer: "stackoverflow", question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    {letter: "t", answer: "terminator", question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    {letter: "u", answer: "unamuno", question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    {letter: "v", answer: "vikingos", question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    {letter: "w", answer: "sandwich", question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    {letter: "x", answer: "botox", question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    {letter: "y", answer: "peyote", question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    {letter: "z", answer: "zen", question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"}
    ];
*/