import "./ShoppingCart.css";
import * as cartActions from "../../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ThankYouModal from "./ThankYouModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.session.user);

    // Get the current user's cart
    const carts = Object.values(useSelector((state) => state.cart)).find(
        (cart) => cart.user_id === currUser.id
    );
    const cartItems = carts?.cart_items || [];

    // Handle product removal
    const handleSubmit = (productId) => {
        dispatch(cartActions.deleteProductFromCart(carts.id, productId));
    };

    // Handle cart clearance and show the ThankYouModal immediately
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
                                    <h2>${product.price}</h2>
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
                {cartItems.length > 0 && (
                    <div id="button-container">
                        {/* Use OpenModalButton to handle opening modal */}
                        <OpenModalButton
                            buttonText="Checkout"
                            onButtonClick={() => handleClearCart(carts.id)} // Perform checkout logic
                            modalComponent={<ThankYouModal />} // Show ThankYouModal on checkout
                            className='checkout-button'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
