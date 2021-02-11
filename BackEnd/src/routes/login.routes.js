'use strict';
const express = require('express');
const router = express.Router();

const path = require('path');
const pool = require(path.resolve('src/lib/others', 'database_module'));
const table = "session";

const encrypt = require('../lib/Secure/encrypt.js');
const regional = require('../lib/Utils/regional');

//->>>>>    LOGIN         ------------------------------------------------------------------
router.post('/', async (req, res) => {

    let usr = req.body.usr;
    let pwd = req.body.pwd;

    // Se crea JSON vacio en caso de error de logueo.
    let sesion = {
        'name': null,
        'hash': null
    };

    try {
        // Se invoca procedimiento almacenado para verificar que el logueo sea correcto.
        let data = await pool.query('CALL LOGIN(?, ?)', [usr, pwd]);

        //Si la sesión no es válida devuelve JSON con valores null.
        if (JSON.stringify(data) == '[]' || JSON.stringify(data) == "" || JSON.stringify(data) == null) {
            res.status(400).send(sesion);
        } else {

            // Se recopilan los datos para generar el hash
            let genHash = {
                'user_id': data[0][0].user_id,
                'date': regional.getShortDate(),
                'hour': regional.getTimeNow(),
                'client': req.headers['user-agent']
            }

            // Genera el HASH Final
            // JSON.sringify -> convierte JSON en cadena
            let hash = encrypt.encode(JSON.stringify(genHash));


            try {
                // Se crea la sesión en la base de datos
                setLogin(genHash.user_id, hash, JSON.stringify(genHash.client));
            } catch (e) {
                console.log(e);
            }

            // Se recopila la información que se mandará al cliente
            sesion = {
                'name': data[0][0].name,
                'hash': hash
            };

            // Manda respuesta exitosa al cliente
            res.status(200).send(sesion);
        }
    } catch (e) {
        console.log(e);
        // Manda respuesta vacia al cliente
        res.status(400).send(sesion);
    }
});

// Crea la sesión en la base de datos
async function setLogin(user_id, hash, client) {
    // Selecciona las sesiones activas del usuario si existen.
    let data = [];

    try {
        // Se cierra sesion abierta si es que existe
        data = await pool.query('UPDATE ' + table + ' SET state_id=3, session_end="' + regional.getDateTime() + '" WHERE user_id="' + user_id + '" AND state_id=1');
    } catch (error) {
        console.log(e);
    }

    try {
        // Se ingresa los nuevos datos de sesion del usuario.
        data = pool.query('INSERT INTO ' + table + ' VALUES("' + hash + '", "' + user_id + '",' + client + ', "' + regional.getDateTime() + '", "' + regional.getDateTime() + '", null, 1)');
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

module.exports = router;