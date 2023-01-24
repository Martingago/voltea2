"use strict";
export {tablero};
import { generarDefaultTablero } from "./generarTablero.js";
import { cambiarDatosTablero } from "./manipularTablero.js";

//función asincrona, obtenemos el json con TODOS los mapas de la aplicación.
const getData = async () =>  {
    try {
      const response = await fetch('script/lvls_maps/maps.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  
let loadData = await getData();
let lvlMap = 0;
let mapaActual = loadData.maps[lvlMap];
const filas = mapaActual.filas;
const columnas = mapaActual.columnas;
const Eltablero = document.querySelector("#tablero");

/**
 * Genera un tablero 
 * Sus dimensiones vienen dadas por las variables: filas y columnas.
 */

var tablero = generarDefaultTablero(Eltablero, mapaActual);



const casTablero = document.querySelectorAll(".casilla");
casTablero.forEach(casilla => {
    casilla.addEventListener("click",
        () => {
            console.log("a")
            let idTmp = casilla.id
            //devuelve el ID de la ficha que hace click el usuario. 
            //Este valor ID podemos buscarlo en el array para conocer su ubicacion
            buscadorCasillaPorID(idTmp);
            if(vCasilla !=2)
            cambiarDatosTablero(posFil, posCol,filas,columnas);
        }
    )
});

let posFil;
let posCol;
let vCasilla;


/**
 * @param {*} id String es el #id HTML que tiene cada elemento
 * @returns devuelve posFila, posColumna, valorObjeto
 */
const buscadorCasillaPorID = (id) => {
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


// const btnNext = document.querySelector(".btn-next-map");
// const btnBack = document.querySelector(".btn-back-map");
// const elTablero = document.querySelector("#tablero")

// btnNext.addEventListener(
//     "click",
//     ()=> {
//        lvlMap++;
//        mapaActual = loadData.maps[lvlMap];
//        limpiarTablero();
//        tablero = generarDefaultTablero(elTablero, mapaActual);
//     })

//    btnBack.addEventListener(
//     "click",
//     ()=> {
//         limpiarTablero();
//         lvlMap--;
//         mapaActual = loadData.maps[lvlMap];
        
//         tablero = generarDefaultTablero(elTablero,mapaActual);
//     }
//    ) 


    
    