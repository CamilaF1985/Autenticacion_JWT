import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormularioInicioSesion = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/inicio_sesion', {
        correo,
        password,
      });

      console.log(response.data);

      if (response.data.usuario) {
        setSuccess('Inicio de sesión exitoso');

        sessionStorage.setItem('accessToken', response.data.access_token);

        setTimeout(() => {
          console.log('Redireccionando...');
          navigate('/privado', { state: { usuario: response.data.usuario } });
        }, 1000);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data?.error || 'Error desconocido');
      setError('Credenciales incorrectas');
    }
  };

  console.log('Renderizando FormularioInicioSesion');

  return (
    <div className="container mt-5">
      <h2>Formulario de Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            type="text"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default FormularioInicioSesion;











