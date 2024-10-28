"use strict";

const COMBINACIONES_GANADORAS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];


const CASILLAS_VALIDAS = ['1','2','3','4','5','6','7','8','9',];
const FICHAS = ['X','O'];

function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}

let turnoActual = 0;


function comprobarTablas() {
    if (turnoActual==8) {
        return true;
    }
    return false;
}

function comprobarVictoria() {
    //es lo mismo que un foreach
    for(let combinacion of COMBINACIONES_GANADORAS) {
       let a = document.getElementById(`casilla-${combinacion[0]}`).textContent;
       let b = document.getElementById(`casilla-${combinacion[1]}`).textContent;
       let c = document.getElementById(`casilla-${combinacion[2]}`).textContent;

       //Si encuentro una combinación ganadora
       if ((a===b)&&(a===c)) {
        return true;
       }
    }

    //Si no lo hago
    return false;
}

function finalizarJuego() {
    for (let i = 1; i <=9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.removeEventListener('click', clickCasilla);
    }
}

function comprobarFinDeJuego(casilla) {
    const numeroCasilla = casilla.textContent;
    if (comprobarVictoria()) {
        document.getElementById('mensajes').textContent='Ganan las: '+FICHAS[turnoActual%2];
        finalizarJuego();
        return;
    }
    

    if (comprobarTablas()) {
        document.getElementById('mensajes').textContent='Tablas';
        finalizarJuego();
        return;
    }
}

function clickCasilla(evento) {
    let casilla = evento.target;
    if(comprobarCasillaValida(casilla)){
        casilla.textContent = FICHAS[turnoActual%2];
        comprobarFinDeJuego(casilla);
        turnoActual++;
    }
    let turnos = document.getElementById('turno');
    turno.textContent= "Turno de "+FICHAS[turnoActual%2];
}

function principal() {
    for (let i = 1; i <=9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        //podemos hacerlo de la manera comentada, o de la manera no comentada
        casilla.addEventListener('click', clickCasilla);
    }
    let turnos = document.getElementById('turno');
    turno.textContent="Turno de X";
}

principal();