from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, Pokemon, Review, db

review_routes = Blueprint("reviews", __name__)


@review_routes.route("/get")
def get_all_reviews():
    reviews = Review.query.all()

    if not reviews:
        return jsonify({"message": " no reviews found"}), 404

    reviews_list = [review.to_dict() for review in reviews]

    return jsonify(reviews_list)


@review_routes.route("/<int:product_id>/create", methods=["POST"])
@login_required
def create_review(product_id):
    data = request.json

    # Ensure the required field 'description' is present
    if "description" not in data:
        return jsonify({"error": "Missing required field: description"}), 400

    # Create a new review using the product_id from the URL parameter
    new_review = Review(
        user_id=current_user.id,
        product_id=product_id,
        description=data.get("description"),
        thumbs_up=data.get("thumbs_up", False),
        thumbs_down=data.get("thumbs_down", False),
    )

    # Add the new review to the database
    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict()), 201

@review_routes.route("/<int:review_id>/edit", methods=["PUT"])
@login_required
def edit_review_by_id(review_id):
    data = request.json
    review_to_edit = Review.query.get(review_id)

    if not review_to_edit:
        return jsonify({"error": "no review found"}), 404

    if review_to_edit.user_id != current_user.id:
        return jsonify({"error": "unauthorized"}), 403

    if "description" in data:
        review_to_edit.description = data["description"]
    if "thumbs_up" in data:
        review_to_edit.thumbs_up = data["thumbs_up"]
    if "thumbs_down" in data:
        review_to_edit.thumbs_down = data["thumbs_down"]

    db.session.commit()

    return (
        jsonify(
            {"message": "review changes successful", "board": review_to_edit.to_dict()},
        ),
        200,
    )


@review_routes.route("/<int:review_id>/delete", methods=["DELETE"])
@login_required
def delete_Review(review_id):
    review_to_delete = Review.query.get(review_id)

    if not review_to_delete:
        return jsonify({"message": "Review not found"}), 404

    if review_to_delete.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(review_to_delete)
    db.session.commit()

    return (
        jsonify(
            {
                "message": f"Successfully deleted review {review_id}",
                "reviewId": review_id,
            }
        ),
        200,
    )

    # form=ReviewForm()
    # form['csrf_token'].data = request.cookies['csrf_token']

    # review = Review.query.get(review_id)

    # if form.validate_on_submit():
    #     if not review:
    #         return jsonify({"error": "review not found"}), 404

    #     if review.user_id != current_user.id:
    #         return jsonify({"error": "Unauthorized"}), 403

    #     review.description = form.description.data
    #     review.thumbs_up = form.thumbs_up.data
    #     review.thumbs_down = form.thumbs_down.data

    #     db.session.commit()

    #     return jsonify(review.to_dict()), 200
