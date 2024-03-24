from flask import Flask


def create_app():
    app = Flask(__name__)
    app.secret_key = 'dc-2ic93mfvkw'

    
    # Import blueprints
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app

