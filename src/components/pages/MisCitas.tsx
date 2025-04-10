import React, { useEffect, useState } from 'react';
import './MisCitas.css';



interface Cita {
  _id: string;
  fecha: string;
  hora: string;
  terapeuta: string;
  estado: 'pendiente' | 'finalizada' | 'cancelada';
  grupo: {
    nombre: string;
    imagen?: string; // URL o nombre de archivo
  };
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
        const res = await fetch(`${process.env.REACT_APP_API_URL}/citas`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Error al obtener citas');
        const data = await res.json();
        console.log('Citas recibidas:', data);
        setCitas(data);
      } catch (err: any) {
        setError(err.message || 'Error de conexión');
      }
    };

    fetchCitas();
  }, []);

  const formatFecha = (fechaStr: string) => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const [year, month, day] = fechaStr.split('-');
    return `${parseInt(day)} ${meses[parseInt(month) - 1]}`;
  };

  const citasPorFecha = citas.reduce((acc, cita) => {
    const fecha = cita.fecha;
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(cita);
    return acc;
  }, {} as { [key: string]: Cita[] });

  return (
    <div className="contenedor-citas">
      <h2 className="titulo-citas">Mi Calendario de Citas</h2>
      {error && <p className="error-citas">{error}</p>}

      {citas.length === 0 ? (
        <p className="mensaje-vacio">No tienes citas registradas.</p>
      ) : (
        <div className="grid-citas">
          {Object.entries(citasPorFecha).map(([fecha, citasDia]) => (
            
            <div key={fecha} className="card-dia">
              <div className="fecha-cita">
                <h3 className="fecha-titulo">
                  <span className="fecha-etiqueta">{formatFecha(fecha)}</span>
                </h3>
              </div>
              <div className="citas-dia">
                {citasDia.map((cita) => (
                  
                  <div key={cita._id} className="card-cita">
                  <div className="info-cita">
                    <div className="hora-cita">⏰ {cita.hora}</div>
                
                    <div className="detalle-cita">
                      <div>👤 Paciente: {cita.paciente?.nombre}</div>
                      <div>👨 Terapeuta: {cita.terapeuta}</div>
                    </div>
                
                    <div className="estado-cita">
                        <span className={`badge ${cita.estado || 'pendiente'}`}>
                          {(cita.estado || 'pendiente').toUpperCase()}
                        </span>
                      </div>

                
                      <div className="grupo-cita">
                        <img
                          src={cita.grupo?.imagen || '/img/grupos/grupo-a.png'}
                          alt={cita.grupo?.nombre || 'Grupo'}
                          className="icono-grupo"
                        />
                        <span>{cita.grupo?.nombre || 'Sin grupo'}</span>
                      </div>

                  </div>
                </div>
                
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisCitas;
