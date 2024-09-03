const GET_ALL_CART = "cart/getAllCart";
const ADD_TO_CART = "cart/addToCart";
const DELETE_FROM_CART = "cart/deleteFromCart";
const CLEAR_CART = "cart/clearCart";

const getAllCart = (cart) => {
    return {
        type: GET_ALL_CART,
        cart,
    };
};

const deleteFromCart = (cartId, productId) => ({
    type: DELETE_FROM_CART,
    cartId,
    productId,
});

const addToCart = (cartItem, cartId) => ({
    type: ADD_TO_CART,
    cartItem,
    cartId,
});

const clearCart = (cartId) => ({
    type: CLEAR_CART,
    cartId,
});

export const fetchAllCarts = () => async (dispatch) => {
    const response = await fetch("/api/carts/get");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllCart(data));
    }
};

export const addProductToCart = (cartId, productId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cartId}/${productId}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const cartItem = await response.json();
        dispatch(addToCart(cartItem, cartId));
        return cartItem;
    } else {
        const error = await response.json();
        console.error("Failed to add product to cart:", error);
        return error;
    }
};

export const deleteProductFromCart =
    (cartId, productId) => async (dispatch) => {
        const response = await fetch(
            `/api/carts/${cartId}/${productId}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            dispatch(deleteFromCart(cartId, productId));
        } else {
            const error = await response.json();
            console.error("Failed to delete product from cart:", error);
            return error;
        }
    };

export const clearCartItems = (cartId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cartId}/clear`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        dispatch(clearCart(cartId));
    } else {
        const error = await response.json();
        console.error("Failed to clear cart:", error);
        return error;
    }
};

const initialState = {};

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CART: {
            const newState = { ...state };
            action.cart.forEach((cart) => {
                newState[cart.id] = cart;
            });
            return newState;
        }
        case ADD_TO_CART: {
            const newState = { ...state };
            const cartId = action.cartId;
            if (newState[cartId]) {
                newState[cartId] = {
                    ...newState[cartId],
                    cart_items: [
                        ...newState[cartId].cart_items,
                        action.cartItem,
                    ],
                };
            } else {
                newState[cartId] = {
                    id: cartId,
                    cart_items: [action.cartItem],
                };
            }
            return newState;
        }
        case DELETE_FROM_CART: {
            const newState = { ...state };
            const { cartId, productId } = action;
            if (newState[cartId]) {
                newState[cartId] = {
                    ...newState[cartId],
                    cart_items: newState[cartId].cart_items.filter(
                        (item) => item.id !== productId
                    ),
                };
            }
            return newState;
        }
        case CLEAR_CART: {
            const newState = { ...state };
            // Remove the cart from state
            delete newState[action.cartId];
            return newState;
        }
        default:
            return state;
    }
}

export default cartReducer;
