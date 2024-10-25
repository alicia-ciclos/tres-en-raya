"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',];

const FILA_IZQUIERDA = [1, 4, 7];
const FILA_DERECHA = [3, 6, 9];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];

let victoria = false;
let tablas = false;
let turnoActual = 0;

let tablero = 
    [
        [null, null, null],
        [null, null, null], //guardamos el estado de la partida en un array
        [null, null, null],
    ]

function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}

function ejecutarTurno(casilla) {
    casilla.textContent = FICHAS[turnoActual % 2];
    tablero[casilla/3][casilla%3] = FICHAS[turnoActual % 2]; //en el array si es 7 coge la casilla 7/3 = 2; 7%3 = 1 -> 2,1
    turnoActual++;
}

function comprobarTablas() {
    if(turnoActual == 9 && !victoria) {
        tablas = true;
    }
}

function comprobarHorizontal(numeroCasilla) {
    let numeroX = numeroCasilla/3
    let numeroY = numeroCasilla%3
    if(numeroCasilla <= 3){
        if(tablero[numeroX][numeroY] === tablero[numeroX+1][numeroY] && tablero[numeroX][numeroY] === tablero[numeroX+2][numeroY]){
            return true;
        }
    }
    else if(numeroCasilla <= 6){
        if(tablero[numeroX][numeroY] === tablero[numeroX+1][numeroY] && tablero[numeroX][numeroY] === tablero[numeroX-1][numeroY]){
            return true;
        }
    }
    else {
        if(tablero[numeroX][numeroY] === tablero[numeroX-1][numeroY] && tablero[numeroX][numeroY] === tablero[numeroX-2][numeroY]){
            return true;
        }
    }
    return false;
}
function comprobarVertical() {
    if(numeroCasilla%3 == 1){
        if(tablero[numeroX][numeroY] === tablero[numeroX][numeroY+1] && tablero[numeroX][numeroY] === tablero[numeroX][numeroY+2]){
            return true;
        }
    }
    else if(numeroCasilla <= 6){
        if(tablero[numeroX][numeroY] === tablero[numeroX][numeroY+1] && tablero[numeroX][numeroY] === tablero[numeroX][numeroY-1]){
            return true;
        }
    }
    else {
        if(tablero[numeroX][numeroY] === tablero[numeroX][numeroY-1] && tablero[numeroX][numeroY] === tablero[numeroX][numeroY-2]){
            return true;
        }
    }
    return false;
}
function comprobarDiagonalPrincipal() {
    if(tablero[0][0] == tablero[1][1] && tablero[0][0] == tablero[2][2]){
        return true;
    }
    return false
}
function comprobarDiagonalSecundaria() {
    if(tablero[0][0] == tablero[1][1] && tablero[0][0] == tablero[2][2]){
        return true;
    }
    return false;
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
//        let casilla = document.getElementById(`casilla-${i}`);
        let casilla = document.querySelector(`#casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }

}

main();
