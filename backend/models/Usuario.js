const mongoose = require('mongoose');

// models/Usuario.js
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario'
  }
});


module.exports = mongoose.model('Usuario', usuarioSchema);
