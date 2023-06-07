import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export const CartProduct = ({ cartItem }) => {
    const { handleMoveToWishlist, handleRemoveFromCart, isProductInWishlist, increaseProductQuantity, cart, decreaseProductQuantity } = useContext(DataContext);

    const checkQuantity = (cartItem) => {
        if (cart.find(item => item._id === cartItem._id).qty > 1) {
            decreaseProductQuantity(cartItem._id)
        } else {
            handleRemoveFromCart(cartItem);
        }
    }
    return (
        <>
            <div className="cartCard" key={cartItem?._id}>
                <div className="productImage">
                    <div></div>
                    <div>
                        <img src={cartItem?.img} alt="book-cover" />
                    </div>
                </div>
                <div className="productDescription">
                    <div>
                        <p className="productName">{cartItem?.name}</p>
                        <p className="productAuthor">{cartItem?.author}</p>
                        <p className="productPrice"><span>₹{cartItem?.price}{"  "}</span></p>
                    </div>
                    <div>Quantity: {cartItem.qty}{" "}<button onClick={() => increaseProductQuantity(cartItem?._id)}>+</button>{" "}
                        <button onClick={() => checkQuantity(cartItem)}>-</button>
                    </div>
                    <div>
                        <button className="btn-moveToWishlist" style={{ backgroundColor: isProductInWishlist(cartItem) ? "lightgray" : "#007bb5" }} disabled={isProductInWishlist(cartItem)} onClick={() => handleMoveToWishlist(cartItem)}>{isProductInWishlist(cartItem) ? "Item in Wishlist" : "Move To Wishlist"}</button>
                        <button className="btn-remove" onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                    </div>
                </div>
            </div>
        </>
    )
}