import { useContext, useEffect } from "react"
import { DataContext } from "../../Contexts/DataContext"
import { CartProduct } from "../../Components/CartProduct/CartProduct";
import { CartPrice } from "../../Components/CartPrice/CartPrice";

import "./Cart.css";

export const Cart = () => {
    const { cart, changeTitle } = useContext(DataContext);
console.log(cart);
    useEffect(() => {
        changeTitle("Cart")
    }, [changeTitle])
    return (
        <>
            <h1>My Cart</h1>
            {cart?.length ?
                <>

                    <div className="cart-page">

                        <div className="cartList">
                            {cart.map((cartItem) => <CartProduct cartItem={cartItem} key={cartItem?.id} />)}
                        </div>
                        <div className="total-price-card">
                            <CartPrice cart={cart} />
                        </div>
                    </div>
                </>
                : <h2>Your cart is Empty!</h2>
            }
            
        </>
    )
}