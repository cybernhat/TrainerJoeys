from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Pokemon


pokemon_routes = Blueprint("pokemon", __name__)

@pokemon_routes.route("/", methods=["GET"])
def get_all_pokemon():
    pokemon = Pokemon.query.all()

    if not pokemon:
        return jsonify({"message": "no pokemon found"})

    pokemon_list = []
    for species in pokemon:
        species_data = species.to_dict()
        pokemon_list.append(species_data)

    return jsonify(pokemon_list)
