import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productImageActions from "../../redux/productimage";
import * as pokemonActions from "../../redux/pokemon";
import * as productActions from "../../redux/product";
import { useNavigate } from "react-router-dom";

const UploadPicture = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currUser = useSelector((state) => state.session.user);
    const allPokemon = useSelector((state) => state.pokemon);

    const [pokemonId, setPokemonId] = useState("");
    const [level, setLevel] = useState("");
    const [ability, setAbility] = useState("");
    const [item, setItem] = useState("");
    const [nature, setNature] = useState("");
    const [game, setGame] = useState("");
    const [shiny, setShiny] = useState(false);
    const [generation, setGeneration] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
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
        dispatch(pokemonActions.fetchAllPokemon());
    }, [dispatch]);

    useEffect(() => {
        if (!currUser) navigate("/");
    }, [currUser, navigate]);

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
            pokemon_id: parseInt(pokemonId),
            user_id: currUser.id,
            level,
            ability,
            item,
            nature,
            game,
            shiny,
            generation,
            quantity,
            price: parseFloat(price), // Convert price to float
            description,
            move_1,
            move_2,
            move_3,
            move_4,
        };

        const newProduct = await dispatch(
            productActions.postProduct(productData)
        );
        const newProductId = newProduct.id;

        const productImageData = new FormData();

        productImageData.append("img_url", productImageUrl);
        productImageData.append("product_id", newProductId);
        productImageData.append("filename", productImageFilename);

        setProductImageLoading(true);
        await dispatch(productImageActions.postProductImage(productImageData));
        setProductImageLoading(false);

        navigate(`/products/${newProduct.id}`)
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Image Upload Section */}
            <div
                style={{
                    position: "relative",
                    height: "240px",
                    marginTop: "6px",
                }}
            >
                <div>
                    <label htmlFor="pokemon">Select Pokémon:</label>
                    <select
                        id="pokemon"
                        value={pokemonId}
                        onChange={(e) => setPokemonId(e.target.value)}
                    >
                        <option value="">Select a Pokémon</option>
                        {Object.values(allPokemon).map((pokemon) => (
                            <option key={pokemon.id} value={pokemon.id}>
                                {pokemon.name}
                            </option>
                        ))}
                    </select>
                </div>
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

            {/* Form Fields for Product Details */}
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
                <label>Ability:</label>
                <input
                    type="text"
                    value={ability}
                    onChange={(e) => setAbility(e.target.value)}
                    placeholder="Enter ability"
                />

                <label>Item:</label>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Enter held item"
                />

                <label>Nature:</label>
                <input
                    type="text"
                    value={nature}
                    onChange={(e) => setNature(e.target.value)}
                    placeholder="Enter nature"
                />

                <label>Game:</label>
                <input
                    type="text"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    placeholder="Enter product's current game"
                />

                <label>Shiny? </label>
                <input
                    type="checkbox"
                    checked={shiny}
                    onChange={(e) => setShiny(e.target.checked)}
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

export default UploadPicture;
