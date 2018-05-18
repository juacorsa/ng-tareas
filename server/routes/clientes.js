/*
const express = require('express');
const router = express.Router();

const ClientesController = require('../controllers/clientes');

router.post("/", ClientesController.createCliente);

router.get("/", ClientesController.getClientes);

router.get("/:id", ClientesController.getCliente);

router.put("/:id", ClientesController.updateCliente);

router.get("/buscar/:termino", ClientesController.searchClientes);*/


const {Cliente, validar} = require('../models/cliente');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const clientes = await Cliente.find()
		.skip(desde)
		.limit(config.get('clientes_por_pagina'))
		.select('nombre')
		.sort('nombre');
	
	res.send(clientes);
});

router.get('/count', async (req, res) => {		
	const clientes = await Cliente.count();	
	res.send(clientes.toString());
});

router.get('/:id', async (req, res) => {
	const cliente = await Cliente.findById(req.params.id);

	if (!cliente) return res.status(400).send('Cliente no encontrado')

	res.send(cliente);
});

router.post('/', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let cliente = await Cliente.findOne({'nombre': req.body.nombre});
	if (cliente) return res.status(400).send('El cliente ya existe');
		
	cliente = new Cliente({nombre: req.body.nombre});
	cliente = await cliente.save();
	res.send(cliente);
});

router.put('/:id', async (req, res) => {
	const { error } = validar(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const cliente = await Cliente.findByIdAndUpdate(req.params.id, {
		nombre: req.body.nombre		
	}, { new: true });

	if (!cliente) return res.status(400).send('Cliente no encontrado!!')
	
	res.send(cliente);
});

module.exports = router;













module.exports = router;