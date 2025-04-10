const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/auth.middleware');
const { 
  crearCita, 
  obtenerCitas, 
  obtenerCitasPorGrupoYFecha,
  obtenerCitasPorFecha // ✅ añadida aquí
} = require('../controllers/cita.controller');

// Crear una cita (requiere token)
router.post('/citas', verificarToken, crearCita);

// Obtener citas del usuario autenticado
router.get('/citas', verificarToken, obtenerCitas);

// Obtener citas por grupo y fecha (para casos anteriores)
router.get('/citas/grupo', obtenerCitasPorGrupoYFecha);

// ✅ Nueva ruta para obtener TODAS las citas de una fecha
router.get('/citas/fecha', obtenerCitasPorFecha);

module.exports = router;
