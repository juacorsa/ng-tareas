const mongoose = require('mongoose');

const LicenciaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cliente:  { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    software: { type: mongoose.Schema.Types.ObjectId, ref: 'Software' },
    unidades: { type: Number, default: 1 },
    caducidad: { type: Date },
    observaciones: { type: String }
});

module.exports = mongoose.model('Licencia', LicenciaSchema);


