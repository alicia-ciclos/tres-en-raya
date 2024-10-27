"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',];

const HORIZONTAL_PRIMERA = [1, 2, 3];
const HORIZONTAL_SEGUNDA = [4, 5, 6];
const HORIZONTAL_TERCERA = [7, 8, 9];

const FILA_IZQUIERDA = [1, 4, 7];
const FILA_CENTRAL = [2, 5, 8];
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

function comprobarHorizontal(numeroCasilla) {
    if (HORIZONTAL_PRIMERA.includes(numeroCasilla)) {
        let casilla1 = document.getElementById("casilla-1").textContent;
        let casilla2 = document.getElementById("casilla-2").textContent;
        let casilla3 = document.getElementById("casilla-3").textContent;
        if (casilla1 == FICHAS[(turnoActual - 1) % 2] && casilla2 == FICHAS[(turnoActual - 1) % 2] && casilla3 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }else if (HORIZONTAL_SEGUNDA.includes(numeroCasilla)){
        let casilla4 = document.getElementById("casilla-4").textContent;
        let casilla5 = document.getElementById("casilla-5").textContent;
        let casilla6 = document.getElementById("casilla-6").textContent;
        if (casilla4 == FICHAS[(turnoActual - 1) % 2] && casilla5 == FICHAS[(turnoActual - 1) % 2] && casilla6 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }else if (HORIZONTAL_TERCERA.includes(numeroCasilla)) {
        let casilla7 = document.getElementById("casilla-7").textContent;
        let casilla8 = document.getElementById("casilla-8").textContent;
        let casilla9 = document.getElementById("casilla-9").textContent;
        if (casilla7 == FICHAS[(turnoActual - 1) % 2] && casilla8 == FICHAS[(turnoActual - 1) % 2] && casilla9 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }
}
function comprobarVertical(numeroCasilla) {
    if (FILA_IZQUIERDA.includes(numeroCasilla)) {
        let casilla1 = document.getElementById("casilla-1").textContent;
        let casilla4 = document.getElementById("casilla-4").textContent;
        let casilla7 = document.getElementById("casilla-7").textContent;
        if (casilla1 == FICHAS[(turnoActual - 1) % 2] && casilla4 == FICHAS[(turnoActual - 1) % 2] && casilla7 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }else if (FILA_CENTRAL.includes(numeroCasilla)) {
        let casilla2 = document.getElementById("casilla-2").textContent;
        let casilla5 = document.getElementById("casilla-5").textContent;
        let casilla8 = document.getElementById("casilla-8").textContent;
        if (casilla2 == FICHAS[(turnoActual - 1) % 2] && casilla5 == FICHAS[(turnoActual - 1) % 2] && casilla8 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }else if (FILA_DERECHA.includes(numeroCasilla)) {
        let casilla3 = document.getElementById("casilla-3").textContent;
        let casilla6 = document.getElementById("casilla-6").textContent;
        let casilla9 = document.getElementById("casilla-9").textContent;
        if (casilla3 == FICHAS[(turnoActual - 1) % 2] && casilla6 == FICHAS[(turnoActual - 1) % 2] && casilla9 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }
}
function comprobarDiagonalPrincipal(numeroCasilla) {
    if (DIAGONAL_PRINCIPAL.includes(numeroCasilla)) {
        let casilla1 = document.getElementById("casilla-1").textContent;
        let casilla5 = document.getElementById("casilla-5").textContent;
        let casilla9 = document.getElementById("casilla-9").textContent;
        if (casilla1 == FICHAS[(turnoActual - 1) % 2] && casilla5 == FICHAS[(turnoActual - 1) % 2] && casilla9 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }
}
function comprobarDiagonalSecundaria(numeroCasilla) {
    if (DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
        let casilla3 = document.getElementById("casilla-3").textContent;
        let casilla5 = document.getElementById("casilla-5").textContent;
        let casilla7 = document.getElementById("casilla-7").textContent;
        if (casilla3 == FICHAS[(turnoActual - 1) % 2] && casilla5 == FICHAS[(turnoActual - 1) % 2] && casilla7 == FICHAS[(turnoActual - 1) % 2]) {
            victoria = true;
        }
    }
}

function comprobarFinDeJuego(casilla) {
    const numeroCasilla = parseInt(casilla.id.split("-")[1]);

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
        alert('Gana ' + FICHAS[(turnoActual - 1) % 2]);
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