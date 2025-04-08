const Cita = require('../models/cita.model');

// 👉 Crear cita
const crearCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, terapeuta } = req.body;

    const nuevaCita = new Cita({
      paciente,
      usuario: req.usuario.id,
      fecha,
      hora,
      terapeuta
    });

    const guardada = await nuevaCita.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cita', error });
  }
};

// ✅ CORRECTO: Obtener citas del usuario logueado
const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.usuario.id })
      .populate('paciente', 'nombre correo')
      .populate('usuario', 'nombre correo');

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas', error });
  }
};

module.exports = { crearCita, obtenerCitas };
