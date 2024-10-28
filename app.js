"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',]; //En js da igual si ponemos una coma al final sin contenido

/*
const FILA_IZQUIERDA = [1, 4, 7];
const FILA_CENTRO = [2, 5, 8];
const FILA_DERECHA = [3, 6, 9];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];
*/

const COMBINACIONES_GANADORAS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]  
]

function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}

let turnoActual = 0;
/*
function ejecutarTurno(casilla) {
    casilla.textContent = FICHAS[turnoActual % 2];
    turnoActual++;
}
*/

function comprobarTablas() {
    if (turnoActual==8) {
        return true;
    }
    /*if(turnoActual == 9 && !victoria) {
        return true;
    }*/
    return false;
}

/*
function comprobarLinea(linea) { //Si todas las filas en una linea ya sea horiz, vert o diag son iguales, victoria = true.
    const ficha = FICHAS[turnoActual % 2];
    if (linea.every(num => document.querySelector(`#casilla-${num}`).textContent === ficha)) { //Método every para verificar si todas las casillas en linea contienen la ficha del jugador actual.
        victoria = true;
    }
}
*/

function comprobarVictoria(){
    for (let combinacion of COMBINACIONES_GANADORAS) {
        let a = document.getElementById(`casilla-${combinacion[0]}`);
        let b = document.getElementById(`casilla-${combinacion[1]}`);
        let c = document.getElementById(`casilla-${combinacion[2]}`);

        console.log(`comprobando ${a}==${b}==${c}`);
        //Si encuentro una combinacion ganadora
        /*
        if ((a === b) && (a === c)){
            victoria = true;
            return; //Acabamos
        }
        */
        if ((a.textContent === b.textContent) && (a.textContent === c.textContent)){
            a.style.backgroundColor = "#FF0000";
            b.style.backgroundColor = "#FF0000";
            c.style.backgroundColor = "#FF0000";
            return true;  //Acabamos
        }
        
    }

    //Si he superado el bucle y no he encontrado una combinacion ganadora:
    return false;
}

function finalizarJuego(){ //Desactivar evento click al empatar o al ganar uno
    for (let i = 0; i <= 9; i++) {
        let casilla = document.getElementById(`casila-${i}`);
        casilla.removeEventListener('click', casillaClick);
    }
}

/*
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
*/

function comprobarFinDeJuego(casilla) { 
/*
    comprobarHorizontal(numeroCasilla);
    comprobarVertical(numeroCasilla);
    if(DIAGONAL_PRINCIPAL.includes(numeroCasilla)) {
        comprobarDiagonalPrincipal(numeroCasilla);
    }
    if(DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
        comprobarDiagonalSecundaria(numeroCasilla);
    }

    //comprobarTablas();
*/
const numeroCasilla = casilla.textContent;
    if(comprobarVictoria()) { //cambiado de victoria a comprobarVictoria
        let mensaje = document.getElementById(`mensajes`);
        mensaje.textContent = 'Ganan las ' + FICHAS[turnoActual % 2];  //Quitamos el alert = 
        finalizarJuego();
        return;
    }

    if(comprobarTablas()) { //cambiado de tablas a comprobarTablas
        //alert('Tablas');
        let mensaje = document.getElementById(`mensajes`);
        mensaje.textContent = 'Tablas';
        finalizarJuego();
        return;
    }
}

function casillaClick(evento) {
    let casilla = evento.target;
    //console.log("click en casilla "+ casilla.textContent);

    if(comprobarCasillaValida(casilla)) {
        //ejecutarTurno(casilla);
        casilla.textContent = FICHAS[turnoActual % 2];
        comprobarFinDeJuego(casilla);
        turnoActual++;
    }
    let turnos = document.getElementById(`turno`);
    turnos.textContent = "Turno de " +FICHAS[turnoActual%2];
}

function main() {
    for(let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
//      let casilla = document.querySelector(`#casilla-${i}`);
        casilla.addEventListener('click', casillaClick);
    }
    let turnos = document.getElementById('turno');
    turno.textContent="Turno de X";

}

main();