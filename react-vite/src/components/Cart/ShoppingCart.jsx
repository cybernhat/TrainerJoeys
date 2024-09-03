import "./ShoppingCart.css";
import * as cartActions from "../../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.session.user);

    // Get the current user's cart
    const carts = Object.values(useSelector((state) => state.cart)).find(
        (cart) => cart.user_id === currUser.id
    );
    const cartItems = carts?.cart_items || [];

    const handleSubmit = (productId) => {
        dispatch(cartActions.deleteProductFromCart(carts.id, productId));
    };

    const handleClearCart = (cartId) => {
        dispatch(cartActions.clearCartItems(cartId));
    };

    useEffect(() => {
        dispatch(cartActions.fetchAllCarts());
    }, [dispatch]);

    return (
        <div id="shopping-cart-container">
            <h1>Your Shopping Cart</h1>
            <div className="shopping-cart-item">
                {cartItems.length > 0 ? (
                    cartItems.map((product) => {
                        const pokemonName = product.pokemon?.name
                            ? product.pokemon.name.charAt(0).toUpperCase() +
                              product.pokemon.name.slice(1)
                            : "Unknown Pokémon";

                        const userName =
                            product.user?.username || "Unknown User";
                        const pokemonSprite =
                            product.pokemon?.pokemon_sprite ||
                            "default_sprite_url";

                        return (
                            <div id="product-card-container" key={product.id}>
                                <NavLink
                                    to={`/products/${product.id}`}
                                    id="product-card"
                                >
                                    <h3>{userName}</h3>
                                    <h2>{pokemonName}</h2>
                                    <img
                                        className="product-pokemon-img"
                                        src={pokemonSprite}
                                        alt={pokemonName}
                                    />
                                    <h2>Level {product.level}</h2>
                                    <h2>Item: {product.item}</h2>
                                    <h3>${product.price}</h3>
                                </NavLink>
                                <button
                                    id="remove-button"
                                    onClick={() => handleSubmit(product.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            {cartItems.length > 0 && (
                <div id="button-container">
                    <button onClick={() => handleClearCart(carts.id)}>
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
