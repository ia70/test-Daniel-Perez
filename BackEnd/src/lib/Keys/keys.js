'use strict';
module.exports = {
    server: {
        host: '192.168.100.200',   
        port: 80
    },
    database: {     //MySQL
        host: '192.168.100.200',   
        port: 3306,
        user: 'root',
        password: '',
        database: 'test_daniel_perez'
    },
    cipher: {
        password: '@as_T69?1pq-XoAsqlfpZ_@rgsfdlwoX',
        iv_password: '@_aTfdh%Mkxd-k_Q'     //Exactamente 16 caracteres
    },
    debug:{
        mostrar_errores: true,
        mostrar_debug: true
    }
};