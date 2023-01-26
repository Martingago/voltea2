"use strict";
export {generateUniqueCasilla, buscadorCasillaPorID};


const generateUniqueCasilla = (id, fil, col, val) => {
    return {
        idCasilla: id,
        columna : col,
        fila: fil,
        valorCasilla: val  
        /**
         * 0 valor VACIO
         * 1 valor COMPLETO
         * 2 valor OBJETO INMOVIBLE
         */
    };
}


/**
 * @param {*} id String es el #id HTML que tiene cada elemento
 * @returns devuelve posFila, posColumna, valorObjeto
 */
const buscadorCasillaPorID = (tablero, filas, columnas, id, posFil, posCol, vCasilla) => {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {

            if (tablero[i][j].idCasilla == id) {
                posFil = tablero[i][j].fila;
                posCol = tablero[i][j].columna;
                id = tablero[i][j].idCasilla;
                vCasilla = tablero[i][j].valorCasilla
                return {
                    posFil,
                    posCol,
                    vCasilla
                }
            }
        }
    }
}
