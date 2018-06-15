const winston = require('winston');
const httpStatus = require('http-status-codes');

module.exports = function(err, req, res, next){
  winston.error(err.message, err); 

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ha sido imposible completar la acción solicitada');
}