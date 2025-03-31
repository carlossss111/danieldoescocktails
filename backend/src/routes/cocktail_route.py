import logging
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, HTTPException, Header
from models.cocktail_dto import CocktailRequestHeaders, CocktailResponse
from services.cocktail_service import CocktailService


class CocktailRouter:
    __logger = logging.getLogger(__module__)

    def __new__(cls): # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(CocktailRouter, cls).__new__(cls)
        return cls.instance


    def __init__(self):
        self._router = APIRouter()
        self._router.add_api_route("/cocktails", self.route_get_cocktails, methods=["GET"])
        self._cocktail_service = CocktailService()


    @property
    def router(self):
        return self._router


    def route_get_cocktails(self, headers: Annotated[CocktailRequestHeaders, Header()]) -> CocktailResponse:
        self.__logger.info("Received headers: %s", str(headers))
        
        try:
            cocktails = self._cocktail_service.get(headers.latest_date)
            response = CocktailResponse(cocktails=cocktails)
        except Exception as e:
            self.__logger.error("Error getting Cocktails from DB: (%s)", e)
            raise HTTPException(500, "Failed to fetch cocktails due to backend programming error.")

        self.__logger.info("Returned response: %s", str(headers))
        return response
            
