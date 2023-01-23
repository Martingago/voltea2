"use strict";

import { generarDefaultTablero } from "./generarTablero.js";

const getData = async () =>  {
    try {
      const response = await fetch('script/lvls_maps/maps.json');
      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  
  let loadData = await getData();
  console.log(loadData.maps[1])


const filas = loadData.maps[1].filas;
const columnas = loadData.maps[1].columnas;
const map = loadData.maps[1].mapa;

const Eltablero = document.querySelector("#tablero");

/**
 * Genera un tablero por defecto (éste estará vacio)
 * Sus dimensiones vienen dadas por las variables: filas y columnas.
 */
var tablero = generarDefaultTablero(filas, columnas, map, Eltablero);



const casTablero = document.querySelectorAll(".casilla");
casTablero.forEach(casilla => {
    casilla.addEventListener("click",
        () => {
            let idTmp = casilla.id
            //devuelve el ID de la ficha que hace click el usuario. 
            //Este valor ID podemos buscarlo en el array para conocer su ubicacion
            buscadorCasillaPorID(idTmp);
            cambiarDatosTablero(posFil, posCol);
        }
    )
});

let posFil;
let posCol;

/**
 * @param {*} id String es el #id HTML que tiene cada elemento
 * @returns devuelve posFila, posColumna
 */
const buscadorCasillaPorID = (id) => {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {

            if (tablero[i][j].idCasilla == id) {
                posFil = tablero[i][j].fila;
                posCol = tablero[i][j].columna;
                id = tablero[i][j].idCasilla;

                return {
                    posFil,
                    posCol,
                }
            }
        }
    }
}

const cambiarDatosTablero = (posFil, posCol) => {
    const ficha = tablero[posFil][posCol];
    //cambiamos las posiciones verticales
    for (let vi = -1; vi <= 1; vi++) {
        let posicionVertical = posFil - vi; // recorre posiciones verticales
        if (posicionVertical >= 0 && posicionVertical < filas && posicionVertical != posFil) {
            checkValorCasilla(tablero[posicionVertical][posCol]);
        }
    }
    //Cambiamos posiciones horizontales
    for (let hj = -1; hj <= 1; hj++) {
        let posicionHorizontal = posCol - hj; // recorre posiciones horizontales
        if (posicionHorizontal >= 0 && posicionHorizontal < columnas) {
            checkValorCasilla(tablero[posFil][posicionHorizontal]);
        }
    }
}

//genera un valor dependiendo del objeto que tenga a su alrededor
const checkValorCasilla = (casilla) => {
    switch (casilla.valorCasilla) {
        case 0:
            casilla.valorCasilla = 1;
            document.getElementById(casilla.idCasilla).classList.add("active");
            break;
        case 1:
            casilla.valorCasilla = 0;
            document.getElementById(casilla.idCasilla).classList.remove("active");
            break;
        case 2:
            return casilla.valorCasilla = 3;

    }
}


