import { questionsAnswersDataBase } from "./preguntas.js";

class Question {
    constructor(letter, answer, question) {
        this.letter = letter;
        this.answer = answer;
        this.question = question;
        this.status = undefined; //true right, false wrong, undefined not answered
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
        this.questionsArray = questionsArray; //array of Question
        this.bookmark = 0;
        this.lastAnswer;
    }
    getQuestion(){
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
    skipQuestion(){
        this.moveBookmark();
    }
    //Mueve bookmark hacia adelante hasta la próxima pregunta sin responder (status:undefined) en el array de Questions
    moveBookmark(){
        let escapeCount = 0; //control para no dar vueltas sin fin
        do{
            this.bookmark++;
            if (this.bookmark === this.questionsArray.length) this.bookmark = 0; //vuelta
            escapeCount++;
        }while (this.questionsArray[this.bookmark].status != undefined && escapeCount < this.questionsArray.length);
    }
    showRosco(){
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
    }
    askQuestion(){
        console.log(this.currentRosco.getQuestion());
        return window.prompt("¿Respuesta?");
    }
    handleAnswer(givenAnswer){
        if (givenAnswer === null) return null; //exit on cancel prompt
        if (givenAnswer.toUpperCase() === "END") return null;
        if (givenAnswer.toUpperCase() === "PASAPALABRA"){
            console.log("La pregunta ha sido saltada.")
            this.currentRosco.skipQuestion();
            return undefined;
        }
        if (this.currentRosco.tryResolveQuestion(givenAnswer)){
            this.currentScore++;
            this.answeredQuestions++;
            console.log("¡Respuesta correcta! ¡Enhorabuena!");
        }else {
            this.answeredQuestions++
            console.log("¡Ooooh...! Has fallado...\nLa respuesta correcta era "+this.currentRosco.showLastAnswer());
        }
    }
    showGameStatus(){
        let showGameArray = this.currentRosco.showRosco();
        let finalMessage = [];
        for (const showItem of showGameArray){
            let arr = [];
            arr.push(showItem.letter.toUpperCase());
            if(showItem.status === undefined){
                arr.push("Sin contestar");
            }else if(showItem.status === true){
                arr.push("Correcta");
            }else {
                arr.push("Incorrecta");
            }
            finalMessage.push(arr);
        }
        console.table(finalMessage);
    }
    endOfGame(){
        let end = this.answeredQuestions === this.currentRosco.getLength() ? true : false; //contestado todo
        if (end) scoreBoard.addScore(new Score(this.playerName, this.currentScore));
        return end;
    }
    //elige preguntas al azar de la bd, una para cada letra
    autoChooseQuestions(){
        const choosedQuestions = [];
        const abecedary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        for (const letterLoop of abecedary){
            let questionsWithALetter = questionsAnswersDataBase.filter(question => question.letter === letterLoop);
            choosedQuestions.push(questionsWithALetter[Math.floor(Math.random() * questionsWithALetter.length)]);
        }
        const choosedQuestionsObjs = [];
        for (const chQuestion of choosedQuestions){
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
        this.scoreBoard.sort((a, b) => b.score - a.score);
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
    console.log("Bienvenido a PASAPALABRA");
    let playerName = window.prompt("Introduce tu nombre de jugador:");
    if (playerName === null) return undefined; //exit on cancel prompt
    const currentGame = new Game(playerName);
    currentGame.showInfo();
    let endGame = false;
    while (!endGame){
        if(currentGame.handleAnswer(currentGame.askQuestion()) === null){ //exit on cancel prompt
            console.log("Programa interrumpido por el usuario.");
            console.log("Puntuación alcanzada: "+currentGame.currentScore);
            return undefined;
        }
        currentGame.showGameStatus();
        endGame = currentGame.endOfGame();
    }
    console.log(scoreBoard.showScoreBoard());
}

pasapalabra();

// const questionsAnswersDataBase = [
//     {letter: "a", answer: "abducir", question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
//     {letter: "b", answer: "bingo", question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
//     {letter: "c", answer: "churumbel", question: "CON LA C. Niño, crío, bebé"},
//     {letter: "d", answer: "diarrea", question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
//     {letter: "e", answer: "ectoplasma", question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
//     {letter: "f", answer: "fácil", question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
//     {letter: "g", answer: "galaxia", question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
//     {letter: "h", answer: "harakiri", question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
//     {letter: "i", answer: "iglesia", question: "CON LA I. Templo cristiano"},
//     {letter: "j", answer: "jabalí", question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
//     {letter: "k", answer: "kamikaze", question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
//     {letter: "l", answer: "licántropo", question: "CON LA L. Hombre lobo"},
//     {letter: "m", answer: "misántropo", question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
//     {letter: "n", answer: "necedad", question: "CON LA N. Demostración de poca inteligencia"},
//     {letter: "ñ", answer: "señal", question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
//     {letter: "o", answer: "orco", question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
//     {letter: "p", answer: "protoss", question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
//     {letter: "q", answer: "queso", question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
//     {letter: "r", answer: "ratón", question: "CON LA R. Roedor"},
//     {letter: "s", answer: "stackoverflow", question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
//     {letter: "t", answer: "terminator", question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
//     {letter: "u", answer: "unamuno", question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
//     {letter: "v", answer: "vikingos", question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
//     {letter: "w", answer: "sándwich", question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
//     {letter: "x", answer: "bótox", question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
//     {letter: "y", answer: "peyote", question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
//     {letter: "z", answer: "zen", question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
//     {letter: "a", answer: "arteria", question: "CON LA A. Conducto por donde va la sangre desde el corazón a las demás partes del cuerpo."},
//     {letter: "b", answer: "bitácora", question: "CON LA B. En los barcos, especie de armario que está fijo en la cubierta y situado muy cerca del timón donde se pone la brújula."},
//     {letter: "c", answer: "cicerone", question: "CON LA C. Persona que sirve a otras de guía y les va enseñando y explicando lugares y cosas interesantes."},
//     {letter: "d", answer: "diplomacia", question: "CON LA D. Actividad que realiza un país para mantener buenas relaciones con el resto de países."},
//     {letter: "e", answer: "equinoccio", question: "CON LA E. Cada uno de los dos momentos del año en que, por estar el Sol sobre el ecuador, los días y las noches duran lo mismo en toda la Tierra."},
//     {letter: "f", answer: "fisiología", question: "CON LA F. Ciencia que estudia las funciones de los órganos de los seres vivos."},
//     {letter: "g", answer: "glaciación", question: "CON LA G. Cada una de las épocas, hace miles de años, en las que hacía mucho más frío que en la actualidad y gran parte de la Tierra estaba cubierta por hielo."},
//     {letter: "h", answer: "hinojo", question: "CON LA H. Planta de flores amarillas que se usa como condimento, por el sabor de sus frutos parecido al del anís, y también en medicina porque ayuda a hacer la digestión."},
//     {letter: "i", answer: "ingenio", question: "CON LA I. Capacidad para inventar cosas o para pensar y hablar con gracia."},
//     {letter: "j", answer: "jade", question: "CON LA J. Mineral muy duro, de color verde o blanquecino, que se emplea en joyería y para hacer objetos de adorno."},
//     {letter: "k", answer: "kamikaze", question: "CON LA K. Piloto japonés que se lanzaba en su avión contra un barco u otro objetivo enemigo para destruirlo, aunque muriera al hacerlo."},
//     {letter: "l", answer: "lema", question: "CON LA L. Frase que expresa la forma en que debe actuar una persona."},
//     {letter: "m", answer: "miriñaque", question: "CON LA M. Prenda rígida o almidonada, a veces con aros, que antiguamente llevaban las mujeres bajo la falda para darle vuelo."},
//     {letter: "n", answer: "ninfa", question: "CON LA N. En las leyendas mitológicas, diosa con forma de muchacha que vivía en los bosques, las fuentes o los ríos."},
//     {letter: "ñ", answer: "ñandú", question: "CON LA Ñ. Ave parecida al avestruz, pero más pequeña y con tres dedos en cada pie."},
//     {letter: "o", answer: "onomatopeya", question: "CON LA O. Palabra que imita el sonido que hace un animal o una cosa."},
//     {letter: "p", answer: "pabellón", question: "CON LA P. Edificio que es parte de un conjunto, de otro edificio más grande, o que está muy cerca de él."},
//     {letter: "q", answer: "quimera", question: "CON LA Q. Cosa que, sin ser real, alguien la imagina como posible o verdadera."},
//     {letter: "r", answer: "rémora", question: "CON LA R. Pez marino que tiene una especie de ventosa en la cabeza con la que se fija a otros peces más grandes."},
//     {letter: "s", answer: "sotana", question: "CON LA S. Traje negro y largo parecido a una túnica que llevan algunos curas y religiosos"},
//     {letter: "t", answer: "testamento", question: "CON LA T. Escrito o declaración de palabra en el que alguien dice lo que quiere que se haga después de su muerte, sobre todo con su dinero o sus pertenencias."},
//     {letter: "u", answer: "urbanización", question: "CON LA U. Conjunto de casas y edificios que suelen ser parecidos y donde hay tiendas, parques y otros espacios que necesitan las personas que allí viven."},
//     {letter: "v", answer: "vencejo", question: "CON LA V. Pájaro de color casi siempre negro o pardo que tiene el pico delgado, las alas muy largas y la cola en forma de horquilla. Vuela muy rápido."},
//     {letter: "w", answer: "whisky", question: "CON LA W. Licor con mucho alcohol que se hace al fermentar la cebada o algunos otros cereales."},
//     {letter: "x", answer: "xilografía", question: "CON LA X. Manera de hacer grabados sobre madera, dejando vacías las partes que deben quedar blancas en el dibujo."},
//     {letter: "y", answer: "yak", question: "CON LA Y. Mamífero de gran tamaño parecido a un toro, pero con el cuero cubierto de un abundante pelo que lo protege del frío."},
//     {letter: "z", answer: "zócalo", question: "CON LA Z. Banda más o menos ancha, cubierta de otro material o pintada, que hay en la parte baja de las paredes de una habitación."},
//     {letter: "a", answer: "ascua", question: "CON LA A. Trozo de cualquier material ardiendo pero sin llama."},
//     {letter: "b", answer: "bilis", question: "CON LA B. Líquido amargo de color amarillo verdoso producido por el hígado y que ayuda a la digestión de los alimentos."},
//     {letter: "c", answer: "cubismo", question: "CON LA C. Estilo de pintura que comenzó en Francia a principios de este siglo y que se caracteriza por representar figuras y objetos mediante formas geométricas."},
//     {letter: "d", answer: "diéresis", question: "CON LA D. Signo ortográfico que se coloca encima de la u para indicar que esta letra ha de pronunciarse."},
//     {letter: "e", answer: "estría", question: "CON LA E. Línea que se forma en la piel cuando ésta se ha estirado excesivamente."},
//     {letter: "f", answer: "fonema", question: "CON LA F. Sonido de una letra."},
//     {letter: "g", answer: "gaucho", question: "CON LA G. Se dice de las personas que viven en las grandes llanuras de Argentina y Uruguay y llevan el ganado de un lado a otro."},
//     {letter: "h", answer: "himno", question: "CON LA H. Poesía o composición musical en alabanza de alguien o algo, como la que se dedica a un país."},
//     {letter: "i", answer: "imán", question: "CON LA I. Mineral capaz de atraer el hierro u otros metales."},
//     {letter: "j", answer: "jabato.", question: "CON LA J. Cría del jabalí."},
//     {letter: "k", answer: "kamikaze", question: "CON LA K. Piloto japonés que se lanzaba en su avión contra un barco u otro objetivo enemigo para destruirlo, aunque muriera al hacerlo."},
//     {letter: "l", answer: "lombriz", question: "CON LA L. Gusano muy largo de color rojizo que se alimenta de sustancias que hay en la tierra."},
//     {letter: "m", answer: "mudéjar", question: "CON LA M. Nombre que se daba a los musulmanes que vivían en los reinos cristianos de la península ibérica."},
//     {letter: "n", answer: "nogal", question: "CON LA N. Árbol grande con la corteza lisa y de color gris cuyo fruto es la nuez."},
//     {letter: "ñ", answer: "ñoño", question: "CON LA Ñ. Cursi o demasiado delicado."},
//     {letter: "o", answer: "ocre", question: "CON LA O. Se dice del color que es una mezcla de amarillo y marrón."},
//     {letter: "p", answer: "protocolo", question: "CON LA P. Conjunto de reglas o ceremonias que hay que cumplir en los actos oficiales o solemnes."},
//     {letter: "q", answer: "quechua", question: "CON LA Q. Pueblo indio que habita en Perú y que vivía allí antes del descubrimiento de América."},
//     {letter: "r", answer: "repisa", question: "CON LA R. Tabla o elemento similar que se coloca contra la pared para poner en ella objetos."},
//     {letter: "s", answer: "solsticio", question: "CON LA S. Nombre de dos momentos del año que marcan el inicio del verano y el comienzo del invierno."},
//     {letter: "t", answer: "troposfera", question: "CON LA T. Capa de la atmósfera más cercana a la superficie de la Tierra, en la que tienen lugar los fenómenos del tiempo meteorológico."},
//     {letter: "u", answer: "utopía", question: "CON LA U. Algo que es bueno y que deseamos pero que es imposible o muy difícil de realizar."},
//     {letter: "v", answer: "visera", question: "CON LA V. Parte hacia afuera que tienen las gorras por delante y que sirve para que el sol no nos haga daño en los ojos."},
//     {letter: "w", answer: "western", question: "CON LA W. Película del oeste americano."},
//     {letter: "x", answer: "xenófobia", question: "CON LA X. Odio o antipatía hacia los extranjeros."},
//     {letter: "y", answer: "yodo", question: "CON LA Y. Elemento químico de color oscuro que se encuentra en el suelo en forma de sales, así como en las algas y otros animales marinos."},
//     {letter: "z", answer: "zarzal", question: "CON LA Z. Lugar donde hay muchas zarzas."},
//     {letter: "a", answer: "alegre", question: "CON LA A. Sinónimo de contento"},
//     {letter: "b", answer: "biblioteca", question: "CON LA B. Lugar en el que se lleva a cabo el préstamo de libros"},
//     {letter: "c", answer: "cereza", question: "CON LA C. Fruto del cerezo de color rojo oscuro"},
//     {letter: "d", answer: "descargar", question: "CON LA D. Si le añado el prefijo des- al verbo cargar, tienes…"},
//     {letter: "e", answer: "enero", question: "CON LA E. Primer mes del año"},
//     {letter: "f", answer: "frutero", question: "CON LA F. Recipiente en el que se coloca la fruta"},
//     {letter: "g", answer: "guitarra", question: "CON LA G. Instrumento musical seis cuerdas que hacemos sonar los dedos"},
//     {letter: "h", answer: "hermano", question: "CON LA H. ¿Cómo se llama la persona que tiene el mismo padre y la misma madre que tú?"},
//     {letter: "i", answer: "invisible", question: "CON LA I. Añade un prefijo a la palabra visible para obtener lo contrario y tendrás…"},
//     {letter: "j", answer: "jabalí", question: "CON LA J. El jabato es la cría del…"},
//     {letter: "k", answer: "koala", question: "CON LA K. Animal parecido a un oso pequeño y que podemos encontrar en Australia"},
//     {letter: "l", answer: "librería", question: "CON LA L. Lugar en el que se compran libros"},
//     {letter: "m", answer: "mariposa", question: "CON LA M. Insecto con alas grandes y coloridas"},
//     {letter: "n", answer: "naranja", question: "CON LA N. Del campo semántico de los colores y el color de una fruta la que podemos hacer zumo"},
//     {letter: "ñ", answer: "niño", question: "CONTIENE LA Ñ. Contiene Persona que tiene pocos años"},
//     {letter: "o", answer: "oscuro", question: "CON LA O. El antónimo de claro"},
//     {letter: "p", answer: "panadero", question: "CON LA P. ¿Cómo se llama la persona que vende en una panadería?"},
//     {letter: "q", answer: "queso", question: "CON LA Q. Producto obtenido de la leche y que gusta mucho a los ratones"},
//     {letter: "r", answer: "rana", question: "CON LA R. El renacuajo es la cría de la…"},
//     {letter: "s", answer: "sosa", question: "CON LA S. Lo contrario de “La sopa está salada” es: “La sopa está…”"},
//     {letter: "t", answer: "tarta", question: "CON LA T. Pastel grande que no suele faltar en los cumpleaños"},
//     {letter: "u", answer: "usar", question: "CON LA U. Sinónimo de utilizar"},
//     {letter: "v", answer: "vaso", question: "CON LA V. Recipiente que sirve para beber"},
//     {letter: "w", answer: "waterpolo", question: "CON LA W. Juego practicado en una piscina entre dos equipos, que consiste en introducir el balón en la portería contraria"},
//     {letter: "x", answer: "xilófono", question: "CON LA X. Instrumento musical formado por láminas de diferentes tamaños, que suenan al golpearlas"},
//     {letter: "y", answer: "yegua", question: "CON LA Y. Hembra del caballo"},
//     {letter: "z", answer: "zapato", question: "CON LA Z. Calzado que nos ponemos en los pies para caminar"}];