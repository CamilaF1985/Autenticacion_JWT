import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  correo: Yup.string().email('Ingresa una dirección de correo válida').required('El correo es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .matches(/^\S*$/, 'La contraseña no puede contener espacios')
    .matches(/^[a-zA-Z0-9]*$/, 'La contraseña solo puede contener letras y números'),
});

const FormularioRegistro = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      correo: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/registro', {
          correo: values.correo,
          password: values.password,
        });

        console.log(response.data);

        if (response.data.redirect_url) {
          formik.resetForm();
          formik.setStatus({ success: 'Registro exitoso' });

          setTimeout(() => {
            navigate(response.data.redirect_url);
          }, 2000);
        } else {
          console.log('Registro exitoso, pero no se proporcionó una URL de redirección');
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);

        formik.setStatus({ error: 'Error al registrar usuario. Verifica tus credenciales.' });
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2>Formulario de Registro</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className={`form-control ${formik.touched.correo && formik.errors.correo ? 'is-invalid' : ''}`}
            id="correo"
            {...formik.getFieldProps('correo')}
            placeholder="Ingresa tu dirección de correo"
          />
          {formik.touched.correo && formik.errors.correo && (
            <div className="invalid-feedback">{formik.errors.correo}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            id="password"
            {...formik.getFieldProps('password')}
            placeholder="Ingresa una contraseña, sin espacios ni caracteres especiales"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>
        {formik.status && formik.status.error && (
          <div className="alert alert-danger">{formik.status.error}</div>
        )}
        {formik.status && formik.status.success && (
          <div className="alert alert-success">{formik.status.success}</div>
        )}
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
















