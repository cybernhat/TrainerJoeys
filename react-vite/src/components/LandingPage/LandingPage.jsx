import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import * as productActions from "../../redux/product";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LandingPage = () => {
    const dispatch = useDispatch();

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
                    <h1 className="link-to-shop">Click Here to Browse Products</h1>
                </NavLink>
                <h1 className="featured-products">Featured Products:</h1>
            </div>
        </div>
    );
};

export default LandingPage;
