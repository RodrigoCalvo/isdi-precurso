const arrayObjetivo = [
    {letra:"a", valor:"alfalfa"},
    {letra:"b", valor:"bebida"},
    {letra:"c", valor:"cobarde"},
    {letra:"d", valor:"dominio"}
];
const abecedario = ["a", "b", "c"];
let arrayFinal = [];
for (const indice of abecedario){
    let arrayExtraccion = arrayObjetivo.filter(item => item.letra === indice);
    arrayFinal.push(arrayExtraccion[0]);
    console.trace(Math.floor(Math.random() * arrayExtraccion.length));
}
console.log(arrayFinal);