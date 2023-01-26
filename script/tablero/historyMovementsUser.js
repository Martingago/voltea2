"use strict";
import {dataUserMovements, filas, columnas} from "../app.js";
import { cambiarDatosTablero } from "./manipularTablero.js";

const btnPrevMov = document.querySelector(".btn-prev-mov");
const btnNextMov = document.querySelector(".btn-next-move");
let fila;
let columna;
//btn nexr
btnNextMov.addEventListener(
    "click",
    () => {
        if(dataUserMovements.newUserPosition < dataUserMovements.userMovements.length-1){
            dataUserMovements.newUserPosition++;
            fila = dataUserMovements.userMovements[dataUserMovements.newUserPosition][0]
            columna = dataUserMovements.userMovements[dataUserMovements.newUserPosition][1]
           cambiarDatosTablero(fila,columna, filas, columnas)
           console.log(dataUserMovements.newUserPosition, "array: " , dataUserMovements.userMovements);
            
            
        }
    })
//btn atras
btnPrevMov.addEventListener(
    "click",
    () => {
        if(dataUserMovements.newUserPosition>0){
            dataUserMovements.newUserPosition--;
            fila = dataUserMovements.userMovements[dataUserMovements.newUserPosition][0]
            columna = dataUserMovements.userMovements[dataUserMovements.newUserPosition][1]
           cambiarDatosTablero(fila,columna, filas, columnas)
        }
        console.log(dataUserMovements.newUserPosition, "array: " , dataUserMovements.userMovements);
    })




