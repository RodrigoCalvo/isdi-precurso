function calculator(){
    showInfo();
    let userPlainData; // entrada del prompt tal cual
    do{
        userPlainData = getDataPrompt("Introduzca uno o dos números en la calculadora.");
        if (userPlainData == null){ // si el usuario cancela el prompt, cierre inmediato
            console.log("Programa terminado por el usuario.")
            return undefined;
        }
    }while (!checkData(userPlainData)); // solicita datos correctos
    const userData = parseData(userPlainData); //convertir a array de floats
    if (userData.length == 1){
        const numberRoot = Math.sqrt(userData[0]);
        if (Number.isNaN(numberRoot)){
            console.log("La raíz cuadrada de "+userData[0]+" no existe");
        }else {
            console.log("La raíz cuadrada de "+userData[0]+" es "+roundToThree(numberRoot));
        }
        
    }else if(userData.length == 2){ // se acotan los decimales a 3
        const operationsData = mathOperations(userData[0], userData[1]);
        console.log("La suma de "+userData[0]+" mas "+userData[1]+" es "+roundToThree(operationsData[0]));
        console.log("La resta de "+userData[0]+" menos "+userData[1]+" es "+roundToThree(operationsData[1]));
        console.log("El producto de "+userData[0]+" por "+userData[1]+" es "+roundToThree(operationsData[2]));
        console.log("La división de "+userData[0]+" entre "+userData[1]+" es "+roundToThree(operationsData[3]));
    }else {
        console.log("Error desconocido.");
    }

}
/*
 * Función que muestra las instrucciones previas del programa
 */
function showInfo(){
    console.log("^*^*^*^* CALCULADORA *^*^*^*^\n Instrucciones:\n Debe introducir uno o dos números "+
    "separados por un espacio.\n Si introduce un solo número, se realizará la raíz cuadrada de éste.\n Si "+
    "introduce dos números, se realizarán la suma, resta, multiplicación y división de dichos valores "+
    "en el orden introducido.\n No introduzca datos que no sean uno o dos números.\n");
}
/*
 * Función que solicita una entrada de datos al usuario mediante un prompt.
 * La entrada vacía será "undefined"
 */
function getDataPrompt(message){
    const dataPrompt = window.prompt(message);
    return dataPrompt != null ? dataPrompt.trim() : null; //trim para quitar espacios sobrantes (p ej vacios)
}
/*
 * Función que recibe un string con los datos y devuelve true si son datos válidos (un número o dos números) y false en cualquier otro caso
 */
function checkData(dataString){
    if(dataString == ""){ // si la entrada es vacía
        return false;
    }
    const dataSplit = dataString.split(" ");
    if (dataSplit.length != 1 && dataSplit.length != 2){ // si no hay 1 o 2 datos
        return false;
    }
    if (dataSplit.length == 1){ // si es 1 dato
        if (Number.isNaN(Number(dataSplit[0]))){ // si no es un número
            return false;
        }
    }else { // si son dos datos
        if(Number.isNaN(Number(dataSplit[0])) || Number.isNaN(Number(dataSplit[1]))){ // si cualquiera de los dos no es un número
            return false;
        }
    }
    return true;
}
/*
 * Función que recibe un string con los datos ya comprobados y devuelve un array con el número o números
 */
function parseData(dataString){
    const dataSplit = dataString.split(" ");
    const dataArray = dataSplit.map(x => Number.parseFloat(x));
    return dataArray;
}
/*
 * Función que realiza la raíz cuadrada del número que recibe devolviendo un mensaje de error si ésta no existe (por ser raíz de número negativo)
 */
/*function squareRoot(number){
    return number >= 0 ? Math.sqrt(number) : "No existe";
}*/

/*
 * Función que realiza las operaciones de suma, resta, multiplicación y división a los dos números que recibe por parámetro.
 * Devuelve un array con los cuatro resultados en el citado orden
 */
function mathOperations(number1, number2){
    let opsResult = [];
    opsResult.push(number1 + number2);
    opsResult.push(number1 - number2);
    opsResult.push(number1 * number2);
    opsResult.push(number1 / number2);
    return opsResult;
}
/*
 * Función que redondea a tres decimales desplazando la coma tres posiciones a la derecha (*1000), después redondeando a entero 
 * y volviendo a desplazar la coma tres posiciones a la izquierda (/1000)
 */
function roundToThree(number){
    return Math.round(number * 1000) / 1000;
}
