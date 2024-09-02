from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Product, CartItem, Cart, User

cart_routes = Blueprint("cart", __name__)


@cart_routes.route("/get", methods=["GET"])
def get_all_carts():
    carts = Cart.query.all()

    if not carts:
        return jsonify({"error": "unknown error"})

    return jsonify([cart.to_dict() for cart in carts])


@cart_routes.route("/<int:cart_id>/<int:product_id>/add", methods=["POST"])
@login_required
def add_product_to_cart(cart_id, product_id):
    existing_item = CartItem.query.filter_by(
        cart_id=cart_id, product_id=product_id
    ).first()

    if existing_item:
        return {"error": "Product already in cart"}, 400

    new_cart_item = CartItem(cart_id=cart_id, product_id=product_id)

    db.session.add(new_cart_item)
    db.session.commit()

    return {
        "message": "Product added to cart",
        "cart_item": new_cart_item.to_dict(),
    }, 201


@cart_routes.route("/<int:cart_id>/<int:product_id>/delete", methods=["DELETE"])
@login_required
def delete_product_from_cart(cart_id, product_id):
    existing_item = CartItem.query.filter_by(
        cart_id=cart_id, product_id=product_id
    ).first()

    if not existing_item:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(existing_item)
    db.session.commit()

    return jsonify({"message": "product successfully removed from wathclist"})
