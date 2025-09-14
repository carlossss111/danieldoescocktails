import logging
from typing import Optional, List
from datetime import datetime

from cocktaildb import ReadOnly, get_db
from cocktaildb.methods.cocktail import CocktailRepo

from models.cocktail_dto import CocktailDTO


MAX_QUERY_RESULTS = 10


class CocktailService:
    __logger = logging.getLogger(__module__)


    def __new__(cls):
        # Singleton
        if not hasattr(cls, 'instance'):
            cls.instance = super(CocktailService, cls).__new__(cls)
        return cls.instance


    def get(self, start_date: Optional[datetime] = None, search_term: Optional[str] = None) -> List[CocktailDTO]:
        # Get models
        if start_date and search_term:
            with ReadOnly(get_db) as db:
                cocktail_orm_list = CocktailRepo.fetch_many_by_date_with_words_like(db, start_date, search_term, MAX_QUERY_RESULTS)
        elif start_date:
            with ReadOnly(get_db) as db:
                cocktail_orm_list = CocktailRepo.fetch_many_by_date(db, start_date, MAX_QUERY_RESULTS)
        elif search_term:
            with ReadOnly(get_db) as db:
                cocktail_orm_list = CocktailRepo.fetch_many_by_latest_with_words_like(db, search_term, MAX_QUERY_RESULTS)
        else:
            with ReadOnly(get_db) as db:
                cocktail_orm_list = CocktailRepo.fetch_many_by_latest(db, MAX_QUERY_RESULTS)

        # Convert sqlalchemy ORM models into Pydantic DTOs
        cocktail_dto_list: List[CocktailDTO] = []
        for cocktail_orm in cocktail_orm_list:
            dto = CocktailDTO(
                    id = cocktail_orm.id,
                    name = cocktail_orm.name,
                    image_path = cocktail_orm.image_path,
                    ingredients = cocktail_orm.ingredients,
                    description = cocktail_orm.description,
                    date = cocktail_orm.date
            )
            cocktail_dto_list.append(dto)

        return cocktail_dto_list


    def is_last(self, cocktail: CocktailDTO, search_term: Optional[str] = None) -> bool:
        earliest_cocktail = None
        if search_term:
            with ReadOnly(get_db) as db:
                earliest_cocktail = CocktailRepo.fetch_one_by_earliest_with_words_like(db, search_term)
        else:
            with ReadOnly(get_db) as db:
                earliest_cocktail = CocktailRepo.fetch_one_by_earliest(db)

        if earliest_cocktail and str(earliest_cocktail.date) == cocktail.date.strftime("%Y-%m-%d"):
            return True
        return False
    
