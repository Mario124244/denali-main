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

const actualizarEstadoCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['pendiente', 'finalizada', 'cancelada'].includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado inválido' });
    }

    const cita = await Cita.findByIdAndUpdate(id, { estado }, { new: true });

    if (!cita) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el estado', error });
  }
};

// PATCH: Reagendar cita (cambiar fecha/hora)
const reagendarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora } = req.body;

    // 🔍 Buscar la cita actual
    const citaActual = await Cita.findById(id);
    if (!citaActual) {
      return res.status(404).json({ mensaje: 'Cita original no encontrada' });
    }

    // ⚠️ Verificar si ya existe otra cita ocupando la misma hora
    let conflicto;

    if (citaActual.tipo === 'grupo') {
      // Validación para citas de grupo
      conflicto = await Cita.findOne({
        fecha,
        hora,
        tipo: 'grupo',
        'grupo.nombre': citaActual.grupo.nombre,
        _id: { $ne: id } // excluir la propia cita
      });
    } else if (citaActual.tipo === 'servicio') {
      // Validación para citas de servicio
      conflicto = await Cita.findOne({
        fecha,
        hora,
        tipo: 'servicio',
        terapeuta: citaActual.terapeuta,
        _id: { $ne: id }
      });
    }

    if (conflicto) {
      return res.status(400).json({ mensaje: 'Ya existe una cita en ese horario para ese grupo o terapeuta' });
    }

    // ✅ Actualizar si no hay conflicto
    const cita = await Cita.findByIdAndUpdate(id, { fecha, hora }, { new: true });

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al reagendar cita', error });
  }
};

const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByIdAndDelete(id);

    if (!cita) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    res.status(200).json({ mensaje: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cita', error });
  }
};

// ✅ Obtener TODAS las citas (admin)
const obtenerCitasAdmin = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('paciente', 'nombre correo')
      .populate('usuario', 'nombre correo')
      .select('fecha hora terapeuta estado paciente usuario tipo');

    res.status(200).json(citas);
  } catch (error) {
    console.error("Error real en /admin/citas:", error); // 👈 AGREGA ESTO
    res.status(500).json({ mensaje: 'Error al obtener citas (admin)', error });
  }
};






module.exports = {
  crearCita,
  obtenerCitasAdmin,
  obtenerCitas,
  obtenerCitasPorGrupoYFecha,
  obtenerCitasPorServicioYFecha,
  obtenerCitasPorFecha,
  actualizarEstadoCita,
  reagendarCita,
  eliminarCita
};
