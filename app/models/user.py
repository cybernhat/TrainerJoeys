from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    products = db.relationship(
        "Product", back_populates="user", cascade="all, delete-orphan"
    )
    reviews = db.relationship(
        "Review", back_populates="user", cascade="all, delete-orphan"
    )
    cart = db.relationship(
        "Cart", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    watchlist = db.relationship(
        "Watchlist", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )  # Ensures one-to-one

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "products": [product.to_dict() for product in self.products],
            "reviews": [review.to_dict() for review in self.reviews],
            "cart": self.cart.to_dict() if self.cart else None,
            "watchlist": (
                self.watchlist.to_dict() if self.watchlist else None
            ),  # Should now correctly serialize the Watchlist object
        }
