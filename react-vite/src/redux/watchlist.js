const GET_ALL_WATCHLIST = "watchlist/getAllWatchlist";
const ADD_TO_WATCHLIST = "watchlist/addToWatchlist";
const DELETE_FROM_WATCHLIST = "watchlist/deleteFromWatchlist";

const getAllWatchlist = (watchlist) => {
    return {
        type: GET_ALL_WATCHLIST,
        watchlist,
    };
};

const deleteFromWatchlist = (watchlistId, productId) => ({
    type: DELETE_FROM_WATCHLIST,
    watchlistId,
    productId,
});

const addToWatchlist = (watchlistItem, watchlistId) => ({
    type: ADD_TO_WATCHLIST,
    watchlistItem,
    watchlistId,
});

export const fetchAllWatchlist = () => async (dispatch) => {
    const response = await fetch("/api/watchlists/get");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllWatchlist(data));
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
            dispatch(addToWatchlist(watchlistItem, watchlistId)); // Include the watchlistId
            return watchlistItem;
        } else {
            const error = await response.json();
            console.error("Failed to add product to watchlist:", error);
            return error;
        }
    };

export const deleteProductFromWatchlist =
    (watchlistId, productId) => async (dispatch) => {
        const response = await fetch(
            `/api/watchlists/${watchlistId}/${productId}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            dispatch(deleteFromWatchlist(watchlistId, productId));
        } else {
            const error = await response.json();
            console.error("Failed to delete product from watchlist:", error);
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
        case ADD_TO_WATCHLIST: {
            const newState = { ...state };
            const watchlistId = action.watchlistId;
            if (newState[watchlistId]) {
                newState[watchlistId] = {
                    ...newState[watchlistId],
                    watchlist_products: [
                        ...newState[watchlistId].watchlist_products,
                        action.watchlistItem,
                    ],
                };
            } else {
                newState[watchlistId] = {
                    id: watchlistId,
                    watchlist_products: [action.watchlistItem],
                };
            }
            return newState;
        }
        case DELETE_FROM_WATCHLIST: {
            const newState = { ...state };
            const { watchlistId, productId } = action;
            if (newState[watchlistId]) {
                newState[watchlistId] = {
                    ...newState[watchlistId],
                    watchlist_products: newState[
                        watchlistId
                    ].watchlist_products.filter(
                        (item) => item.id !== productId
                    ),
                };
            }
            return newState;
        }
        default:
            return state;
    }
}

export default watchlistReducer;
