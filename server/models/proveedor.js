const mongoose = require('mongoose');
const Joi = require('joi');

const Proveedor =  mongoose.model('Proveedor', new mongoose.Schema({
    nombre: { 
    	type: String,
    	required: true,
    	minlength: 3,
    	maxlength: 50,
    	index: true,
    	trim: true
    }
}));

function validarProveedor(proveedor) {
	const schema = {
		nombre : Joi.string().min(3).max(50).required()		
	};

	return Joi.validate(proveedor, schema);
}

exports.Proveedor = Proveedor;
exports.validar = validarProveedor;