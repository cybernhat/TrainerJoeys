import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as watchlistActions from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import './AddToWatchlist.css'

const AddToWatchlist = ({ productId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.session.user);
    const watchlist = useSelector((state) => state.watchlist);
    const watchlistArr = Object.values(watchlist);

    const userWatchlist = watchlistArr.find(
        (watchlist) => watchlist.user_id === currUser.id
    );

    // Fetch the watchlist data when the component mounts
    useEffect(() => {
        dispatch(watchlistActions.fetchAllWatchlist());
    }, [dispatch]);

    const handleSubmit = async () => {
        try {
            // Dispatch the action to add the product to the user's watchlist
            dispatch(
                watchlistActions.addProductToWatchlist(
                    userWatchlist.id,
                    productId
                )
            );
            dispatch(watchlistActions.fetchAllWatchlist())
            closeModal(); // Close the modal after adding the product to the watchlist
        } catch (error) {
            console.error("Failed to add product to watchlist:", error);
        }
    };

    return (
        <div id="modal-container">
            <h1>Add to Watchlist?</h1>
            <div className="button-container">
                <button onClick={handleSubmit} className="modal-button">
                    Yes
                </button>
                <button onClick={closeModal} className="modal-button">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddToWatchlist;
