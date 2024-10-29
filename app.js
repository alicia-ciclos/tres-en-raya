"use strict";

// Declaración de variables y constantes
const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // Array con las casillas válidas
const FICHAS = ['O', 'X']; // Array que guarda las fichas del juego
const FILAS = [
    [1, 2, 3], // Fila superior
    [4, 5, 6], // Fila media
    [7, 8, 9]  // Fila inferior
];
const COLUMNAS = [
    [1, 4, 7], // Columna izquierda
    [2, 5, 8], // Columna central
    [3, 6, 9]  // Columna derecha
];
const DIAGONALES = [
    [1, 5, 9], // Diagonal principal
    [3, 5, 7]  // Diagonal secundaria
];

let VICTORIA = false; // Booleano que indica si hay una victoria
let TABLAS = false; // Booleano que indica si hay tablas
let turnoActual = 0; // Guarda el turno actual

// Función que comprueba si una casilla es o no válida
function comprobarCasillaValida(casilla) {
    return CASILLAS_VALIDAS.includes(casilla.textContent);
}

// Función que se encarga de ejecutar los turnos
function ejecutarTurno(casilla) {

    // Determinamos que ficha es la siguiente a colocar y vamos aumentando el turno actual
    casilla.textContent = FICHAS[turnoActual % 2];
    turnoActual++;

    // Vamos actualizando el turno actual
    document.getElementById('turno_actual').textContent = `Turno actual: ${FICHAS[(turnoActual % 2)]}`;
}

// Función que comprueba si hay tablas
function comprobarTablas() {

    // Si es el 9º turno y no hay victoria, son tablas
    if (turnoActual === 9 && !VICTORIA) {
        TABLAS = true;
        
        // Coloreamos todo el tablero en caso de tablas
        for(let i = 1; i <= 9; i++){
            document.getElementById(`casilla-${i}`).style.backgroundColor = "#ffc1c1";
        }
    }
}

// Función que comprueba si hay victoria en una lista de posiciones
function comprobarVictoria(posiciones) {

    // Declaración de variables
    let [a, b, c] = posiciones.map(pos => document.getElementById(`casilla-${pos}`).textContent);

    // Si las casillas contienen el mismo símbolo, cambia el color de fondo
    if (a && a === b && b === c) {

        // Coloreamos las casillas ganadoras
        posiciones.forEach(pos => { // Otra forma de recorrer un array parecida a for-let
            document.getElementById(`casilla-${pos}`).style.backgroundColor = "#90ee90"; // Color de victoria

        });

        return true;
    }
    return false;
}
// Función que comprueba todas las posibles condiciones de victoria
function comprobarFinDeJuego() {

    // Comprobamos las filas
    for (let fila of FILAS) {
        if (comprobarVictoria(fila)) {
            VICTORIA = true;
            break;
        }
    }

    // Comprobamos las columnas
    for (let columna of COLUMNAS) {
        if (comprobarVictoria(columna)) {
            VICTORIA = true;
            break;
        }
    }

    // Comprobamos las diagonales
    for (let diagonal of DIAGONALES) {
        if (comprobarVictoria(diagonal)) {
            VICTORIA = true;
            break;
        }
    }

    // Llamamos a la función comprobarTablas
    comprobarTablas();

    // Mostramos el resultado final, quien gana y un mensaje indicando que la partida ha finalizado
    if (VICTORIA) {
        document.getElementById('mensajes').textContent = `Gana ${FICHAS[(turnoActual - 1) % 2]}`;
        document.getElementById('turno_actual').textContent = `Partida finalizada`;

    } else if (TABLAS) {
        document.getElementById('mensajes').textContent = `Tablas`;
        document.getElementById('turno_actual').textContent = `Partida finalizada`;
    }
}

// Función que maneja las acciones al hacer click en las casillas
function casillaOnClick(event) {

    // Declaración de variables
    let casilla = event.target;

    // Si hay una victoria o un empate, no deja hacer click en las casillas restantes
    if (comprobarCasillaValida(casilla) && !VICTORIA && !TABLAS) {
        ejecutarTurno(casilla);
        comprobarFinDeJuego();
    }
}

// Función main de la aplicación
(function main() {
    for (let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }

    // Mensaje indicando el turno inicial
    document.getElementById('turno_actual').textContent = `Turno actual: ${FICHAS[(turnoActual % 2)]}`;

})();