import logging
from typing import Optional, List
from datetime import datetime

from cocktaildb import ReadOnly, get_db
from cocktaildb.methods.travel_cocktail import TravelCocktailRepo

from models.travel_dto import TravelCocktailDTO


MAX_QUERY_RESULTS = 10


class TravelCocktailService:
    __logger = logging.getLogger(__module__)


    def __new__(cls):
        # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(TravelCocktailService, cls).__new__(cls)
        return cls.instance


    def get(self, start_date: Optional[datetime] = None) -> List[TravelCocktailDTO]:
        # Get models
        if start_date:
            with ReadOnly(get_db) as db:
                cocktail_orm_list = TravelCocktailRepo.fetch_many_by_date(db, start_date, MAX_QUERY_RESULTS)
        else:
            with ReadOnly(get_db) as db:
                cocktail_orm_list = TravelCocktailRepo.fetch_many_by_latest(db, MAX_QUERY_RESULTS)

        # Convert sqlalchemy ORM models into Pydantic DTOs
        cocktail_dto_list: List[TravelCocktailDTO] = []
        for cocktail_orm in cocktail_orm_list:
            dto = TravelCocktailDTO(
                    id = cocktail_orm.id,
                    name = cocktail_orm.name,
                    image_path = cocktail_orm.image_path,
                    location = cocktail_orm.location,
                    description = cocktail_orm.description,
                    date = cocktail_orm.date
            )
            cocktail_dto_list.append(dto)

        return cocktail_dto_list

    def is_last(self, cocktail: TravelCocktailDTO) -> bool:
        earliest_cocktail = None
        with ReadOnly(get_db) as db:
            earliest_cocktail = TravelCocktailRepo.fetch_one_by_earliest(db)

        if earliest_cocktail and str(earliest_cocktail.date) == cocktail.date.strftime("%Y-%m-%d"):
            return True
        return False
 
