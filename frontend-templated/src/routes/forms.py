import logging
from typing import Optional
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
logger.setLevel(logging.DEBUG)


def render_failure(response: Optional[requests.Response] = None) -> str:
    if response is None:
        error_msg = "No reply from backend."
    else:
        error_msg = response.text
    return render_template(SUMMARY_PAGE, status_heading="Failed to add Cocktail!", 
                           status_text=f"Error message: {error_msg}", status_style_class="action_fail")

def render_success() -> str:
        return render_template(SUMMARY_PAGE, status_heading="Cocktail Added!", 
                               status_text="", status_style_class="action_success")


@app.route("/create", methods=["GET","POST"])
def add_cocktail() -> str:
    form = AddCocktailForm(request.form)
    logger.info("Visited /create page")

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
            return render_template(ADD_PAGE, form=form)
        
        # Save image to file
        try:
            res = requests.put(f"{BACKEND_URI}/{BACKEND_PREFIX}/images", files={
                "file": (image_fp.filename, image_fp.stream)
                }, stream=True)

            logger.debug("Sent image PUT request and received: %s", res.content)
            if res is None or not res.ok:
                return render_failure(res)
        except Exception as e:
            logger.error(e)
            return render_failure()

        # Save details to database
        try:
            res = requests.put(f"{BACKEND_URI}/{BACKEND_PREFIX}/cocktails", json={
                "name": form.name.data,
                "image_path": f"{IMAGE_PREFIX}{image_fp.filename}",
                "ingredients": form.ingredients.data.split("\n"),
                "description": form.description.data,
                "date": str(form.date.data)
                }, headers={"content-type":"application/json"})

            logger.debug("Sent cocktail details PUT request and received: %s", res.content)
            if res is None or not res.ok:
                return render_failure(res)
        except Exception as e:
            print(e)
            logger.error(e)
            return render_failure()

        # Done
        return render_success()

    raise HTTPException("Endpoint only allows GET or POST requests", Response(status=405))

