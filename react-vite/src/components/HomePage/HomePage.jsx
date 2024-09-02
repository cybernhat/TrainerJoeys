import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../redux/product";
import * as watchlistActions from "../../redux/watchlist";
import * as cartActions from "../../redux/cart";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./HomePage.css";
import AddToWatchlist from "../Watchlist/AddToWatchlist";

const HomePage = () => {
    const dispatch = useDispatch();
    const productsObj = useSelector((state) => state.product);
    const currUser = useSelector((state) => state.session.user);
    const products = Object.values(productsObj);
    const watchlistsObj = useSelector((state) => state.watchlist);
    const watchlists = Object.values(watchlistsObj);
    const cartsObj = useSelector((state) => state.cart);
    const carts = Object.values(cartsObj);

    const [localCart, setLocalCart] = useState([]);

    const userWatchlist =
        (currUser &&
            watchlists.find((watchlist) => watchlist.user_id === currUser.id)
                ?.watchlist_products) ||
        [];

    const userCart =
        (currUser &&
            carts.find((cart) => cart.user_id === currUser.id)?.cart_items) ||
        [];

    const userCartId =
        (currUser && carts.find((cart) => cart.user_id === currUser.id)?.id) ||
        "";

    useEffect(() => {
        dispatch(productActions.fetchAllProducts());
        dispatch(watchlistActions.fetchAllWatchlist());
        dispatch(cartActions.fetchAllCarts());
    }, [dispatch]);

    useEffect(() => {
        setLocalCart(userCart);
    }, [userCart]);

    const handleAddToCart = (productId) => {
        dispatch(cartActions.addProductToCart(userCartId, productId)).then(
            () => {
                // Update local state to reflect the change
                setLocalCart([...localCart, { id: productId }]);
            }
        );
        console.log("Success!");
    };

    return (
        <div id="homepage-container">
            <h1>Products Listing</h1>
            <div className="product-list-container">
                {products.map((product) => {
                    const pokemonName =
                        product.pokemon.name.charAt(0).toUpperCase() +
                        product.pokemon.name.slice(1);

                    // Check if the product is in the user's watchlist
                    const isWatchlisted = userWatchlist.some(
                        (watchlistProduct) => watchlistProduct.id === product.id
                    );

                    // Check if the product is in the user's cart
                    const isInCart = localCart.some(
                        (cartItem) => cartItem.id === product.id
                    );

                    return (
                        <div className="product-container" key={product.id}>
                            <NavLink to={`/products/${product.id}`}>
                                <div className="game-gen-container">
                                    <h2>By {product.user.username}</h2>
                                    <h3>Game: {product.game}</h3>
                                    <h4>
                                        Game Generation: {product.generation}
                                    </h4>
                                </div>
                                <div className="pokemon-image">
                                    <img
                                        src={product.pokemon.pokemon_img}
                                        alt={pokemonName}
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
                                        {product.shiny ? "Shiny!" : "Not Shiny"}
                                    </h2>
                                </div>
                                <div className="price-container">
                                    <h3>${product.price}</h3>
                                </div>
                            </NavLink>
                            {currUser && currUser.id === product.user_id ? (
                                <h3 className="user-product">
                                    This is your product!
                                </h3>
                            ) : (
                                <div className="cart-watchlist">
                                    {isInCart ? (
                                        <span className="cart-text">
                                            Added to Cart
                                        </span>
                                    ) : (
                                        <button
                                            className="cart-button"
                                            onClick={() =>
                                                handleAddToCart(product.id)
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                    {isWatchlisted ? (
                                        <span className="watchlisted-text">
                                            Watchlisted
                                        </span>
                                    ) : (
                                        <OpenModalButton
                                            buttonText="Add to Watchlist"
                                            modalComponent={
                                                <AddToWatchlist
                                                    productId={product.id}
                                                    watchlistId={
                                                        currUser.watchlist.id
                                                    }
                                                />
                                            }
                                            className="add-to-watchlist-button"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
