const Cita = require('../models/cita.model');

const crearCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, terapeuta } = req.body;

    const nuevaCita = new Cita({
      paciente,             // 🧍 el paciente que recibirá la cita
      usuario: req.usuario.id, // 👤 el usuario que agenda
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

const citas = await Cita.find({ usuario: req.usuario.id }) // 👈 solo las del usuario logueado
  .populate('paciente', 'nombre correo')
  .populate('usuario', 'nombre correo');

res.status(200).json(citas);


module.exports = { crearCita, obtenerCitas };
