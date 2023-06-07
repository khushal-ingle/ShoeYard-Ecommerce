import { createContext, useEffect, useReducer, useState } from "react";
import * as axios from 'axios';
import { v4 as uuid } from "uuid";
import { DataReducer, initialState } from "../Reducers/dataReducer";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserAddress } from "../data/address";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const navigate = useNavigate();

    const [state, dispatch] = useReducer(DataReducer, initialState);
    const [loader, setLoader] = useState(false);
 
    const [addressModal, setAddressModal] = useState(false);
   
    const [addressInput, setAddressInput] = useState({ id: uuid(), name: "", address: "", pincode: "", country: "", phoneNumber: "" });
    const [deliveryAddress, setDeliveryAddress] = useState({ name: "", add: "", country: "", pincode: "", phone: "" })
    const [addresses, setUserAddresses] = useState(UserAddress);

    const localStorageUser = JSON.parse(localStorage?.getItem("user"));
    const localStorageToken = JSON.parse(localStorage?.getItem("token"));
    const [token, setToken] = useState(localStorageToken?.token);
    const [user, setUser] = useState(localStorageUser?.user);

    const changeTitle = (title) => (document.title = `${title} | ShoeYard`);

    const clearWishlist = () => {
        dispatch({ type: "SET_INITIAL_WISHLIST", payload: [] })
    }

    const clearCart = () => {
        dispatch({ type: "SET_INITIAL_CART", payload: [] })
    }

    const getData = async () => {
        try {
            setLoader(true);
            const productsData = await axios.get('/api/products');
            // console.log(productsData);
            dispatch({ type: "SET_PRODUCTS", payload: productsData?.data?.products });
            const categoriesData = await axios.get('/api/categories');
            dispatch({ type: "SET_CATEGORIES", payload: categoriesData?.data?.categories });
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.error(e)
        }
    }

    const getProductDetails = async (productId) => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            dispatch({ type: "SET_PRODUCT_DETAILS", payload: response?.data?.product })
            navigate(`/products/${productId}`)
        } catch (e) {
            console.error(e);
        }
    }

    const handleSignUpClick = async ({ firstName, lastName, email, password }) => {
        if (firstName === "" || lastName === "" || email === "" || password === "") {
            navigate("/signup")
            toast.error('All fields are mandatory to signup!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } else {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password,
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                const { createdUser, encodedToken } = await response.json();
                localStorage.setItem("user", JSON.stringify({ user: createdUser }))
                setUser(createdUser);
                localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
                setToken(encodedToken);
            } catch (e) {
                console.error(e);
            }
        }


    }

    const handleLoginClick = async ({ email, password }) => {
        if (email === "" || password === "") {
            navigate("/login")
            toast.error('email and password cannot be empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        else {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            email: email,
                            password: password
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                if (response?.status === 200) {
                    const { foundUser, encodedToken } = await response.json();
                    localStorage.setItem("user", JSON.stringify({ user: foundUser }));
                    setUser(foundUser);
                    localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
                    setToken(encodedToken);
                    toast.success('Logged In Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                } else if (response?.status === 401) {
                    navigate("/login")
                    toast.error('The credentials you entered are invalid!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                } else {
                    navigate("/login")
                    toast.error('The email you entered is not Registered!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    const logoutClickHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setToken("");
        setUser();
        setUserAddresses(UserAddress)
        navigate("/products");

    }

    const categoryClickHandler = async (categoryId) => {
        dispatch({ type: "RESET_FILTERS", payload: [] })
        try {
            const response = await axios.get(`/api/categories/${categoryId}`)
            dispatch({ type: "SET_CATEGORY_FILTER", payload: response?.data?.category?.categoryName })
            navigate("/products");
        } catch (e) {
            console.error(e)
        }
    }

    const isProductInCart = (product) => {
        if (token) {
            const foundProduct = state?.cart?.find(item => item?._id === product?._id)
            if (foundProduct) {
                return true;
            } else {
                return false;
            }
        }
    }

    const handleAddToCart = async (product) => {
        if (token) {
            try {
                const response = await axios.post('/api/user/cart',
                    {
                        product,
                    },
                    {
                        headers: {
                            authorization: token,
                        },
                    }

                );
                dispatch({ type: "ADD_TO_CART", payload: response?.data?.cart });
                toast.success('Added to Cart!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            navigate("/login")
        }
    }

    const handleRemoveFromCart = async (product) => {
        try {
            const response = await axios.delete(`/api/user/cart/${product?._id}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: "UPDATE_CART", payload: response?.data?.cart })
            toast.error('Removed From Cart!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.error(err);
        }

    }

    const deleteCart = async () => {
        try {
            const response = await axios.delete('/api/user/cart/', {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: "DELETE_CART", payload: response?.data?.cart })
        } catch (err) {
            console.error(err);
        }
    }

    const isProductInWishlist = (product) => {
        if (token) {
            const foundProduct = state?.wishlist?.length > 0 && state?.wishlist?.find(item => item._id === product._id)
            if (foundProduct) {
                return true;
            } else {
                return false;
            }
        }
    }

    const handleAddToWishlist = async (product) => {
        if (token) {
            try {
                const response = await axios.post('/api/user/wishlist',
                    {
                        product,
                    },
                    {
                        headers: {
                            authorization: token,
                        },
                    }

                );
                dispatch({ type: "ADD_TO_WISHLIST", payload: response?.data?.wishlist })
                toast.success('Added to Wishlist!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            navigate("/login");
        }
    }

    const handleRemoveFromWishlist = async (product) => {
        try {
            const response = await axios.delete(`/api/user/wishlist/${product._id}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: "UPDATE_WISHLIST", payload: response?.data?.wishlist })
            toast.error('Removed From Wishlist!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleMoveToCart = async (product) => {
        try {
            handleAddToCart(product);
        } catch (e) {
            console.error(e);
        }

    }

    const handleMoveToWishlist = async (product) => {
        try {
            const response = await axios.delete(`/api/user/cart/${product?._id}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: "SET_WISHLIST", payload: { wishlist: [...state?.wishlist, product], cart: response?.data?.cart } })
            toast.success('Moved To Wishlist!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            toast.error('Removed From Cart!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e) {
            console.error(e)
        }
    }

    const increaseProductQuantity = async (productId) => {
        try {
            const response = await axios.post(`/api/user/cart/${productId}`,
                {
                    action: {
                        type: "increment"
                    },
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            dispatch({ type: "INCREASE_PRODUCT_QUANTITY", payload: response?.data?.cart })
        } catch (e) {
            console.error(e)
        }
    }

    const decreaseProductQuantity = async (productId) => {
        try {
            const response = await axios.post(`/api/user/cart/${productId}`,
                {
                    action: {
                        type: "decrement"
                    },
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            dispatch({ type: "DECREASE_PRODUCT_QUANTITY", payload: response?.data?.cart })
        } catch (e) {
            console.error(e)
        }
    }

    const sortByPrice = (e) => {
        dispatch({ type: "SET_PRICE_FILTER", payload: e.target.value })
    }

    const filterByCategory = (e) => {
        dispatch({ type: "SET_CATEGORY_FILTER", payload: e.target.value })
    }

    const filterByRatings = (e) => {
        dispatch({ type: "FILTER_BY_RATING", payload: e.target.value })
    }

    const searchProductHandler = (e) => {
        dispatch({ type: "SET_SEARCH", payload: e.target.value })
    }

    const filteredProducts =
        state?.categoryFilter?.length > 0
            ? state?.products?.filter((product) =>
                state?.categoryFilter?.includes(product?.category)
            )
            : state?.products;

    const filteredByRatingsProducts =
        state?.rating === 0
            ? filteredProducts
            : filteredProducts.filter((product) => product?.rating >= state?.rating)

    const filterByPriceRangeProducts =
        state?.priceRange === 0
            ? filteredByRatingsProducts
            : filteredByRatingsProducts.filter((product) => product?.price <= +state?.priceRange)

    const sortedProducts = state?.sortByPrice !== null ? filterByPriceRangeProducts?.sort((a, b) => state?.sortByPrice === "highToLow" ? b?.price - a?.price : a?.price - b?.price) : filterByPriceRangeProducts

    const searchedProducts = state?.search !== "" ? sortedProducts?.filter((product) => product?.name?.toLowerCase().includes(state?.search)) : sortedProducts

    const clearFilterHandler = () => {
        dispatch({ type: "CLEAR_FILTERS" })
    }

    const checkoutClickHandler = (totalPrice, totalAmount) => {
        navigate("/checkout")
        dispatch({ type: "SET_ORDER_SUMMARY", payload: { price: totalPrice, amount: totalAmount} })
    }

    const handlePlaceOrderClick = () => {
        setTimeout(() => {
            navigate("/products")
        }, 2000);
        navigate("/place-order");
        clearCart();
        deleteCart();
    }

    useEffect(() => {
        const getWishlistAndCart = async () => {
            try {
                if (token) {
                    const wishlistResponse = await axios.get('/api/user/wishlist', {
                        headers: {
                            authorization: token,
                        },
                    })
                    const cartResponse = await axios.get('/api/user/cart', {
                        headers: {
                            authorization: token,
                        },
                    })
                    dispatch({ type: "SET_INITIAL_WISHLIST", payload: wishlistResponse?.data?.wishlist });
                    dispatch({ type: "SET_INITIAL_CART", payload: cartResponse?.data?.cart });

                }
            } catch (e) {
                console.error(e)
            }

        }
        getData();
        !token && clearWishlist();
        !token && clearCart();
        !token && clearFilterHandler();
        token && getWishlistAndCart();
    }, [token])

   
    const calculateTotalPrice = (cart) => cart.reduce((acc, curr) => acc + (curr?.qty * curr?.price), 0)
   

    return (
        <>
            <DataContext.Provider value={{
                handleAddToCart,
                handleSignUpClick,
                handleAddToWishlist,
                handleLoginClick,
                logoutClickHandler,
                sortByPrice,
                filterByCategory,
                filterByRatings,
                clearFilterHandler,
                searchProductHandler,
                isProductInCart,
                isProductInWishlist,
                handleRemoveFromWishlist,
                handleRemoveFromCart,
                handleMoveToCart,
                handleMoveToWishlist,
                getProductDetails,
                increaseProductQuantity,
                decreaseProductQuantity,
                calculateTotalPrice,
               
                checkoutClickHandler,
                setDeliveryAddress,
                handlePlaceOrderClick,
                changeTitle,
                categoryClickHandler,
                addressInput, setAddressInput,
                deliveryAddress,
                addressModal, setAddressModal,
                addresses, setUserAddresses,
                loader,
                token, user,
                products: searchedProducts,
                productDetail: state.productDetail,
                categories: state.categories,
                cart: state.cart,
                wishlist: state.wishlist,
                categoryFilter: state.categoryFilter,
                priceFilter: state?.sortByPrice,
                ratingFilter: state?.rating,
                priceRangeFilter: state?.priceRange,
                orderSummary: state?.orderSummary,
                search: state?.search
            }}>
                {children}
            </DataContext.Provider>
        </>
    )
}