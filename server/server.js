const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
require('express-async-errors');
const express = require('express');
const app = express();

require('./up/routes.js')(app);
require('./up/logging.js')();
require('./up/db.js')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Servidor escuchando en puerto ${port} ...`)); 

module.exports = server;