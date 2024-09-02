from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class WatchlistItem(db.Model):
    __tablename__ = "watchlist_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'product_id': self.product_id,
            'product': self.product.to_dict() if self.product else None
        }
