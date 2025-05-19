import logging
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, HTTPException
from models.travel_dto import TravelCocktailResponse
from services.travel_service import TravelCocktailService


class TravelCocktailRouter:
    __logger = logging.getLogger(__module__)

    def __new__(cls): # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(TravelCocktailRouter, cls).__new__(cls)
        return cls.instance


    def __init__(self):
        self._router = APIRouter()
        self._router.add_api_route("/travel", self.route_get_cocktails, methods=["GET"])
        self._cocktail_service = TravelCocktailService()


    @property
    def router(self):
        return self._router


    def route_get_cocktails(self, latest_date: Optional[datetime] = None) -> TravelCocktailResponse:
        self.__logger.info("Received param: %s", str(latest_date))
        
        try:
            cocktails = self._cocktail_service.get(latest_date)
            if cocktails:
                is_last = self._cocktail_service.is_last(cocktails[-1])
            else:
                is_last = True
        except Exception as e:
            self.__logger.error("Error getting Travel Cocktails from DB: (%s)", e)
            raise HTTPException(500, "Failed to fetch travel cocktails due to backend programming error.")

        self.__logger.info("Returned response: %s", str(cocktails)[0:50])
        return TravelCocktailResponse(cocktails=cocktails, is_last=is_last)
            
