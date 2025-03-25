import sqlalchemy as db
from cocktaildb import Base

class Cocktails(Base):
    __tablename__ = "cocktails"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    image_path = db.Column(db.String(256), nullable=False)
    ingredients = db.Column(db.String(1024), nullable=False)
    description = db.Column(db.String(1024), nullable=False)
    date = db.Column(db.DateTime(timezone=False), nullable=False)

