from datetime import datetime
from typing import Optional, List
from sqlalchemy.orm import Session

from cocktaildb.models.cocktail import Cocktail


class CocktailRepo:
    @staticmethod
    def fetch_one_by_id(db: Session, search_id: int) -> Optional[Cocktail]:
        return db.query(Cocktail).get(search_id)


    @staticmethod
    def fetch_one_by_date(db: Session, dtime: int) -> Optional[Cocktail]:
        return db.query(Cocktail).filter_by(date=dtime).first()


    @staticmethod
    def fetch_one_by_latest(db: Session) -> Optional[Cocktail]:
        return db.query(Cocktail).order_by(Cocktail.date.desc()).first()


    @staticmethod
    def fetch_many_by_id(db: Session, start_id: int, max_results: int) -> List[Cocktail]:
        return db.query(Cocktail).filter(Cocktail.id <= start_id).order_by(Cocktail.id.desc()).limit(max_results).all()

    
    @staticmethod
    def fetch_many_by_date(db: Session, start_time: datetime, max_results: int) -> List[Cocktail]:
        return db.query(Cocktail).filter(Cocktail.date <= start_time).order_by(Cocktail.date.desc()).limit(max_results).all()

    
    @staticmethod
    def fetch_many_by_latest(db: Session, max_results: int) -> List[Cocktail]:
        return db.query(Cocktail).order_by(Cocktail.date.desc()).limit(max_results).all()

