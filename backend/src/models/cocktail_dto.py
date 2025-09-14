from datetime import datetime
from typing import List

from pydantic import BaseModel


class CocktailDTO(BaseModel):
    id: int = -1
    name: str
    image_path: str
    ingredients: List[str]
    description: str
    date: datetime = datetime.now()


class CocktailResponse(BaseModel):
     cocktails: list[CocktailDTO]
     is_last: bool

