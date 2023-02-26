"use strict";

// Obtener todos los botones de asignación de tecla
const btnsAsignTecla = document.querySelectorAll('.btn-asig-tecla');

// Agregar una funcionalidad de escucha de eventos a cada botón de asignación de tecla
btnsAsignTecla.forEach(btn => {
  btn.addEventListener('click', () => {
    // Mostrar un cuadro de diálogo para que el usuario ingrese la nueva tecla asignada
    const nuevaTeclaAsignada = prompt('Ingrese la nueva tecla asignada:');

    // Si el usuario ingresó una nueva tecla asignada, actualizar el valor del botón de asignación de tecla
    if (nuevaTeclaAsignada) {
      btn.innerText = nuevaTeclaAsignada;
    }
  });
});