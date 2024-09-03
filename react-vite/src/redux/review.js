const GET_ALL_REVIEWS = "reviews/getAllReviews";
const ADD_REVIEW = "reviews/addReview";
const EDIT_REVIEW = "reviews/edit";
const DELETE_REVIEW = "reviews/delete";

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS, // Ensure 'type' is correctly returned
        reviews,
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review,
    };
};

const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review,
    };
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
    };
};

export const destroyReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
};
export const putReview = (reviewId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updatedReview));
        return updatedReview;
    }
};

export const fetchAllReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/get");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllReviews(data));
        return data;
    }
};

export const postReview = (productId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${productId}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const newReview = await response.json();

        dispatch(addReview(newReview));
    }
};

const initialState = {};

function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const newState = { ...state };
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        }
        case ADD_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review,
            };
        }
        case EDIT_REVIEW: {
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review,
                },
            };
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
