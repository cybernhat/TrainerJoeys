from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    pokemon_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pokemon.id')), nullable=False)
    ability = db.Column(db.String(500), nullable=False)
    item = db.Column(db.String(500))
    nature = db.Column(db.String(500), nullable=False)
    game = db.Column(db.String(500), nullable=False)
    shiny = db.Column(db.Boolean)
    generation = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='products')
    pokemon = db.relationship('Pokemon', back_populates='products')
    reviews = db.relationship('Review', back_populates='product')
    cart_items = db.relationship('CartItem', back_populates='product')
    watchlists = db.relationship('Watchlist', back_populates='product')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pokemon_id": self.pokemon_id,
            "ability": self.ability,
            "item": self.item,
            "nature": self.nature,
            "game": self.game,
            "shiny": self.shiny,
            "price": self.price,
            "user": self.user.to_dict() if self.user else None,
            "pokemon": self.pokemon.to_dict() if self.pokemon else None,
            "reviews": [review.to_dict() for review in self.reviews],
            "cart_items": [cart_item.to_dict() for cart_item in self.cart_items],
            "watchlists": [watchlist.to_dict() for watchlist in self.watchlists]
        }
