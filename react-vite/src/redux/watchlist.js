const GET_ALL_WATCHLIST = "watchlist/getAllWatchlist";
const ADD_TO_WATCHLIST = "watchlist/addToWatchlist";

const getAllWatchlist = (watchlist) => {
    return {
        type: GET_ALL_WATCHLIST,
        watchlist,
    };
};

const addToWatchlist = (watchlistItem) => ({
    type: ADD_TO_WATCHLIST,
    watchlistItem,
});

export const fetchAllWatchlist = () => async (dispatch) => {
    try {
        const response = await fetch("/api/watchlists");
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        dispatch(getAllWatchlist(data));
    } catch (error) {
        console.error("Failed to fetch watchlists:", error);
    }
};

export const addProductToWatchlist =
    (watchlistId, productId) => async (dispatch) => {
        const response = await fetch(
            `/api/watchlists/${watchlistId}/${productId}/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const watchlistItem = await response.json();
            dispatch(addToWatchlist(watchlistItem));
            return watchlistItem;
        } else {
            const error = await response.json();
            console.error("Failed to add product to watchlist:", error);
            return error;
        }
    };

const initialState = {};

function watchlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WATCHLIST: {
            const newState = { ...state };
            action.watchlist.forEach((watchlist) => {
                newState[watchlist.id] = watchlist;
            });
            return newState;
        }
        default:
            return state;
    }
}

export default watchlistReducer;
