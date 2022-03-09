// Datos previos
let flights = [

    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },

    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },

    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true }, //true

    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },

    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },

    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },

    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },

    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true }, //true

    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true }, //true

    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true }, //true

    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

// main
function airlines(){
    airlineInfo();
}

/*
 * Funcion que muestra la información básica de la aerolinea Skylab
 */
function airlineInfo(){
    const givenName = window.prompt("Inserte su nombre por favor:");
    if (givenName != null){
        console.log("Bienvenido "+givenName+", esta es la información de vuelos de Skylab Airlines para el día de hoy:")
        console.log(getShowFlights()); //mostrar todos los vuelos
        console.log("El coste medio de los vuelos de hoy es "+ calcAverageCost()+"€.\n");
        console.log(getShowScaleFlights());
        console.log(getShowLastDestinations(5));
    }else {
        console.log("Programa terminado por el usuario.");
    }
}

/*
 * Función que elabora y devuelve un string con la información de vuelos
 */
function getShowFlights(){
    let fullMsgInfo = "";
    for (let i = 0; i < flights.length; i++){
        let msgInfo = "\tEl vuelo "+flights[i].id+" con origen: "+flights[i].from+", y destino: "+flights[i].to+" tiene un coste de "+flights[i].cost+"€ y";
        if (flights[i].scale){
            msgInfo = msgInfo + " realiza escalas en su trayecto.";
        }else {
            msgInfo = msgInfo + " no realiza ninguna escala.";
        }
        fullMsgInfo = fullMsgInfo+msgInfo+"\n";
    }
    return fullMsgInfo+"\n";
}

/*
 * Función que calcula el coste medio de los vuelos del array de vuelos flights
 */
function calcAverageCost(){
    let acumulate = 0;
    for (let i = 0; i < flights.length; i++){
        acumulate += flights[i].cost
    }
    return roundToTwo(acumulate / flights.length);
}
/* Función auxiliar de redondeo a dos decimales */
function roundToTwo(number){
    return Math.round(number * 100) / 100;
}

/*
 * Función que elabora y devuelve un string que muestra una línea con el número de vuelos con escalas
 */
function getShowScaleFlights(){
    let scaleFlights = 0;
    for (let i = 0; i < flights.length; i++){
        if (flights[i].scale){
            scaleFlights++;
        }
    }
    let msgScale = "El día de hoy, "+scaleFlights+" de nuestros vuelos ";
    msgScale = scaleFlights == 1 ? msgScale+"realiza escalas.\n" : msgScale+"realizan escalas.\n";
    return msgScale;
}

/*
 * Función que elabora y devuelve un string que muestra los n últimos vuelos del día
 */
function getShowLastDestinations(amount){
    const chosenFlights = flights.slice((0-amount));
    let destinations = chosenFlights[0].to;
    for (let i = 1; i < chosenFlights.length; i++){
        if (i == chosenFlights.length - 1){
            destinations = destinations+" y "+chosenFlights[i].to;
        }else {
            destinations = destinations+", "+chosenFlights[i].to;
        }
    }
    return "Los últimos "+amount+" vuelos del día de hoy tienen como destino "+destinations+".\n";
}