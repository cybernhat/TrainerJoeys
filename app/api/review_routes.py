from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product, Pokemon, Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route("/")
def get_all_reviews():
    reviews = Review.query.all()

    if not reviews:
        return jsonify({"message": " no reviews found"}), 404

    reviews_list = [review.to_dict() for review in reviews]

    return jsonify(reviews_list)

