import { useContext, useEffect } from "react"
import { DataContext } from "../../Contexts/DataContext"

export const PlaceOrder = () => {
    const { changeTitle } = useContext(DataContext);
    useEffect(() => {
        changeTitle("Order Placed")
    }, [changeTitle])
    return (
        <>
            <div className="place-order-icon">
                <img src="https://th.bing.com/th/id/OIP.9A4apqke8dZvlviJcEEhEQHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="tick-icon" />
            </div>
            <h1>Congratulations, Your order has been place successfully!</h1>
        </>
    )
}