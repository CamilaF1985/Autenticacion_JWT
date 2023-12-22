# Autenticación JWT

La API de Autenticación JWT (JSON Web Token) es un servicio diseñado para gestionar la autenticación de usuarios mediante tokens seguros. Utiliza el estándar JWT para la emisión y verificación de tokens, permitiendo a los usuarios registrarse, iniciar sesión, y acceder a rutas protegidas mediante la autenticación.

## Requisitos

Asegúrate de tener las siguientes versiones de herramientas instaladas en tu sistema antes de ejecutar la aplicación:

- **Python:** La aplicación requiere Python 3.12.1 o superior.

- **Node.js:** El frontend de la aplicación está desarrollado en React y requiere Node.js. La versión recomendada es v18.18.0.

- **npm:** El administrador de paquetes de Node.js es necesario para instalar las dependencias del frontend. La versión recomendada es 9.8.1.

Asegúrate de tener estas versiones instaladas correctamente antes de seguir con las instrucciones de uso.

## Tecnologías Utilizadas

- **Backend:**
  - Flask
  - Flask-RESTful
  - Flask-CORS
  - Werkzeug
  - JWT (JSON Web Token)

- **Frontend:**
  - React
  - Axios (para realizar solicitudes HTTP)

## Instrucciones de Uso

### 1. Clonar el Repositorio

git clone https://github.com/CamilaF1985/Autenticacion_JWT.git<br>
cd Autenticacion_JWT

### 3. Instalar Dependencias del Frontend

npm install

### 4. Ejecutar la Aplicación

El siguiente comando iniciará tanto el backend como el frontend, e instalará las dependencias del backend:

npm start

## Notas Adicionales

- La API utiliza el cifrado hash para almacenar contraseñas de forma segura.
- Se proporciona una capa de seguridad adicional mediante la expiración de tokens JWT.
