"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',];

const COMBINACIONES_GANADORAS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let turnoActual = 0;


function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}


function comprobarTablas() {
    if(turnoActual == 8) {
        return true;
    }

    return false;
}

function comprobarVictoria() {
    for(let combinacion of COMBINACIONES_GANADORAS) {
        let a = document.getElementById(`casilla-${combinacion[0]}`).textContent;
        let b = document.getElementById(`casilla-${combinacion[1]}`).textContent;
        let c = document.getElementById(`casilla-${combinacion[2]}`).textContent;

        // Si encuentro combinación ganadora
        if((a === b) && (a === c)) {
            combinacion.forEach(numero => {
                let casilla = document.getElementById(`casilla-${numero}`);
                casilla.style.backgroundColor = 'lightgreen'; // Cambia el color según prefieras
            });
            return true;
        }
    }

    // de lo contrario...
    return false;
}

    function colorearTablas() {
        for (let i = 1; i <= 9; i++) {
            let casilla = document.getElementById(`casilla-${i}`);
            casilla.style.backgroundColor = 'red'; // Cambia el color según prefieras
        }
    }
    
function comprobarFinDeJuego(casilla) {
    const numeroCasilla = casilla.textContent;

    if(comprobarVictoria()) {
        let mensajes = document.getElementById('mensajes');
        mensajes.textContent = 'Gana ' + FICHAS[turnoActual % 2];
        finalizarJuego();
        return;
    }

    if(comprobarTablas()) {
        let mensajes = document.getElementById('mensajes');
        mensajes.textContent = 'Tablas';
        colorearTablas();
        finalizarJuego();

        return;
    }
}

function finalizarJuego() {
    for(let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.removeEventListener('click', casillaOnClick);
    }    
}

function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click en casilla "+ casilla.textContent);

    if(comprobarCasillaValida(casilla)) {
        casilla.textContent = FICHAS[turnoActual % 2];
        comprobarFinDeJuego(casilla);
        turnoActual++;
    }
}

function main() {
    for(let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }

}

main();