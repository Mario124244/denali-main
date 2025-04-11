const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  terapeuta: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'finalizada', 'cancelada'],
    default: 'pendiente'
  },
  grupo: {
    nombre: { type: String },
    imagen: { type: String }
  },
  servicio: {
    nombre: { type: String }
  },
  tipo: {
    type: String,
    enum: ['grupo', 'servicio'],
    required: true
  }
});

module.exports = mongoose.model('Cita', citaSchema);
