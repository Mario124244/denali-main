import React, { useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Trae el usuario y logout desde el contexto
  const { usuario, logout } = useAuth();
  const isAuthenticated = !!usuario;

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="letter letter1">d</span>
        <span className="letter letter2">e</span>
        <span className="letter letter3">n</span>
        <span className="letter letter4">a</span>
        <span className="letter letter5">l</span>
        <span className="letter letter6">i</span>
        <span className="sub">Centro Terapeútico</span>
      </div>

      {/* Hamburguesa */}
      <div className="menu-icon" onClick={toggleMenu}>☰</div>

      {/* Menú completo */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/informacion">Información</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/about">Paquetes</Link></li>
        <li><Link to="#">Redes</Link></li>

        {!isAuthenticated && (
          <>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
          </>
        )}

        {isAuthenticated && (
          <>
          <li>
              <Link to="/mis-citas">Mis Citas</Link>
            </li>
            <li>
              <Link to="/contact" className="btn-appointment btn-cita">Agendar Cita</Link>
            </li>
            <li>
              <button className="btn-appointment2" onClick={logout}>Cerrar sesión</button>
            </li>
            

          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
