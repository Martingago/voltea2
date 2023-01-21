"use strict";
import { generateUniqueCasilla } from "./ObjectCasilla.js";

const filas = 7;
const columnas = 5;
const Eltablero = document.querySelector("#tablero");

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
Eltablero.style.gridTemplateColumns = `repeat(${columnas}, auto)`;

const casTablero = document.querySelectorAll(".casilla");
casTablero.forEach(casilla => {
    casilla.addEventListener("click",
        () => {
            let idTmp = casilla.id
            //devuelve el ID de la ficha que hace click el usuario. 
            //Este valor ID podemos buscarlo en el array para conocer su ubicacion
          buscadorCasillaPorID(idTmp);
          cambiarDatosTablero(posFil, posCol);
          pintarDatosTablero();
          
        }
    )
});

let posFil;
let posCol;
let id;

const buscadorCasillaPorID = (id) => {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            
            if(tablero[i][j].idCasilla == id){
                posFil = tablero[i][j].fila;
                posCol = tablero[i][j].columna;
                id = tablero[i][j].idCasilla;
                //console.log("Casilla ID:" , id, "fila:" ,posFil, "Columna: " ,posCol);
                
                return {
                    posFil,
                    posCol,
                    id
                }
            }
        }
    }
}

const cambiarDatosTablero = (posFil, posCol) => {
    const ficha = tablero[posFil][posCol];
    //cambiamos las posiciones verticales
    for(let vi = -1; vi <=1; vi++){
        let posicionVertical = posFil - vi; // recorre posiciones verticales
        if(posicionVertical >= 0 && posicionVertical < filas && posicionVertical != posFil){
            if(tablero[posicionVertical][posCol].valorCasilla === 1){
                tablero[posicionVertical][posCol].valorCasilla = 0;
            }
            else if(tablero[posicionVertical][posCol].valorCasilla === 0){
                tablero[posicionVertical][posCol].valorCasilla = 1;
            }
            
        }
    }
    //Cambiamos posiciones horizontales
    for(let  hj= -1; hj <=1; hj++){
        let posicionHorizontal= posCol - hj; // recorre posiciones horizontales
        if(posicionHorizontal >= 0 && posicionHorizontal < columnas && posicionHorizontal != posCol){
            if(tablero[posFil][posicionHorizontal].valorCasilla === 1){
                tablero[posFil][posicionHorizontal].valorCasilla = 0;
            }
            else if(tablero[posFil][posicionHorizontal].valorCasilla === 0){
                tablero[posFil][posicionHorizontal].valorCasilla = 1;
            }
        }
    }


    if(ficha.valorCasilla  === 0){
        ficha.valorCasilla = 1;
    }
    else if(ficha.valorCasilla === 1){
        ficha.valorCasilla = 0;
    }
    
}

const pintarDatosTablero = () => {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let id = tablero[i][j].idCasilla;
            document.getElementById(id).textContent = tablero[i][j].valorCasilla;
            
            if(tablero[i][j].valorCasilla === 1){
                document.getElementById(`${tablero[i][j].idCasilla}`).classList.add("active");
            }else{
                document.getElementById(`${tablero[i][j].idCasilla}`).classList.remove("active");
            }
        }
    }
}