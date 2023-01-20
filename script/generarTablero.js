//Creamos el tablero de juego


var tablero = Array.from(Array(filas), () => new Array(columnas));
let identificador = 0;
for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        //creamos un objeto dentro de cada casilla:
        const data = generateUniqueCasilla(identificador, i, j)
        tablero[i][j] = data;
        var cas = document.createElement("div");
        cas.className = "casilla";
        cas.id = identificador;
        identificador++;
        cas.textContent = `${tablero[i][j].valorCasilla}`
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
console.log(tablero)