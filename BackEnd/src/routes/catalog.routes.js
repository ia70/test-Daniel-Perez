'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const procesar = require(path.resolve("src/routes/functions", "route_manager"));

const res_error = {
    "access": false,
    "msg": "¡Ruta no válida o incompleta!"
};

// ____________________________
//->>>>>    VACIO     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/', async (req, res) => {
    res.status(400).send(res_error);
});

// ____________________________
//->>>>>    SOLO TABLA     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/:tabla', async (req, res) => {
    res.status(400).send(res_error);
});

// ____________________________
//->>>>>    OPERACIONES     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/:table/:operation', async (req, res) => {
    //Se invoca a función encargada de los catálogos
    let response = await procesar.route_manager(req);

    //Se verifica el tipo de respuesta que se obtuvo
    if (response.access)
        return res.status(200).send(response);
    else
        return res.status(400).send(response);
});

module.exports = router;