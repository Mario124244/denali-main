const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ mensaje: 'El usuario ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, correo, password: hashedPassword });
    const guardado = await nuevoUsuario.save();

    const token = jwt.sign({ id: guardado._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

    res.status(201).json({
      mensaje: '✅ Usuario registrado con éxito',
      token,
      usuario: { nombre: guardado.nombre, correo: guardado.correo }
    });
  } catch (error) {
    res.status(500).json({ mensaje: '❌ Error al registrar usuario', error: error.message });
  }
};

const loginUsuario = async (req, res) => {
  // ...
};

module.exports = { registrarUsuario, loginUsuario };
