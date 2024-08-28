from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Pokemon(db.Model):
    __tablename__ = 'pokemon'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    pokemon_img = db.Column(db.String(1000), nullable=False)
    type_1 = db.Column(db.String(55), nullable=False)
    type_2 = db.Column(db.String(55), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "pokemon_img": self.pokemon_img,
            "type_1": self.type_1,
            "type_2": self.type_2 if self.type_2 else None
        }

    products = db.relationship('Product', back_populates='pokemon')
