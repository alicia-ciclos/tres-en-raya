"use strict";
// Funciones
    // Función para empezar el juego indicando el tamaño de la partida
function juego(){
    // Creamos la tabla segun el tamaño indicado
    
    // Indicamos con esta variable el tamaño de la tabla
    var size = 3;
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Creamos una variable auxiliar que vamos a usar para generar los id de cada posicion
    var aux = 1;

    // Crea las celdas
    for (var i = 0; i < size; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < size; j++) {
        // Creamos el elemento td con su contenido e id correspodiente
        
        var celda = document.createElement("td");
        celda.setAttribute("id",aux);
        var textoCelda = document.createTextNode("-");
        // Anidamos el texto a la celda
        celda.appendChild(textoCelda);
        // Agregamos la celda a la hilera correspodiente
        hilera.appendChild(celda);
        aux++;
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // Creamos un texto para indicar que jugador 
    var mensaje = document.createElement("h3");
    mensaje.setAttribute("id","mensaje");
    mensaje.appendChild(document.createTextNode("Empiezan las X"));
    body.appendChild(mensaje);

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // Creamos los bordes de la tabla

    // Modificamos el atributo del boton y lo hacemos invisible
    var boton = document.getElementById("start");
    boton.setAttribute("hidden","true");

    // Empieza el juego
    tres_en_raya(size);
}

function tres_en_raya(size){
    // Creamos el tablero vacio
    let  tablero = new Array(size);

    for (let i = 0; i < size; i++) {
        tablero[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            tablero[i][j] = "-";  
        }
    }
    // Creamos la variable con el jugador que juega
    let jugador = "X";

    // Creamos la variable con los huecos libres
    let huecos = size ** 2;

     
    // Creamos un array con la lista de posicionamientos posibles
    let posiciones = [[],[]];

    let auxx = 0;
    let auxy = 0;
    // Le rellenamos con las posiciones en un array
    for (let i = 0; i < huecos; i++) {
        if(i == 0){

        }else{
            if(i % size === 0){
                auxx ++;
                auxy = 0;
            }
        }
        posiciones[0][i] = auxx;
        posiciones[1][i] = auxy;
        auxy ++;
    }

    // Estamos escuchando al archivo para que elemento da click    
    document.addEventListener('click',function(e){
        var elemento = event.target;
        // Almacenamos la id del elemento que estamos modificando
        var id = elemento.id;

        var mensaje = document.getElementById("mensaje");

        if(id >= 1 && id <= (size ** 2)){
            // Introducimos el nuevo valor al elemento en el caso de no este ocupado
            if(elemento.textContent == "-"){
                elemento.innerHTML = jugador;
                huecos --;
                // Almacenamos el cambio en el la variable tablero que hemos creado antes
                tablero[posiciones[0][id-1]][posiciones[1][id-1]]= jugador;
                // Comprobamos si tiene la convinación ganadora
                if(combinar_ganar(jugador,tablero)==true){
                    mensaje.innerHTML = "Han ganado las " + jugador;
                    
                }else{
                    if(jugador == "X"){
                        jugador = "O";
                    }else{
                        jugador = "X";
                    }
    
                    mensaje.innerHTML = "Juegan las " + jugador;
                    if(huecos == 0){
                        mensaje.innerHTML = "Tablas";
                        
                    }
                }  
            }else{
                alert("No elijas esta casilla ya esta ocupada");
            }
        }


    })
    
    
}

// Funcion para saber las convinaciones ganadoras
function combinar_ganar(letra,tablero){

    if(tablero[0][0] == letra && tablero[0][1] == letra && tablero[0][2] == letra){
        document.getElementById("1").setAttribute('class','ganar');
        document.getElementById("2").setAttribute('class','ganar');
        document.getElementById("3").setAttribute('class','ganar');
        return true;
    }else if(tablero[1][0] == letra && tablero[1][1] == letra && tablero[1][2] == letra){
        document.getElementById("4").setAttribute('class','ganar');
        document.getElementById("5").setAttribute('class','ganar');
        document.getElementById("6").setAttribute('class','ganar');
        return true;
    }else if(tablero[2][0] == letra && tablero[2][1] == letra && tablero[2][2] == letra){
        document.getElementById("7").setAttribute('class','ganar');
        document.getElementById("8").setAttribute('class','ganar');
        document.getElementById("9").setAttribute('class','ganar');
        return true;
    }else if(tablero[0][0] == letra && tablero[1][0] == letra && tablero[2][0] == letra){
        document.getElementById("1").setAttribute('class','ganar');
        document.getElementById("4").setAttribute('class','ganar');
        document.getElementById("7").setAttribute('class','ganar');
        return true;
    }else if(tablero[0][1] == letra && tablero[1][1] == letra && tablero[2][1] == letra){
        document.getElementById("2").setAttribute('class','ganar');
        document.getElementById("5").setAttribute('class','ganar');
        document.getElementById("8").setAttribute('class','ganar');
        return true;
    }else if(tablero[0][2] == letra && tablero[1][2] == letra && tablero[2][2] == letra){
        document.getElementById("3").setAttribute('class','ganar');
        document.getElementById("6").setAttribute('class','ganar');
        document.getElementById("9").setAttribute('class','ganar');
        return true;
    }else if(tablero[0][0] == letra && tablero[1][1] == letra && tablero[2][2] == letra){
        document.getElementById("1").setAttribute('class','ganar');
        document.getElementById("5").setAttribute('class','ganar');
        document.getElementById("9").setAttribute('class','ganar');
        return true;
    }else if(tablero[2][0] == letra && tablero[1][1] == letra && tablero[0][2] == letra){
        document.getElementById("3").setAttribute('class','ganar');
        document.getElementById("5").setAttribute('class','ganar');
        document.getElementById("7").setAttribute('class','ganar');
        return true;
    }else {
        return false;
    }

}

// Main
var boton = document.getElementById("start");

boton.addEventListener('click',juego)

