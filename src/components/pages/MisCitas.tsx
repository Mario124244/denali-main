import React, { useEffect, useState } from 'react';

interface Cita {
  _id: string;
  fecha: string;
  hora: string;
  terapeuta: string;
  paciente: {
    nombre: string;
    correo: string;
  };
  usuario: {
    nombre: string;
    correo: string;
  };
}

const MisCitas: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/citas', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error al obtener citas');
        }

        const data = await res.json();
        setCitas(data);
      } catch (err: any) {
        setError(err.message || 'Error de conexión');
      }
    };

    fetchCitas();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mis Citas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {citas.length === 0 ? (
        <p>No tienes citas registradas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Correo</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Terapeuta</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita._id}>
                <td>{cita.paciente?.nombre}</td>
                <td>{cita.paciente?.correo}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.terapeuta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisCitas;
