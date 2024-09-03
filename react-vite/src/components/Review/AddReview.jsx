import { useEffect, useState } from "react";
import "./AddReview.css";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../redux/review";
import { useModal } from "../../context/Modal";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

const AddReview = ({ productId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [thumbsUp, setThumbsUp] = useState(false);
    const [thumbsDown, setThumbsDown] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Validate review input
    useEffect(() => {
        let reviewErrors = {};

        if (review.length <= 0) reviewErrors.review = "Please write a review";

        setErrors(reviewErrors);
    }, [review]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        // Check for validation errors
        if (Object.keys(errors).length) return;

        // Dispatch action to post review
        const reviewData = {
            description: review,
            thumbs_up: thumbsUp,
            thumbs_down: thumbsDown,
        };

        await dispatch(reviewActions.postReview(productId, reviewData));
        console.log('success!')
        closeModal(); // Close modal after submission
    };

    // Handle thumbs up button click
    const handleThumbsUpClick = () => {
        setThumbsUp(true);
        setThumbsDown(false);
    };

    // Handle thumbs down button click
    const handleThumbsDownClick = () => {
        setThumbsDown(true);
        setThumbsUp(false);
    };

    return (
        <div id="review-form-container">
            <h1>How was your experience with this product?</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="review-text-area"
                    placeholder="Leave a review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                {hasSubmitted && errors.review && (
                    <span className="error">{errors.review}</span>
                )}

                <div className="thumbs-container">
                    <button
                        type="button"
                        className={`thumbs-up-button ${
                            thumbsUp ? "active" : ""
                        }`}
                        onClick={handleThumbsUpClick}
                    >
                        <FaRegThumbsUp />
                    </button>
                    <button
                        type="button"
                        className={`thumbs-down-button ${
                            thumbsDown ? "active" : ""
                        }`}
                        onClick={handleThumbsDownClick}
                    >
                        <FaRegThumbsDown />
                    </button>
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddReview;
