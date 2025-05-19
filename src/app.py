from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['JWT_SECRET_KEY'] = 'tu_clave_secreta'  # cámbiala
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Modelo de Usuario
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, pw):
        self.password_hash = bcrypt.generate_password_hash(pw).decode()

    def check_password(self, pw):
        return bcrypt.check_password_hash(self.password_hash, pw)

# Crear la BD
with app.app_context():
    db.create_all()

# Registro
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "El email ya existe"}), 400
    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado"}), 201

# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"msg": "Credenciales inválidas"}), 401
    token = create_access_token(identity=user.id)
    return jsonify({"access_token": token}), 200

# Ruta protegida (para debug)
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    return jsonify({"msg": f"Hola usuario {user_id}"}), 200

if __name__ == '__main__':
    app.run(debug=True)
