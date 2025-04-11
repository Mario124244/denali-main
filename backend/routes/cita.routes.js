const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/auth.middleware');
const { 
  crearCita, 
  obtenerCitas, 
  obtenerCitasPorGrupoYFecha,
  obtenerCitasPorServicioYFecha, // ✅ nueva
  obtenerCitasPorFecha
} = require('../controllers/cita.controller');

// Crear una cita (requiere token)
router.post('/citas', verificarToken, crearCita);

// Obtener citas del usuario autenticado (grupo o servicio)
router.get('/citas', verificarToken, obtenerCitas);

// Obtener citas por grupo y fecha (para citas tipo grupo)
router.get('/citas/grupo', obtenerCitasPorGrupoYFecha);

// ✅ Obtener citas por servicio y fecha (para citas tipo servicio)
router.get('/citas/servicio', obtenerCitasPorServicioYFecha);

// Obtener TODAS las citas de una fecha (sin importar grupo o servicio)
router.get('/citas/fecha', obtenerCitasPorFecha);

module.exports = router;
