const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Cita = require('./models/cita.model');
const Paciente = require('./models/paciente.model');
require('dotenv').config();
require('./config/db'); // conecta a MongoDB

// 🟢 Log inicial
console.log('📅 Bot de recordatorios activado ✅');

// Configura el transporte de nodemailer (Gmail en este caso)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CORREO_REMITENTE,     // Tu correo
    pass: process.env.PASSWORD_REMITENTE    // Tu contraseña o app password
  }
});

// Programa una tarea para que se ejecute cada hora
cron.schedule('0 * * * *', async () => {
  console.log('🔎 Verificando citas que ocurren en la próxima hora...');

  const ahora = new Date();
  const unaHoraDespues = new Date(ahora.getTime() + 60 * 60 * 1000);

  const citas = await Cita.find({
    fecha: { $eq: ahora.toISOString().split('T')[0] },
    hora: {
      $gte: ahora.toTimeString().slice(0, 5),
      $lte: unaHoraDespues.toTimeString().slice(0, 5)
    }
  }).populate('paciente');

  if (citas.length === 0) {
    console.log('📭 No se encontraron citas próximas.');
    return;
  }

  for (const cita of citas) {
    const paciente = cita.paciente;

    const mailOptions = {
      from: process.env.CORREO_REMITENTE,
      to: paciente.correo,
      subject: 'Recordatorio de cita',
      text: `Hola ${paciente.nombre},\n\nTienes una cita programada hoy a las ${cita.hora} con el terapeuta ${cita.terapeuta}.\n\nGracias por confiar en nosotros.`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`📧 Correo enviado al buenisimo a ${paciente.correo}`);
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
    }
  }
});
