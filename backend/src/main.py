import os

import uvicorn
from fastapi import FastAPI

from routes.cocktail_route import CocktailRouter


app = FastAPI()

cocktail_router = CocktailRouter()
app.include_router(cocktail_router.router)

HOST=os.environ.get("HOST_IP", default="0.0.0.0")
PORT=os.environ.get("HOST_PORT", default=5000)


@app.get("/")
def default_endpoint():
    return {"status": "OK"}


@app.get("/ping")
def ping_endpoint():
    return {"status": "OK"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, log_level="info")

