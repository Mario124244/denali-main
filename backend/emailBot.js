const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Cita = require('./models/cita.model');
const Paciente = require('./models/paciente.model');
require('dotenv').config();
require('./config/db'); // conecta a MongoDB

console.log('📅 Bot de recordatorios activado ✅');

// Configura el transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CORREO_REMITENTE,
    pass: process.env.PASSWORD_REMITENTE
  }
});

// Ejecuta cada hora
cron.schedule('0 * * * *', async () => {
  const ahora = new Date(); // ✅ primero defines esto
  const unaHoraDespues = new Date(ahora.getTime() + 60 * 60 * 1000);

  console.log('🔎 Verificando citas que ocurren en la próxima hora...');
  console.log('🕒 Fecha buscada:', ahora.toISOString().split('T')[0]);
  console.log('🕒 Hora actual (desde Render):', ahora.toTimeString().slice(0, 5));
  console.log('🕒 Rango de búsqueda:', ahora.toTimeString().slice(0, 5), '→', unaHoraDespues.toTimeString().slice(0, 5));

  const citas = await Cita.find({
    fecha: { $eq: ahora.toISOString().split('T')[0] },
    hora: {
      $gte: ahora.toTimeString().slice(0, 5),
      $lte: unaHoraDespues.toTimeString().slice(0, 5)
    }
  }).populate('paciente');

  console.log('🛠 Resultado crudo de las citas:', citas);

  if (citas.length === 0) {
    console.log('📭 No se encontraron citas próximas.');
    return;
  } else {
    console.log(`📋 Se encontraron ${citas.length} cita(s) para enviar recordatorio`);
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
      console.log(`📧 Correo enviado a ${paciente.correo}`);
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
    }
  }
});
