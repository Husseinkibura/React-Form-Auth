from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/react_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

# Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Create tables
@app.before_first_request
def create_tables():
    db.create_all()

# Register route
@app.route('/sign-up', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Check if all required fields are provided
    if not first_name or not last_name or not email or not password:
        return jsonify({"error": "Please provide all required fields"}), 400

    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user instance
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)

    # Save the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Create an access token
    # access_token = create_access_token(identity=email)

    # Return the access token
    # return jsonify({"access_token": access_token}), 201

    return jsonify({"message": "<span style='background-color: green; color: white;'>User created successfully</span>"}), 201


# Login route
@app.route('/sign-in', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        return jsonify({"access_token": access_token, "message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
