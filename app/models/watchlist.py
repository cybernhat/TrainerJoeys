from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    user = db.relationship("User", back_populates="watchlist")
    watchlist_items = db.relationship("WatchlistItem", back_populates="watchlist")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "watchlist_products": [
                item.product.to_dict() if item.product else None
                for item in self.watchlist_items
            ],
        }
