	const validarObjectId = require('../middleware/validarObjectId');
const {Proveedor, validar} = require('../models/proveedor');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const proveedores = await Proveedor.find()
		.skip(desde)
		.limit(config.get('proveedores_por_pagina'))
		.select('nombre')
		.sort('nombre');
	
	res.send(proveedores);
});

router.get('/count', async (req, res) => {		
	const proveedores = await Proveedor.count();	
	res.send(proveedores.toString());
});

router.get('/:id', validarObjectId, async (req, res) => {
	const proveedor = await Proveedor.findById(req.params.id);

	if (!proveedor) return res.status(400).send('Proveedor no encontrado')

	res.send(proveedor);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let proveedor = await Proveedor.findOne({'nombre': req.body.nombre});
	if (proveedor) return res.status(400).send('El proveedor ya existe');
		
	proveedor = new Proveedor({nombre: req.body.nombre});
	proveedor = await proveedor.save();
	res.send(proveedor);
});

router.put('/:id', validarObjectId, async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, {
		nombre: req.body.nombre		
	}, { new: true });

	if (!proveedor) return res.status(400).send('Proveedor no encontrado!!')
	
	res.send(proveedor);
});

module.exports = router;