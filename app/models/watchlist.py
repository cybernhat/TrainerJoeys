from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='watchlist')
    product = db.relationship('Product', back_populates='watchlists')
    watchlist_items = db.relationship('WatchlistItem', back_populates='watchlist')
