from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product, CartItem, User

cart_routes = Blueprint("cart", __name__)
