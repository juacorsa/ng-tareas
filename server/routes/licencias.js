const validarObjectId = require('../middleware/validarObjectId');
const {Licencia, validar} = require('../models/licencia');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const licencias = await Licencia.find()
	  .skip(desde)
	  .limit(config.get('licencias_por_pagina'))
	  .select("unidades observaciones caducidad")
	  .populate("cliente", "nombre")
	  .populate("software", "nombre")
	  .sort("caducidad");
	  
	res.send(licencias);
});

router.get('/count', async (req, res) => {		
	const licencias = await Licencia.count();	
	res.send(licencias.toString());
});

router.get('/:id', validarObjectId, async (req, res) => {
	const licencia = await Licencia.findById(req.params.id);

	if (!licencia) return res.status(400).send('Licencia no encontrada!!')

	res.send(licencia);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);
			
	const licencia = new Licencia({
		observaciones: req.body.observaciones,
		unidades : req.body.unidades,
		caducidad: req.body.caducidad,
		cliente  : req.body.cliente,
		software : req.body.software
	});	

	await licencia.save();
	res.send(licencia);
});

router.put('/:id', validarObjectId, async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const licencia = await Licencia.findByIdAndUpdate(req.params.id, {
		observaciones: req.body.observaciones,
		unidades : req.body.unidades,
		caducidad: req.body.caducidad,
		cliente  : req.body.cliente,
		software : req.body.software
	}, { new: true });

	if (!licencia) return res.status(404).send('Licencia no encontrada!!')
	
	res.send(licencia);
});

router.delete('/:id', validarObjectId, async (req, res) => {
	const licencia = await Licencia.findByIdAndRemove(req.params.id);

	if (!licencia) return res.status(400).send('Licencia no encontrada!!')

	res.send(licencia);
});

module.exports = router;