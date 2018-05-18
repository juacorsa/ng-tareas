const {Book, validate} = require('../models/book');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {		
	var desde = req.query.desde || 0;
    desde = Number(desde);
	
	const books = await Book.find()
		.skip(desde)
		.limit(config.get('libros_por_pagina'))
		.sort({title: -1});
	
	res.send(books);
});

router.get('/count', async (req, res) => {		
	const books = await Book.find().count();	
	res.send(books.toString());
});


router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let book = await Book.findOne({'title': req.body.title});
	if (book) return res.status(400).send('Book already exists!!');
		
	book = new Book({
		title: req.body.title,
		author: req.body.author
	});

	book = await book.save();
	res.send(book);
});


router.get('/:id', async (req, res) => {
	const book = await Book.findById(req.params.id);

	if (!book) return res.status(400).send('Book not found!!')

	res.send(book);
});

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const book = await Book.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
		author: req.body.author
	}, { new: true });

	if (!book) return res.status(400).send('Book not found!!')
	
	res.send(book);
});

router.delete('/:id', async (req, res) => {
	const book = await Book.findByIdAndRemove(req.params.id);

	if (!book) return res.status(400).send('Book not found!!')

	res.send(book);
});

module.exports = router;
