from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product, Pokemon

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def get_all_products():
    products = Product.query.all()

    if not products:
        return jsonify({"message": "no products found"}), 404

    products_list = [product.to_dict() for product in products]

    return jsonify(products_list)

@product_routes.route("/<int:product_id>", methods=["GET"])
def get_product_by_id(product_id):
    product = Product.query.get(product_id)

    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({"message": "Product not found"}), 404

@product_routes.route('/<int:product_id>/reviews', methods=["GET"])
def get_reviews_by_product_id(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "product does not exist"}), 404

    reviews_list = []

    for review in product.reviews:
        review_data = review.to_dict()

        reviews_list.append(review_data)

    return jsonify(reviews_list)
