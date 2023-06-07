export const initialState = {
    products: [],
    categories: [],
    productDetail: {},
    cart: [],
    wishlist: [],
    savedForLaterItems: [],
    categoryFilter: [],
    search: "",
    rating: 0,
    sortByPrice: "",
    priceRange: 0,
    orderSummary: [],
    deliveryAddress: []
}

export const DataReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
        case "SET_CATEGORIES":
            return { ...state, categories: action.payload }
        case "SET_INITIAL_WISHLIST":
            return { ...state, wishlist: action.payload }
        case "SET_INITIAL_CART":
            return { ...state, cart: action.payload }
        case "SET_PRODUCT_DETAILS":
            return { ...state, productDetail: action.payload }
        case "ADD_TO_CART":
            return { ...state, cart: action.payload }
        case "UPDATE_CART":
            return { ...state, cart: action.payload }
        case "DELETE_CART":
            return { ...state, cart: action.payload }
        case "INCREASE_PRODUCT_QUANTITY":
            return { ...state, cart: action.payload }
        case "DECREASE_PRODUCT_QUANTITY":
            return { ...state, cart: action.payload }
        case "ADD_TO_WISHLIST":
            return { ...state, wishlist: action.payload }
        case "SET_WISHLIST":
            return { ...state, wishlist: action.payload.wishlist, cart: action.payload.cart }
        case "UPDATE_WISHLIST":
            return { ...state, wishlist: action.payload }
        case "SET_PRICE_FILTER":
            return { ...state, sortByPrice: action.payload }
        case "SET_CATEGORY_FILTER":
            return { ...state, categoryFilter: state?.categoryFilter.includes(action.payload) ? state?.categoryFilter.filter((category) => category !== action.payload) : [...state?.categoryFilter, action.payload] }
        case "RESET_FILTERS":
            return { ...state, categoryFilter: action.payload, sortByPrice: "", rating: 0, priceRange: 0, search: "" }
        case "FILTER_BY_RATING":
            return { ...state, rating: action.payload }
        case "FILTER_BY_PRICE_RANGE":
            return { ...state, priceRange: action.payload }
        case "CLEAR_FILTERS":
            return { ...state, categoryFilter: [], sortByPrice: "", rating: 0, priceRange: 0, search: "" }
        case "SET_SEARCH":
            return { ...state, search: action.payload }
        case "SET_ORDER_SUMMARY":
            return { ...state, orderSummary: { ...state.orderSummary, price: action.payload.price, discount: action.payload.discount, amount: action.payload.amount, coupon: action.payload.coupon } }
        default:
            return state;
    }

}