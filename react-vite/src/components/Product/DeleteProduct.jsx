import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteProduct";
import { deleteProduct } from "../../redux/product";

const DeleteProduct = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        if (productId) {
            dispatch(deleteProduct(productId)).then(() => {
                closeModal();
            });
        } else {
            console.error("productId missing");
        }
    };

    return (
        <div id="modal-container">
            <h1>Are you sure you want to delete Product?</h1>

            <div className="button-container">
                <button className="modal-button" onClick={handleDelete}>
                    Confirm
                </button>
                <button className="modal-button" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
};
export default DeleteProduct;
