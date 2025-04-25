import logging
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from models.cocktail_dto import CocktailDTO
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


    def route_get_cocktails(self, latest_date: Optional[datetime] = None, 
                            search_term: Optional[str] = None) -> List[CocktailDTO]:
        self.__logger.info("Received params: %s, %s", str(latest_date), str(search_term))
        
        try:
            cocktails = self._cocktail_service.get(latest_date, search_term)
        except Exception as e:
            self.__logger.error("Error getting Cocktails from DB: (%s)", e)
            raise HTTPException(500, "Failed to fetch cocktails due to backend programming error.")

        self.__logger.info("Returned response: %s", str(cocktails))
        return cocktails 
            
