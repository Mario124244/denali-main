import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const TimesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 0.5rem;
`;

const HoraTag = styled.button<{ $seleccionado: boolean }>`
  padding: 0.5rem 0.75rem;
  background-color: ${({ $seleccionado }) => ($seleccionado ? '#38d9a9' : '#d3f9d8')};
  border: 1px solid #b2f2bb;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #63e6be;
  }
`;


const Title = styled.h2`
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const Button = styled.button`
  grid-column: 1 / -1;
  background: #667eea;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5a67d8;
  }

  &:disabled {
    background: #c3dafe;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ $type?: 'success' | 'error' | 'info' }>`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  background: ${({ $type }) => 
    $type === 'success' ? '#f0fff4' : 
    $type === 'error' ? '#fff5f5' : 
    '#f7fafc'};
  color: ${({ $type }) => 
    $type === 'success' ? '#2f855a' : 
    $type === 'error' ? '#c53030' : 
    '#2d3748'};
  border: 1px solid ${({ $type }) => 
    $type === 'success' ? '#c6f6d5' : 
    $type === 'error' ? '#fed7d7' : 
    '#e2e8f0'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AgendarCita: React.FC = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    hora: '',
    terapeuta: '',
  });

  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'success' | 'error' | 'info' }>({ texto: '', tipo: 'info' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const generarHorarios = (inicio = '08:00', fin = '19:00', intervalo = 60) => {
    const horarios: string[] = [];
    const [startHour, startMin] = inicio.split(':').map(Number);
    const [endHour, endMin] = fin.split(':').map(Number);
  
    let current = new Date();
    current.setHours(startHour, startMin, 0, 0);
  
    const end = new Date();
    end.setHours(endHour, endMin, 0, 0);
  
    while (current <= end) {
      const horastr = current.toTimeString().slice(0, 5);
      horarios.push(horastr);
      current.setMinutes(current.getMinutes() + intervalo);
    }
  
    return horarios;
  };
  
  const horariosDisponibles = generarHorarios(); // puedes usar estado para cambiar según la fecha
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensaje({ texto: '', tipo: 'info' });

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

      if (!pacienteRes.ok) throw new Error('Error al crear paciente');

      const paciente = await pacienteRes.json();

      // Paso 2: Agendar la cita
      const citaRes = await fetch(`${process.env.REACT_APP_API_URL}/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          paciente: paciente._id,
          fecha: form.fecha,
          hora: form.hora,
          terapeuta: form.terapeuta
        }),
      });

      if (citaRes.ok) {
        setMensaje({ texto: '✅ Cita agendada con éxito', tipo: 'success' });
        setForm({
          nombre: '',
          correo: '',
          telefono: '',
          fecha: '',
          hora: '',
          terapeuta: ''
        });
      } else {
        throw new Error('Error al agendar cita');
      }

    } catch (error) {
      console.error('Error:', error);
      setMensaje({ 
        texto: error instanceof Error ? `❌ ${error.message}` : '❌ Error inesperado',
        tipo: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Agendar Nueva Cita</Title>
      
      {mensaje.texto && (
        <Message $type={mensaje.tipo}>
          {mensaje.texto}
        </Message>
      )}

      <FormGrid onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Nombre del Paciente</Label>
          <Input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Correo Electrónico</Label>
          <Input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Teléfono</Label>
          <Input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Terapeuta</Label>
          <Input
            type="text"
            name="terapeuta"
            value={form.terapeuta}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Fecha</Label>
          <Input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <TimesGrid>
            {horariosDisponibles.map((hora) => (
              <HoraTag
                key={hora}
                onClick={() => setForm({ ...form, hora })}
                $seleccionado={form.hora === hora}
              >
                {hora}
              </HoraTag>
            ))}
          </TimesGrid>


        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Procesando...' : 'Agendar Cita'}
        </Button>
      </FormGrid>
    </Container>
  );
};

export default AgendarCita;