const GET_PRODUCTS = "products/getproducts";
// const CREATE_PRODUCT_IMAGE = "poducts/postProductImages"

const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products,
});

// const createProductImage = (image) => ({
//     type: CREATE_PRODUCT_IMAGE,
//     image
// })

export const getAllProducts = () => async (dispatch) => {
    const response = await fetch("/api/products");

    if (response.ok) {
        const data = await response.json();
        dispatch(getProducts(data));
        return data;
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
                newState[product.id] = action.product;
            });
            return newState;
        }
        default:
            return state;
    }
}

export default productsReducer;
