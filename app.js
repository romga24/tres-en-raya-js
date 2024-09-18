let tablero = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let turnoJugadorX = true;

function manejarClic(fila, columna) {
    if (tablero[fila][columna] === null) {
        tablero[fila][columna] = turnoJugadorX ? "X" : "O";
        actualizarInterfaz(fila, columna);
        if (verificarGanador()) {
            if (turnoJugadorX) {
                alert("Ha ganado el jugador X");
                location.reload(true);
            } else {
                alert("Ha ganado el jugador O");
                location.reload(true);
            }
        }
        turnoJugadorX = !turnoJugadorX;
    }
}

function actualizarInterfaz(fila, columna) {
    let celda = document.querySelector(`.cell[data-index="${fila * 3 + columna}"]`);
    celda.innerHTML = turnoJugadorX ? "&#10005;" : "&#9711;";
}

function verificarEstadoEnFila(tablero) {
    let esGanadorEnFila = false;
    for (let fila = 0; fila < tablero.length; fila++) {
        let contador = 1;
        for (let columna = 0; columna < tablero[0].length - 1; columna++) {
            if (tablero[fila][columna] !== null && tablero[fila][columna] == tablero[fila][columna + 1]) {
                contador++;
                if (contador === 3) {
                    esGanadorEnFila = true;
                }
            } else {
                contador = 1;
            }
        }
    }
    return esGanadorEnFila;
}

function verificarEstadoEnColumna(tablero) {
    let esGanadorEnColumna = false;
    for (let columna = 0; columna < tablero[0].length; columna++) {
        let contador = 1;
        for (let fila = 0; fila < tablero.length - 1; fila++) {
            if (tablero[fila][columna] !== null && tablero[fila][columna] == tablero[fila + 1][columna]) {
                contador++;
                if (contador === 3) {
                    esGanadorEnColumna = true;
                }
            } else {
                contador = 1;
            }
        }
    }
    return esGanadorEnColumna;
}

function verificarEstadoEnDiagonalDescendente(tablero) {
    let esGanadorEnDiagonal = false;
    let columna = 0;
    let contador = 1;
    for (let fila = 0; fila < tablero.length - 1; fila++) {
        if (tablero[fila][columna] != null && tablero[fila][columna] == tablero[fila + 1][columna + 1]) {
            contador++;
            if (contador == 3) {
                esGanadorEnDiagonal = true;
            }
            } else {
                contador = 1;
            }
           columna++;
        }
    return esGanadorEnDiagonal;
    }

function verificarEstadoEnDiagonalAscendente(tablero) {
    let esGanadorEnDiagonal = false;
    let columna = 0;
    let contador = 1;
    
    for (let fila = tablero.length - 1; fila >= 1; fila--) {
        if (tablero[fila][columna] !== null && tablero[fila][columna] === tablero[fila - 1][columna + 1]) {
            contador++;
            if (contador === 3) {
                esGanadorEnDiagonal = true;
            }
            } else {
                contador = 1;
            }
            columna++;
        }
    return esGanadorEnDiagonal;
}

function verificarGanador() {
    return (
        verificarEstadoEnFila(tablero) ||
        verificarEstadoEnColumna(tablero) ||
        verificarEstadoEnDiagonalDescendente(tablero) ||
        verificarEstadoEnDiagonalAscendente(tablero)
    );
}

let celdas = document.querySelectorAll(".cell");

celdas.forEach(function (celda) {
    celda.addEventListener("click", function () {
        let index = parseInt(celda.getAttribute("data-index"));
        let fila = Math.floor(index / 3);
        let columna = index % 3;
        manejarClic(fila, columna);
    });
});
