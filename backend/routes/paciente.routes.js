const express = require('express');
const router = express.Router();
const { crearPaciente } = require('../controllers/paciente.controller');

router.post('/pacientes', crearPaciente);

module.exports = router;
