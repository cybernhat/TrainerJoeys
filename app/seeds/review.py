from app.models import db, Review, User, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    # Hard-coded review data
    reviews_data = [
        {
            "user_id": 2,
            "product_id": 1,
            "description": "Great Pokemon. Came as listed.",
            "thumbs_up": True,
            "thumbs_down": False,
        },
        {
            "user_id": 3,
            "product_id": 1,
            "description": "Very fast service. Would buy again",
            "thumbs_up": True,
            "thumbs_down": False,
        },
        {
            "user_id": 2,
            "product_id": 2,
            "description": "Lovely Pokemon. THanks!",
            "thumbs_up": True,
            "thumbs_down": False,
        },
        {
            "user_id": 3,
            "product_id": 2,
            "description": "Came with the wrong nature. Do not buy from user.",
            "thumbs_up": False,
            "thumbs_down": True,
        },
        {
            "user_id": 2,
            "product_id": 3,
            "description": "Highly recommended!",
            "thumbs_up": True,
            "thumbs_down": False,
        },
        {
            "user_id": 3,
            "product_id": 3,
            "description": "Not worth the price.",
            "thumbs_up": False,
            "thumbs_down": True,
        },
        {
            "user_id": 2,
            "product_id": 4,
            "description": "Beware scam. Took my money and ran.",
            "thumbs_up": False,
            "thumbs_down": True,
        },
        {
            "user_id": 3,
            "product_id": 4,
            "description": "It's a scam! I got a rattata!",
            "thumbs_up": False,
            "thumbs_down": True,
        },
        {
            "user_id": 2,
            "product_id": 5,
            "description": "Excellent value for money.",
            "thumbs_up": True,
            "thumbs_down": False,
        },
        {
            "user_id": 3,
            "product_id": 5,
            "description": "Just alright.",
            "thumbs_up": True,
            "thumbs_down": False,
        },
    ]

    # Create review instances and add to session
    for review in reviews_data:
        new_review = Review(
            user_id=review["user_id"],
            product_id=review["product_id"],
            description=review["description"],
            thumbs_up=review["thumbs_up"],
            thumbs_down=review["thumbs_down"],
        )
        db.session.add(new_review)

    # Commit the transaction
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
