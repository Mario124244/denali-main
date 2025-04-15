const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/auth.middleware');
// ✅ correcto (sube un nivel al usar "../")
const esAdmin = require('../middlewares/admin.middlewares');

const { 
  crearCita, 
  obtenerCitas, 
  obtenerCitasPorGrupoYFecha,
  obtenerCitasPorServicioYFecha, // ✅ nueva
  obtenerCitasPorFecha,
  obtenerCitasAdmin,
  actualizarEstadoCita,
  reagendarCita,
  eliminarCita
} = require('../controllers/cita.controller');


// Crear una cita (requiere token)
router.post('/citas', verificarToken, crearCita);

// Obtener citas del usuario autenticado (grupo o servicio)
router.get('/citas', verificarToken, obtenerCitas);

// Obtener citas por grupo y fecha (para citas tipo grupo)
router.get('/citas/grupo', obtenerCitasPorGrupoYFecha);

// ✅ Obtener citas por servicio y fecha (para citas tipo servicio)
router.get('/citas/servicio', obtenerCitasPorServicioYFecha);
router.get('/admin/citas', verificarToken, esAdmin, async (req, res) => {
  const citas = await Cita.find().populate('usuario', 'nombre correo');
  res.json(citas);
});

router.get('/admin/citas', verificarToken, esAdmin, obtenerCitasAdmin);
// Obtener TODAS las citas de una fecha (sin importar grupo o servicio)
router.get('/citas/fecha', obtenerCitasPorFecha);
router.patch('/citas/:id/estado', verificarToken, actualizarEstadoCita);
router.patch('/citas/:id/reagendar', verificarToken, reagendarCita);
router.delete('/citas/:id', verificarToken, eliminarCita);



module.exports = router;
