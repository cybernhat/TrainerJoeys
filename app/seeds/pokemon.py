import os
import requests
from app.models import db, Pokemon, environment, SCHEMA


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

        # Fetch Pokémon details to get sprites
        pokemon_details_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}/"
        details_response = requests.get(pokemon_details_url)
        details_data = details_response.json()

        # Fetching the official sprite
        sprites = details_data.get("sprites", {})
        other = sprites.get("other", {})
        official_artwork = other.get("official-artwork", {})
        pokemon_img = official_artwork.get("front_default", "default_image_url")

        # Extract Pokémon ID from URL (assuming it ends with ID number)
        pokemon_id = pokemon_url.split("/")[-2]

        pokemon_list.append(
            {"id": pokemon_id, "name": pokemon_name, "pokemon_img": pokemon_img}
        )

    # Sort Pokémon list by ID
    pokemon_list.sort(key=lambda x: int(x["id"]))

    return pokemon_list


def seed_pokemon():
    # Fetch Pokémon data for Generation 1 only
    all_pokemon = fetch_pokemon_data(1)

    for pokemon in all_pokemon:
        new_pokemon = Pokemon(name=pokemon["name"], pokemon_img=pokemon["pokemon_img"])
        db.session.add(new_pokemon)

    db.session.commit()


# Function to undo the seeding (truncate/delete the table)
def undo_pokemon():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pokemon RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pokemon"))

    db.session.commit()
