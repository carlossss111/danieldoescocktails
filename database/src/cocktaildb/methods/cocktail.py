from typing import Optional
from sqlalchemy.orm import Session

from cocktaildb.models.cocktail import Cocktails

def fetch_one(db: Session, search_id: int) -> Optional[Cocktails]:
    return db.query(Cocktails).filter_by(id=search_id).first()

