function calc(){
    showInfo();
    let userPlainData;
    do{
        userPlainData = getDataPrompt("Introduzca uno o dos números en la calculadora.");
    }while (checkData(userPlainData)); // solicita datos correctos
    const userData = parseData(userPlainData);
    if (userData.length == 1){
        const numberRoot = squareRoot(userData[0]);
        if (numberRoot == "No existe"){
            console.log("La raíz cuadrada de "+userData[0]+" no existe");
        }else {
            console.log("La raíz cuadrada de "+userData[0]+" es "+numberRoot.toFixed(3));
        }
        
    }else if(userData.length == 2){ // se acotan los decimales a 3
        const operationsData = mathOperations(userData);
        console.log("La suma de "+userData[0]+" mas "+userData[1]+" es "+operationsData[0].toFixed(3));
        console.log("La resta de "+userData[0]+" menos "+userData[1]+" es "+operationsData[1].toFixed(3));
        console.log("El producto de "+userData[0]+" por "+userData[1]+" es "+operationsData[2].toFixed(3));
        console.log(`La división de ${userData[0]} entre ${userData[1]} es ${operationsData[3].toFixed(3)}`);
    }else {
        console.log("Error desconocido.");
    }

}
/*
 * Función que muestra las instrucciones previas del programa
 */
function showInfo(){
    console.log("^*^*^*^* CALCULADORA *^*^*^*^\n Instrucciones:\n Debe introducir uno o dos números separados por espacios.\n Si introduce un solo número, se realizará la raíz cuadrada de éste.\n Si introduce dos números, se realizarán la suma, resta, multiplicación y división de dichos valores en el orden introducido.\n No introduzca datos que no sean uno o dos números.\n");
}
/*
 * Función que solicita una entrada de datos al usuario mediante un prompt.
 * La entrada vacía será "undefined"
 */
function getDataPrompt(message){
    const dataPrompt = window.prompt(message);
    return dataPrompt;
}
/*
 * Función que recibe un string con los datos y devuelve true si son datos válidos (un número o dos números) y false en cualquier otro caso
 */
function checkData(dataString){
    if(dataString === undefined){ // si la entrada es vacía
        return false;
    }
    const dataSplit = dataString.split(" ");
    if (dataSplit.length != 1 || dataSplit.length != 2){ // si no hay 1 o 2 datos
        return false;
    }
    if (dataSplit.length == 1){ // si es 1 dato
        if (Number.isNaN(dataSplit[0].parseFloat())){ // si no es un número
            return false;
        }
    }else { // si son dos datos
        if(Number.isNaN(dataSplit[0].parseFloat()) || Number.isNaN(dataSplit[1].parseFloat())){ // si cualquiera de los dos no es un número
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
    const dataArray = dataSplit.map(parseFloat());
    return dataArray;
}
/*
 * Función que realiza la raíz cuadrada del número que recibe devolviendo un mensaje de error si ésta no existe (por ser raíz de número negativo)
 */
function squareRoot(number){
    return number >= 0 ? Math.sqrt(number) : "No existe";
}
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
