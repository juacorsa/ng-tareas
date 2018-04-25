const mongoose = require('mongoose');

const softwareSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, index: true }
});

module.exports = mongoose.model('Software', softwareSchema);


