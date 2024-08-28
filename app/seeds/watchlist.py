from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():
    watchlists_data = [
        {
            "user_id": 1
        },
        {
            "user_id": 2
        },
        {
            "user_id": 3
        }
    ]

    for watchlist in watchlists_data:
        new_watchlist = Watchlist(
            user_id=watchlist["user_id"]
        )
        db.session.add(new_watchlist)

        db.session.commit()

def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
