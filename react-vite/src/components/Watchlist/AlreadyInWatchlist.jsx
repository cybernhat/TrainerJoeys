export { useModal } from "../../context/Modal";

const AlreadyInWatchlist = () => {
    const { closeModal } = useModal();

    const handleCancel = () => {
        closeModal()
    }
    return (
        <div>
            <h1>This product is already in your watchlist!</h1>
            <button onClick={handleCancel}></button>
        </div>
    );
};

export default AlreadyInWatchlist
