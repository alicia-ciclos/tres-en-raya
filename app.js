"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const FICHAS = ['X', 'O'];

const combinacionesGanadoras = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9], 
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 6, 9], 
    [1, 5, 9], 
    [3, 5, 7], 
];

let victoria = false;
let tablas = false;
let turnoActual = 0;

function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido) && contenido !== 'X' && contenido !== 'O';
}

function ejecutarTurno(casilla) {
    //Se actualiza el contenido de la casilla con la ficha actual
    casilla.textContent = FICHAS[turnoActual % 2];
    turnoActual++;
}

function comprobarTablas() {
    if (turnoActual === 9 && !victoria) {
        tablas = true;
    }
}

function comprobarVictoria() {
    const casillas = Array.from(document.querySelectorAll('.casilla'));
    const fichasActual = FICHAS[(turnoActual - 1) % 2]; //Ficha del jugador que acaba de jugar

    //Comprobamos todas las combinaciones ganadoras:
    for (const combinacion of combinacionesGanadoras) {
        if (
            casillas[combinacion[0] - 1].textContent === fichasActual &&
            casillas[combinacion[1] - 1].textContent === fichasActual &&
            casillas[combinacion[2] - 1].textContent === fichasActual
        ) {
            victoria = true; 
            return;
        }
    }
}

function comprobarFinDeJuego() {
    comprobarVictoria();
    comprobarTablas();

    if (victoria) {
        alert('Ganan las ' + FICHAS[(turnoActual - 1) % 2]); 
        alert('Facilito');
        return;
    }

    if (tablas) {
        alert('Tablas'); 
        return;
    }
}

function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click en casilla " + casilla.textContent);

    if (comprobarCasillaValida(casilla)) {
        ejecutarTurno(casilla);
        comprobarFinDeJuego();
    }
}

function main() {
    for (let i = 1; i <= 9; i++) {
        //let casilla = document.getElementById(`casilla-${i}`);
        let casilla = document.querySelector(`#casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }
}

main();
