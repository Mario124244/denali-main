import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCitas.css'
interface Cita {
  _id: string;
  paciente: {
    _id: string;
    nombre: string;
    correo: string;
  };
  fecha: string;
  hora: string;
  terapeuta: string;
  estado: string;
}

const AdminCitas: React.FC = () => {

  useEffect(() => {
      document.body.classList.add('adminCitas-body');
      return () => {
        document.body.classList.remove('adminCitas-body');
      };
    }, []);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [citaEditando, setCitaEditando] = useState<Cita | null>(null);
  const [form, setForm] = useState({ fecha: '', hora: '', estado: 'pendiente' });

  // Estilos CRUD
  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#fafafa',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      color: '#6c5b7b',
      margin: 0,
      fontSize: '2rem',
    },
    tableContainer: {
      overflowX: 'auto' as const,
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      backgroundColor: 'white',
    },
    th: {
      backgroundColor: '#a8d8ea',
      color: '#2a4d5b',
      padding: '1rem',
      textAlign: 'left' as const,
      fontWeight: 600,
      whiteSpace: 'nowrap' as const,
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #eee',
      color: '#444',
      whiteSpace: 'nowrap' as const,
    },
    accionesCell: {
      display: 'flex',
      gap: '0.5rem',
    },
    badge: (estado: string) => ({
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      ...getEstadoStyle(estado),
    }),
    button: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    editButton: {
      backgroundColor: '#a8d8ea',
      color: '#2a4d5b',
      ':hover': { backgroundColor: '#97c7d9' },
    },
    deleteButton: {
      backgroundColor: '#f67280',
      color: 'white',
      ':hover': { backgroundColor: '#e5616f' },
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '500px',
    },
    modalTitle: {
      color: '#6c5b7b',
      marginTop: 0,
      marginBottom: '2rem',
      textAlign: 'center' as const,
    },
    inputGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#666',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    select: {
      width: '100%',
      padding: '0.8rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      fontSize: '1rem',
    },
    modalActions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '2rem',
    },
    cancelButton: {
      backgroundColor: '#f8b195',
      color: 'white',
      ':hover': { backgroundColor: '#e7a086' },
    },
    saveButton: {
      backgroundColor: '#85c3d8',
      color: 'white',
      ':hover': { backgroundColor: '#74b2c7' },
    },
  };

  const handleEliminar = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta cita?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/citas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCitas(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error("Error al eliminar cita:", error);
      alert("Error al eliminar cita");
    }
  };

  const handleEditar = (cita: Cita) => {
    setCitaEditando(cita);
    setForm({ fecha: cita.fecha, hora: cita.hora, estado: cita.estado });
  };

  const handleGuardarCambios = async () => {
    if (!citaEditando) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch<Cita>(
        `${process.env.REACT_APP_API_URL}/citas/${citaEditando._id}/reagendar`,
        { fecha: form.fecha, hora: form.hora },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCitas(prev => prev.map(c => (c._id === res.data._id ? res.data : c)));
      setCitaEditando(null);
    } catch (error: any) {
      console.error('Error al reagendar cita:', error);
      alert(error?.response?.data?.mensaje || 'Error al reagendar cita');
    }
  };

  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get<Cita[]>(
          `${process.env.REACT_APP_API_URL}/admin/citas`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCitas(res.data);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };
    obtenerCitas();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Administración de Citas</h1>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Paciente</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Hora</th>
              <th style={styles.th}>Terapeuta</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita._id}>
                <td style={styles.td}>{(cita.paciente as any)?.nombre || 'Desconocido'}</td>
                <td style={styles.td}>{cita.fecha}</td>
                <td style={styles.td}>{cita.hora}</td>
                <td style={styles.td}>{cita.terapeuta}</td>
                <td style={styles.td}>
                  <span style={styles.badge(cita.estado)}>{cita.estado}</span>
                </td>
                <td style={styles.td}>
                  <div style={styles.accionesCell}>
                    <button
                      style={{ ...styles.button, ...styles.editButton }}
                      onClick={() => handleEditar(cita)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.deleteButton }}
                      onClick={() => handleEliminar(cita._id)}
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {citaEditando && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Editar Cita</h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Fecha:</label>
              <input
                type="date"
                style={styles.input}
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Hora:</label>
              <input
                type="time"
                style={styles.input}
                value={form.hora}
                onChange={(e) => setForm({ ...form, hora: e.target.value })}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Estado:</label>
              <select
                style={styles.select}
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
              >
                <option value="pendiente">Pendiente</option>
                <option value="finalizada">Finalizada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            
            <div style={styles.modalActions}>
              <button 
                style={{ ...styles.button, ...styles.cancelButton }}
                onClick={() => setCitaEditando(null)}
              >
                Cancelar
              </button>
              <button
                style={{ ...styles.button, ...styles.saveButton }}
                onClick={handleGuardarCambios}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getEstadoStyle = (estado: string) => {
  switch(estado.toLowerCase()) {
    case 'pendiente':
      return { backgroundColor: '#fff0f5', color: '#d23669' };
    case 'finalizada':
      return { backgroundColor: '#e3f6f5', color: '#2d8f8d' };
    case 'cancelada':
      return { backgroundColor: '#ffe8e8', color: '#ff4757' };
    default:
      return {};
  }
};

export default AdminCitas;