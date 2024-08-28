from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class WatchlistItem(db.Model):
    __tablename__ = "watchlist_items"

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("watchlists.id"), ondelete="CASCADE"),
        nullable=False,
    )
    product_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"),
        nullable=False,
    )

    watchlist = db.relationship("Watchlist", back_populates="watchlist_items")
    product = db.relationship("Product", back_populates="watchlist_items")
