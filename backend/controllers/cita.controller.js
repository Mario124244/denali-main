const Cita = require('../models/cita.model');

// 👉 Crear cita
// 👉 Crear cita
const crearCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, terapeuta, estado, grupo } = req.body;

    // Paso 1: Validar si esa hora ya fue usada por otro grupo
    const citaEnOtraGrupo = await Cita.findOne({
      fecha,
      hora,
      'grupo.nombre': { $ne: grupo.nombre } // grupo distinto
    });

    if (citaEnOtraGrupo) {
      return res.status(400).json({
        mensaje: 'Esta hora ya está ocupada por otro grupo. Elige otra hora.'
      });
    }

    // Paso 2: Validar límite de 3 personas distintas en ese grupo y hora
    const citasMismoGrupoHora = await Cita.find({
      fecha,
      hora,
      'grupo.nombre': grupo.nombre
    });

    const usuariosUnicos = [...new Set(citasMismoGrupoHora.map(c => c.usuario.toString()))];

    if (usuariosUnicos.length >= 3 && !usuariosUnicos.includes(req.usuario.id)) {
      return res.status(400).json({
        mensaje: 'Ya hay 3 personas distintas agendadas para esta hora y grupo.'
      });
    }

    // Paso 3: Guardar cita
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

// ✅ Obtener todas las citas de una fecha (sin importar grupo)
const obtenerCitasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      return res.status(400).json({ mensaje: 'La fecha es requerida' });
    }

    const citas = await Cita.find({ fecha }).select('hora usuario grupo');
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas por fecha', error });
  }
};


module.exports = { crearCita, obtenerCitas, obtenerCitasPorGrupoYFecha, obtenerCitasPorFecha };
