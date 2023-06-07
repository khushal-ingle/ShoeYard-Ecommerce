import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export const CartPrice = ({ cart }) => {

    const { calculateTotalPrice, checkoutClickHandler } = useContext(DataContext);
    const totalPrice = calculateTotalPrice(cart);
   
   

    const totalAmout = parseFloat(totalPrice).toFixed(2);

    
    return (
        <>
            <hr />
            <div className="cart-price-details-header"><h3>PRICE DETAILS</h3></div>
            <hr />
            <div className="cart-price-details">
                <ul>
                    <li>
                        <p>Price ({cart?.length} Items)</p>
                        <p>₹ {totalPrice}</p>
                    </li>
                  
                    <li>
                        <p>Delivery Charges</p>
                        <p>FREE</p>
                    </li>

                </ul>
            </div>
            <hr />
            <div className="total-amount">
                <h4>Total Amount</h4>
                <h4>₹{totalAmout}</h4>
            </div>
            <hr />
            <div>
                <button className="btn-checkout" onClick={() => checkoutClickHandler(totalPrice, totalAmout, cart)}>Checkout</button>
            </div>
        </>
    )
}