import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

CORS_ENV = "CORS-ALLOW-ORIGINS"

def add_cors_headers(app: FastAPI):
    if not (origins := os.environ.get(CORS_ENV)):
        raise RuntimeError("Could not load CORS environment variables.") # (unrecoverable)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

