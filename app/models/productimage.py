from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(1000), nullable=False)
    filename = db.Column(db.String(1000), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete="CASCADE"), nullable=False)

    product = db.relationship("Product", back_populates="product_image")

    def to_dict(self):
        return {
            "id": self.id,
            "img_url": self.img_url,
            "filename": self.filename,
            "product_id": self.product_id
        }
