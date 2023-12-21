import json
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import re

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['SECRET_KEY'] = 'llave_secreta'
app.config['JWT_SECRET_KEY'] = 'jwt_secreto'
CORS(app, supports_credentials=True)
jwt = JWTManager(app)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

# Archivos para almacenar la información de usuarios y tokens
ARCHIVO_USUARIOS = 'users.json'
ARCHIVO_TOKENS = 'tokens.json'

def cargar_usuarios():
    try:
        with open(ARCHIVO_USUARIOS, 'r') as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        return []

def guardar_usuarios(usuarios):
    with open(ARCHIVO_USUARIOS, 'w', encoding='utf-8') as archivo:
        json.dump(usuarios, archivo, ensure_ascii=False)

def cargar_tokens():
    try:
        with open(ARCHIVO_TOKENS, 'r') as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        return []

def guardar_token_en_archivo(correo, access_token):
    try:
        tokens = cargar_tokens()
        token_info = {'correo': correo, 'access_token': access_token}
        tokens.append(token_info)
        with open(ARCHIVO_TOKENS, 'w', encoding='utf-8') as archivo:
            json.dump(tokens, archivo, ensure_ascii=False)
    except Exception as e:
        print(f'Error al guardar el token en el archivo: {str(e)}')

def eliminar_token_de_archivo(correo):
    try:
        tokens = cargar_tokens()
        tokens = [token for token in tokens if token['correo'] != correo]
        with open(ARCHIVO_TOKENS, 'w', encoding='utf-8') as archivo:
            json.dump(tokens, archivo, ensure_ascii=False)
    except Exception as e:
        print(f'Error al eliminar el token del archivo: {str(e)}')

# Ruta para obtener información de todos los usuarios en formato JSON
@app.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = cargar_usuarios()
    return jsonify(usuarios)

# Ruta para limpiar la información de usuarios
@app.route('/limpiar_usuarios', methods=['DELETE'])
def limpiar_usuarios():
    usuarios = []
    guardar_usuarios(usuarios)
    return jsonify({'mensaje': 'Datos de usuarios limpiados exitosamente'})

# Ruta para el formulario de registro
@app.route('/registro', methods=['POST'])
def registro():
    datos_registro = request.json

    correo = datos_registro.get('correo')
    password = datos_registro.get('password')

    # Validar que los campos no estén vacíos
    if not correo or not password:
        return jsonify({'error': 'Correo y contraseña son obligatorios'})

    # Validar que la contraseña no contenga espacios ni caracteres especiales
    if not re.match("^[a-zA-Z0-9_]*$", password):
        return jsonify({'error': 'La contraseña no puede contener espacios ni caracteres especiales'})

    usuarios = cargar_usuarios()

    if any(usuario['correo'] == correo for usuario in usuarios):
        return jsonify({'error': 'El correo ya está registrado'})

    # Encriptar la contraseña antes de almacenarla
    hashed_password = generate_password_hash(password)
    usuario = {'correo': correo, 'password': hashed_password}
    usuarios.append(usuario)

    guardar_usuarios(usuarios)
    access_token = create_access_token(identity=correo)
    guardar_token_en_archivo(correo, access_token)
    return jsonify({'mensaje': 'Registro exitoso', 'access_token': access_token, 'redirect_url': '/'})

# Ruta para el formulario de inicio de sesión
@app.route('/inicio_sesion', methods=['POST'])
def inicio_sesion():
    datos_inicio_sesion = request.json

    correo = datos_inicio_sesion.get('correo')
    password = datos_inicio_sesion.get('password')

    usuarios = cargar_usuarios()

    for usuario in usuarios:
        if usuario['correo'] == correo and check_password_hash(usuario['password'], password):
            access_token = create_access_token(identity=correo)
            print(f'Token creado para el usuario {correo}: {access_token}')
            return jsonify({'mensaje': 'Inicio de sesión exitoso', 'usuario': usuario, 'access_token': access_token})

    return jsonify({'error': 'Credenciales incorrectas'}), 401

# Ruta privada protegida con token
@app.route('/privado', methods=['GET'])
@jwt_required()
def privado():
    correo = get_jwt_identity()
    usuarios = cargar_usuarios()
    usuario = next((user for user in usuarios if user['correo'] == correo), None)

    if usuario:
        return jsonify(usuario)
    return jsonify({'error': 'Usuario no autenticado'})

# Ruta para cerrar sesión
@app.route('/cerrar_sesion', methods=['POST', 'GET'])
@jwt_required()
def cerrar_sesion():
    try:
        correo = get_jwt_identity()
        eliminar_token_de_archivo(correo)
        print('Token eliminado exitosamente')

        return jsonify({'mensaje': 'Sesión cerrada exitosamente'})
    except Exception as e:
        print(f'Error al cerrar sesión: {str(e)}')
        return jsonify({'error': 'Error al cerrar sesión'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)















