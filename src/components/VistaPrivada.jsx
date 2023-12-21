import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const VistaPrivada = () => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const verificarAutenticacion = async () => {
            try {
                const response = await axios.get('http://localhost:3000/privado', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    },
                });

                setUsuario(response.data);  

                if (!response.data || response.data.error) {
                    navigate('/inicio_sesion');
                }
            } catch (error) {
                console.error('Error al verificar autenticación:', error);
                navigate('/inicio_sesion');
            }
        };

        verificarAutenticacion();
    }, [location, navigate]);

    const cerrarSesion = async () => {
        try {
            const token = sessionStorage.getItem('accessToken');

            if (token) {
                await axios.post('http://localhost:3000/cerrar_sesion', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                sessionStorage.removeItem('accessToken');

                navigate('/');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Vista Privada</h2>
            {usuario ? (
                <>
                    <p>Bienvenido, {usuario.correo}.</p>
                    <button onClick={cerrarSesion} className="btn btn-danger">
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <p>
                    Usuario no autenticado. Por favor, <Link to="/inicio_sesion">inicia sesión</Link>.
                </p>
            )}
        </div>
    );
};

export default VistaPrivada;





