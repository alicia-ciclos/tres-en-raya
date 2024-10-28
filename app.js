"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const FICHAS = ['X', 'O'];

const COLUMNAS = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];
const FILAS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];

let victoria = false;
let tablas = false;
let turnoActual = 0;
let numeroCasilla =0;


function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    numeroCasilla = parseInt(casilla.textContent);
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
    let filaNum;
    
    for (let i = 0; i < FILAS.length; i++) { //Hacemos un for para cada array de la constante FILA
       if(FILAS[i].indexOf(numeroCasilla)!==-1){ //Si encuentra el número en uno de los 3 arrays de FILA guardamos el número del array
        filaNum=i;
        break;
       }
    }

    /*Ahora comprobamos las 3 posiciones de la fila en la que sabemos que está el número usando filaNum*/
    if(document.querySelector(`#casilla-${FILAS[filaNum][0]}`).textContent===FICHAS[turnoActual%2] && 
    document.querySelector(`#casilla-${FILAS[filaNum][1]}`).textContent===FICHAS[turnoActual%2] && 
    document.querySelector(`#casilla-${FILAS[filaNum][2]}`).textContent===FICHAS[turnoActual%2]){
        victoria=true;
    }
}

function comprobarVertical(numeroCasilla) {
    let columnaNum;
    
    for (let i = 0; i < COLUMNAS.length; i++) { 
       if(COLUMNAS[i].indexOf(numeroCasilla)!==-1){ 
        columnaNum=i;
        break;
       }
    }

    if(document.querySelector(`#casilla-${COLUMNAS[columnaNum][0]}`).textContent===FICHAS[turnoActual%2] && 
    document.querySelector(`#casilla-${COLUMNAS[columnaNum][1]}`).textContent===FICHAS[turnoActual%2] && 
    document.querySelector(`#casilla-${COLUMNAS[columnaNum][2]}`).textContent===FICHAS[turnoActual%2]){
        victoria=true;
    }

}

function comprobarDiagonalPrincipal() {
    if(document.querySelector(`#casilla-${DIAGONAL_PRINCIPAL[0]}`).textContent===FICHAS[turnoActual%2] && 
        document.querySelector(`#casilla-${DIAGONAL_PRINCIPAL[1]}`).textContent===FICHAS[turnoActual%2] && 
        document.querySelector(`#casilla-${DIAGONAL_PRINCIPAL[2]}`).textContent===FICHAS[turnoActual%2]){
     victoria=true;

    }
    
}
function comprobarDiagonalSecundaria() {
    if(document.querySelector(`#casilla-${DIAGONAL_SECUNDARIA[0]}`).textContent===FICHAS[turnoActual%2] && 
        document.querySelector(`#casilla-${DIAGONAL_SECUNDARIA[1]}`).textContent===FICHAS[turnoActual%2] && 
        document.querySelector(`#casilla-${DIAGONAL_SECUNDARIA[2]}`).textContent===FICHAS[turnoActual%2]){

     victoria=true;
     
    }
}

function comprobarFinDeJuego() {
    comprobarHorizontal(numeroCasilla);
    comprobarVertical(numeroCasilla);
    
    if(DIAGONAL_PRINCIPAL.includes(parseInt(numeroCasilla))) {
        comprobarDiagonalPrincipal();
    }
    if(DIAGONAL_SECUNDARIA.includes(parseInt(numeroCasilla))) {
        comprobarDiagonalSecundaria();
    }

    if(victoria) {
        alert('Gana ' + FICHAS[turnoActual % 2]);
        return;
    }

    if(tablas) {
        alert('Tablas');
        return;
    }

    comprobarTablas();

    turnoActual++; //Lo hemos puesto si no el ganador salía en el siguiente turno por el orden de las funciones
    
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