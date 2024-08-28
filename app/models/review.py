from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    product_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"),
    )
    description = db.Column(db.String(500), nullable=False)
    thumbs_up = db.Column(db.Boolean)
    thumbs_down = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "description": self.description,
            "thumbs_up": self.thumbs_up,
            "thumbs_down": self.thumbs_down,
            "user": (
                {"id": self.user.id, "username": self.user.username}
                if self.user
                else None
            ),
        }
