from flask import render_template
from __init__ import app

from routes import forms 


INDEX_PAGE = "index.html"


@app.route("/")
def index():
    return render_template(INDEX_PAGE)

