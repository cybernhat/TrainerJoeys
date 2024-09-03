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
    const product = useSelector(state => state.product[productId])
    const productImage = product?.product_image?.[0]
    const productImageId = productImage?.id
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

    const [productImageUrl, setProductImageUrl] = useState("");
    const [productImagePreview, setProductImagePreview] = useState(""); // store image preview URL
    const [productImageFilename, setProductImageFilename] = useState(""); // store the image file name
    const [productImageLoading, setProductImageLoading] = useState(false);
    const [productImageError, setProductImageError] = useState("");

    useEffect(() => {
        dispatch(productActions.fetchOneProduct(productId))
    }, [dispatch, productId])

    console.log('AAAAAAAAAAAAA', productImageId)

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
            setMove4(product.move_4)
        }

        if (productImage) {
            setProductImageUrl(productImage.img_url);
            setProductImageFilename(productImage.filename);
            setProductImagePreview(productImage.img_url);
        }
    }, [product, productImage])
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

        const productData = {
            level,
            item,
            game,
            generation,
            price,
            description,
            move_1,
            move_2,
            move_3,
            move_4,
        };

        dispatch(productActions.putProduct(productData, productId));

        if (productImageUrl) {
            const updatedProductImageData = new FormData();
            updatedProductImageData.append("product_image_url", productImageUrl);
            updatedProductImageData.append("product_id", productId);
            updatedProductImageData.append("filename", productImageFilename);

            setProductImageLoading(true);
            await dispatch(productImageActions.putProductImage(productImageId, updatedProductImageData))
            setProductImageLoading(false);
        }

        await dispatch(productActions.fetchOneProduct(productId))
        // navigate(`/products/${productId}`)
        closeModal()
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                </div>
                {productImagePreview && (
                    <img
                        src={productImagePreview}
                        alt="product image preview"
                        style={{ width: "100%", maxHeight: "135px" }}
                    />
                )}
                {productImageFilename && (
                    <span style={{ color: "#999", fontSize: "12px" }}>
                        {productImageFilename}
                    </span>
                )}
                {productImageLoading && (
                    <p style={{ color: "#999", fontSize: "12px" }}>
                        Uploading product image...
                    </p>
                )}
            </div>
            <div>
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
                <label>Item:</label>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Enter held item"
                />
                <label>Game:</label>
                <input
                    type="text"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    placeholder="Enter product's current game"
                />
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
                <label>Price:</label>
                <input
                    type="text" // Changed from number to text to handle decimal values
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder=""
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description (IV and EV for example)"
                />
                <label>Move 1:</label>
                <input
                    type="text"
                    value={move_1}
                    onChange={(e) => setMove1(e.target.value)}
                    placeholder="Mandatory"
                />

                <label>Move 2:</label>
                <input
                    type="text"
                    value={move_2}
                    onChange={(e) => setMove2(e.target.value)}
                />

                <label>Move 3:</label>
                <input
                    type="text"
                    value={move_3}
                    onChange={(e) => setMove3(e.target.value)}
                />

                <label>Move 4:</label>
                <input
                    type="text"
                    value={move_4}
                    onChange={(e) => setMove4(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditProduct;
