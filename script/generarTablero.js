import { generateUniqueCasilla } from "./ObjectCasilla.js";
export {generarDefaultTablero};

//Creamos el tablero de juego
const generarDefaultTablero = (filas,columnas, map, Eltablero) => {
    console.log(map)

var tablero = Array.from(Array(filas), () => new Array(columnas));
let identificador = 0;
for (let i = 0; i < filas; i++) { // valor i representa las filas
    for (let j = 0; j < columnas; j++) { //valor j representa las columnas
        //creamos un objeto dentro de cada casilla:
        let val = map[i][j];
        const data = generateUniqueCasilla(identificador, i, j, val); //llamamos a la funcion para que nos genere un objeto de cada casilla
        tablero[i][j] = data;
        var cas = document.createElement("div");
        cas.className = "casilla";
        cas.id = identificador;
        identificador++;
        cas.textContent = `${tablero[i][j].valorCasilla}`;
        Eltablero.appendChild(cas);
        //Arriba
        if (i == 0) {
            cas.style.borderTop = '4px solid black';
        }
        //Abajo
        if (i == filas - 1) {
            cas.style.borderBottom = '4px solid black';
        }
        //izquierda
        if (j == 0) {
            cas.style.borderLeft = '4px solid black';

        }
        //derecha
        if (j == columnas - 1) {
            cas.style.borderRight = '4px solid black';

        }
    }
}

Eltablero.style.gridTemplateColumns = `repeat(${columnas}, auto)`;
Eltablero.style.gridTemplateRows = `repeat(${filas}, auto)`;
console.log(tablero)
return tablero;
}