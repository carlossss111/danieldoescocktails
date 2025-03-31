from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


DATE_REGEX = r"[0-9]{2}/[0-9]{2}/[0-9]{2}" #e.g. 01/02/03


class CocktailRequestHeaders(BaseModel):
    latest_date: Optional[datetime] = Field(None)
    search_term: Optional[str] = Field(None, min_length=3)
    

class CocktailRequestBody(BaseModel):
    pass


class CocktailDTO(BaseModel):
    id: int
    name: str
    image_path: str
    ingredients: List[str]
    description: str
    date: datetime


class CocktailResponse(BaseModel):
    cocktails: List[CocktailDTO]

