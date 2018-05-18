
const express = require('express');
const error = require('../middleware/error');
const books = require('../routes/books');
const proveedores = require('../routes/proveedores');
const clientes = require('../routes/clientes');
const software = require('../routes/software');

module.exports = function(app) {
	app.use(express.json());
	app.use('/api/books', books);
	app.use('/api/proveedores', proveedores);
	app.use('/api/clientes', clientes);
	app.use('/api/software', software);
	app.use(error);
}