import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';


// Crear la raíz del DOM
const root = ReactDOM.createRoot(
  
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);

// Medir el rendimiento (opcional)
reportWebVitals();
