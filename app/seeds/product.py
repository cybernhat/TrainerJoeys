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
        pokemon_id=6,
        # img_url="https://images.gamebanana.com/img/ss/mods/634dc41b545d9.jpg",
        ability="Blaze",
        item="Charcoal",
        nature="Brave",
        game="FireRed",
        shiny=True,
        generation=3,
        quantity=10,
        price=500,
        description="Max Spa and Speed EV. High Spa and HP IV.",
        move_1="Flamethrower",  # Charizard can learn this
        move_2="Fly",          # Charizard can learn this
        move_3="Earthquake",   # Charizard can learn this
        move_4="Dragon Claw"   # Charizard can learn this
    ),
    Product(
        user_id=user1.id,
        pokemon_id=25,
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
        move_1="Thunderbolt",   # Pikachu can learn this
        move_2="Quick Attack",  # Pikachu can learn this
        move_3="Iron Tail",     # Pikachu can learn this
        move_4="Volt Tackle"    # Pikachu can learn this
    ),
    Product(
        user_id=user1.id,
        pokemon_id=143,
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
        move_1="Body Slam",      # Snorlax can learn this
        move_2="Rest",          # Snorlax can learn this
        move_3="Sleep Talk",    # Snorlax can learn this
        move_4="Crunch"         # Snorlax can learn this
    ),
    Product(
        user_id=user1.id,
        pokemon_id=149,
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
        move_1="Dragon Claw",   # Dragonite can learn this
        move_2="Fly",          # Dragonite can learn this
        move_3="Thunderpunch",  # Dragonite can learn this
        move_4="Fire Punch"     # Dragonite can learn this
    ),
    Product(
        user_id=user1.id,
        pokemon_id=150,
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
        move_1="Hyper Beam",    # Mewtwo can learn this
        move_2="Psychic",       # Mewtwo can learn this
        move_3="Shadow Ball",   # Mewtwo can learn this
        move_4="Aura Sphere"    # Mewtwo can learn this
    ),
    Product(
        user_id=user2.id,
        pokemon_id=94,  # Gengar
        ability="Levitate",
        item="Focus Sash",
        nature="Timid",
        game="FireRed",
        shiny=False,
        generation=3,
        quantity=10,
        price=1200,
        description="Max Speed and Special Attack EV. Perfect IVs in Special Attack and Speed.",
        move_1="Shadow Ball",   # Gengar can learn this
        move_2="Sludge Bomb",   # Gengar can learn this
        move_3="Dream Eater",   # Gengar can learn this
        move_4="Hypnosis"       # Gengar can learn this
    ),
    Product(
        user_id=user2.id,
        pokemon_id=65,  # Alakazam
        ability="Synchronize",
        item="TwistedSpoon",
        nature="Modest",
        game="LeafGreen",
        shiny=False,
        generation=1,
        quantity=8,
        price=1500,
        description="Max Special Attack and Speed EV. High Special Attack IV.",
        move_1="Psychic",       # Alakazam can learn this
        move_2="Focus Blast",   # Alakazam can learn this
        move_3="Shadow Ball",   # Alakazam can learn this
        move_4="Energy Ball"    # Alakazam can learn this
    ),
    Product(
        user_id=user2.id,
        pokemon_id=68,  # Machamp
        ability="Guts",
        item="Leftovers",
        nature="Adamant",
        game="Red",
        shiny=True,
        generation=1,
        quantity=6,
        price=900,
        description="Max Attack EV. Very high Attack IV.",
        move_1="Dynamic Punch", # Machamp can learn this
        move_2="Stone Edge",    # Machamp can learn this
        move_3="Earthquake",    # Machamp can learn this
        move_4="Bullet Punch"   # Machamp can learn this
    ),
    Product(
        user_id=user2.id,
        pokemon_id=130,  # Gyarados
        ability="Intimidate",
        item="Mystic Water",
        nature="Jolly",
        game="Platinum",
        shiny=False,
        generation=1,
        quantity=12,
        price=1100,
        description="EV trained for Attack and Speed. Perfect IVs in Attack and Speed.",
        move_1="Waterfall",     # Gyarados can learn this
        move_2="Crunch",        # Gyarados can learn this
        move_3="Dragon Dance",  # Gyarados can learn this
        move_4="Ice Fang"       # Gyarados can learn this
    ),
    Product(
        user_id=user2.id,
        pokemon_id=59,  # Arcanine
        ability="Intimidate",
        item="Charcoal",
        nature="Adamant",
        game="Green",
        shiny=False,
        generation=1,
        quantity=7,
        price=1300,
        description="Max Attack and Speed EV. High IVs across the board.",
        move_1="Flare Blitz",   # Arcanine can learn this
        move_2="Extreme Speed", # Arcanine can learn this
        move_3="Crunch",        # Arcanine can learn this
        move_4="Wild Charge"    # Arcanine can learn this
    ),
    Product(
        user_id=user3.id,
        pokemon_id=26,  # Raichu
        ability="Static",
        item="Light Ball",
        nature="Hasty",
        game="Yellow",
        shiny=True,
        generation=1,
        quantity=9,
        price=1000,
        description="Max Speed and Special Attack EV. Perfect Speed IV.",
        move_1="Thunderbolt",   # Raichu can learn this
        move_2="Quick Attack",  # Raichu can learn this
        move_3="Thunder Wave",  # Raichu can learn this
        move_4="Focus Blast"    # Raichu can learn this
    ),
    Product(
        user_id=user3.id,
        pokemon_id=3,  # Venusaur
        ability="Overgrow",
        item="Leftovers",
        nature="Calm",
        game="LeafGreen",
        shiny=False,
        generation=3,
        quantity=10,
        price=1400,
        description="EV trained for HP and Special Defense. High HP IV.",
        move_1="Giga Drain",    # Venusaur can learn this
        move_2="Sludge Bomb",   # Venusaur can learn this
        move_3="Earthquake",    # Venusaur can learn this
        move_4="Leech Seed"     # Venusaur can learn this
    ),
    Product(
        user_id=user3.id,
        pokemon_id=9,  # Blastoise
        ability="Torrent",
        item="Mystic Water",
        nature="Bold",
        game="Sapphire",
        shiny=False,
        generation=3,
        quantity=8,
        price=1250,
        description="Max Defense and Special Defense EV. High Defense IV.",
        move_1="Surf",          # Blastoise can learn this
        move_2="Ice Beam",      # Blastoise can learn this
        move_3="Earthquake",    # Blastoise can learn this
    ),
    Product(
        user_id=user3.id,
        pokemon_id=34,  # Nidoking
        ability="Sheer Force",
        item="Life Orb",
        nature="Modest",
        game="Gold",
        shiny=True,
        generation=2,
        quantity=5,
        price=1350,
        description="EV trained for Special Attack and Speed. Perfect Special Attack IV.",
        move_1="Sludge Bomb",   # Nidoking can learn this
        move_2="Earth Power",   # Nidoking can learn this
    ),
    Product(
        user_id=user3.id,
        pokemon_id=122,  # Mr-Mime
        ability="Sheer Force",
        item="Life Orb",
        nature="Modest",
        game="Silver",
        shiny=False,
        generation=2,
        quantity=6,
        price=1300,
        description="Max HP and Special Attack EV. High HP IV.",
        move_1="Psychic",       # Mr. Mime can learn this
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
