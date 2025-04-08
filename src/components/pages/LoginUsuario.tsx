import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅

interface LoginResponse {
  usuario: {
    id: string;
    nombre: string;
    correo: string;
  };
  token: string;
}

const LoginUsuario: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ Aquí extraemos login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>('http://localhost:4000/api/auth/login', {
        correo,
        contrasena,
      });

      const { usuario, token } = response.data;

      // ✅ Esto actualiza el contexto global y el menú se re-renderiza
      login(usuario, token);

      navigate('/inicio');

    } catch (error: any) {
      setError(error.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginUsuario;
