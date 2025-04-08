const Paciente = require('../models/paciente.model');

const crearPaciente = async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;

    // Verificar si el paciente ya existe por correo
    let existente = await Paciente.findOne({ correo });

    if (existente) {
      return res.status(200).json(existente); // Ya existe, lo regresamos
    }

    // Crear nuevo paciente
    const nuevoPaciente = new Paciente({ nombre, correo, telefono });
    const guardado = await nuevoPaciente.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear paciente', error });
  }
};

module.exports = { crearPaciente };
