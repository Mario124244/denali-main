const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/usuario.controller');

router.post('/usuarios/register', registrarUsuario);
router.post('/usuarios/login', loginUsuario);

module.exports = router;
