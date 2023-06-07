import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";


export const Header = () => {
    const navigate = useNavigate();
    const { searchProductHandler, wishlist, cart, token, logoutClickHandler, search } = useContext(DataContext);
    return (
        <>
            <nav>
                <div className="appName" onClick={() => navigate("/")}> ShoeYard </div>
                <div className="search-container">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input
                        type="text"
                        placeholder="Search for product"
                        className="search-bar"
                        value={search}
                        onChange={(e) => searchProductHandler(e)}
                    />
                </div>
                
               
                <div className="actionItems">
                    <button className="btn-wishlist" onClick={() => navigate("/wishlist")}>
                        <div className="btn-icon">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </div>
                        {token && wishlist && <div className="btn-count">
                            <p>{wishlist?.length}</p>
                        </div>}
                    </button>

                    <button className="btn-cart" onClick={() => navigate("/cart")}>
                        <div className="btn-icon">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                        {token && cart && <div className="btn-count">
                            <p>{cart?.length}</p>
                        </div>}
                    </button>
                    <button className="btn-user" onClick={() => navigate("/user-profile")}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </button>
                    <button className="btn-user" onClick={logoutClickHandler}>
                        <i style={{fontSize:"16px"}}>Log-Out</i>
                    </button>
                </div>
            </nav>
        </>
    )
}