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
        
        start_date = None
        try:
            if headers.latest_date:
                century_in = datetime.today().year // 100
                day_in = int(headers.latest_date.split('/')[0]) + 1
                month_in = int(headers.latest_date.split('/')[1])
                year_in = int(headers.latest_date.split('/')[2]) + (century_in * 100)
                start_date = datetime(day=day_in, month=month_in, year=year_in)
        except Exception as e:
            self.__logger.error("Error getting Date from request: (%s)", e)
            raise HTTPException(400, "Failed to parse the date from the request header.")

        try:
            cocktails = self._cocktail_service.get(start_date)
            response = CocktailResponse(cocktails=cocktails)
        except Exception as e:
            self.__logger.error("Error getting Cocktails from DB: (%s)", e)
            raise HTTPException(500, "Failed to fetch cocktails due to backend programming error.")

        self.__logger.info("Returned response: %s", str(headers))
        return response
            
