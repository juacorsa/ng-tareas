const validarObjectId = require('../middleware/validarObjectId');
const {Cliente, validar} = require('../models/cliente');
const mongoose = require('mongoose');
const httpStatus = require('http-status-codes');
const config = require('config');
const express = require('express');
const router = express.Router();

const CLIENTE_NO_ENCONTRADO = config.get('cliente_no_encontrado');
const CLIENTE_YA_EXISTE     = config.get('cliente_ya_existe');
const CLIENTES_POR_PAGINA   = config.get('clientes_por_pagina');

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const clientes = await Cliente.find()
		.skip(desde)
		.limit(CLIENTES_POR_PAGINA)
		.select('nombre')
		.sort('nombre');
	
	res.send(clientes);
});

router.get('/count', async (req, res) => {		
	const clientes = await Cliente.count();	
	res.send(clientes.toString());
});

router.get('/:id', validarObjectId, async (req, res) => {
	const cliente = await Cliente.findById(req.params.id);

	if (!cliente) return res.status(httpStatus.BAD_REQUEST).send(CLIENTE_NO_ENCONTRADO);

	res.send(cliente);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message);

	let cliente = await Cliente.findOne({'nombre': req.body.nombre});
	if (cliente) return res.status(httpStatus.BAD_REQUEST).send(CLIENTE_YA_EXISTE);
		
	cliente = new Cliente({nombre: req.body.nombre});
	cliente = await cliente.save();
	res.send(cliente);
});

router.put('/:id', validarObjectId, async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message);
	
	const cliente = await Cliente.findByIdAndUpdate(req.params.id, {
		nombre: req.body.nombre		
	}, { new: true });

	if (!cliente) return res.status(httpStatus.BAD_REQUEST).send(CLIENTE_NO_ENCONTRADO);
	
	res.send(cliente);
});

module.exports = router;