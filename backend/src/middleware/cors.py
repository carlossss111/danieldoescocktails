from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:5000",
    "http://danieldoescocktails.com",
    "http://danieldoescocktails.com:5000",
    "http://www.danieldoescocktails.com",
    "http://www.danieldoescocktails.com:5000"
]

def add_cors_headers(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

