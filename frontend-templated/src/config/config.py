import os

BACKEND_URI: str = os.environ.get("BACKEND_URI", "http://backend:5000")
BACKEND_PREFIX: str = os.environ.get("BACKEND_PREFIX", "protected")
IMAGE_PREFIX: str = os.environ.get("IMAGE_PREFIX", "./images/")

