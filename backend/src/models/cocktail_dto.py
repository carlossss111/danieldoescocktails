from datetime import datetime
from typing import List

from pydantic import BaseModel


class CocktailDTO(BaseModel):
    id: int
    name: str
    image_path: str
    ingredients: List[str]
    description: str
    date: datetime


class CocktailResponse(BaseModel):
     cocktails: list[CocktailDTO]
     is_last: bool

