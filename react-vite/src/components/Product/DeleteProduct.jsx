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
        <div className="remove-product-modal-container">
            <h1 className="remove-product-modal-title">
                Are you sure you want to delete Product?
            </h1>
            <div className="remove-product-modal-buttons">
                <button
                    className="remove-product-modal-confirm"
                    onClick={handleDelete}
                >
                    Confirm
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
export default DeleteProduct;
