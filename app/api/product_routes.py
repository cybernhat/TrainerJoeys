from flask import Blueprint, jsonify, request, redirect
from flask_login import current_user, login_required
from app.models import db, Product, Review
from app.s3_helpers import upload_file_to_s3, get_unique_filename
from app.forms import ProductForm, ReviewForm

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


@product_routes.route("/create", methods=["POST"])
def post_product():
    if "image" not in request.files:
        return jsonify({"message": "Image is required"}), 400

    image = request.files["image"]

    if not image:
        return jsonify({"message": "No image provided"}), 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return jsonify({"message": "Image upload failed", "error": upload}), 500

    img_url = upload["url"]

    # Collect other product data from the request
    ability = request.form.get("ability")
    item = request.form.get("item")
    nature = request.form.get("nature")
    game = request.form.get("game")
    shiny = request.form.get("shiny", False)
    generation = request.form.get("generation")
    quantity = request.form.get("quantity")
    price = request.form.get("price")
    description = request.form.get("description")
    pokemon_id = request.form.get("pokemon_id")

    # Validate that all required fields are present
    if not all(
        [ability, nature, game, generation, quantity, price, description, pokemon_id]
    ):
        return jsonify({"message": "Missing required fields"}), 400

    try:
        # Create new Product instance
        new_product = Product(
            user_id=current_user.id,
            pokemon_id=pokemon_id,
            img_url=img_url,
            ability=ability,
            item=item,
            nature=nature,
            game=game,
            shiny=bool(shiny),
            generation=generation,
            quantity=quantity,
            price=price,
            description=description,
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create product", "error": str(e)}), 500


@product_routes.route("/<int:product_id/edit", methods=["PUT"])
@login_required
def update_product(product_id):
    # Fetch the product to be updated
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    if product.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    # Check if a new image is provided
    if "image" in request.files:
        image = request.files["image"]
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return jsonify({"message": "Image upload failed", "error": upload}), 500
            product.img_url = upload["url"]  # Update the image URL

    # Update other product fields
    product.ability = request.form.get("ability", product.ability)
    product.item = request.form.get("item", product.item)
    product.nature = request.form.get("nature", product.nature)
    product.game = request.form.get("game", product.game)
    product.shiny = bool(request.form.get("shiny", product.shiny))
    product.generation = request.form.get("generation", product.generation)
    product.quantity = request.form.get("quantity", product.quantity)
    product.price = request.form.get("price", product.price)
    product.description = request.form.get("description", product.description)
    product.pokemon_id = request.form.get("pokemon_id", product.pokemon_id)

    try:
        db.session.commit()
        return jsonify(product.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update product", "error": str(e)}), 500

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

