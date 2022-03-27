function copyArray2D(sourceArray){
    let objetiveArray = [...sourceArray].map(row => [...row]);
    return objetiveArray;
}

const arrayUno = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];
const myObjeto = {id:"uno", grid:arrayUno};
// const cloneGrid = (grid) => [...grid].map(row => [...row])
const arrayDos = [...(myObjeto.grid)].map(row => [...row]);
arrayDos[1][1] = 11;
console.log(myObjeto.grid);
console.log(arrayDos);
