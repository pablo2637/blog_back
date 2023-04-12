const express = require('express');
const router = express.Router();

const { getLogs } = require('../controllers/controllerApiLogs');


router.get('/', getLogs);


module.exports = router