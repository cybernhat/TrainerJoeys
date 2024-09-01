const GET_PRODUCTS = "products/getProducts";
const GET_ONE_PRODUCT = "products/getOneProduct";
const CREATE_PRODUCT = "products/createProduct";
const EDIT_PRODUCT = "products/editProduct";
const DELETE_PRODUCT = "products/deleteProduct";

const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products,
});

const getOneProduct = (product) => ({
    type: GET_ONE_PRODUCT,
    product,
});

const createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product,
    };
};

const removeProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        productId,
    };
};

export const fetchAllProducts = () => async (dispatch) => {
    const response = await fetch("/api/products");

    if (response.ok) {
        const data = await response.json();
        dispatch(getProducts(data));
        return data;
    }
};

export const fetchOneProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getOneProduct(data));
    }
};

export const postProduct = (product) => async (dispatch) => {
    const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        credentials: "include",
    });

    if (response.ok) {
        const newProduct = await response.json();
        dispatch(createProduct(newProduct));
        return newProduct;
    } else {
        const error = await response.json();
        console.error("Error response:", error);
        return error;
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/delete`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(removeProduct(productId));
        return productId; // return the productId after successful deletion
    } else {
        const error = await response.json();
        return error;
    }
};
// export const postProductImage = (image) => async (dispatch) => {
//     const response = await fetch("/api/productimages/post", {
//       method: "POST",
//       body: image
//     });

//     if (response.ok) {
//       const { resImage } = await response.json();
//       dispatch(createProductImage(resImage));

//     } else {
//       console.log("Upload cover art failed");
//     }
//   };

const initialState = {};

function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS: {
            const newState = { ...state };
            action.products.forEach((product) => {
                newState[product.id] = product;
            });
            return newState;
        }
        case GET_ONE_PRODUCT: {
            return {
                ...state,
                [action.product.id]: action.product,
            };
        }
        case CREATE_PRODUCT: {
            return {
                ...state,
                [action.product.id]: action.product,
            };
        }
        case DELETE_PRODUCT: {
            const newState = { ...state };
            delete newState[action.productId]; // Remove the deleted product from the state
            return newState;
        }
        default:
            return state;
    }
}
export default productsReducer;
