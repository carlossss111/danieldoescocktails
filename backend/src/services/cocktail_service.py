from typing import Optional, List
from datetime import datetime

from cocktaildb import ReadOnly, get_db
from cocktaildb.methods.cocktail import CocktailRepo

from models.cocktail_dto import CocktailDTO


MAX_QUERY_RESULTS = 10


class CocktailService:
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
                    ingredients = [word for word in cocktail_orm.ingredients.split('/')],
                    description = cocktail_orm.description,
                    date = cocktail_orm.date
            )
            cocktail_dto_list.append(dto)

        return cocktail_dto_list

