import os
import requests
from app.models import db, Pokemon, environment, SCHEMA
from sqlalchemy.sql import text


def fetch_pokemon_data(generation):
    url = f"https://pokeapi.co/api/v2/generation/{generation}/"
    response = requests.get(url)
    data = response.json()

    pokemon_list = []
    for pokemon_entry in data.get("pokemon_species", []):
        pokemon_name = pokemon_entry.get("name")
        pokemon_url = pokemon_entry.get("url")
        if not pokemon_name:
            continue

        # Fetch Pokémon details to get sprites and types
        pokemon_details_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}/"
        details_response = requests.get(pokemon_details_url)
        details_data = details_response.json()

        # Fetching the official sprite and mini sprite
        sprites = details_data.get("sprites", {})
        pokemon_img = (
            sprites.get("other", {})
            .get("official-artwork", {})
            .get("front_default", "default_image_url")
        )
        pokemon_sprite = sprites.get("front_default", "default_sprite_url")

        # Fetch Pokémon types
        types = [
            type_info["type"]["name"] for type_info in details_data.get("types", [])
        ]
        type_1 = types[0] if len(types) > 0 else None
        type_2 = types[1] if len(types) > 1 else None

        # Extract Pokémon ID from URL (assuming it ends with ID number)
        pokemon_id = pokemon_url.split("/")[-2]

        pokemon_list.append(
            {
                "id": pokemon_id,
                "name": pokemon_name,
                "pokemon_img": pokemon_img,
                "pokemon_sprite": pokemon_sprite,
                "type_1": type_1,
                "type_2": type_2,
            }
        )

    # Sort Pokémon list by ID
    pokemon_list.sort(key=lambda x: int(x["id"]))

    return pokemon_list


def seed_pokemon():
    # Fetch Pokémon data for Generation 1 only (adjust generation number as needed)
    all_pokemon = fetch_pokemon_data(1)

    for pokemon in all_pokemon:
        new_pokemon = Pokemon(
            name=pokemon["name"],
            pokemon_img=pokemon["pokemon_img"],
            pokemon_sprite=pokemon["pokemon_sprite"],
            type_1=pokemon["type_1"],
            type_2=pokemon["type_2"],
        )
        db.session.add(new_pokemon)

    db.session.commit()


# Function to undo the seeding (truncate/delete the table)
def undo_pokemon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemon RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pokemon"))

    db.session.commit()
