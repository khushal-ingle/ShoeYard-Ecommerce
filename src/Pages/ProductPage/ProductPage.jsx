import { useContext, useEffect } from "react";
import { DataContext } from "../../Contexts/DataContext";
import "./ProductPage.css";
export const ProductPage = () => {
    const { productDetail, changeTitle } = useContext(DataContext);

    useEffect(() => {
        changeTitle(productDetail?.name)
    }, [productDetail?.name, changeTitle])

    return (
        <>
            {Object.keys(productDetail)?.length &&
                <div className="product-card-container">
                    <div className="product-image">
                        <img src={productDetail?.img} alt="book-cover-page" />
                    </div>
                    <div className="product-details">
                        <div className="product-details-header">
                            <h1>{productDetail?.name}</h1>
                            <p>{productDetail?.rating}<i className="fa fa-star" aria-hidden="true"></i></p>
                        </div>
                        <div className="product-details-tags">
                            <p>Fastest Delivery</p>
                            <p>Inclusive of All Taxes</p>
                            <p>Cash On Delivery</p>
                        </div>
                        <div className="product-details-info">
                            <p>Author: {productDetail?.author}</p>
                            <p>Category: {productDetail?.category}</p>
                            <p>Price: {productDetail?.price}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}