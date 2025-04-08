import React, { useState } from 'react';

const AgendarCita: React.FC = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    hora: '',
    terapeuta: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Paso 1: Crear o recuperar paciente
      const pacienteRes = await fetch(`${process.env.REACT_APP_API_URL}/pacientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          correo: form.correo,
          telefono: form.telefono,
        }),
      });

      const paciente = await pacienteRes.json();

      // Paso 2: Agendar la cita asociada al usuario logueado
      const citaRes = await fetch(`${process.env.REACT_APP_API_URL}/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 👈 Aquí se manda el token
        },
        body: JSON.stringify({
          paciente: paciente._id,
          fecha: form.fecha,
          hora: form.hora,
          terapeuta: form.terapeuta
        }),
      });

      if (citaRes.ok) {
        setMensaje('✅ Cita agendada con éxito');
        setForm({
          nombre: '',
          correo: '',
          telefono: '',
          fecha: '',
          hora: '',
          terapeuta: ''
        });
      } else {
        setMensaje('❌ Error al agendar la cita');
      }

    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Agendar Cita</h2>
      {mensaje && <p style={{ fontWeight: 'bold' }}>{mensaje}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="nombre" placeholder="Nombre del paciente" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
        <input type="text" name="terapeuta" placeholder="Nombre del terapeuta" value={form.terapeuta} onChange={handleChange} required />
        <button type="submit">Agendar cita</button>
      </form>
    </div>
  );
};

export default AgendarCita;
