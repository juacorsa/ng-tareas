const validarObjectId = require('../middleware/validarObjectId');
const {Software, validar} = require('../models/software');
const mongoose = require('mongoose');
const httpStatus = require('http-status-codes');
const config  = require('config');
const express = require('express');
const router  = express.Router();

const SOFTWARE_NO_ENCONTRADO = config.get('software_no_encontrado');
const SOFTWARE_YA_EXISTE     = config.get('software_ya_existe');
const SOFTWARE_POR_PAGINA    = config.get('software_por_pagina');

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const software = await Software.find()
		.skip(desde)
		.limit(SOFTWARE_POR_PAGINA)
		.select('nombre')
		.sort('nombre');
	
	res.send(software);
});

router.get('/count', async (req, res) => {		
	const software = await Software.count();	
	res.send(software.toString());
});

router.get('/:id', validarObjectId, async (req, res) => {
	const software = await Software.findById(req.params.id);

	if (!software) return res.status(httpStatus.BAD_REQUEST).send(SOFTWARE_NO_ENCONTRADO);

	res.send(software);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message);

	let software = await Software.findOne({'nombre': req.body.nombre});
	if (software) return res.status(httpStatus.BAD_REQUEST).send(SOFTWARE_YA_EXISTE);
		
	software = new Software({nombre: req.body.nombre});
	software = await software.save();
	res.send(software);
});

router.put('/:id', validarObjectId, async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message);
	
	const software = await Software.findByIdAndUpdate(req.params.id, {
		nombre: req.body.nombre		
	}, { new: true });

	if (!software) return res.status(httpStatus.BAD_REQUEST).send(SOFTWARE_NO_ENCONTRADO);
	
	res.send(software);
});

module.exports = router;