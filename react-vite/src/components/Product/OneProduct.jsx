import "./OneProduct.css";
import * as productActions from "../../redux/product";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const OneProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.product[productId]);
    const productPokemon = product?.pokemon; // Use optional chaining

    console.log("product", product);

    useEffect(() => {
        dispatch(productActions.fetchOneProduct(productId));
    }, [dispatch, productId]);

    return (
        <div id="product-page-container">
            <div id="product-container">
                {productPokemon ? (
                    <div classNAme='product-card'>
                        <div className="pokemon-name-img-type-container">
                            <h2 className="name-container">
                                {productPokemon.name}
                            </h2>
                            <img
                                src={productPokemon.pokemon_img}
                                alt={productPokemon.name}
                                className="img_container"
                            />
                            <div className="type-container">
                                <h3>{productPokemon.type_1}</h3>
                                <h3>{productPokemon.type_2}</h3>
                            </div>
                        </div>
                        <div className='ability-item-nature-container'>
                            <h3>{product.ability}</h3>
                            <h3>{product.item}</h3>
                            <h3>{product.nature}</h3>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p> // Display a loading message or spinner while fetching data
                )}
            </div>
        </div>
    );
};

export default OneProduct;
