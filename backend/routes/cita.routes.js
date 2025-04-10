const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/auth.middleware'); // 👈 importa el middleware
const { crearCita, obtenerCitas, obtenerCitasPorGrupoYFecha } = require('../controllers/cita.controller');




// 👇 Solo usuarios autenticados pueden crear una cita
router.post('/citas', verificarToken, crearCita);

// 👇 Obtener todas las citas (puedes proteger esto también si quieres)
router.get('/citas', verificarToken, obtenerCitas); // ARREGLAR ERROR NO TENGO REFERENCIA DE obtenerCitas

router.get('/citas/grupo', obtenerCitasPorGrupoYFecha);


module.exports = router;
