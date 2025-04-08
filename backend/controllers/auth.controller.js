const jwt = require('jsonwebtoken');


const Usuario = require("../models/Usuario"); // asegúrate que el modelo se exporte bien
const bcrypt = require("bcryptjs");

exports.loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.password);

    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo
      },
      token
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};
