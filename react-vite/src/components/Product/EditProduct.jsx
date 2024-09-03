import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
// import * as pokemonActions from "../../redux/pokemon";
import * as productImageActions from "../../redux/productimage";
// import { useNavigate } from "react-router-dom";
import "./EditProduct.css";
import { useEffect, useState } from "react";

const EditProduct = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const navigate = useNavigate();
    // const currUser = useSelector(state => state.session.user)
    const product = useSelector((state) => state.product[productId]);
    const productImage = product?.product_image?.[0];
    const productImageId = productImage?.id;
    // const product_image = product?.product_image?.[0]
    // const productImageId = product_image.id

    const [level, setLevel] = useState("");
    const [item, setItem] = useState("");
    const [game, setGame] = useState("");
    const [generation, setGeneration] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [move_1, setMove1] = useState("");
    const [move_2, setMove2] = useState("");
    const [move_3, setMove3] = useState("");
    const [move_4, setMove4] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [productImageUrl, setProductImageUrl] = useState("");
    const [productImagePreview, setProductImagePreview] = useState(""); // store image preview URL
    const [productImageFilename, setProductImageFilename] = useState(""); // store the image file name
    const [productImageLoading, setProductImageLoading] = useState(false);
    const [productImageError, setProductImageError] = useState("");

    useEffect(() => {
        const formErrors = {};

        if (!level) formErrors.level = "Level is required";
        if (level <= 0 || level > 100)
            formErrors.level = "Levels are between 1-100";

        if (!item) formErrors.item = "Item is required";

        if (!game) formErrors.game = "Game is required";

        if (!generation) formErrors.generation = "Generation is required";
        if (generation > 9) formErrors.generation = "There are 9 generations";

        if (!quantity) formErrors.quantity = "Please enter a quantity";
        if (!price) formErrors.price = "Please enter a price";
        if (!description) formErrors.description = "Please enter a description";
        if (description.length > 500)
            formErrors.description = "Description too long";

        if (!move_1) formErrors.move_1 = "Please enter a move";
        if (!productImageUrl)
            formErrors.productImageUrl = "Please upload an image";

        setErrors(formErrors);
    }, [
        level,
        item,
        game,
        generation,
        quantity,
        price,
        description,
        move_1,
        productImageUrl,
    ]);

    useEffect(() => {
        dispatch(productActions.fetchOneProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setLevel(product.level);
            setItem(product.item);
            setGame(product.game);
            setGeneration(product.generation);
            setPrice(product.price);
            setDescription(product.description);
            setQuantity(product.quantity);
            setMove1(product.move_1);
            setMove2(product.move_2);
            setMove3(product.move_3);
            setMove4(product.move_4);
        }

        if (productImage) {
            setProductImageUrl(productImage.img_url);
            setProductImageFilename(productImage.filename);
            setProductImagePreview(productImage.img_url);
        }
    }, [product, productImage]);
    const fileWrap = (e) => {
        e.stopPropagation();
        const tempFile = e.target.files[0];

        if (tempFile.size > 5000000) {
            setProductImageError("Image exceeds the maximum file size of 5MB");
            setProductImagePreview("");
            setProductImageFilename("");
            return;
        }

        const newFilename = `product_image_${Date.now()}.${tempFile.name
            .split(".")
            .pop()}`;
        const newFile = new File([tempFile], newFilename, {
            type: tempFile.type,
        });
        const newProductImageURL = URL.createObjectURL(tempFile); // generate a local URL for the image preview

        setProductImagePreview(newProductImageURL);
        setProductImageUrl(newFile);
        setProductImageFilename(newFile.name);
        setProductImageError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const productData = {
            level,
            item,
            game,
            generation,
            price,
            quantity,
            description,
            move_1,
            move_2,
            move_3,
            move_4,
        };

        dispatch(productActions.putProduct(productData, productId));

        if (productImageUrl) {
            const updatedProductImageData = new FormData();
            updatedProductImageData.append(
                "product_image_url",
                productImageUrl
            );
            updatedProductImageData.append("product_id", productId);
            updatedProductImageData.append("filename", productImageFilename);

            setProductImageLoading(true);
            await dispatch(
                productImageActions.putProductImage(
                    productImageId,
                    updatedProductImageData
                )
            );
            setProductImageLoading(false);
        }

        await dispatch(productActions.fetchOneProduct(productId));
        // navigate(`/products/${productId}`)
        closeModal();
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            id="edit-form-container"
        >
            <div
                style={{
                    position: "relative",
                    height: "240px",
                    marginTop: "6px",
                }}
            >
                <div className="container-label-input-image">
                    <input
                        id="product-image-upload"
                        type="file"
                        accept="image/*"
                        name="img_url"
                        onChange={fileWrap}
                        className="input-file-image"
                    />
                    <label
                        htmlFor="product-image-upload"
                        className="image-label"
                    >
                        Upload Product Image
                    </label>
                    {hasSubmitted && errors.productImageUrl}
                </div>
                {productImagePreview && (
                    <img
                        src={productImagePreview}
                        alt="product image preview"
                        style={{ width: "300px", maxHeight: "200px" }}
                        className="product-image"
                    />
                )}
                {productImageLoading && (
                    <p style={{ color: "#999", fontSize: "12px" }}>
                        Uploading product image...
                    </p>
                )}
            </div>
            <div id="info-container">
                <div className="level-item-container">
                    <div className="edit-level-container">
                        <label>Level:</label>
                        <input
                            type="number"
                            value={level}
                            onChange={(e) =>
                                setLevel(
                                    e.target.value === ""
                                        ? ""
                                        : parseInt(e.target.value, 10)
                                )
                            }
                            placeholder=""
                        />
                        {hasSubmitted && errors.level && (
                            <span>{errors.level}</span>
                        )}
                        {hasSubmitted && productImageError && (
                            <span>{productImageError}</span>
                        )}
                    </div>
                    <div className="edit-item-container">
                        <label>Item:</label>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="Enter held item"
                        />
                        {hasSubmitted && errors.item && (
                            <span>{errors.item}</span>
                        )}
                    </div>
                </div>
                <div className="game-generation-container">
                    <div className="game-container">
                        <label>Game:</label>
                        <input
                            type="text"
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                            placeholder="Enter product's current game"
                        />
                        {hasSubmitted && errors.game && (
                            <span>{errors.game}</span>
                        )}
                    </div>
                    <div className="generation-container">
                        <label>Generation:</label>
                        <input
                            type="number"
                            value={generation}
                            onChange={(e) =>
                                setGeneration(
                                    e.target.value === ""
                                        ? ""
                                        : parseInt(e.target.value, 10)
                                )
                            }
                            placeholder="Enter game's generation"
                        />
                        {hasSubmitted && errors.generation && (
                            <span>{errors.generation}</span>
                        )}
                    </div>
                </div>
                <div className="quantity-price-container">
                    <div className="quantity-container">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    e.target.value === ""
                                        ? ""
                                        : parseInt(e.target.value, 10)
                                )
                            }
                            placeholder=""
                        />
                        {hasSubmitted && errors.quantity && (
                            <span>{errors.quantity}</span>
                        )}
                    </div>
                    <div className="value-container">
                        <label>Price:</label>
                        <input
                            type="text" // Changed from number to text to handle decimal values
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder=""
                        />
                        {hasSubmitted && errors.price && (
                            <span>{errors.price}</span>
                        )}
                    </div>
                </div>
                <div className="description-container">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description (IV and EV for example)"
                    />
                    {hasSubmitted && errors.description && (
                        <span>{errors.description}</span>
                    )}
                </div>
                <div className="moves-container">
                    <div className="move-1-container">
                        <label>Move 1:</label>
                        <input
                            type="text"
                            value={move_1}
                            onChange={(e) => setMove1(e.target.value)}
                            placeholder="Mandatory"
                        />
                        {hasSubmitted && errors.move_1 && (
                            <span>{errors.move_1}</span>
                        )}
                    </div>
                    <div className="move-2-container">
                        <label>Move 2:</label>
                        <input
                            type="text"
                            value={move_2}
                            onChange={(e) => setMove2(e.target.value)}
                        />
                    </div>
                    <div className="move-3-container">
                        <label>Move 3:</label>
                        <input
                            type="text"
                            value={move_3}
                            onChange={(e) => setMove3(e.target.value)}
                        />
                    </div>
                    <div className="move-4-container">
                        <label>Move 4:</label>
                        <input
                            type="text"
                            value={move_4}
                            onChange={(e) => setMove4(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditProduct;
