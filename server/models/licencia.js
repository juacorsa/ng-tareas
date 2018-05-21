
const mongoose = require('mongoose');
const Joi = require('joi');

const Licencia =  mongoose.model('Licencia', new mongoose.Schema({
    observaciones: { 
    	type: String
    },
    unidades: {
    	type: Number,
    	default: 1
    },
    caducidad: {
    	type: Date,
    	required: true
    },
    cliente: { 
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: 'Cliente'
    },
	software: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Software' 
	}
}));

function validarLicencia(licencia) {
	const schema = {
		observaciones: Joi.string().allow(''),
		unidades : Joi.number().integer().min(1),
		caducidad: Joi.date().required().min('now'),
		cliente  : Joi.objectId().required(),
		software : Joi.objectId().required()
	};

	return Joi.validate(licencia, schema);
}

exports.Licencia = Licencia;
exports.validar = validarLicencia;