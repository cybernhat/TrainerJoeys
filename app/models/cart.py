from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    user = db.relationship("User", back_populates="cart")
    cart_items = db.relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cart_items": [
                item.to_dict() for item in self.cart_items
            ],  # Assuming CartItem has a to_dict method
        }
