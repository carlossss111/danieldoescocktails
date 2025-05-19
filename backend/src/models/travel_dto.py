from datetime import datetime

from pydantic import BaseModel


class TravelCocktailDTO(BaseModel):
    id: int
    name: str
    image_path: str
    location: str
    description: str
    date: datetime


class TravelCocktailResponse(BaseModel):
     cocktails: list[TravelCocktailDTO]
     is_last: bool

