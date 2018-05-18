
const mongoose = require('mongoose');
const Joi = require('joi');

const Cliente =  mongoose.model('Cliente', new mongoose.Schema({
    nombre: { 
    	type: String,
    	required: true,
    	minlength: 5,
    	maxlength: 50,
    	index: true,
    	trim: true
    }
}));

function validarCliente(cliente) {
	const schema = {
		nombre : Joi.string().min(5).max(50).required()		
	};

	return Joi.validate(cliente, schema);
}

exports.Cliente = Cliente;
exports.validar = validarCliente;


