import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/layout/menu';
import Inicio from './components/pages/Inicio';
import About from './components/pages/About';
import AgendarCitaGrupo from './components/pages/AgendarCita';
import AgendarCitaServicio from './components/pages/AgendarServicio';
import './App.css';
import Informacion from './components/pages/Informacion';
import RegistroUsuario from './components/pages/RegistroUsuario';
import LoginUsuario from './components/pages/LoginUsuario';
import { AuthProvider } from './context/AuthContext'; // ✅
import MisCitas from './components/pages/MisCitas';

const App: React.FC = () => {
  return (
    <AuthProvider> {/* ✅ Aquí envuelves TODO */}
      <Router>
        <div className="App">
          <Menu />
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
