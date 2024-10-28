"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',]; //En js da igual si ponemos una coma al final sin contenido

const FILA_IZQUIERDA = [1, 4, 7];
const FILA_DERECHA = [3, 6, 9];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];

let victoria = false;
let tablas = false;
let turnoActual = 0;


function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}

function ejecutarTurno(casilla) {
    casilla.textContent = FICHAS[turnoActual % 2];
    turnoActual++;
}

function comprobarTablas() {
    if(turnoActual == 9 && !victoria) {
        tablas = true;
    }
}

function comprobarLinea(linea) { //Si todas las filas en una linea ya sea horiz, vert o diag son iguales, victoria = true.
    const ficha = FICHAS[turnoActual % 2];
    if (linea.every(num => document.querySelector(`#casilla-${num}`).textContent === ficha)) { //Método every para verificar si todas las casillas en linea contienen la ficha del jugador actual.
        victoria = true;
    }
}

function comprobarHorizontal() {
    comprobarLinea([1, 2, 3]);
    comprobarLinea([4, 5, 6]);
    comprobarLinea([7, 8, 9]);
}

function comprobarVertical() { //Esto no se si es correcto ?
    comprobarLinea(FILA_IZQUIERDA);
    comprobarLinea(FILA_CENTRO);
    comprobarLinea(FILA_DERECHA);
    
}

function comprobarDiagonalPrincipal() {
    comprobarLinea(DIAGONAL_PRINCIPAL);
}

function comprobarDiagonalSecundaria() {
    comprobarLinea(DIAGONAL_SECUNDARIA);
}

function comprobarFinDeJuego(casilla) {
    const numeroCasilla = casilla.textContent;

    comprobarHorizontal(numeroCasilla);
    comprobarVertical(numeroCasilla);
    if(DIAGONAL_PRINCIPAL.includes(numeroCasilla)) {
        comprobarDiagonalPrincipal(numeroCasilla);
    }
    if(DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
        comprobarDiagonalSecundaria(numeroCasilla);
    }

    comprobarTablas();

    if(victoria) {
        alert('Gana ' + FICHAS[turnoActual % 2]);
        return;
    }

    if(tablas) {
        alert('Tablas');
        return;
    }
}

function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click en casilla "+ casilla.textContent);

    if(comprobarCasillaValida(casilla)) {
        ejecutarTurno(casilla);
        comprobarFinDeJuego(casilla);
    }
}

function main() {
    for(let i = 1; i <= 9; i++) {
//      let casilla = document.getElementById(`casilla-${i}`);
        let casilla = document.querySelector(`#casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }

}

main();
