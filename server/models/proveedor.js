const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, index: true }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);


