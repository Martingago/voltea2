"use strict";
export {generateUniqueCasilla};


const generateUniqueCasilla = (id, fil, col, val) => {
    return {
        idCasilla: id,
        columna : col,
        fila: fil,
        valorCasilla: val  
        /**
         * 0 valor VACIO
         * 1 valor COMPLETO
         * 3 valor OBJETO INMOVIBLE
         */
    };

}
