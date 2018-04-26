const mongoose = require('mongoose');
const Joi = require('joi');
const Util = require('../util');
const Cliente = require("../models/cliente");

exports.createCliente = (req, res, next) => {
	const { error } = validarCliente(req.body);	
	if (error) return res.status(400).send(error.details[0].message);		
	
	const nombre = req.body.nombre.trim();
	const regex = new RegExp(nombre, 'i');

	Cliente.find({nombre: nombre})
	  .exec()
	  .then(cliente => {
	  	if (cliente.length >= 1) 
	  		return res.status(409).json({mensaje: "El cliente ya existe"});
	  	else {
			const cliente = new Cliente({
		      _id: new mongoose.Types.ObjectId(),
		      nombre: Util.primeraLetraMayuscula(nombre)
		    });
		    cliente.save()
		  	.then(cliente => {
		  		res.status(201).json({
		  			mensaje: "Cliente registrado con éxito",
		  			cliente: {
		  				_id: cliente._id,
		  				nombre: cliente.nombre
		  			}
		  		})
		  	})
		  	.catch(err => {
		  		console.log(err);
		  		res.status(500).json({error: err})
		  	})		  	
	  	}
	  });  	
}

exports.getClientes = (req, res, next) => {
	var desde = req.query.desde || 0;
    desde = Number(desde);

	Cliente.find()
		.select('nombre')
		.sort('nombre')
		.skip(desde)
		.limit(5)
		.exec()
		.then(clientes => {
			Cliente.count({}, (err, total) => {
				res.status(200).json({				
					total,
					clientes
				})			
			})
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});
}

exports.getCliente = (req, res, next) => {
	const id = req.params.id;

	Cliente.findById(id)
		.select('nombre')
		.exec()
		.then(cliente => {
			if (cliente) 
				res.status(200).json({cliente})
			else 
				res.status(404).json({mensaje: 'Cliente no encontrado'})				
		})
  		.catch(err => {
  			console.log(err);
  			res.status(500).json({error: err})
  		});	
}

exports.updateCliente = (req, res, next) => {
 	const { error } = validarCliente(req.body);	
 	if (error) return res.status(400).send(error.details[0].message);		

  	const id = req.params.id;
  	let body = req.body;
  	body.nombre = Util.primeraLetraMayuscula(body.nombre);

  	Cliente.update({_id: id}, {$set: body})
    	.exec()
    	.then(cliente => res.status(200).json({mensaje: "Cliente actualizado con éxito" }))
    	.catch(err => {
    		console.log(err);
			res.status(500).json({error: err})
		});  	
}

function validarCliente(cliente) {
	const schema = {
		nombre: Joi.string().required().min(3)		
	};

	return Joi.validate(cliente, schema);
}

