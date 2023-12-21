import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import FormularioRegistro from '../components/FormularioRegistro';
import FormularioInicioSesion from '../components/FormularioInicio';
import VistaPrivada from '../components/VistaPrivada';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/registro" element={<FormularioRegistro />} />
      <Route path="/inicio_sesion" element={<FormularioInicioSesion />} />
      <Route path="/privado" element={<VistaPrivada />} />
    </Routes>
  );
}

export default AppRoutes;



