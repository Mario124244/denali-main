import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Cita {
  _id: string;
  paciente: string;
  fecha: string;
  hora: string;
  terapeuta: string;
  estado: string;
}

const AdminCitas: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get<Cita[]>(
          `${process.env.REACT_APP_API_URL}/admin/citas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCitas(res.data); // ✅ Ya no marca error
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };

    obtenerCitas();
  }, []);

  return (
    <div>
      <h2>Administración de Citas</h2>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Terapeuta</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita._id}>
              <td>{cita.paciente}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.terapeuta}</td>
              <td>{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCitas;
