import { generateUniqueCasilla } from "./ObjectCasilla.js";
import { dataUserMovements } from "../app.js";
import { bloquearBotonesHistorial } from "./historyMovementsUser.js";
export {generarDefaultTablero};

/**
 * @param {*} Eltablero Elemento HTML de la aplicacion, sobre el se generará todo el componente de tablero 
 * @param {*} map Array de 2 dimensiones, contiene los datos de cada casilla
 * @returns devuelve un array de 2 dimensiones con un objeto DATA
 */

const generarDefaultTablero = (Eltablero, map) => {
    const filas = map.filas;
    const columnas = map.columnas;
    const dataTablero = map.mapa;
    dataUserMovements.tamUserHistory = 0;
    dataUserMovements.userMovements = [];
    dataUserMovements.newUserPosition = -1;
    bloquearBotonesHistorial();
    
var tablero = Array.from(Array(filas), () => new Array(columnas));
let identificador = 0;
for (let i = 0; i < filas; i++) { // valor i representa las filas
    for (let j = 0; j < columnas; j++) { //valor j representa las columnas
        let val = dataTablero[i][j];
        /**
         * Genera un objeto - DATA - dentro de cada elemento del array.
         * dicho objeto se compone de: ID, fila, columna, valor
         */
        const data = generateUniqueCasilla(identificador, i, j, val);
        tablero[i][j] = data;  
        var cas = document.createElement("div");
        cas.className = "casilla";
        cas.id = identificador;
        identificador++;  
        cas.textContent = `${tablero[i][j].valorCasilla}`;
        Eltablero.appendChild(cas);
        //pintamos la casilla atendiendo al valor que tenga en su interior
        drawCasillaData(data);
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
return tablero;
}

const drawCasillaData = (data) => {
    let casilla = document.getElementById(`${data.idCasilla}`)
    switch (data.valorCasilla) {
        case 0:
            
            break;
        case 1:
            casilla.classList.add("active");
            break;
        case 2:
            casilla.classList.add("motherblock");
            break;

    }
}