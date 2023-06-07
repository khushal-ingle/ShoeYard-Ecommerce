import { useContext } from "react"
import { DataContext } from "../../Contexts/DataContext"
import "./ProductCard.css"
import { useNavigate } from "react-router";
export const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const { handleAddToCart, handleAddToWishlist, handleRemoveFromWishlist, isProductInCart, isProductInWishlist, getProductDetails} = useContext(DataContext);

    const isInCart = isProductInCart(product);

    const addToCartHandler = (product) => {
        isInCart ? navigate("/cart") : handleAddToCart(product)
    }

    const isInwishlist = isProductInWishlist(product);

    const addToWishlistHandler = (product) => {
        isInwishlist ? handleRemoveFromWishlist(product) : handleAddToWishlist(product)
    }


    return (
        <>
            <div className="productCard" key={product?._id}>
                <div className="productImage">
                    <div></div>
                    <div>
                        <img src={product?.img} alt="book-cover"
                            onClick={() => getProductDetails(product?._id)}
                        />
                    </div>
                    <button className="btn-wishlist" onClick={() => addToWishlistHandler(product)}>
                        <i className="fa fa-heart" aria-hidden="true" style={{ color: isInwishlist ? "red" : "grey" }}></i>
                    </button>
                </div>
                <div className="productDescription">
                    <div className="product-desc-details">
                        <p className="productName">{product?.name}</p>
                    </div>
                    <div className="product-author-rating">
                        <div>
                            <p className="productAuthor">{product?.author}</p>
                            <p className="productAuthor">{product?.category}</p>
                        </div>
                        <div className="productRating">
                            {product?.rating}
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="product-desc-price">
                    <p className="productPrice"><span>₹{product?.price}{"  "}</span></p>
                </div>
                <button className="btn-addToCart" onClick={() => addToCartHandler(product)}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                    {!isInCart ? "Add To Cart" : "Go To Cart"}
                </button>
            </div>
        </>
    )
}