import React, { useEffect, useState, useMemo } from 'react';
import './MisCitas.css';

interface Cita {
  _id: string;
  fecha: string;
  hora: string;
  terapeuta: string;
  estado: 'pendiente' | 'finalizada' | 'cancelada';
  grupo: {
    nombre: string;
    imagen?: string;
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
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
        setCitas(data);
      } catch (err: any) {
        setError(err.message || 'Error de conexión');
      }
    };

    fetchCitas();
  }, []);

  const citasPorFecha = useMemo(() => 
    citas.reduce((acc, cita) => {
      const fecha = cita.fecha;
      if (!acc[fecha]) acc[fecha] = [];
      acc[fecha].push(cita);
      return acc;
    }, {} as { [key: string]: Cita[] }),
  [citas]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const startOffset = startDay === 0 ? 6 : startDay - 1;
    const calendarStart = new Date(year, month, 1 - startOffset);
    
    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(calendarStart);
      date.setDate(date.getDate() + i);
      return date;
    });
  }, [currentMonth]);

  const handlePrevMonth = () => 
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));

  const handleNextMonth = () => 
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  return (
    <div className="contenedor-citas">
      <h2 className="titulo-citas">Mi Calendario de Citas</h2>
      {error && <p className="error-citas">{error}</p>}

      {citas.length === 0 ? (
        <p className="mensaje-vacio">No tienes citas registradas.</p>
      ) : (
        <div className="contenedor-calendario">
          <div className="navegacion-mes">
            <button onClick={handlePrevMonth}>&lt;</button>
            <h3>
              {currentMonth.toLocaleDateString('es-ES', { 
                month: 'long', 
                year: 'numeric' 
              }).toUpperCase()}
            </h3>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>

          <div className="calendario-header">
            {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(dia => (
              <div key={dia} className="dia-header">{dia}</div>
            ))}
          </div>

          <div className="calendario-grid">
            {calendarDays.map((dia, index) => {
              const fechaStr = `${dia.getFullYear()}-${(dia.getMonth() + 1)
                .toString().padStart(2, '0')}-${dia.getDate()
                .toString().padStart(2, '0')}`;
              const citasDia = citasPorFecha[fechaStr] || [];
              const esMesActual = dia.getMonth() === currentMonth.getMonth();

              return (
                <div key={index} className={`dia-calendario ${!esMesActual ? 'dia-inactivo' : ''}`}>
                <div className="dia-numero">{dia.getDate()}</div>
                <div className="citas-del-dia">
                  {citasDia.map(cita => (
                    <div key={cita._id} className="cita-calendario">
                      <div className="cita-hora-grupo">
                        <span className="cita-hora">{cita.hora}</span>
                        <div className="grupo-info">
                          <img 
                            src={cita.grupo?.imagen || '/img/grupos/grupo-a.png'} 
                            alt={cita.grupo?.nombre} 
                            className="icono-grupo-calendario" 
                          />
                          <span className="nombre-grupo">{cita.grupo?.nombre}</span>
                        </div>
                      </div>
                      
                      <div className="cita-info">
                        <span className="cita-paciente">{cita.paciente.nombre}</span>
                        
                        <div className="cita-detalle">
                          <div className={`estado-container ${cita.estado}`}>
                            <span className="estado-icono"></span>
                            <span className="estado-texto">
                              {cita.estado === 'pendiente' && 'PEND'}
                              {cita.estado === 'finalizada' && 'FIN'}
                              {cita.estado === 'cancelada' && 'CANC'}
                            </span>
                          </div>
                          <span className="cita-terapeuta">{cita.terapeuta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MisCitas;