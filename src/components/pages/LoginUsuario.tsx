import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginUsuarioModule.css'

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { correo, contrasena }
      );

      const { usuario, token } = response.data;
      login(usuario, token);
      navigate('/inicio');
    } catch (error: any) {
      setError(error.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Bienvenido</h1>
          <p style={styles.subtitle}>Inicia sesión para continuar</p>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <div style={styles.passwordContainer}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button className="boton-login" type="submit" disabled={isLoading}>
            {isLoading ? <div style={styles.spinner}></div> : 'Iniciar Sesión'}
          </button>

        </form>

        <div style={styles.footer}>
          <a href="#recuperar" style={styles.link}>¿Olvidaste tu contraseña?</a>
          <p style={styles.signupText}>
            ¿No tienes cuenta? <a href="#registro" style={styles.link}>Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg,rgba(208, 181, 188, 0.66) 0%,rgba(120, 95, 190, 0.49) 100%)',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  title: {
    color: '#795fbe',
    fontSize: '28px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#99dacd',
    fontSize: '14px',
    margin: 0,
  },
  
  form: {
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    color: '#795fbe',
    fontSize: '14px',
    marginBottom: '8px',
    fontWeight: '500' as const,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #b1c5ed',
    fontSize: '14px',
    color: '#2D3748',
    transition: 'border-color 0.3s ease',
  },
  passwordContainer: {
    position: 'relative' as const,
  },
  passwordToggle: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#be9bd6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '48px',
  },
  
  spinner: {
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    animation: 'spin 1s linear infinite',
  },
  errorAlert: {
    backgroundColor: '#f8e56f',
    color: '#C53030',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  footer: {
    textAlign: 'center' as const,
  },
  link: {
    color: '#99dacd',
    textDecoration: 'none' as const,
    fontSize: '14px',
    fontWeight: '500' as const,
  },
  signupText: {
    color: '#99dacd',
    fontSize: '14px',
    margin: '15px 0 0 0',
  },
};

export default LoginUsuario;
