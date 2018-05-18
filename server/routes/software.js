const {Software, validar} = require('../models/software');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const software = await Software.find()
		.skip(desde)
		.limit(config.get('software_por_pagina'))
		.select('nombre')
		.sort('nombre');
	
	res.send(software);
});

router.get('/count', async (req, res) => {		
	const software = await Software.count();	
	res.send(software.toString());
});

router.get('/:id', async (req, res) => {
	const software = await Software.findById(req.params.id);

	if (!software) return res.status(400).send('Software no encontrado')

	res.send(software);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let software = await Software.findOne({'nombre': req.body.nombre});
	if (software) return res.status(400).send('El software ya existe');
		
	software = new Software({nombre: req.body.nombre});
	software = await software.save();
	res.send(software);
});

router.put('/:id', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const software = await Software.findByIdAndUpdate(req.params.id, {
		nombre: req.body.nombre		
	}, { new: true });

	if (!software) return res.status(400).send('Software no encontrado!!')
	
	res.send(software);
});

module.exports = router;