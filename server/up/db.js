
const mongoose = require('mongoose');
const winston  = require('winston');

module.exports = function() {
	mongoose.connect('mongodb://admin:admin2018@ds113799.mlab.com:13799/tareas')
		.then(() => winston.info('Conectado a MongoDB...'));
}