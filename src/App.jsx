import { Header } from './Components/Header/Header';
import { Cart } from './Pages/Cart/Cart';
import { Home } from './Pages/Home/Home';
import { ProductListing } from './Pages/ProductListing/ProductListing';
import { Profile } from './Pages/Profile/Profile';
import { Wishlist } from './Pages/Wishlist/Wishlist';
import Mockman from 'mockman-js';
import './styles.css';
import { Routes, Route } from "react-router-dom";
import { SignUp } from './Pages/SignUp/SignUp';
import { Login } from './Pages/Login/Login';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { ProductPage } from './Pages/ProductPage/ProductPage';
import { Checkout } from './Pages/Checkout/Checkout';
import { PlaceOrder } from './Pages/PlaceOrder/PlaceOrder';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/user-profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        <Route path="/place-order" element={
          <PrivateRoute>
            <PlaceOrder />
          </PrivateRoute>
        } />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mockman" element={<Mockman colorScheme="light" />} />
      </Routes>
    </div>
  );
}

export default App;
