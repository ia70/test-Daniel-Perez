'use strict';
const mysql = require('mysql');
const { promisify } = require('util');

const path = require('path');
const { database } = require(path.resolve('src/lib/keys', 'keys'));

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED!\n');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS!\n');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('NOT EXIST DATABASE CONNECTION!\n');
        } else {
            console.error('NOT DATABASE CONNECTION!\n');
        }
    }

    if (connection) {
        connection.release();
        console.log('DATABASE IS CONNECTED!\n');
    }

    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;