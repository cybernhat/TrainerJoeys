import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import * as productActions from "../../redux/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";

const LandingPage = () => {
    const dispatch = useDispatch();

    const productsObj = useSelector((state) => state.product);
    const products = Object.values(productsObj);

    // Select the first 5 products
    const featuredProducts = products.slice(0, 6);

    useEffect(() => {
        dispatch(productActions.fetchAllProducts());
    }, [dispatch]);

    return (
        <div id="landing-page-container">
            <div className="welcome-title">
                <h1 className="welcome-h1">Welcome To</h1>
                <img
                    src="../../../official_logo.png"
                    className="welcome-logo"
                />
                <h2 className="description-h2">
                    Have a rare or powerful Pokemon? List them for sale here!
                </h2>
                <NavLink className="shop-link" to="/home">
                    <h1 className="link-to-shop">Shop Now!</h1>
                </NavLink>
                <img className="joey-pic" src="../../../joey-png.png" />
                <h1 className="featured-products">Featured Products:</h1>
                <Carousel className="featured-carousel">
                    {featuredProducts.map((product) => (
                        <NavLink
                            to={`/products/${product.id}`}
                            key={product.id}
                            className="carousel-item"
                        >
                            <div className="homepage-type-container"></div>
                            <h2>By {product.user.username}</h2>
                            <img
                                src={product.pokemon.pokemon_img}
                                alt={product.pokemon.name}
                                className="carousel-image"
                            />
                            <div className="info-container">
                                <div className="name-price-container">
                                    <h2 className="carousel-product-name">
                                        {product.pokemon.name}
                                    </h2>
                                    <h3 className="carousel-product-level">
                                        Level {product.level}
                                    </h3>
                                    <h2>${product.price}</h2>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default LandingPage;
