const CREATE_PRODUCT_IMAGE = "poductimages/postProductImages"
const EDIT_PRODUCT_IMAGE = "productimages/putProductImages"

const createProductImage = (image) => ({
    type: CREATE_PRODUCT_IMAGE,
    image
})

const editProductImage = image => ({
    type: EDIT_PRODUCT_IMAGE,
    image
})

export const postProductImage = (image) => async (dispatch) => {
    const response = await fetch("/api/productimages/post", {
      method: "POST",
      body: image
    });

    if (response.ok) {
      const { resImage } = await response.json();
      dispatch(createProductImage(resImage));

    }
  };

export const putProductImage = (product_image_id, product) => async dispatch => {
    const response = await fetch(`/api/productimages/${product_image_id}/put`, {
        method: "PUT",
        body: product
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(editProductImage(data))
    }
}

const initialState = {
    images: []
  }

  const productImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_IMAGE:
            return {
                ...state,
                images: [...state.images, action.image]
            }

        case EDIT_PRODUCT_IMAGE:
            return {
                ...state,
                images: state.images.map(image =>
                    image.id === action.image.id ? action.image : image
                )
            }

        default:
            return state;
    }
}

export default productImageReducer
