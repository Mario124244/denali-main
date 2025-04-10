const Cita = require('../models/cita.model');

// 👉 Crear cita
// 👉 Crear cita
const crearCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, terapeuta, estado, grupo } = req.body;

    // ✅ Paso 1: Validar si ya hay 3 usuarios distintos en esa hora y grupo
    const citasExistentes = await Cita.find({
      fecha,
      hora,
      'grupo.nombre': grupo.nombre
    });

    // Obtener IDs únicos de usuario
    const usuariosUnicos = [...new Set(citasExistentes.map(c => c.usuario.toString()))];

    // Si ya hay 3 diferentes y este no es uno de ellos, rechazar
    if (usuariosUnicos.length >= 3 && !usuariosUnicos.includes(req.usuario.id)) {
      return res.status(400).json({
        mensaje: 'Ya hay 3 personas distintas agendadas para esta hora y grupo. Elige otra hora.'
      });
    }

    // ✅ Paso 2: Crear la cita normalmente
    const nuevaCita = new Cita({
      paciente,
      usuario: req.usuario.id,
      fecha,
      hora,
      terapeuta,
      estado: estado || 'pendiente',
      grupo
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

// Obtener citas por grupo y fecha
const obtenerCitasPorGrupoYFecha = async (req, res) => {
  try {
    const { grupo, fecha } = req.query;
    if (!grupo || !fecha) {
      return res.status(400).json({ mensaje: 'Grupo y fecha requeridos' });
    }

    const citas = await Cita.find({ 
      'grupo.nombre': grupo, 
      fecha
    }).select('hora usuario');
    
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas del grupo y fecha', error });
  }
};


module.exports = { crearCita, obtenerCitas, obtenerCitasPorGrupoYFecha };
