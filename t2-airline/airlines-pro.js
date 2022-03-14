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
function airlinesPro(){
    if(airlineInfo()){
        if(!airlineMenu()){
            console.log("\nPrograma terminado por el usuario.");
        }
    }else {
        console.log("\nPrograma terminado por el usuario.");
    }
}

/*
 * Funcion que muestra la información básica de la aerolinea Skylab
 */
function airlineInfo(){
    const givenName = window.prompt("Inserte su nombre por favor:");
    if (givenName != null){
        console.log("Bienvenido "+givenName+", esta es la información de vuelos de Skylab Airlines para el día de hoy:")
        console.log(getShowFlights(1)); //mostrar todos los vuelos
        console.log("El coste medio de los vuelos de hoy es "+ calcAverageCost()+"€.\n");
        console.log(getShowScaleFlights());
        console.log(getShowLastDestinations(5));
        return true;
    }else {
        return false; // salida en cancelar
    }
}

/*
 * Funciones que gestionan los menus de admin y user
 */
function airlineMenu(){
    let isRightChoice = false;
    do{
        const userLevel = window.prompt("Inserte ADMIN o USER para ver el menú correspondiente.");
        if(userLevel == null){
            return false; // salida en cancelar
        }else if(userLevel.toUpperCase().trim() == "ADMIN"){
            isRightChoice = true;
            return menuAdmin();
        }else if(userLevel.toUpperCase().trim() == "USER"){
            isRightChoice = true;
            return menuUser();
        }else {
            isRightChoice = false;
            console.log("Elija ADMIN o USER");
        }
    }while (!isRightChoice);
}
function menuAdmin(){
    let exit = false;
    while(!exit){
        console.log("Elija una opción insertando su número correspondiente:");
        console.log("1: Añadir un nuevo vuelo.\n2: Eliminar un vuelo.\n3: Salir")
        let option = window.prompt("Inserte el número");
        if (option == null){
            return false; // salida en cancelar
        }
        switch(option){
            case "1":
                setNewFlight();
                break;
            case "2":
                deleteFlight();
                break;
            case "3":
                console.log("Conexión concluida.")
                exit = true;
                break; 
            default:
                console.log("Opción incorrecta");
                break;
        }
    }
    return true;
}
function menuUser(){
    let exit = false;
    while(!exit){
        console.log("Elija una opción insertando su número correspondiente:");
        console.log("1: Buscar vuelos por precio.\n2: Salir")
        let option = window.prompt("Inserte el número");
        if (option == null){
            return false; // salida en cancelar
        }
        switch(option){
            case "1":
                exit = searchByPrice();
                break;
            case "2":
                console.log("Conexión concluida.")
                exit = true;
                break; 
            default:
                console.log("Opción incorrecta");
                break;
        }
    }
    return true;
}

/*
 * Función que elabora y devuelve un string con la información de vuelos
 * Option 1 para formato amigable, 0 para formato reducido
 */
function getShowFlights(option){
    let fullMsgInfo = "";
    if (option == 1){
        for (let i = 0; i < flights.length; i++){
            let msgInfo = "\tEl vuelo "+flights[i].id.toString().padStart(2, 0)+" con origen: "+flights[i].from+", y destino: "+flights[i].to+" tiene un coste de "+flights[i].cost+"€ y";
            if (flights[i].scale){
                msgInfo = msgInfo + " realiza escalas en su trayecto.";
            }else {
                msgInfo = msgInfo + " no realiza ninguna escala.";
            }
            fullMsgInfo = fullMsgInfo+msgInfo+"\n";
        }
    }else {
        for (let i = 0; i < flights.length; i++){
            let msgInfo = "\tID: "+flights[i].id+" Origen: "+flights[i].from+" Destino: "+flights[i].to+" Coste: "+flights[i].cost+" Escalas: ";
            msgInfo = flights[i].scale ? msgInfo+"Sí" : msgInfo+"No";
            fullMsgInfo = fullMsgInfo+msgInfo+"\n";
        }  
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

/*
 * Función que permite añadir un vuelo a la tabla de vuelos. Realiza todas las solicitudes de
 * datos, las comprobaciones de que sean correctos y la inserción del nuevo vuelo en la tabla.
 * Notifica éxito o fracaso por mensajes de consola, devuelve undefined en todo caso.
 * 
 * Ampliación opcional: externalizar solicitud y comprobación de datos, propagar éxito o fracaso a menú
 * Ampliación opcional: implementar y utilizar método mostrar() de objetos vuelo
 */
function setNewFlight(){
    if (flights.length >= 15){
        alert("Máximo de vuelos alcanzado. Borre algún vuelo antes de añadir uno nuevo");
    }else {
        let usedIds = getUsedIds();
        /* Entendido mal el enunciado, la ID debe generarse automáticamente
        console.log("IDs en uso: "+usedIds);
        let idIsOk = false;
        while(!idIsOk){
            newId = window.prompt("Inserte la ID numérico del nuevo vuelo. No puede ser una ID ya en uso.");
            if (newId == null){
                return undefined; // salida en cancelar
            }else if(Number.isNaN(Number(newId))){
                console.log("Sólo IDs numéricas, por favor.");
            }else if(usedIds.indexOf(newId) != -1){
                console.log("La ID especificada ya existe.");
            }else {
                idIsOk = true;
            }
        } */
        usedIds = usedIds.sort((a, b) => {return a - b;}); //ordena ids usadas
        let newId = usedIds[usedIds.length-1] + 1; //nueva id = idMayor +1
        let newFrom, newTo, newCost, newScale;
        newFrom = window.prompt("Inserte el origen del vuelo.");
        if (newFrom == null) return undefined; // salida en cancelar
        newTo = window.prompt("Inserte el destino del vuelo.");
        if (newTo == null) return undefined; // salida en cancelar
        let costIsOk = false;
        while (!costIsOk){
            newCost = window.prompt("Inserte el coste del vuelo.");
            if (newCost == null) return undefined; // salida en cancelar
            if (Number.isNaN(Number(newCost))){
                console.log("Inserte un número para el coste del vuelo.")
            }else {
                costIsOk = true;
            }
        }
        let scaleyn;
        let scaleIsOk = false;
        while (!scaleIsOk){
            scaleyn = window.prompt("¿El vuelo tiene escalas? S/N");
            if (scaleyn == null) return undefined; // salida en cancelar
            if (scaleyn.toUpperCase() == "S" || scaleyn.toUpperCase().charAt(0) == "S"){
                newScale = true;
                scaleIsOk = true;
            }else if(scaleyn.toUpperCase() == "N" || scaleyn.toUpperCase().charAt(0) == "N"){
                newScale = false;
                scaleIsOk = true;
            }
        }
        let newFlightInfo = "\tID: "+newId+" Origen: "+newFrom+" Destino: "+newTo+" Coste: "+newCost+" Escalas: ";
        newFlightInfo = newScale ? newFlightInfo+"Sí" : newFlightInfo+"No";
        console.log(newFlightInfo);
        let allIsOk = window.prompt("¿Confirma los datos del nuevo vuelo? S/N");
        if (allIsOk == null) return undefined; // salida en cancelar
        if (allIsOk.toUpperCase() == "S" || allIsOk.toUpperCase().charAt(0) == "S"){
            let newflightObj = {id: Number(newId), to: newTo, from: newFrom, cost: Number(newCost),  scale: newScale} // ojo que metia id y coste como string
                                        // y luego borrar no encontraba el id correcto
            let preLength = flights.length;
            flights.push(newflightObj);
            if (flights.length - preLength == 1){
                console.log("Vuelo insertado con éxito.\nInformación actual de vuelos:");
                console.log(getShowFlights(0));
            }else {
                console.log("Error desconocido.");
                return undefined;
            }
        }else { // todo lo que no sea un S/Sí se considera no confirmar datos
            console.log("Inserción de nuevo vuelo cancelada.");
        }
    }
}

/*
 * Función que pide una ID de vuelo para borrarlo, comprueba que sea correcta y exista, y
 * borra el vuelo asociado de la tabla de vuelos
 */
function deleteFlight(){
    console.log("Elija el vuelo a borrar mediante su ID:")
    console.log(getShowFlights(0));
    let deletedFlightId;
    let deletedIdIsOk = false;
    let usedIds = getUsedIds();
    while (!deletedIdIsOk){
        deletedFlightId = window.prompt("Inserte ID del vuelo a borrar");
        if (deletedFlightId == null) return undefined; // salida en cancelar
        if (Number.isNaN(Number(deletedFlightId))){
            console.log("Sólo IDs numéricas, por favor.");
        }else if(usedIds.indexOf(Number(deletedFlightId)) == -1){
            console.log("La ID "+deletedFlightId+" no existe.\nElija una ID existente:");
            console.log(getShowFlights(0));
        }else {
            deletedIdIsOk = true;
        }
    }
    // buscar el índice del objeto vuelo en array flights cuyo id coincida con el id introducido
    // element => element.id == deletedFlightId
    // función dado un elemento, true si la id del elemento coincide
    // findIndex aplica la función a los elementos del array y devuelve el index de quien la cumple
    let deleteFlightIndex = flights.findIndex((element) => element.id == deletedFlightId);
    flights.splice(deleteFlightIndex, 1);
    console.log("El vuelo con ID "+deletedFlightId+" ha sido borrado.\n");
}

/*
 * Función que pide un precio máximo de vuelo y busca entre los vuelos existentes aquellos
 * que tengan ese precio o inferior. Llama a la función de compra al terminar, propaga el 
 * éxito o fracaso (true/false) de ésta hacia la función que la haya llamado.
 */
function searchByPrice(){
    const chosenPrice = window.prompt("Inserte el precio máximo para la búsqueda.");
    if (chosenPrice == null){
        return false; // salida en cancelar
    }else if (Number.isNaN(Number(chosenPrice))){
        console.log("No inserte precios no numéricos, por favor.")
        return false;
    }else {
        let searchedFlights = [];
        for (let i = 0; i < flights.length; i++){
            if (flights[i].cost <= chosenPrice){
                searchedFlights.push(flights[i]);
            }
        }
        if (searchedFlights == 0){
            console.log("No hay ningún vuelo por ese precio o uno inferior.");
            return false;
        }else {
            console.log("Vuelos con coste de "+chosenPrice+"€ o menos:")
            for (let j = 0; j < searchedFlights.length; j++){
                let msgComp = "\tID: "+searchedFlights[j].id+" Origen: "+searchedFlights[j].from+" Destino: "+searchedFlights[j].to+" Coste: "+searchedFlights[j].cost+" Escalas: ";
                msgComp = searchedFlights[j].scale ? msgComp+"Sí" : msgComp+"No";
                console.log(msgComp);
            }
        }
    }
    return buyFlight();
}

/*
 * Función que simula la compra de un billete para un vuelo por su ID o la cancelación de compra, devuelve true o false según cual de las dos opciones sea.
 */
function buyFlight(){
    const chosenFlight = window.prompt("Inserte ID del vuelo a comprar o pulse Cancelar para salir.");
    if(chosenFlight == null){
        return false; // salida en cancelar
    }else {
        // aquí se podría poner una comprobación de que el ID que ha introducido existe
        // pero el enunciado no dice nada de ello
        // ampliación opcional futura
        console.log("Gracias por su compra, vuelva pronto.");
        return true;
    }
    
}

/*
 * Función que devuelve un array de las IDs ya utilizadas en la tabla de vuelos
 */
function getUsedIds(){
    let usedIds = [];
    for (let i = 0; i < flights.length; i++){
        usedIds.push(flights[i].id);
    }
    return usedIds;
}