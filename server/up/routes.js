
const express = require('express');
const error = require('../middleware/error');
const books = require('../routes/books');
const proveedores = require('../routes/proveedores');

module.exports = function(app) {
	app.use(express.json());
	app.use('/api/books', books);
	app.use('/api/proveedores', proveedores);
	app.use(error);
}