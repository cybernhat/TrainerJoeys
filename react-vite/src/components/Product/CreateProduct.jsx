import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productImageActions from "../../redux/productimage";
import * as pokemonActions from "../../redux/pokemon";
import * as productActions from "../../redux/product";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

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
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [productImageUrl, setProductImageUrl] = useState("");
    const [productImagePreview, setProductImagePreview] = useState(""); // store image preview URL
    const [productImageFilename, setProductImageFilename] = useState(""); // store the image file name
    const [productImageLoading, setProductImageLoading] = useState(false);
    const [productImageError, setProductImageError] = useState("");

    useEffect(() => {
        const formErrors = {};
        if (!pokemonId) formErrors.pokemon = "Please select a Pokemon";

        if (!level) formErrors.level = "Level is required";
        if (level <= 0 || level > 100) formErrors.level = "Levels are between 1-100"

        if (!ability) formErrors.ability = "Ability is required";
        if (!item) formErrors.item = "Item is required";
        if (!nature) formErrors.nature = "Nature is required";
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
        pokemonId,
        level,
        ability,
        item,
        nature,
        game,
        generation,
        quantity,
        price,
        description,
        move_1,
        productImageUrl,
    ]);

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
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) {
            return; // Prevent form submission if there are errors
        }

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

        navigate(`/products/${newProduct.id}`);
    };

    return (
        <form
            id="create-product-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            {/* Image Upload Section */}
            <div
                style={{
                    position: "relative",
                    height: "240px",
                    marginTop: "6px",
                }}
            >
                <div className="select-pokemon-container">
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
                    {hasSubmitted && errors.pokemon && (
                        <span>{errors.pokemon}</span>
                    )}
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
                    {hasSubmitted && errors.productImageUrl}
                    {hasSubmitted && productImageError && (
                        <span>{productImageError}</span>
                    )}
                </div>
                {productImagePreview && (
                    <img
                        src={productImagePreview}
                        alt="product image preview"
                        style={{ width: "300px", maxHeight: "200px" }}
                        className="product-image"
                    />
                )}
                {/* {productImageFilename && (
                    <span style={{ color: "#999", fontSize: "12px" }}>
                        {productImageFilename}
                    </span>
                )} */}
                {productImageLoading && (
                    <p style={{ color: "#999", fontSize: "12px" }}>
                        Uploading product image...
                    </p>
                )}
            </div>

            {/* Form Fields for Product Details */}
            <div id="info-container">
                <div className="level-ability-container">
                    <div className="level-container">
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
                    </div>
                    <div className="ability-container">
                        <label>Ability:</label>
                        <input
                            type="text"
                            value={ability}
                            onChange={(e) => setAbility(e.target.value)}
                            placeholder="Enter ability"
                        />
                        {hasSubmitted && errors.ability && (
                            <span>{errors.ability}</span>
                        )}
                    </div>
                </div>
                <div className="item-nature-container">
                    <div className="item-container">
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
                    <div className="nature-container">
                        <label>Nature:</label>
                        <input
                            type="text"
                            value={nature}
                            onChange={(e) => setNature(e.target.value)}
                            placeholder="Enter nature"
                        />
                        {hasSubmitted && errors.nature && (
                            <span>{errors.nature}</span>
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
                            placeholder="Enter product's game"
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
                <div className="shiny-container">
                    <label>Shiny? </label>
                    <input
                        type="checkbox"
                        checked={shiny}
                        onChange={(e) => setShiny(e.target.checked)}
                    />
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
                        className="description-text"
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

export default UploadPicture;
