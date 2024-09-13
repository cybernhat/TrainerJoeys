import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Profile.css";
import * as productActions from "../../redux/product";
import * as watchlistActions from "../../redux/watchlist";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import DeleteProduct from "../../components/Product/DeleteProduct";
// import RemoveFromWatchlist from "../Watchlist/RemoveFromWatchlist";

const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("products");

    const productsObj = useSelector((state) => state.product);
    const products = Object.values(productsObj);
    const watchlistsObj = useSelector((state) => state.watchlist);
    const watchlists = Object.values(watchlistsObj);

    const userWatchlist =
        watchlists.find(
            (watchlist) => watchlist.user_id === parseInt(userId, 10)
        )?.watchlist_products || [];

    const userProducts = products.filter(
        (product) => product.user_id === parseInt(userId, 10)
    );

    const sampleProduct = userProducts.find(
        (product) => product.user_id === parseInt(userId, 10)
    );

    useEffect(() => {
        dispatch(productActions.fetchAllProducts());
        dispatch(watchlistActions.fetchAllWatchlist());
    }, [dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div id="profile-page-container">
            <div id="profile-top-container">
                <div id="profile-info-container">
                    <h1>{sampleProduct?.user.username}</h1>
                    <img
                        className="profile-avatar"
                        src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                        alt="Profile Avatar"
                    />
                </div>
                <div className="profile-links">
                    <div
                        className={activeTab === "products" ? "active" : ""}
                        onClick={() => handleTabChange("products")}
                    >
                        <h3 className="product-component-h3">Products</h3>
                    </div>
                    <div
                        className={activeTab === "watchlist" ? "watchlist" : ""}
                        onClick={() => handleTabChange("watchlist")}
                    >
                        <h3 className="product-component-h3">Watchlist</h3>
                    </div>
                </div>
            </div>
            <div id="profile-listings-container">
                {activeTab === "products" && (
                    <div className="product-list-container">
                        {userProducts.length === 0 ? (
                          <h3>This user hasn&apos;t listed any products yet</h3>
                        ) : (
                            userProducts.map((product) => {
                                const pokemonName =
                                    product.pokemon.name.charAt(0).toUpperCase() +
                                    product.pokemon.name.slice(1);

                                return (
                                    <div
                                        className="product-container"
                                        key={product.id}
                                    >
                                        <NavLink to={`/products/${product.id}`}>
                                            <div className="game-gen-container">
                                                <h3>Game: {product.game}</h3>
                                                <h4>
                                                    Game Generation:{" "}
                                                    {product.generation}
                                                </h4>
                                            </div>
                                            <div className="pokemon-image">
                                                <img
                                                    src={
                                                        product.pokemon
                                                            .pokemon_img
                                                    }
                                                    alt={pokemonName}
                                                />
                                            </div>
                                            <div className="name-level">
                                                <h3>{pokemonName}</h3>
                                                <h4>Level {product.level}</h4>
                                            </div>
                                            <div className="ability-nature-item">
                                                <h4>
                                                    Ability: {product.ability}
                                                </h4>
                                                <h4>
                                                    Nature: {product.nature}
                                                </h4>
                                                <h4>Item: {product.item}</h4>
                                            </div>
                                            <div className="move-container">
                                                <h5>{product.move_1}</h5>
                                                <h5>{product.move_2}</h5>
                                                <h5>{product.move_3}</h5>
                                                <h5>{product.move_4}</h5>
                                            </div>
                                            <div className="shiny-container">
                                                <h2
                                                    className={
                                                        product.shiny
                                                            ? "shiny"
                                                            : "not-shiny"
                                                    }
                                                >
                                                    {product.shiny
                                                        ? "Shiny!"
                                                        : "Not Shiny"}
                                                </h2>
                                            </div>
                                            <div className="price-container">
                                                <h3>${product.price}</h3>
                                            </div>
                                        </NavLink>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
                {activeTab === "watchlist" && (
                    <div className="product-list-container">
                        {userWatchlist.length === 0 ? (
                            <h3>
                                This user does not have any products on their
                                watchlist yet
                            </h3>
                        ) : (
                            userWatchlist.map((product) => {
                                const pokemonName =
                                    product.pokemon.name
                                        .charAt(0)
                                        .toUpperCase() +
                                    product.pokemon.name.slice(1);

                                return (
                                    <div
                                        className="product-container"
                                        key={product.id}
                                    >
                                        <NavLink to={`/products/${product.id}`}>
                                            <div className="game-gen-container">
                                                <h3>Game: {product.game}</h3>
                                                <h4>
                                                    Game Generation:{" "}
                                                    {product.generation}
                                                </h4>
                                            </div>
                                            <div className="pokemon-image">
                                                <img
                                                    src={
                                                        product.pokemon
                                                            .pokemon_img
                                                    }
                                                    alt={pokemonName}
                                                />
                                            </div>
                                            <div className="name-level">
                                                <h3>{pokemonName}</h3>
                                                <h4>Level {product.level}</h4>
                                            </div>
                                            <div className="ability-nature-item">
                                                <h4>
                                                    Ability: {product.ability}
                                                </h4>
                                                <h4>
                                                    Nature: {product.nature}
                                                </h4>
                                                <h4>Item: {product.item}</h4>
                                            </div>
                                            <div className="move-container">
                                                <h5>{product.move_1}</h5>
                                                <h5>{product.move_2}</h5>
                                                <h5>{product.move_3}</h5>
                                                <h5>{product.move_4}</h5>
                                            </div>
                                            <div className="shiny-container">
                                                <h2
                                                    className={
                                                        product.shiny
                                                            ? "shiny"
                                                            : "not-shiny"
                                                    }
                                                >
                                                    {product.shiny
                                                        ? "Shiny!"
                                                        : "Not Shiny"}
                                                </h2>
                                            </div>
                                            <div className="price-container">
                                                <h3>${product.price}</h3>
                                            </div>
                                        </NavLink>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
