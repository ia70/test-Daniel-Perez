'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.headers['user-agent'], "\n");
    console.log(req._remoteAddress);

    res.json({
        info: 'API test-Daniel-Perez',
        ip: req._remoteAddress
    });
});

module.exports = router;