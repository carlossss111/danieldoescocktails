import logging
from flask import request, render_template
from werkzeug import Response
from werkzeug.datastructures import FileStorage
from werkzeug.exceptions import HTTPException
import requests

from __init__ import app
from models.add_form import AddCocktailForm
from config.config import BACKEND_URI, BACKEND_PREFIX, IMAGE_PREFIX


ADD_PAGE = "add.html"
SUMMARY_PAGE = "summary.html"

logger = logging.getLogger(__name__)


@app.route("/add_cocktail", methods=["GET","POST"])
def add_cocktail():
    form = AddCocktailForm(request.form)
    logger.info("Visited /add_cocktail page")

    if request.method == "GET":
        return render_template(ADD_PAGE, form=form)

    elif request.method == "POST":
        # Prepare to send to backend
        image_fp: FileStorage = request.files[form.image.name]
        logger.info("Adding cocktail: <%s, %s, %s, %s, %s>",
                    form.name.data,
                    image_fp.filename,
                    form.ingredients.data,
                    form.description.data,
                    form.date.data)

        if form.ingredients.data is None:
            raise HTTPException("Ingredients expected.", Response(status=400))
        
        # Save image to file
        res = requests.put(f"{BACKEND_URI}/{BACKEND_PREFIX}/images", files={
            "file": (image_fp.filename, image_fp.stream)
            }, stream=True)

        logger.debug("Sent image PUT request and received: %s", res.content)
        if res is None or not res.ok:
            raise HTTPException("Failed to upload Image.", Response(status=500))

        # Save details to database
        requests.put(f"{BACKEND_URI}/{BACKEND_PREFIX}/cocktails", json={
            "name": form.name.data,
            "image_path": f"{IMAGE_PREFIX}{image_fp.filename}",
            "ingredients": form.ingredients.data.split("\n"),
            "description": form.description.data,
            "date": str(form.date.data)
            }, headers={"content-type":"application/json"})

        logger.debug("Sent cocktail details PUT request and received: %s", res.content)
        if res is None or not res.ok:
            raise HTTPException("Failed to add cocktail.", Response(status=500))

        # Done
        return render_template(SUMMARY_PAGE)

    raise HTTPException("Endpoint only allows GET or POST requests", Response(status=405))

