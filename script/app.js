"use strict";
export {tablero};
import { generarDefaultTablero } from "./generarTablero.js";
import { limpiarTablero ,cambiarDatosTablero } from "./manipularTablero.js";

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
let lvlMap = 999;
if(lvlMap >loadData.maps.length){
    lvlMap = loadData.maps.length-1;
}
let mapaActual = loadData.maps[lvlMap];
let filas = mapaActual.filas;
let columnas = mapaActual.columnas;
const Eltablero = document.querySelector("#tablero");

/**
 * Genera un tablero 
 * Sus dimensiones vienen dadas por las variables: filas y columnas.
 */

var tablero = generarDefaultTablero(Eltablero, mapaActual);

const clickTablero = () => {
const casTablero = document.querySelectorAll(".casilla");
casTablero.forEach(casilla => {
    casilla.addEventListener("click",
        () => {
            let idTmp = casilla.id
            //devuelve el ID de la ficha que hace click el usuario. 
            //Este valor ID podemos buscarlo en el array para conocer su ubicacion
            buscadorCasillaPorID(idTmp);
            if(vCasilla !=2)
            cambiarDatosTablero(posFil, posCol,filas,columnas);
        }
    )
});

}

clickTablero()

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


const btnNext = document.querySelector(".btn-next-map");
const btnBack = document.querySelector(".btn-back-map");

btnNext.addEventListener(
    "click",
    ()=> {
        if(lvlMap < loadData.maps.length -1){
            limpiarTablero(Eltablero);
            lvlMap++;
            console.log(lvlMap)
            mapaActual = loadData.maps[lvlMap];
             filas = mapaActual.filas;
             columnas = mapaActual.columnas;          
            tablero = generarDefaultTablero(Eltablero, mapaActual);
            clickTablero();
        }

    })

   btnBack.addEventListener(
    "click",
    ()=> {
        if(lvlMap >0){
            limpiarTablero(Eltablero);
            lvlMap--;
            mapaActual = loadData.maps[lvlMap];
            filas = mapaActual.filas;
            columnas = mapaActual.columnas;
            tablero = generarDefaultTablero(Eltablero,mapaActual);
            clickTablero()
        }
        
    }
   ) 
    