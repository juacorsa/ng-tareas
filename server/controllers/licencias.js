const mongoose = require('mongoose');
const Joi = require('joi');
const Licencia = require("../models/licencia");

exports.createLicencia = (req, res, next) => {	
	const { error } = validarLicencia(req.body);	
	if (error) return res.status(400).send(error.details[0].message);		

	const licencia = new Licencia({
	  _id: new mongoose.Types.ObjectId(),
	  unidades: req.body.unidades,
	  observaciones: req.body.observaciones,
	  cliente  : req.body.cliente,
	  software : req.body.software,
	  caducidad: req.body.caducidad
	});
	
	licencia.save()
	.then(licencia => {
  		res.status(201).json({mensaje: "Licencia registrada con éxito"})				
	})
  	.catch(err => {
 	  console.log(err); 	  
	  res.status(500).json({error: err})
	});	
}

exports.getLicencias = (req, res, next) => {	
	Licencia.find()
	  .select("_id unidades observaciones")
	  .populate("cliente", "_id nombre")
	  .populate("software", "_id nombre")
	  .sort("caducidad")
	  .exec()
	  .then(licencias => {	  	
	    res.status(200).json({licencias});
	  })
  	  .catch(err => {
 	    console.log(err); 	  
	    res.status(500).json({error: err})
	  });	 
}

exports.getLicencia = (req, res, next) => {
	const id = req.params.id;
	Licencia.findById(id)
	  .populate("cliente software")
	  .exec()
	  .then(licencia => {
	  	if (!licencia) res.status(404).json({mensaje: "Licencia no encontrada"});
	  	res.status(200).json({licencia});
	  })
  	  .catch(err => {
 	    console.log(err); 	  
	    res.status(500).json({error: err})
	  });	 
}

exports.updateLicencia = (req, res, next) => {
	const { error } = validarLicencia(req.body);	
	if (error) return res.status(400).send(error.details[0].message);		

	const id = req.params.id;
	Licencia.findById(id)	  
	  .exec()
	  .then(licencia => {
	  	if (!licencia) res.status(404).json({mensaje: "Licencia no encontrada"});

	    let body = req.body;
		Licencia.update({_id: id}, {$set: body})
		  .exec()
		  .then(licencia => res.status(200).json({mensaje: "Licencia actualizada con éxito" }))
		  .catch(err => {
		    console.log(err);
		    res.status(500).json({error: err})
		});  	  	    
	  })
  	  .catch(err => {
 	    console.log(err); 	  
	    res.status(500).json({error: err})
	  });	 
}

exports.deleteLicencia = (req, res, next) => {
	 const id = req.params.id;
	 Licencia.remove({_id: id})	
	   .exec()
	   .then(licencia => {
	 	  res.status(200).json({mensaje: "Licencia eliminada con éxito"})					
	   })
  	   .catch(err => {
 	      console.log(err); 	  
	      res.status(500).json({error: err})
	   });		 
}

function validarLicencia(licencia) {
	const schema = {
	  unidades: Joi.number().integer().min(1).label('Se debe indicar un número de unidades válido'),
	  caducidad: Joi.date().min('now').label('La caducidad'),
	  observaciones: Joi.string().allow(null),
	  cliente: Joi.string().required().label('El cliente'),
	  software: Joi.string().required().label('El software')
	};

	return Joi.validate(licencia, schema);
}


