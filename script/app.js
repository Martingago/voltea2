"use strict";
export { tablero, dataUserMovements, filas, columnas };
import { generarDefaultTablero } from "./tablero/generarTablero.js";
import { limpiarTablero, cambiarDatosTablero } from "./tablero/manipularTablero.js";
import { bloquearBotonesHistorial, cargarDatosHistorial, comprobarSobrescribirDatosHistoricos } from "./tablero/historyMovementsUser.js";
import { abrirModal, cerrarModal } from "./tablero/ventanaModal.js";

//función asincrona, obtenemos el json con TODOS los mapas de la aplicación.
const getData = async () => {
    try {
        const response = await fetch('script/lvls_maps/maps.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

let loadData = await getData();
let lvlMap = 1;
if (lvlMap > loadData.maps.length) {
    lvlMap = loadData.maps.length - 1;
}
let mapaActual = loadData.maps[lvlMap];
let filas = mapaActual.filas;
let columnas = mapaActual.columnas;

//datos de almacenamiento movimientos del usuario
var dataUserMovements = {
    userMovements: [], //historial de coordenadas que el usuario clickea
    tamUserHistory: 0, //tamaño del historial || numero de movimientos que ha hecho
    newUserPosition: -1, // posicion del historial en la que nos queremos posicionar
};

/**
 * Genera un tablero 
 * Sus dimensiones vienen dadas por las variables: filas y columnas.
 */
const Eltablero = document.querySelector("#tablero");
var tablero = generarDefaultTablero(Eltablero, mapaActual);


/**
 * Detecta los clicks del usuario en el tablero
 * Carga informacion del historial de movimientos en dataUserMovements
 */

const clickTablero = () => {
    const casTablero = document.querySelectorAll(".casilla");
    casTablero.forEach(casilla => {
        casilla.addEventListener("click",
            () => {

                let idTmp = casilla.id
                //devuelve el ID de la ficha que hace click el usuario. 
                //Este valor ID podemos buscarlo en el array para conocer su ubicacion

                buscadorCasillaPorID(idTmp);
                if (vCasilla != 2) {
                    cargarDatosHistorial(posFil, posCol); //cargamos en el historial de movimientos el ultimo dato introducido   
                    comprobarSobrescribirDatosHistoricos();
                    cambiarDatosTablero(posFil, posCol, filas, columnas);
                }
                bloquearBotonesHistorial(); //con cada click comprueba si hay que bloquear elementos o no
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
const reiniciarLvl = document.querySelector(".btn-reset-lvl");


btnNext.addEventListener(
    "click",
    () => {
        if (lvlMap < loadData.maps.length - 1) {
            limpiarTablero(Eltablero);
            lvlMap++;
            mapaActual = loadData.maps[lvlMap];
            filas = mapaActual.filas;
            columnas = mapaActual.columnas;
            tablero = generarDefaultTablero(Eltablero, mapaActual);
            clickTablero();
        }

    })

btnBack.addEventListener(
    "click",
    () => {
        if (lvlMap > 0) {
            limpiarTablero(Eltablero);
            lvlMap--;
            mapaActual = loadData.maps[lvlMap];
            filas = mapaActual.filas;
            columnas = mapaActual.columnas;
            tablero = generarDefaultTablero(Eltablero, mapaActual);
            clickTablero()
        }

    }
)

/**
 * Reinicia un nivel
 */

reiniciarLvl.addEventListener("click",
    () => {
        abrirModal()
    });

document.querySelector(".btn-confirm-reset-lvl").addEventListener("click",
    () => {
        cerrarModal();
        limpiarTablero(Eltablero);
        mapaActual = loadData.maps[lvlMap];
        filas = mapaActual.filas;
        columnas = mapaActual.columnas;
        tablero = generarDefaultTablero(Eltablero, mapaActual);
        clickTablero()
    }
)


/**
 * configuracion botones usuario
 * 
 */


let elementoActivo = null;

const configuracionRapidaElements = document.querySelectorAll('.configuracion-rapida');

configuracionRapidaElements.forEach(element => {
    const btnAsignTecla = element.querySelector('.btn-asig-tecla');

    if (btnAsignTecla) {
        btnAsignTecla.addEventListener('click', () => {
            if (!elementoActivo) {
                elementoActivo = element;
                // createNotificationUser(elementoActivo);
                asignarTecla(event, elementoActivo);
                
            }
        });
    }
});

const asignarTecla = (event, configuracionRapida) => {
    configuracionRapida.classList.add('activo');

    // Funcion que nos permite escuchar la nueva tecla para asignar del usuario
    const  listenerTecla = (event) => {
        configuracionRapida.querySelector('.btn-asig-tecla').innerText = event.key.toUpperCase();
        configuracionRapida.classList.remove('activo');
        document.removeEventListener('keydown', listenerTecla);
        // eliminarNotificationUser(elementoActivo)
        elementoActivo = null;
      }
  
    // detectamos pulsación de tecla
    document.addEventListener('keydown', listenerTecla);

    const listenerClick = (event) => {
        // Si el usuario hace click fuera del elemento cancelamos el proceso de asignacion de tecla
        if (!configuracionRapida.contains(event.target)) {
            // eliminamos la clase activa, la deteccion de input, y la deteccion del click, elementoActivo vuelve a ser null
            configuracionRapida.classList.remove("activo");
            document.removeEventListener("keydown", listenerTecla);
            document.removeEventListener("click", listenerClick);
            // eliminarNotificationUser(elementoActivo)
            elementoActivo = null;
        }
    };
    
    document.addEventListener("click", listenerClick);
    
  };

// crea un modal avisando al usuario cuando cambia tecla  
  const createNotificationUser = (elementoActivo) => {
    const notificacionUsuario = document.createElement('div');
    notificacionUsuario.classList.add('extension-info');
    notificacionUsuario.textContent= 'Pulsa cualquier tecla';
    elementoActivo.appendChild(notificacionUsuario);
  }
//   elimina el modal
const eliminarNotificationUser = (elementoActivo) => {
    const extension = elementoActivo.querySelector('.extension-info');
    elementoActivo.removeChild(extension);
}






