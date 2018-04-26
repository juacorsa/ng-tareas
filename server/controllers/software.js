const mongoose = require('mongoose');
const Joi = require('joi');
const Util = require('../util');
const Software = require("../models/software");

exports.createSoftware = (req, res, next) => {
	const { error } = validarSoftware(req.body);	
	if (error) return res.status(400).send(error.details[0].message);		
	
	const nombre = req.body.nombre.trim();
	const regex = new RegExp(nombre, 'i');

	Software.find({nombre: nombre})
	  .exec()
	  .then(software => {
	  	if (software.length >= 1) 
	  		return res.status(409).json({mensaje: "El sotfware ya existe"});
	  	else {
			const software = new Software({
		      _id: new mongoose.Types.ObjectId(),
		      nombre: Util.primeraLetraMayuscula(nombre)
		    });
		    software.save()
		  	.then(software => {
		  		res.status(201).json({
		  			mensaje: "Software registrado con éxito",
		  			cliente: {
		  				_id: software._id,
		  				nombre: software.nombre
		  			}
		  		})
		  	})
		  	.catch(err => {
		  		console.log(err);
		  		res.status(500).json({ error: err })
		  	})		  	
	  	}
	  });  	
}

exports.getSoftwares = (req, res, next) => {
	Software.find()
		.select('nombre _id')
		.sort('nombre')
		.exec()
		.then(sotfware => {
			const respuesta = {
				count: sotfware.length,
				sotfware
			}
			res.status(200).json(respuesta);
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});
}

exports.getSoftware = (req, res, next) => {
	const id = req.params.id;
	Software.findById(id)
		.select('_id nombre')
		.exec()
		.then(sotfware => {
			if (sotfware) 
				res.status(200).json({sotfware})
			else 
				res.status(404).json({mensaje: 'Sotfware no encontrado'})				
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});	
}

exports.updateSoftware = (req, res, next) => {
  const { error } = validarSoftware(req.body);	
  if (error) return res.status(400).send(error.details[0].message);		

  const id = req.params.id;
  let body = req.body;
  body.nombre = Util.primeraLetraMayuscula(body.nombre);

  Software.update({_id: id}, {$set: body})
    .exec()
    .then(sotfware => res.status(200).json({mensaje: "Sotfware actualizado con éxito" }))
    .catch(err => {
    	console.log(err);
		res.status(500).json({error: err})
	});  	
}

function validarSoftware(sotfware) {
	const schema = {
		nombre: Joi.string().required().min(3)		
	};

	return Joi.validate(sotfware, schema);
}

