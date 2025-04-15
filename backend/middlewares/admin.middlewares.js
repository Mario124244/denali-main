// middlewares/admin.middleware.js
module.exports = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'Acceso no autorizado: solo administradores' });
    }
    next();
  };
