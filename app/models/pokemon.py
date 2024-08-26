from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Pokemon(db.Model):
    __tablename__ = 'pokemon'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=false)
    generation = db.Column(db.String(500), nullable=false)
    pokemon_img = db.Column(db.String(1000), nullable=false)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "generation": self.generation,
            "pokemon_img": self.pokemon_img
        }

    products = db.relationship('Product', back_populates='pokemon')
    
