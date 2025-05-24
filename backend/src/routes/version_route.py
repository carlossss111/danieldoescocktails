import os

from fastapi import APIRouter


class VersionRouter:
    def __new__(cls): # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(VersionRouter, cls).__new__(cls)
        return cls.instance


    def __init__(self):
        self._router = APIRouter()
        self._router.add_api_route("/version", self.route_get_version, methods=["GET"])


    @property
    def router(self):
        return self._router


    def route_get_version(self) -> str:
        version = os.environ.get("VERSION","Unknown version")
        return version

