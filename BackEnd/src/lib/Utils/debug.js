const path = require('path');
const debug = require(path.resolve('src/lib/keys', 'keys')).debug;

// IMPRIMIR ERROR
function x(error) {
    if (debug.mostrar_errores) {
        try {
            console.error(error);
        } catch (error) {
        }
    }
}

// IMPRIMIR DEBUG
function log(cadena) {
    if (debug.mostrar_debug) {
        try {
            console.log(cadena);
        } catch (error) {
        }
    }
}

// IMPRIMIR MENSAJE
function msg(cadena) {
    try {
        console.log(cadena);
    } catch (error) {
    }
}


module.exports = { x, log, msg };