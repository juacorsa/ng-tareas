
const mongoose = require('mongoose');
const Joi = require('joi');

const Software =  mongoose.model('Software', new mongoose.Schema({
    nombre: { 
    	type: String,
    	required: true,
    	minlength: 3,
    	maxlength: 50,
    	index: true,
    	trim: true
    }
}));

function validarSoftware(software) {
	const schema = {
		nombre : Joi.string().min(3).max(50).required()		
	};

	return Joi.validate(software, schema);
}

exports.Software = Software;
exports.validar = validarSoftware;


