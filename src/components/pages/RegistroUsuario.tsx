import React, { useState } from 'react';

const RegistroUsuario: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita que recargue la página

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/register`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          correo,
          password
        })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("✅ Usuario creado:", data);
      alert("Registro exitoso 🚀");

    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error al registrarse");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#b1c5ed'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
        margin: '20px'
      }}>
        <h2 style={{
          color: '#795fbe',
          marginBottom: '2rem',
          textAlign: 'center',
          fontSize: '1.8rem',
          fontWeight: '600'
        }}>Crear Cuenta</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#795fbe',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Nombre completo</label>
          <input
            style={{
              width: '100%',
              padding: '0.8rem 1.2rem',
              border: '2px solid #99dacd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
            }}
            type="text"
            placeholder="Ej: Juan Pérez"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{display: 'block',
            color: '#795fbe',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'}}>Correo electrónico</label>
          <input
            style={{width: '100%',
              padding: '0.8rem 1.2rem',
              border: '2px solid #99dacd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',}}
            type="email"
            placeholder="Ej: juan@correo.com"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{display: 'block',
            color: '#795fbe',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'}}>Contraseña</label>
          <input
            style={{width: '100%',
              padding: '0.8rem 1.2rem',
              border: '2px solid #99dacd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',}}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#795fbe',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            
          }}
        >
          Registrarse
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#795fbe',
          fontSize: '0.9rem'
        }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: '#f5a0b5', textDecoration: 'none' }}>Inicia Sesión</a>
        </p>
      </form>
    </div>
  );
};

export default RegistroUsuario;
