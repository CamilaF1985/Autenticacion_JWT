import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <h1>Bienvenido a la Aplicación de Autenticación</h1>
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Formulario de Registro</h5>
              <p className="card-text">Regístrate para acceder a la aplicación.</p>
              <Link to="/registro" className="btn btn-primary">
                Registro
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Formulario de Inicio de Sesión</h5>
              <p className="card-text">Inicia sesión si ya tienes una cuenta.</p>
              <Link to="/inicio_sesion" className="btn btn-success">
                Inicio de Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


