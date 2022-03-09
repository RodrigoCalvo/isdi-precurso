function calculatorPro(){
    let finish = false;
    do{
        showInfo();
        let userPlainData; // entrada del prompt tal cual
        let userData = []; // datos aportados por el usuario debidamente formateados
        let exit = false;
        do{
            userPlainData = getDataPrompt("Introduzca un solo número.");
            if (userPlainData == null){
                exit = true;
            }else {
                if(checkData(userPlainData)){ // numeros correctos se almacenan
                    userData.push(Number.parseFloat(userPlainData));
                }else { // números incorrectos no se añaden pero sigue el bucle
                    alert("Número incorrecto. Puede seguir introduciendo números.");
                }
            }
        }while (!exit); // sale del bucle al cancelar el prompt
        
        if (userData.length == 0){ // sin datos, cancelado en primera peticióni
            console.log("Programa cerrado por el usuario.");
            return undefined;
        }else if (userData.length == 1){
            const numberRoot = Math.sqrt(userData[0]);
            if (Number.isNaN(numberRoot)){
                console.log("La raíz cuadrada de "+userData[0]+" no existe");
            }else {
                console.log("La raíz cuadrada de "+userData[0]+" es "+roundToThree(numberRoot));
            }   
        }else { // si es más de un número
            const operationsData = mathOperations(userData);
            console.log("La suma de los números introducidos es "+roundToThree(operationsData[0]));
            console.log("La resta consecutiva de los números introducidos es "+roundToThree(operationsData[1]));
            console.log("El producto de los números introducidos es "+roundToThree(operationsData[2]));
            console.log("La división consecutiva de los números introducidos es "+roundToThree(operationsData[3]));
        }
        finish = window.confirm("¿Desea realizar otra operación?");
    } while (finish);
}
/*
 * Función que muestra las instrucciones previas del programa
 */
function showInfo(){
    console.log("^*^*^*^* CALCULADORA *^*^*^*^\n Instrucciones:\n Debe introducir Los números que desee, uno por prompt. Cuando no desee introducir más números, pulse Cancelar.\n Si introduce un solo número, se realizará la raíz cuadrada de éste.\n Si introduce dos números, se realizarán la suma, resta, multiplicación y división de dichos valores en el orden introducido.\n No introduzca datos que no sean uno o dos números.\n");
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
    if (dataSplit.length != 1){ // si no hay 1 solo dato
        return false;
    }else {   // si es 1 dato
        if (Number.isNaN(Number(dataSplit[0]))){ // si no es un número
            return false;
        }
    }
    return true;
}
/*
 * Función que realiza las operaciones de suma, resta, multiplicación y división a los dos números que recibe por parámetro.
 * Devuelve un array con los cuatro resultados en el citado orden
 */
function mathOperations(numberArray){
    let opsResult = [numberArray[0], numberArray[0], numberArray[0], numberArray[0]];
    for (let i = 1; i < numberArray.length; i++){ // i=1 pq el primer operando ya está preparado
        opsResult[0] += numberArray[i];
        opsResult[1] -= numberArray[i];
        opsResult[2] *= numberArray[i];
        opsResult[3] /= numberArray[i];
    }
    return opsResult;
}
/*
 * Función que redondea a tres decimales desplazando la coma tres posiciones a la derecha (*1000), después redondeando a entero y volviendo a desplazar la coma tres posiciones a la izquierda (/1000)
 */
function roundToThree(number){
    return Math.round(number * 1000) / 1000;
}
