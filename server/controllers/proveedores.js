const mongoose = require('mongoose');
const Joi = require('joi');
const Util = require('../util');
const config = require('../config');
const Proveedor = require("../models/proveedor");

exports.createProveedor = (req, res, next) => {
	const { error } = validarProveedor(req.body);	
	if (error) return res.status(400).send(error.details[0].message);		
	
	const nombre = req.body.nombre;
	Proveedor.find({nombre: nombre})
	  .exec()
	  .then(proveedor => {
	  	if (proveedor.length >= 1) 
	  		return res.status(409).json({mensaje: "El proveedor ya existe. Por favor indique otro nombre."});
	  	else {
			const proveedor = new Proveedor({
		      _id: new mongoose.Types.ObjectId(),
		      nombre: Util.primeraLetraMayuscula(nombre)
		    });
		    proveedor.save()
		  	.then(proveedor => {
		  		res.status(201).json({		  			
		  			proveedor: {
		  				_id: proveedor._id,
		  				nombre: proveedor.nombre
		  			}
		  		})
		  	})
		  	.catch(err => {
		  		console.log(err);
		  		res.status(500).json({ err })
		  	})		  	
	  	}
	  });  	
}

exports.getProveedores = (req, res, next) => {
	let desde = req.query.desde || 0;
    desde = Number(desde);

	Proveedor.find()
		.select('nombre')
		.sort('nombre')
		.skip(desde)
		.limit(config.proveedores_por_pagina)
		.exec()
		.then(proveedores => {
			Proveedor.count({}, (err, total) => {
				res.status(200).json({				
					total,
				    proveedores
				})			
			})			
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});
}

exports.searchProveedores = (req, res, next) => {
	let desde = req.query.desde || 0;
    desde = Number(desde);
	const termino = req.params.termino;
	const regex = new RegExp(termino, 'i');

	Proveedor.find({'nombre': regex})		
		.select('nombre')
		.sort('nombre')
		.skip(desde)
		.limit(config.proveedores_por_pagina)
		.exec()
		.then(proveedores => {
			Proveedor.count({}, (err, total) => {
				res.status(200).json({				
					total,
				    proveedores
				})			
			})			
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});
}

exports.getProveedor = (req, res, next) => {
	const id = req.params.id;
	Proveedor.findById(id)
		.select('_id nombre')
		.exec()
		.then(proveedor => {
			if (proveedor) 
				res.status(200).json({proveedor})
			else 
				res.status(404).json({mensaje: 'Proveedor no encontrado'})				
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});	
}

exports.updateProveedor = (req, res, next) => {
  const { error } = validarProveedor(req.body);	
  if (error) return res.status(400).send(error.details[0].message);		

  const id = req.params.id;
  let body = req.body;
  body.nombre = Util.primeraLetraMayuscula(body.nombre);

  Proveedor.update({_id: id}, {$set: body})
    .exec()
    .then(proveedor => res.status(200).json({mensaje: "Proveedor actualizado con éxito" }))
    .catch(err => {
    	console.log(err);
		res.status(500).json({error: err})
	});  	
}

function validarProveedor(proveedor) {
	const schema = {
		nombre: Joi.string().required().min(3)		
	};

	return Joi.validate(proveedor, schema);
}

