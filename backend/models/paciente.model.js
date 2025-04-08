const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String
});

module.exports = mongoose.model('Paciente', pacienteSchema);
