from flask import Flask
from flask_cors import CORS
from routes import api_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == "__main__":
    print("🚀 Flask Server running on http://localhost:5000")
    app.run(debug=True, port=5000)
