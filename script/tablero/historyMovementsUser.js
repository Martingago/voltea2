"use strict";
export {bloquearBotonesHistorial, comprobarSobrescribirDatosHistoricos, cargarDatosHistorial};
import {dataUserMovements, filas, columnas} from "../app.js";
import { cambiarDatosTablero } from "./manipularTablero.js";

const btnPrevMov = document.querySelector(".btn-prev-mov");
const btnNextMov = document.querySelector(".btn-next-move");


let fila;
let columna;

/**
 * btn que avanza una posición del usuario;
 * Se coloca en una posicion dentro del array "userMovements", que almacena todos los movimientos del usuario
 * una vez posicionado emula un click en el tablero dejandolo un movimiento adelante, máximo el último
 */
btnNextMov.addEventListener(
    "click",
    () => {
        if(dataUserMovements.newUserPosition < dataUserMovements.userMovements.length){
            dataUserMovements.newUserPosition++;
            fila = dataUserMovements.userMovements[dataUserMovements.newUserPosition][0];
            columna = dataUserMovements.userMovements[dataUserMovements.newUserPosition][1];
           cambiarDatosTablero(fila,columna, filas, columnas); 
           bloquearBotonesHistorial();     
        }
    })


/**
 * btn que retrocede una posición del usuario;
 * Se coloca en una posicion dentro del array "userMovements",s que almacena todos los movimientos del usuario
 * una vez posicionado emula un click en el tablero dejandolo un movimiento atrás mínimo 0
 */
btnPrevMov.addEventListener(
    "click",
    () => {
        if(dataUserMovements.newUserPosition>=0){
            fila = dataUserMovements.userMovements[dataUserMovements.newUserPosition][0];
            columna = dataUserMovements.userMovements[dataUserMovements.newUserPosition][1];
           cambiarDatosTablero(fila,columna, filas, columnas);
           dataUserMovements.newUserPosition--;
           bloquearBotonesHistorial();
        }
    })


 /**
  * bloquea los botones del historial cuando estes lleguen a la posición 0,
  * o a la última del usuario
  */
const bloquearBotonesHistorial = () => {
    dataUserMovements.newUserPosition <=-1 ? btnPrevMov.disabled = true : btnPrevMov.disabled = false;
    dataUserMovements.newUserPosition >= dataUserMovements.userMovements.length-1 ? btnNextMov.disabled = true : btnNextMov.disabled = false;
}

/**
 * cuando el usuario hace click en el tablero, se carga la columna y la fila en un array: userMovements
 * HISTORIAL de TODOS los movimientos que el usuario ha realizado en total
 * @param {*} posFil posicion de la fila 
 * @param {*} posCol posicion de la columna
 */
const cargarDatosHistorial = (posFil,posCol) => {
    dataUserMovements.userMovements.push([posFil, posCol]);
    dataUserMovements.tamUserHistory = dataUserMovements.userMovements.length;
    dataUserMovements.newUserPosition++;
}


/**
 * Cuando los datos de posicion (newUserPosicion) no coinciden  con el tamaño del array (tamUserHistory), 
 * quiere decir que el usuario ha retrocedido en el historial y ha hecho cambios. 
 * Los elementos que queden por delante de: "posición" quedarán eliminados.
 * como resultado se actualizará el array de userMovements
 */
const comprobarSobrescribirDatosHistoricos = () => {
    if(dataUserMovements.newUserPosition != dataUserMovements.tamUserHistory -1){
       let dif =  (dataUserMovements.tamUserHistory -1) - dataUserMovements.newUserPosition;
       for(let i =0; i< dif;i++){
        dataUserMovements.userMovements.splice(-2,1);
       }
       return dataUserMovements.userMovements;
    }
}

