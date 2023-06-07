import { NavLink, useNavigate } from "react-router-dom";
// import * as axios from 'axios';
import "./Home.css"
import { useContext, useEffect } from "react";
import { DataContext } from "../../Contexts/DataContext";


const getActiveStyle = ({ isActive }) => ({
    margin: "1rem 0",
    textDecoration: "none",
    fontWeight: isActive ? "600" : "200",
    padding: isActive ? "1rem" : "0.5rem",
    color: isActive ? "red" : "#0067b5"
});

export const Home = () => {
    const navigate = useNavigate()

    const { categories, changeTitle, categoryClickHandler } = useContext(DataContext);
    useEffect(() => {
        changeTitle("Ecommerce")
    }, [changeTitle])

    return (
        <>
            <div className="home">
                <div className="header" onClick={() => navigate("/products")}>
                    <img src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648837512/fashify/01042022-D-Unisex-topbannercarousel-p3-brands-4090_bwk2pu.jpg" alt="banner" width="100" />
                </div>

                <div className='greyRow'></div>
                <div className='shopByCate'><img src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648895557/fashify/0b21bba9-e1e2-4dd9-ac99-4a759abe68801648705771876-Shop-By-Category_w2adx7.webp" alt="/" /></div>
                <div className='greyRow'></div>
                <div className="categories">


                    {categories && categories.map(({ _id, categoryName, description, image }) => (
                        <div className='productCategory' key={_id} onClick={() => categoryClickHandler(_id)}>
                            <div className='banner'>
                                <img src={image} />
                            </div>
                            <div className='productname' >
                                <h5>NEW ARRIVAL</h5>
                                <h3>{categoryName}</h3>
                                <p>{description}</p>
                            </div>
                        </div>

                    ))}


                </div>
                <footer>

                    <div className="footerLinks">
                        <p><NavLink style={getActiveStyle} to="https://github.com/khushal-ingle">GitHub</NavLink></p>
                        <p><NavLink style={getActiveStyle} to="https://twitter.com/_khushal_01">Twitter</NavLink></p>
                        <p><NavLink style={getActiveStyle} to="https://www.linkedin.com/in/khushal-ingle-820b06241/">LinkedIn</NavLink></p>
                    </div>
                        <p>© No Copyright, Feel free to replicate.</p>

                </footer>
            </div>

        </>
    )
}