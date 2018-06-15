const validarObjectId = require('../middleware/validarObjectId');
const {Proveedor, validar} = require('../models/proveedor');
const mongoose = require('mongoose');
const httpStatus = require('http-status-codes');
const config = require('config');
const express = require('express');
const router = express.Router();

const PROVEEDOR_NO_ENCONTRADO = config.get('proveedor_no_encontrado');
const PROVEEDOR_YA_EXISTE     = config.get('proveedor_ya_existe');
const PROVEEDORES_POR_PAGINA  = config.get('proveedores_por_pagina');

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const proveedores = await Proveedor.find()
		.skip(desde)
		.limit(PROVEEDORES_POR_PAGINA)
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

	if (!proveedor) return res.status(httpStatus.BAD_REQUEST).send(PROVEEDOR_NO_ENCONTRADO);

	res.send(proveedor);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message);

	let proveedor = await Proveedor.findOne({'nombre': req.body.nombre});
	if (proveedor) return res.status(httpStatus.BAD_REQUEST).send(PROVEEDOR_YA_EXISTE);
		
	proveedor = new Proveedor({nombre: req.body.nombre});
	proveedor = await proveedor.save();
	res.send(proveedor);
});

router.put('/:id', validarObjectId, async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message);
	
	const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, {
		nombre: req.body.nombre		
	}, { new: true });

	if (!proveedor) return res.status(httpStatus.BAD_REQUEST).send(PROVEEDOR_NO_ENCONTRADO);
	
	res.send(proveedor);
});

module.exports = router;