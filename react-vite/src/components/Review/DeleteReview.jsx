import { useModal } from "../../context/Modal";
import * as reviewActions from "../../redux/review";
import { useDispatch } from "react-redux";
import "./DeleteReview.css";

const DeleteReview = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        if (reviewId) {
            dispatch(reviewActions.destroyReview(reviewId)).then(() => {
                closeModal();
            });
        } else {
            console.error("reviewId missing");
        }
    };

    return (
        <div className="remove-product-modal-container">
            <h1 className="remove-product-modal-title">
                Are you sure you want to delete this review?
            </h1>
            <div className="remove-product-modal-buttons">
                <button
                    className="remove-product-modal-confirm"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="remove-product-modal-cancel"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteReview;
