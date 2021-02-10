const moment = require('moment');

// FECHA Y HORA
function getDateTime() {
    return moment().format('YYYY-MM-DD hh:mm:ss');
}

// FECHA GENERAL
function getShortDate(){
    return moment().format('YYYY-MM-DD');
}

// FECHA LOCAL
function getLocalShortDate(){
    return moment().format('DD-MM-YYYY');
}

// HORA
function getTimeNow(){
    return moment().format('hh:mm:ss');
}

module.exports = { getDateTime, getShortDate, getLocalShortDate, getTimeNow};