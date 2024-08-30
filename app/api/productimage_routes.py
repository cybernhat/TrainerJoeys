from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Product, ProductImage
from app.api.aws_utils import upload_file_to_s3, get_unique_filename, ALLOWED_EXTENSIONS
from app.forms import ProductImageForm

productimage_routes = Blueprint("productimages", __name__)


@productimage_routes.route("/post", methods=["POST"])
@login_required
def upload_productimage():
    product_id = request.form.get("product_id")


    img_url = request.files.get("img_url")
    filename = request.form.get("filename")

    if img_url:
        img_url.filename = filename
        upload = upload_file_to_s3(img_url)

        url = upload["url"]
        new_img_url = ProductImage(
            img_url=url, product_id=product_id, filename=filename
        )

        db.session.add(new_img_url)
        db.session.commit()
        return {"url": url}, 201

    return {"error": "No file uploaded"}, 400


@productimage_routes.route("/<int:product_image_id>/put", methods=["PUT"])
@login_required
def edit_cover_art(product_image_id):
    product_image = ProductImage.query.get(product_image_id)

    if not product_image:
        return {"error": "Cover art not found"}

    product_image_url = request.files.get("product_image_url")
    filename = request.form.get("filename")

    if product_image_url:
        product_image_url.filename = filename
        upload = upload_file_to_s3(product_image_url)

        product_image.img_url = upload["url"]

        if filename:
            product_image.filename = filename

        db.session.commit()
        return {"message": "Cover art updated"}, 200

    return {"error": "No file uploaded"}, 400
