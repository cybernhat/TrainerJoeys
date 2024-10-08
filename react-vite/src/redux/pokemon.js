const GET_ALL_POKEMON = "pokemon/getPokemon";

const getAllPokemon = (pokemon) => {
    return {
        type: GET_ALL_POKEMON,
        pokemon,
    };
};

export const fetchAllPokemon = () => async (dispatch) => {
    const response = await fetch("/api/pokemon");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllPokemon(data));
    }
};

const initialState = {};

function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POKEMON: {
            const newState = { ...state };
            action.pokemon.forEach((species) => {
                newState[species.id] = species; 
            });
            return newState;
        }
        default:
            return state;
    }
}

export default pokemonReducer;
