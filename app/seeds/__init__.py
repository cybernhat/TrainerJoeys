from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pokemon import seed_pokemon, undo_pokemon
from .product import seed_products, undo_products
from .review import seed_reviews, undo_reviews
from .cart import seed_carts, undo_carts
from .watchlist import seed_watchlists, undo_watchlists

from app.models import environment
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_pokemon()
        undo_products()
        undo_reviews()
        undo_carts()
        undo_watchlists()
    seed_users()
    seed_pokemon()
    seed_products()
    seed_reviews()
    seed_carts()
    seed_watchlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pokemon()
    undo_products()
    undo_reviews()
    undo_carts()
    undo_watchlists()
    # Add other undo functions here
