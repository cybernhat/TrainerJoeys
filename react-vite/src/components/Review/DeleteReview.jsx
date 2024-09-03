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
        <div id="modal-container">
            <h1>Are you sure you want to delete this review?</h1>
            <div className="button-container">
                <button className="modal-button" onClick={handleDelete}>
                    Delete
                </button>
                <button className="modal-button" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteReview;
