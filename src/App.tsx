import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ SOLO importamos AuthProvider aquí
import Menu from './components/layout/menu';
import AppRoutes from './AppRoutes'; // 👈 Nuevo archivo con las rutas

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Menu />
          <AppRoutes /> {/* ⛳ useAuth() solo se usa dentro de este componente */}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
