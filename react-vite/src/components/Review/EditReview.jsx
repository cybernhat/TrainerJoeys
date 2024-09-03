import { useEffect, useState } from "react";
import "./AddReview.css";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../redux/review";
import { useModal } from "../../context/Modal";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

const EditReview = ({ reviewId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const review = useSelector((state) => state.review[reviewId]);
    const [description, setDescription] = useState(review?.description || "");
    const [thumbsUp, setThumbsUp] = useState(review?.thumbs_up || false);
    const [thumbsDown, setThumbsDown] = useState(review?.thumbs_down || false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let reviewErrors = {};
        if (description.length <= 0)
            reviewErrors.description = "Please write a review";
        setErrors(reviewErrors);
    }, [description]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (Object.keys(errors).length) return;

        const reviewData = {
            description,
            thumbs_up: thumbsUp,
            thumbs_down: thumbsDown,
        };

        await dispatch(reviewActions.putReview(reviewId, reviewData));
        dispatch(reviewActions.fetchAllReviews())
        closeModal();
    };

    return (
        <div id="review-form-container">
            <h1>Edit your review</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="review-text-area"
                    placeholder="Leave a review"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {hasSubmitted && errors.description && (
                    <span className="error">{errors.description}</span>
                )}
                <div className="thumbs-container">
                    <button
                        type="button"
                        className={`thumbs-up-button ${
                            thumbsUp ? "active" : ""
                        }`}
                        onClick={() => {
                            setThumbsUp(true);
                            setThumbsDown(false);
                        }}
                    >
                        <FaRegThumbsUp />
                    </button>
                    <button
                        type="button"
                        className={`thumbs-down-button ${
                            thumbsDown ? "active" : ""
                        }`}
                        onClick={() => {
                            setThumbsDown(true);
                            setThumbsUp(false);
                        }}
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

export default EditReview
