const mongoose = require('mongoose');
const Joi = require('joi');

const Book =  mongoose.model('Book', new mongoose.Schema({
    title: { 
    	type: String,
    	required: true,
    	minlength: 3,
    	trim: true
    },
    author: { 
    	type: String,
    	required: true,
    	minlength: 3,
    	trim: true
    },  
    date: { 
    	type: Date, 
    	default: Date.now
    }
}));

function validateBook(book) {
	const schema = {
		title : Joi.string().min(3).required(),
		author: Joi.string().min(3).required()
	};

	return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateBook;