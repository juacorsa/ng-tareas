const winston = require('winston');	

module.exports = function() {	
	winston.add(winston.transports.File, { filename:  'tareas.log' });
}