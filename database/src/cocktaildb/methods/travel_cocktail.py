from datetime import datetime
from typing import Optional, List
from sqlalchemy.orm import Session

from cocktaildb.models.travel_cocktail import TravelCocktail


class TravelTravelCocktailRepo:
    @staticmethod
    def fetch_one_by_id(db: Session, search_id: int) -> Optional[TravelCocktail]:
        return db.query(TravelCocktail).get(search_id)


    @staticmethod
    def fetch_one_by_date(db: Session, dtime: int) -> Optional[TravelCocktail]:
        return db.query(TravelCocktail).filter_by(date=dtime).first()


    @staticmethod
    def fetch_one_by_latest(db: Session) -> Optional[TravelCocktail]:
        return db.query(TravelCocktail).order_by(TravelCocktail.date.desc()).first()


    @staticmethod
    def fetch_one_by_earliest(db: Session) -> Optional[TravelCocktail]:
        return db.query(TravelCocktail).order_by(TravelCocktail.date.asc()).first()


    @staticmethod
    def fetch_many_by_id(db: Session, start_id: int, max_results: int) -> List[TravelCocktail]:
        return db.query(TravelCocktail).filter(TravelCocktail.id < start_id).order_by(TravelCocktail.id.desc()).limit(max_results).all()

    
    @staticmethod
    def fetch_many_by_date(db: Session, start_time: datetime, max_results: int) -> List[TravelCocktail]:
        return db.query(TravelCocktail).filter(TravelCocktail.date < start_time).order_by(TravelCocktail.date.desc()).limit(max_results).all()

    
    @staticmethod
    def fetch_many_by_latest(db: Session, max_results: int) -> List[TravelCocktail]:
        return db.query(TravelCocktail).order_by(TravelCocktail.date.desc()).limit(max_results).all()

