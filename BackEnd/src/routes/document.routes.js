'use strict';
const { Console } = require('console');
const express = require('express');
const router = express.Router();

const path = require('path');
const pool = require(path.resolve('src/lib/others', 'database_module'));
const info = require(path.resolve('src/lib/utils', 'debug'));
const session = require(path.resolve("src/routes/functions", "session_check"));
const regional = require(path.resolve("src/lib/utils", "regional"));

const table = "document";

// ____________________________
//->>>>>    LISTA     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/list', async (req, res) => {
    let req_permiso = table + "_list";
    //Se obtiene hash
    let hash = req.body.hash || "";
    // Variable donde se guardará resultado de consulta SQL
    let data = req.body.data || "";
    // Se obtiene campo personalizado ó la clave primaria para la tabla.
    let field = req.body.field || (table || "") + "_id";
    let value = req.body.value || data[field] || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";
    info.x("ENTRO --------------");
    let access = await session.session_check(hash, req_permiso, req.headers['user-agent']);

    if (access.access == false) {
        delete access.user_id;
        res.status(400).send(access);
        return;
    }

    // == SENTERNCIAS SI SESION VALIDA ====================================================

    try {
        //Se crea sentencia SQL
        sql = "SELECT d.document_id, d.name, d.url, c.description, d.owner FROM user_document ud INNER JOIN document d ON d.document_id= ud.document_id INNER JOIN category c ON c.category_id = d.category_id WHERE ud.user_id='" + access.user_id + "'";
        info.x(sql);
        //Ejecuta la petición
        access.data = await pool.query(sql);
        delete access.user_id;
        //Devuelve respuesta al cliente
        res.status(200).send(access);
    } catch (e) {
        delete access.user_id;
        //Devuel error
        res.status(400).send(e);
    }
});

// _____________________________
//->>>>>    CONSULTA    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/query', async (req, res) => {
    let req_permiso = table + "_query";
    //Se obtiene hash
    let hash = req.body.hash || "";
    // Se obtiene campo personalizado ó la clave primaria para la tabla.
    let field = req.body.field || (table || "") + "_id";
    // Valor a buscar
    let value = req.body.value || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";

    let access = await session.session_check(hash, req_permiso, req.headers['user-agent']);
    if (access.access == false) {
        delete access.user_id;
        res.status(400).send(access);
        return;
    }

    // == SENTERNCIAS SI SESION VALIDA ====================================================

    try {
        //Genera historial del documento
        setHistory(access.user_id, value, "query");
        //Se crea sentencia SQL
        sql = 'SELECT * FROM ' + table + ' WHERE ' + field + '=' + value;
        //Ejecuta la petición
        access.data = pool.query(sql);
        delete access.user_id;
        //Devuelve respuesta al cliente
        res.status(200).send(access);
    } catch (e) {
        delete access.user_id;
        //Devuel error
        res.status(400).send(e);
    }
});

//______________________________
//->>>>>    AGREGAR     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/add', async (req, res) => {
    let req_permiso = table + "_add";
    //Se obtiene hash
    let hash = req.body.hash || "";
    // Variable donde se guardará resultado de consulta SQL
    let data = req.body.data || "";
    // Se obtiene campo personalizado ó la clave primaria para la tabla.
    let field = req.body.field || (table || "") + "_id";
    let value = req.body.value || data[field] || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";

    let access = await session.session_check(hash, req_permiso, req.headers['user-agent']);
    if (access.access == false) {
        delete access.user_id;
        res.status(400).send(access);
        return;
    }

    // == SENTERNCIAS SI SESION VALIDA ====================================================

    try {
        //Se crea sentencia SQL
        sql = 'INSERT INTO ' + table + ' SET ? ';
        delete data.document_id;
        data.owner = access.user_id;
        data.reg_date = regional.getDateTime();

        //Ejecuta la petición
        try {
            access.data = await pool.query(sql, [data]);
        } catch (error) { }

        try {
            //Obtiene ID del registro insertado
            let id = access.data.insertId;

            pool.query("INSERT INTO user_document VALUES(default,'" + access.user_id + "', " + id + ")");
            //Genera historial del documento
            setHistory(access.user_id, id, "add");
        } catch (error) {
            info.x(error);
        }
        delete access.user_id;
        //Devuelve respuesta al cliente
        res.status(200).send(access);
    } catch (e) {
        delete access.user_id;
        //Devuel error
        res.status(400).send(e);
    }
});

// ____________________________
//->>>>>    EDITAR     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
router.post('/edit', async (req, res) => {
    let req_permiso = table + "_edit";
    //Se obtiene hash
    let hash = req.body.hash || "";
    // Variable donde se guardará resultado de consulta SQL
    let data = req.body.data || "";
    // Se obtiene campo personalizado ó la clave primaria para la tabla.
    let field = req.body.field || (table || "") + "_id";
    let value = req.body.value || data[field] || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";

    let access = await session.session_check(hash, req_permiso, req.headers['user-agent']);
    if (access.access == false) {
        delete access.user_id;
        res.status(400).send(access);
        return;
    }

    // == SENTERNCIAS SI SESION VALIDA ====================================================

    try {
        //Se crea sentencia SQL
        sql = 'UPDATE ' + table + ' SET ? WHERE ' + field + ' = ' + value;
        delete data.document_id;

        //Ejecuta la petición
        access.data = await pool.query(sql, [data]);

        //Genera historial del documento
        setHistory(access.user_id, value, "edit");

        delete access.user_id;
        //Devuelve respuesta al cliente
        res.status(200).send(access);
    } catch (e) {
        delete access.user_id;
        //Devuel error
        res.status(400).send(e);
    }
});

// _______________________________
//->>>>>    ELIMINAR     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/del', async (req, res) => {
    let req_permiso = table + "_del";
    //Se obtiene hash
    let hash = req.body.hash || "";
    // Se obtiene campo personalizado ó la clave primaria para la tabla.
    let field = req.body.field || (table || "") + "_id";
    let value = req.body.value || data[field] || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";

    let access = await session.session_check(hash, req_permiso, req.headers['user-agent']);
    if (access.access == false) {
        delete access.user_id;
        res.status(400).send(access);
        return;
    }

    // == SENTERNCIAS SI SESION VALIDA ====================================================

    try {
        //Se crea sentencia SQL
        sql = 'DELETE FROM ' + table + ' WHERE ' + field + ' = ' + value;
        //Ejecuta la petición
        access.data = await pool.query(sql);

        //Genera historial del documento
        setHistory(access.user_id, value, "del");

        delete access.user_id;
        //Devuelve respuesta al cliente
        res.status(200).send(access);
    } catch (e) {
        delete access.user_id;
        //Devuel error
        res.status(400).send(e);
    }
});


//______________________________
//->>>>>    SHARE     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/share', async (req, res) => {
    let req_permiso = table + "_share";
    //Se obtiene hash
    let hash = req.body.hash || "";
    // Variable donde se guardará resultado de consulta SQL
    let data = req.body.data || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";

    let access = await session.session_check(hash, req_permiso, req.headers['user-agent']);
    if (access.access == false) {
        delete access.user_id;
        res.status(400).send(access);
        return;
    }

    // == SENTERNCIAS SI SESION VALIDA ====================================================

    try {
        //Verifica que el usuario que va a compartir tenga acceso al documento que quiere compartir
        sql = "SELECT * FROM user_document ud WHERE ud.user_id='" + access.user_id + "' AND ud.document_id=" + data.document_id;
        let tem = await pool.query(sql);
        if (tem[0] == undefined) {
            delete access.user_id;
            access.msg = "¡No tienes acceso al documento a compartir!";
            res.status(400).send(access);
            return;
        }

        //Se crea sentencia SQL
        sql = 'INSERT INTO user_document VALUES(default, "' + data.user_id + '", ' + data.document_id + ')';
        delete data.user_document_id;
        info.x(data);

        //Ejecuta la petición
        try {
            access.data = await pool.query(sql);
        } catch (error) { }

        try {
            //Obtiene ID del registro insertado
            let id = data.document_id;

            //Genera historial del documento
            setHistory(access.user_id, id, "share");
        } catch (error) {
            info.x(error);
        }
        delete access.user_id;
        //Devuelve respuesta al cliente
        res.status(200).send(access);
    } catch (e) {
        delete access.user_id;
        //Devuel error
        res.status(400).send(e);
    }
});


//Función para generar historial de documento
async function setHistory(user, document, action) {
    let sql = "INSERT INTO history VALUES(default, '" + user + "', " + document + ", '" + action + "', '" + regional.getDateTime() + "')"
    try {
        pool.query(sql);
    } catch (error) {
        info.x(error);
    }
}

module.exports = router;