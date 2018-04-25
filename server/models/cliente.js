const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, index: true }
});

module.exports = mongoose.model('Cliente', clienteSchema);