import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../redux/product";
import * as pokemonActions from "../../redux/pokemon";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./HomePage.css";
import AddToWatchlist from "../Watchlist/AddToWatchlist";

const HomePage = () => {
    const dispatch = useDispatch();
    const productsObj = useSelector((state) => state.product);
    const currUser = useSelector((state) => state.session.user);

    const products = Object.values(productsObj);
    console.log("AAAAAAAAAAAAAAA", currUser);

    useEffect(() => {
        dispatch(productActions.fetchAllProducts());
    }, [dispatch]);

    return (
        <div id="homepage-container">
            <h1>Products Listing</h1>
            <div className="product-list-container">
                {products.map((product) => {
                    const pokemonName =
                        product.pokemon.name.charAt(0).toUpperCase() +
                        product.pokemon.name.slice(1);

                    return (
                        <div className="product-container" key={product.id}>
                            <NavLink to={`/products/${product.id}`}>
                                <div className="game-gen-container">
                                    <h3>Game: {product.game}</h3>
                                    <h4>
                                        Game Generation: {product.generation}
                                    </h4>
                                </div>
                                <div className="pokemon-image">
                                    <img src={product.pokemon.pokemon_img} />
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
                                    <button className="cart-button">
                                        Add to Cart
                                    </button>
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
                                </div>
                            )}
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
        </div>
    );
};

export default HomePage;
