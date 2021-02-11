const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { server } = require(path.resolve('src/lib/keys', 'keys'));
const regional = require(path.resolve('src/lib/utils', 'regional'));

// Initialization ------------------------------------------------ 
const app = express();
app.use(cors());

// Settings ------------------------------------------------------
app.set('port', process.env.PORT || server.port);

// Middlewares ---------------------------------------------------
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());

// Routes --------------------------------------------------------                            
app.use('/api', require('./routes/index.routes'));
app.use('/api/login', require('./routes/login.routes'));


// Static files --------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// Control de errores
app.use(function (req, res) {
    res.status(400).send({
        "error":"¡Ruta no válida!"
    });
});

// Global variables ----------------------------------------------


// Starting the server -------------------------------------------
app.listen(app.get('port'), () => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log("\nFECHA: " + regional.getDateTime() + '\n');
    console.log('IP SERVIDOR:  ------------------------------------------------\n');

    // Imprime lista de IP's en las que el servidor está escuchando
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4') {
                console.log(alias.address + "\t\t" + devName);
            }
        }
    }

    // Muestra el puerto en el que el servidor está escuchando.
    console.log('\nPORT ', app.get('port'));
    console.log('--------------------------------------------------------------');
});