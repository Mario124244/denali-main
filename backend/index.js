const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const pacienteRoutes = require('./routes/paciente.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const citaRoutes = require('./routes/cita.routes'); // 👈 AÑADIDO
const path = require('path');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas disponibles
app.use('/api', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', citaRoutes); // 👈 AÑADIDO
app.use(express.static(path.join(__dirname, '../public')));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
