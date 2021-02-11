const { json } = require('express');
const path = require('path');
const pool = require(path.resolve('src/lib/others', 'database_module'));
const info = require(path.resolve('src/lib/utils', 'debug'));
const session = require(path.resolve("src/routes/functions", "session_check"));
const regional = require(path.resolve("src/lib/utils", "regional"));

async function route_manager(req) {
    // Recopilación de información de solicitud
    let table = req.params["table"] || "";
    let operation = req.params["operation"] || "";
    let hash = req.body.hash || "";
    // Variable donde se guardará resultado de consulta SQL
    let data = req.body.data || "";
    // Se obtiene campo personalizado ó la clave primaria para la tabla.
    let field = req.body.field || (table || "") + "_id";
    let value = req.body.value || data[field] || "";
    // Variable donde se guarda la consulta SQL
    let sql = "";

    //Verificación de valides de sesión y permisos de acceso
    let res = await session.session_check(hash, table + "_" + operation, req.headers['user-agent']);
    //Si la sesion o permiso no fué válido se retorno respuesta con mensaje de error.
    if (res.access == false)
        return res;

    //Se obtine DateTime para la tabla especificada, solo si dicho campo aplica en la tabla.
    if (typeof data.reg_date != "undefined")
        data.reg_date = regional.getDateTime();

    // si todo es correcto, continua la ejecución
    try {
        switch (operation) {
            case "list":
                sql = 'SELECT * FROM ' + table;
                break;
            case "query":
                sql = 'SELECT * FROM ' + table + ' WHERE ' + field + " = " + value;
                break;
            case "add":
                sql = 'INSERT INTO ' + table + ' SET ?';
                break;
            case "edit":
                sql = 'UPDATE ' + table + ' SET ? WHERE ' + field + ' = ' + value;
                break;
            case "del":
                sql = 'DELETE FROM ' + table + ' WHERE ' + field + ' = ' + value;
                break;
        }

        delete res.user_id;
        // Ejecución de consulta
        res.data = await pool.query(sql, [data]);
        return res;
    } catch (error) {
        info.x(error);
        return null;
    }
}

module.exports = { route_manager };