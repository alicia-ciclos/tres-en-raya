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


function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}

function ejecutarTurno(casilla) {
    casilla.textContent = FICHAS[turnoActual % 2];
}

function comprobarTablas() {
    if(turnoActual == 9 && !victoria) {
        tablas = true;
    }
}

function comprobarHorizontal(numeroCasilla) {
    if(document.getElementById("casilla-1").innerHTML==document.getElementById("casilla-2").innerHTML && document.getElementById("casilla-2").innerHTML==document.getElementById("casilla-3").innerHTML){
        victoria=true;
    }
    if(document.getElementById("casilla-4").innerHTML==document.getElementById("casilla-5").innerHTML && document.getElementById("casilla-5").innerHTML==document.getElementById("casilla-6").innerHTML){
        victoria=true;
    }
    if(document.getElementById("casilla-7").innerHTML==document.getElementById("casilla-8").innerHTML && document.getElementById("casilla-8").innerHTML==document.getElementById("casilla-9").innerHTML){
        victoria=true;
    }
}


function comprobarVertical(numeroCasilla) {
    if(document.getElementById("casilla-1").innerHTML==document.getElementById("casilla-4").innerHTML && document.getElementById("casilla-4").innerHTML==document.getElementById("casilla-7").innerHTML){
        victoria=true;
    }
    if(document.getElementById("casilla-2").innerHTML==document.getElementById("casilla-5").innerHTML && document.getElementById("casilla-5").innerHTML==document.getElementById("casilla-8").innerHTML){
        victoria=true;
    }
    if(document.getElementById("casilla-3").innerHTML==document.getElementById("casilla-6").innerHTML && document.getElementById("casilla-6").innerHTML==document.getElementById("casilla-9").innerHTML){
        victoria=true;
    }
}
function comprobarDiagonalPrincipal() {
    if(document.getElementById("casilla-1").innerHTML==document.getElementById("casilla-5").innerHTML && document.getElementById("casilla-5").innerHTML==document.getElementById("casilla-9").innerHTML){
        victoria=true;
    }
}
function comprobarDiagonalSecundaria() {
    if(document.getElementById("casilla-3").innerHTML==document.getElementById("casilla-5").innerHTML && document.getElementById("casilla-5").innerHTML==document.getElementById("casilla-7").innerHTML){
        victoria=true;
    }
}

function comprobarFinDeJuego(casilla) {
    const numeroCasilla = casilla.textContent;

    comprobarHorizontal(numeroCasilla);
    comprobarVertical(numeroCasilla);
    comprobarDiagonalPrincipal(numeroCasilla);
    comprobarDiagonalSecundaria(numeroCasilla);


    comprobarTablas();

    if(victoria) {
        alert('Gana ' + FICHAS[turnoActual % 2]);
        return;
    }

    if(tablas) {
        alert('Tablas');
        return;
    }
    turnoActual++;
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
