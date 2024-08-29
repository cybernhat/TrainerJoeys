import os
from app.models import db, Product, User, Pokemon, environment, SCHEMA


def seed_products():
    # Fetch existing users and Pokémon
    user = User.query.first()  # Assumes at least one user exists
    pokemon_list = Pokemon.query.filter(
        Pokemon.name.in_(["charizard", "pikachu", "snorlax", "dragonite", "mewtwo"])
    ).all()

    if not user or len(pokemon_list) != 5:
        print("Error: Required data not found. Ensure users and Pokémon are seeded.")
        return

    products = [
        Product(
            user_id=user.id,
            pokemon_id=pokemon_list[0].id,
            img_url="https://images.gamebanana.com/img/ss/mods/634dc41b545d9.jpg",
            ability="Blaze",
            item="Charcoal",
            nature="Brave",
            game="FireRed",
            shiny=False,
            generation=3,
            quantity=10,
            price=500,
            description="Max Spa and Speed EV. High Spa and HP IV."
        ),
        Product(
            user_id=user.id,
            pokemon_id=pokemon_list[1].id,
            img_url="https://i.ytimg.com/vi/edyp5e03mQs/sddefault.jpg",
            ability="Static",
            item="Light Ball",
            nature="Jolly",
            game="Yellow",
            shiny=True,
            generation=1,
            quantity=20,
            price=200,
            description="Max Spa and Speed EV. Pretty bad IV."
        ),
        Product(
            user_id=user.id,
            pokemon_id=pokemon_list[2].id,
            img_url="https://pokefella.com/cdn/shop/products/PokefellaSet-Snorlaxgmaxultrashiny_1024x1024.png?v=1584801109",
            ability="Immunity",
            item="Leftovers",
            nature="Relaxed",
            game="Silver",
            shiny=False,
            generation=2,
            quantity=5,
            price=1500,
            description="EV TRAINED FOR HP AND SPD. VERY HIGH HP IV!"
        ),
        Product(
            user_id=user.id,
            pokemon_id=pokemon_list[3].id,
            ability="Inner Focus",
            img_url="https://i.ytimg.com/vi/obZB7fErjYU/hqdefault.jpg",
            item="Dragon Fang",
            nature="Modest",
            game="Emerald",
            shiny=True,
            generation=3,
            quantity=8,
            price=800,
            description="MAX IV AND MAX EV. BUY NOW VERY STRONG POKEMON!"
        ),
        Product(
            user_id=user.id,
            pokemon_id=pokemon_list[4].id,
            img_url="https://pm1.aminoapps.com/7242/8796a70a723e33d89c8ebca0b41f11bcd3cd9ea1r1-2048-1536v2_uhq.jpg",
            ability="Pressure",
            item="None",
            nature="Timid",
            game="Red",
            shiny=False,
            generation=1,
            quantity=3,
            price=3000,
            description="Selling my baby because I need cash. EV trained with max Spa and Speed. 31 Spa IV."
        ),
    ]

    db.session.add_all(products)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
