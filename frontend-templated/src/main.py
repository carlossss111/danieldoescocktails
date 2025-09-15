from __init__ import app

from routes import forms 


@app.route("/")
def index():
    return "Root page"

