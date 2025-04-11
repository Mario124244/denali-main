const Cita = require('../models/cita.model');

// ✅ Crear cita para grupo o servicio
const crearCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, terapeuta, estado, grupo, servicio, tipo } = req.body;

    if (tipo === 'grupo') {
      // Validar si esa hora ya fue usada por otro grupo
      const citaEnOtraGrupo = await Cita.findOne({
        fecha,
        hora,
        'grupo.nombre': { $ne: grupo.nombre },
        tipo: 'grupo'
      });

      if (citaEnOtraGrupo) {
        return res.status(400).json({
          mensaje: 'Esta hora ya está ocupada por otro grupo. Elige otra hora.'
        });
      }

      // Validar límite de 3 personas distintas en ese grupo y hora
      const citasMismoGrupoHora = await Cita.find({
        fecha,
        hora,
        'grupo.nombre': grupo.nombre,
        tipo: 'grupo'
      });

      const usuariosUnicos = [...new Set(citasMismoGrupoHora.map(c => c.usuario.toString()))];

      if (usuariosUnicos.length >= 3 && !usuariosUnicos.includes(req.usuario.id)) {
        return res.status(400).json({
          mensaje: 'Ya hay 3 personas distintas agendadas para esta hora y grupo.'
        });
      }
    }

    if (tipo === 'servicio') {
      // Validar límite de 3 personas distintas en ese servicio y hora
      const citasMismoServicioHora = await Cita.find({
        fecha,
        hora,
        'servicio.nombre': servicio.nombre,
        tipo: 'servicio'
      });

      const usuariosUnicos = [...new Set(citasMismoServicioHora.map(c => c.usuario.toString()))];

      if (usuariosUnicos.length >= 3 && !usuariosUnicos.includes(req.usuario.id)) {
        return res.status(400).json({
          mensaje: 'Ya hay 3 personas distintas agendadas para esta hora y servicio.'
        });
      }
    }

    // Guardar cita según tipo
    const nuevaCita = new Cita({
      paciente,
      usuario: req.usuario.id,
      fecha,
      hora,
      terapeuta,
      estado: estado || 'pendiente',
      grupo: tipo === 'grupo' ? grupo : undefined,
      servicio: tipo === 'servicio' ? servicio : undefined,
      tipo
    });

    const guardada = await nuevaCita.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cita', error });
  }
};

// ✅ Obtener citas del usuario (grupo y servicio)
const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.usuario.id })
      .populate('paciente', 'nombre correo')
      .populate('usuario', 'nombre correo')
      .select('fecha hora terapeuta estado grupo servicio tipo');

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas', error });
  }
};

// ✅ Obtener citas por grupo y fecha
const obtenerCitasPorGrupoYFecha = async (req, res) => {
  try {
    const { grupo, fecha } = req.query;
    if (!grupo || !fecha) {
      return res.status(400).json({ mensaje: 'Grupo y fecha requeridos' });
    }

    const citas = await Cita.find({ 
      'grupo.nombre': grupo, 
      fecha,
      tipo: 'grupo'
    }).select('hora usuario');

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas del grupo y fecha', error });
  }
};

// ✅ Obtener citas por servicio y fecha
const obtenerCitasPorServicioYFecha = async (req, res) => {
  try {
    const { servicio, fecha } = req.query;
    if (!servicio || !fecha) {
      return res.status(400).json({ mensaje: 'Servicio y fecha requeridos' });
    }

    const citas = await Cita.find({ 
      'servicio.nombre': servicio, 
      fecha,
      tipo: 'servicio'
    }).select('hora usuario');

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas del servicio y fecha', error });
  }
};

// ✅ Obtener todas las citas de una fecha
const obtenerCitasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      return res.status(400).json({ mensaje: 'La fecha es requerida' });
    }

    const citas = await Cita.find({ fecha }).select('hora usuario grupo servicio tipo');
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas por fecha', error });
  }
};

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitasPorGrupoYFecha,
  obtenerCitasPorServicioYFecha,
  obtenerCitasPorFecha
};
