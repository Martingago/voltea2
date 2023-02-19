"use strict";
import { tablero } from "../app.js";
export { limpiarTablero, cambiarDatosTablero};

/**
 * Función que elimina todos los elementos hijos del tablero
 * @param {*} Eltablero Se introduce el elemento HTML tablero
 */
const limpiarTablero = (Eltablero) => {  
    while(Eltablero.firstChild){
        Eltablero.removeChild(Eltablero.firstChild);
    }
}


const cambiarDatosTablero = (posFil, posCol, filas,columnas) => {
    const ficha = tablero[posFil][posCol];
    //cambiamos las posiciones verticales
    for (let vi = -1; vi <= 1; vi++) {
        let posicionVertical = posFil - vi; // recorre posiciones verticales
        if (posicionVertical >= 0 && posicionVertical < filas && posicionVertical != posFil) {
            manipulateValorCasilla(tablero[posicionVertical][posCol]);
        }
    }
    //Cambiamos posiciones horizontales
    for (let hj = -1; hj <= 1; hj++) {
        let posicionHorizontal = posCol - hj; // recorre posiciones horizontales
        if (posicionHorizontal >= 0 && posicionHorizontal < columnas) {
            manipulateValorCasilla(tablero[posFil][posicionHorizontal]);
        }
    }
}

//genera un nuevo valor a la casilla dependiendo de su estado actual
const manipulateValorCasilla = (casilla) => {
    let cas = document.getElementById(casilla.idCasilla);
    switch (casilla.valorCasilla) {
        case 0:
            casilla.valorCasilla = 1;
            cas.classList.add("active");
            //cas.textContent = `${casilla.valorCasilla}`;
            break;
        case 1:
            casilla.valorCasilla = 0;
            cas.classList.remove("active");
            //cas.textContent = `${casilla.valorCasilla}`;
            break;
        case 2:
            casilla.valorCasilla = 2;
            cas.classList.add("motherBlock");
            break;
    }
}