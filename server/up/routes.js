	
const express = require('express');
const error = require('../middleware/error');
const proveedores = require('../routes/proveedores');
const clientes  = require('../routes/clientes');
const software  = require('../routes/software');
const licencias = require('../routes/licencias');

module.exports = function(app) {
	app.use(express.json());
	app.use('/api/proveedores', proveedores);
	app.use('/api/clientes', clientes);
	app.use('/api/software', software);
	app.use('/api/licencias', licencias);
	app.use(error);
}