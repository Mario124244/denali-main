import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // ✅ Aquí sí puedes usarlo

import Inicio from './components/pages/Inicio';
import About from './components/pages/About';
import AgendarCitaGrupo from './components/pages/AgendarCita';
import AgendarCitaServicio from './components/pages/AgendarServicio';
import Informacion from './components/pages/Informacion';
import RegistroUsuario from './components/pages/RegistroUsuario';
import LoginUsuario from './components/pages/LoginUsuario';
import MisCitas from './components/pages/MisCitas';
import ContactSection from './components/pages/redes';
import AdminCitas from './components/pages/AdminCitas';

const AppRoutes: React.FC = () => {
  const { usuario } = useAuth(); // ✅ sin errores aquí

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/about" element={<About />} />
      <Route path="/agendar-grupo" element={<AgendarCitaGrupo />} />
      <Route path="/agendar-servicio" element={<AgendarCitaServicio />} />
      <Route path="/informacion" element={<Informacion />} />
      <Route path="/registro" element={<RegistroUsuario />} />
      <Route path="/login" element={<LoginUsuario />} />
      <Route path="/mis-citas" element={<MisCitas />} />
      <Route path="/redes" element={<ContactSection />} />

      {/* Solo admins ven esta ruta */}
      {usuario?.rol === 'admin' && (
        <Route path="/admin/citas" element={<AdminCitas />} />
      )}

      {/* Redirección opcional */}
      {!usuario?.rol && (
        <Route path="/admin/citas" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
