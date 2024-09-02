import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./RemoveFromWatchlist";
import * as watchlistActions from "../../redux/watchlist";
import { useSelector } from "react-redux";

const RemoveFromWatchlist = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currUser = useSelector((state) => state.session.user);

    const watchlistId = currUser?.watchlist.id;

    const handleDelete = () => {
        if (productId) {
            dispatch(
                watchlistActions.deleteProductFromWatchlist(
                    watchlistId,
                    productId
                )
            ).then(() => {
                closeModal();
            });
        } else {
            console.error("some info missing");
        }
    };
    return (
        <div className="remove-product-modal-container">
            <h1 className="remove-product-modal-title">
                Remove this product from your watchlist?
            </h1>
            <div className="remove-product-modal-buttons">
                <button
                    className="remove-product-modal-confirm"
                    onClick={handleDelete}
                >
                    Remove
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

export default RemoveFromWatchlist;
