"use strict";
export {bloquearBotonesHistorial, comprobarSobrescribirDatosHistoricos};
import {dataUserMovements, filas, columnas} from "../app.js";
import { cambiarDatosTablero } from "./manipularTablero.js";

const btnPrevMov = document.querySelector(".btn-prev-mov");
const btnNextMov = document.querySelector(".btn-next-move");
let fila;
let columna;

//btn que avanza una posición del usuario;
btnNextMov.addEventListener(
    "click",
    () => {
        if(dataUserMovements.newUserPosition < dataUserMovements.userMovements.length-1){
            dataUserMovements.newUserPosition++;
            fila = dataUserMovements.userMovements[dataUserMovements.newUserPosition][0]
            columna = dataUserMovements.userMovements[dataUserMovements.newUserPosition][1]
           cambiarDatosTablero(fila,columna, filas, columnas); 
           bloquearBotonesHistorial();     
        }
    })
//btn que retrocede una posición del usuario;
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

const bloquearBotonesHistorial = () => {
    dataUserMovements.newUserPosition <=-1 ? btnPrevMov.disabled = true : btnPrevMov.disabled = false;
    dataUserMovements.newUserPosition >= dataUserMovements.userMovements.length-1 ? btnNextMov.disabled = true : btnNextMov.disabled = false;
}


const comprobarSobrescribirDatosHistoricos = () => {
    console.log("posicion del usuario: ",dataUserMovements.newUserPosition, "tamaño del array: ", dataUserMovements.tamUserHistory);
    if(dataUserMovements.newUserPosition != dataUserMovements.tamUserHistory -1){
       let dif =  (dataUserMovements.tamUserHistory -1) - dataUserMovements.newUserPosition;
       
       for(let i =0; i< dif;i++){
        dataUserMovements.userMovements.splice(dataUserMovements.userMovements.length-1);
        
       }
       console.log("new arr:", dataUserMovements.userMovements)
    }
}

