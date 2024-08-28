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


@product_routes.route("/<int:product_id>/reviews", methods=["GET"])
def get_reviews_by_product_id(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "product does not exist"}), 404

    reviews_list = []

    for review in product.reviews:
        review_data = review.to_dict()

        reviews_list.append(review_data)

    return jsonify(reviews_list)


# @product_routes.route('/create', methods=["POST"])
# @login_required
# def create_product():
#     continue


@product_routes.route("/<int:product_id>/reviews/create", methods=["POST"])
@login_required
def post_review(product_id):
    form = reviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        description = form.data["description"]
        thumbs_up = form.data["thumbs_up"]
        thumbs_down = form.data["thumbs_down"]

        new_review = Review(
            user_id=current_user.id,
            product_id=product_id,
            description=description,
            thumbs_up=thumbs_up,
            thumbs_down=thumbs_down,
        )

        db.session.add(new_review)
        db.session.commit()

        return {"review": new_review.to_dict()}, 201

    return {"errors": form.errors}, 400


@product_routes.route(
    "/<int:product_id>/reviews/<int:review_id>/delete", methods=["DELETE"]
)
@login_required
def delete_Review(review_id):
    review_to_delete = Review.query.get(review_id)

    if not review_to_delete:
        return jsonify({"message": "Review not found"}), 404

    if review_to_delete.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(review_to_delete)
    db.commit()

    return jsonify(
        {"message": f"Successfully deleted review {review_id}", "reviewId": review_id}
    ), 200
