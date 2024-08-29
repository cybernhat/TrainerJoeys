from flask import Blueprint, jsonify, request, redirect
from flask_login import current_user, login_required
from app.models import db, Product, Review
from app.forms import ProductForm, ReviewForm

product_routes = Blueprint("products", __name__)


@product_routes.route("/", methods=["GET"])
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


@product_routes.route("/create", methods=["POST"])
def post_product():
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_product = Product(
            user_id=current_user.id,
            pokemon_id=request.form.get("pokemon_id"),
            ability=form.ability.data,
            item=form.item.data,
            nature=form.nature.data,
            game=form.game.data,
            shiny=form.shiny.data,
            generation=form.generation.data,
            quantity=form.quantity.data,
            price=form.price.data,
            description=request.form.get("description"),
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.to_dict()), 201

    # If form validation fails, return errors
    return jsonify({"message": "Validation failed", "errors": form.errors}), 400


@product_routes.route("/<int:product_id>/edit", methods=["PUT"])
@login_required
def update_product(product_id):
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not product:
        return jsonify({"message": "product does not exist"}), 404

    if product.user_id != current_user.id:
        return jsonify({"message": "unauthorized"}), 403

    if form.validate_on_submit():
        # Update product fields
        product.pokemon_id = request.form.get("pokemon_id", product.pokemon_id)
        product.ability = form.ability.data
        product.item = form.item.data
        product.nature = form.nature.data
        product.game = form.game.data
        product.shiny = form.shiny.data
        product.generation = form.generation.data
        product.quantity = form.quantity.data
        product.price = form.price.data
        product.description = request.form.get("description", product.description)

        db.session.commit()

        return jsonify(product.to_dict()), 200



@product_routes.route("/<int:product_id>", methods=["DELETE"])
def delete_product_by_id(product_id):
    product = Product.query.get(product_id)

    if product:
        db.session.delete(product_id)
        db.session.commit()
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
