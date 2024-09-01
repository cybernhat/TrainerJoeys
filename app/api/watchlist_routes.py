from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Watchlist, WatchlistItem, Product

watchlist_routes = Blueprint("watchlists", __name__)

@watchlist_routes.route('/get', methods=["GET"])
def get_all_watchlists():
        watchlists = Watchlist.query.all()  # Query all watchlists
            
        if not watchlists:
            return jsonify({"error": "unknown error"})
        print('AAAAAAAAAA', watchlists)
        return jsonify([watchlist.to_dict() for watchlist in watchlists])



@watchlist_routes.route("/<int:watchlist_id>/<int:product_id>/add", methods=["POST"])
@login_required
def add_product_to_watchlist(watchlist_id, product_id):
    # Check if the product is already in the watchlist to prevent duplicates
    existing_item = WatchlistItem.query.filter_by(
        watchlist_id=watchlist_id, product_id=product_id
    ).first()

    if existing_item:
        return {"error": "Product already in watchlist"}, 400

    # Create a new watchlist item
    new_watchlist_item = WatchlistItem(watchlist_id=watchlist_id, product_id=product_id)

    db.session.add(new_watchlist_item)
    db.session.commit()

    return {
        "message": "Product added to watchlist",
        "watchlist_item": new_watchlist_item.to_dict(),
    }, 201
