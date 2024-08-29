import os
from app.models import db, Product, User, Pokemon, environment, SCHEMA


def seed_products():
    # Fetch existing users and Pokémon
    user1 = User.query.first()  # Assumes at least one user exists
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    pokemon_list = Pokemon.query.filter(
        Pokemon.name.in_(
            [
                "charizard",
                "pikachu",
                "snorlax",
                "dragonite",
                "mewtwo",
                "gengar",
                "alakazam",
                "machamp",
                "gyarados",
                "arcanine",
                "raichu",
                "venusaur",
                "blastoise",
                "nidoking",
                "mr-mime",
            ]
        )
    ).all()

    products = [
        Product(
            user_id=user1.id,
            pokemon_id=pokemon_list[0].id,
            # img_url="https://images.gamebanana.com/img/ss/mods/634dc41b545d9.jpg",
            ability="Blaze",
            item="Charcoal",
            nature="Brave",
            game="FireRed",
            shiny=False,
            generation=3,
            quantity=10,
            price=500,
            description="Max Spa and Speed EV. High Spa and HP IV.",
        ),
        Product(
            user_id=user1.id,
            pokemon_id=pokemon_list[1].id,
            # img_url="https://i.ytimg.com/vi/edyp5e03mQs/sddefault.jpg",
            ability="Static",
            item="Light Ball",
            nature="Jolly",
            game="Yellow",
            shiny=True,
            generation=1,
            quantity=20,
            price=200,
            description="Max Spa and Speed EV. Pretty bad IV.",
        ),
        Product(
            user_id=user1.id,
            pokemon_id=pokemon_list[2].id,
            # img_url="https://pokefella.com/cdn/shop/products/PokefellaSet-Snorlaxgmaxultrashiny_1024x1024.png?v=1584801109",
            ability="Immunity",
            item="Leftovers",
            nature="Relaxed",
            game="Silver",
            shiny=False,
            generation=2,
            quantity=5,
            price=1500,
            description="EV TRAINED FOR HP AND SPD. VERY HIGH HP IV!",
        ),
        Product(
            user_id=user1.id,
            pokemon_id=pokemon_list[3].id,
            ability="Inner Focus",
            # img_url="https://i.ytimg.com/vi/obZB7fErjYU/hqdefault.jpg",
            item="Dragon Fang",
            nature="Modest",
            game="Emerald",
            shiny=True,
            generation=3,
            quantity=8,
            price=800,
            description="MAX IV AND MAX EV. BUY NOW VERY STRONG POKEMON!",
        ),
        Product(
            user_id=user1.id,
            pokemon_id=pokemon_list[4].id,
            # img_url="https://pm1.aminoapps.com/7242/8796a70a723e33d89c8ebca0b41f11bcd3cd9ea1r1-2048-1536v2_uhq.jpg",
            ability="Pressure",
            item="None",
            nature="Timid",
            game="Red",
            shiny=False,
            generation=1,
            quantity=3,
            price=3000,
            description="Selling my baby because I need cash. EV trained with max Spa and Speed. 31 Spa IV.",
        ),
        Product(
            user_id=user2.id,
            pokemon_id=pokemon_list[5].id,  # Gengar
            ability="Levitate",
            item="Focus Sash",
            nature="Timid",
            game="FireRed",
            shiny=False,
            generation=3,
            quantity=10,
            price=1200,
            description="Max Speed and Special Attack EV. Perfect IVs in Special Attack and Speed.",
        ),
        Product(
            user_id=user2.id,
            pokemon_id=pokemon_list[6].id,  # Alakazam
            ability="Synchronize",
            item="TwistedSpoon",
            nature="Modest",
            game="LeafGreen",
            shiny=False,
            generation=1,
            quantity=8,
            price=1500,
            description="Max Special Attack and Speed EV. High Special Attack IV.",
        ),
        Product(
            user_id=user2.id,
            pokemon_id=pokemon_list[7].id,  # Machamp
            ability="Guts",
            item="Leftovers",
            nature="Adamant",
            game="Red",
            shiny=True,
            generation=1,
            quantity=6,
            price=900,
            description="Max Attack EV. Very high Attack IV.",
        ),
        Product(
            user_id=user2.id,
            pokemon_id=pokemon_list[8].id,  # Gyarados
            ability="Intimidate",
            item="Mystic Water",
            nature="Jolly",
            game="Platinum",
            shiny=False,
            generation=1,
            quantity=12,
            price=1100,
            description="EV trained for Attack and Speed. Perfect IVs in Attack and Speed.",
        ),
        Product(
            user_id=user2.id,
            pokemon_id=pokemon_list[9].id,  # Arcanine
            ability="Intimidate",
            item="Charcoal",
            nature="Adamant",
            game="Green",
            shiny=False,
            generation=1,
            quantity=7,
            price=1300,
            description="Max Attack and Speed EV. High IVs across the board.",
        ),
        Product(
            user_id=user3.id,
            pokemon_id=pokemon_list[10].id,  # Raichu
            ability="Static",
            item="Light Ball",
            nature="Hasty",
            game="Yellow",
            shiny=True,
            generation=1,
            quantity=9,
            price=1000,
            description="Max Speed and Special Attack EV. Perfect Speed IV.",
        ),
        Product(
            user_id=user3.id,
            pokemon_id=pokemon_list[11].id,  # Venusaur
            ability="Overgrow",
            item="Leftovers",
            nature="Calm",
            game="LeafGreen",
            shiny=False,
            generation=3,
            quantity=10,
            price=1400,
            description="EV trained for HP and Special Defense. High HP IV.",
        ),
        Product(
            user_id=user3.id,
            pokemon_id=pokemon_list[12].id,  # Blastoise
            ability="Torrent",
            item="Mystic Water",
            nature="Bold",
            game="Sapphire",
            shiny=False,
            generation=3,
            quantity=8,
            price=1250,
            description="Max Defense and Special Defense EV. High Defense IV.",
        ),
        Product(
            user_id=user3.id,
            pokemon_id=pokemon_list[13].id,  # Nidoking
            ability="Sheer Force",
            item="Life Orb",
            nature="Modest",
            game="Gold",
            shiny=True,
            generation=2,
            quantity=5,
            price=1350,
            description="EV trained for Special Attack and Speed. Perfect Special Attack IV.",
        ),
        Product(
            user_id=user3.id,
            pokemon_id=pokemon_list[14].id,  # Mr-Mime
            ability="Sheer Force",
            item="Life Orb",
            nature="Modest",
            game="Silver",
            shiny=False,
            generation=2,
            quantity=6,
            price=1300,
            description="Max HP and Special Attack EV. High HP IV.",
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
