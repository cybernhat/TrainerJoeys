import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as watchlistActions from "../../redux/watchlist";

const AddToWatchlist = ({ productId, watchlistId }) => {
    const dispatch = useDispatch();

    const watchlist = useSelector((state) => state.watchlist);

    useEffect(() => {
        dispatch(watchlistActions.fetchAllWatchlist());
    }, [dispatch]);

    return <h1>Hello from AddToWatchlist modal!</h1>;
};

export default AddToWatchlist;
