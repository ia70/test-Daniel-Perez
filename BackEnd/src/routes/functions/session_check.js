const path = require('path');
const pool = require(path.resolve('src/lib/others', 'database_module'));
const info = require(path.resolve("src/lib/utils", "debug"));

const regional = require(path.resolve("src/lib/utils", "regional"));
const table = "session";

async function session_check(hash, req_permission, header) {
    let res = {
        "access": false,
        "msg": "",
        "data" : []
    };

    // Definición de variables
    let session = [];
    let permission = [];

    try {

        // Se verifica que la sesión existe en la base de datos y que esté activa
        // La fecha se verifica a traves del procedimiento almacenado a continuación
        let data = await pool.query('CALL SESSION_CHECK(?)', hash);
        session = data[0][0];

        // Si la sesión no existe ...
        if (session === undefined) {
            res.msg = "¡Sesión caducada o incorrecta!"
            close_session(hash);
            return res;
        }

        // Verificar que hash.cliente sea = a header. De lo contrario significa que se está accediendo desde una aplicación distinta
        // a la aplicación donde se registró el inicio de sesión. (Igual se puede comparar con dirección IP)
        if (session.client != header) {
            res.msg = "¡Acceso no identificado!";
            close_session(hash);
            return res;
        }

        // Verificar permiso
        if (req_permission != null || req_permission != "") {
            data = await pool.query('CALL PERMISSION_CHECK(?,?)', [session.user_id, req_permission]);
            permission = data[0][0];
            if (permission === undefined) {
                res.msg = "¡Sin permiso para acceder a esta información!"
                return res;
            }
        }

        //Devuelve respuesta satisfactoria.
        res.access = true;

        // Actualiza la sesión si todo lo anterior es correcto
        update_session(hash);
        res.user_id = session.user_id;
        return res;
    } catch (error) {
        res.msg = error;
        return res;
    }
}

// Actualiza la hora de la ultima conexión del usuario si es que existe.
async function update_session(hash) {
    try {
        let data = [];
        data = pool.query('UPDATE ' + table + ' SET session_con="' + regional.getDateTime() + '" WHERE session_id="' + hash + '" AND state_id=1');
    } catch (error) {
        info.x(error);
    }
}

// Cierrar una session si es que existe.
async function close_session(hash) {
    try {
        let data = [];
        data = pool.query('UPDATE ' + table + ' SET state_id=3, session_con="' + regional.getDateTime() + '" WHERE session_id="' + hash + '" AND state_id=1');
    } catch (error) {
        info.x(error);
    }
}

module.exports = { session_check };