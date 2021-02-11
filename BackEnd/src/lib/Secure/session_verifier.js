const path = require('path');
const pool = require(path.resolve('src/lib', 'database'));

// SECURITY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const cipher = require(path.resolve('src/lib/guard', 'cipher'));
const keys = require(path.resolve('src/lib/guard', 'keys'));

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

async function session_verifier(_session) {
    var _global = [];
    try {
        _global = cipher.decode(keys.security.client_password, _session);
        var login_sesion = await pool.query('CALL LOGIN_SESION(?)', [_global.hash]);
        if (JSON.stringify(login_sesion) == '[]' || JSON.stringify(login_sesion) == "" || JSON.stringify(login_sesion) == null) {
           return [];
        }
        return _global;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = { session_verifier };