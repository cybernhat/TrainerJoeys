import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserPage.css";
import * as productActions from "../../redux/product";
import * as watchlistActions from "../../redux/watchlist";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProduct from "../../components/Product/DeleteProduct";
import RemoveFromWatchlist from "../Watchlist/RemoveFromWatchlist";
import EditProduct from "../../components/Product/EditProduct";

const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("products");

    const currUser = useSelector((state) => state.session.user);
    const productsObj = useSelector((state) => state.product);
    const products = Object.values(productsObj);
    const watchlistsObj = useSelector((state) => state.watchlist);
    const watchlists = Object.values(watchlistsObj);

    const userWatchlist =
        (currUser &&
            watchlists.find((watchlist) => watchlist.user_id === currUser.id)
                ?.watchlist_products) ||
        [];

    const userProducts = products.filter(
        (product) => product.user_id === currUser.id
    );

    useEffect(() => {
        if (!currUser) {
            navigate("/");
        }
    }, [currUser, navigate]);

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
                    <h1>Hello {currUser?.first_name}!</h1>
                    <img
                        className="profile-avatar"
                        src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                    />
                </div>
                <div className="profile-links">
                    <div
                        className={activeTab === "products" ? "active" : ""}
                        onClick={() => handleTabChange("products")}
                    >
                        Products
                    </div>
                    <div
                        className={activeTab === "watchlist" ? "watchlist" : ""}
                        onClick={() => handleTabChange("watchlist")}
                    >
                        Watchlist
                    </div>
                </div>
            </div>
            {/* {activeTab === "products" && (
                <h1>Hello from User's Product</h1>
            )} */}
            <div id="profile-listings-container">
                {activeTab === "products" && (
                    <div className="product-list-container">
                        {userProducts.map((product) => {
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
                                                    product.pokemon.pokemon_img
                                                }
                                            />
                                        </div>
                                        <div className="name-level">
                                            <h3>{pokemonName}</h3>
                                            <h4>Level {product.level}</h4>
                                        </div>
                                        <div className="ability-nature-item">
                                            <h4>Ability: {product.ability}</h4>
                                            <h4>Nature: {product.nature}</h4>
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
                                    <div id="user-product-edit-delete-container">
                                        <div className="edit-button-container">
                                            <OpenModalButton
                                                buttonText="Edit"
                                                modalComponent={
                                                    <EditProduct
                                                        productId={product.id}
                                                    />
                                                }
                                                className="edit-product-button"
                                            />
                                        </div>
                                        <div className="delete-button-container">
                                            <OpenModalButton
                                                buttonText="Delete"
                                                modalComponent={
                                                    <DeleteProduct
                                                        productId={product.id}
                                                    />
                                                }
                                                className="delete-product-button"
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="cart-watchlist">
                                    <button className="cart-button">
                                        Add to Cart
                                    </button>
                                    <button className='watchlist-button'>
                                        Add to Watchlist
                                    </button>
                                </div> */}
                                </div>
                            );
                        })}
                    </div>
                )}
                {activeTab === "watchlist" && (
                    <div className="product-list-container">
                        {userWatchlist.map((product) => {
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
                                                    product.pokemon.pokemon_img
                                                }
                                            />
                                        </div>
                                        <div className="name-level">
                                            <h3>{pokemonName}</h3>
                                            <h4>Level {product.level}</h4>
                                        </div>
                                        <div className="ability-nature-item">
                                            <h4>Ability: {product.ability}</h4>
                                            <h4>Nature: {product.nature}</h4>
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
                                    <div className="watchlist-button-container">
                                        <OpenModalButton
                                            buttonText="Remove"
                                            modalComponent={
                                                <RemoveFromWatchlist
                                                    productId={product.id}
                                                />
                                            }
                                            className="watchlist-product-button"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
