from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    # Hard-coded cart data for three users
    carts_data = [
        {
            "user_id": 1,
        },
        {
            "user_id": 2,
        },
        {
            "user_id": 3,
        },
    ]

    # Create Cart instances and add to session
    for cart in carts_data:
        new_cart = Cart(
            user_id=cart["user_id"],
        )
        db.session.add(new_cart)

    # Commit the transaction
    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
