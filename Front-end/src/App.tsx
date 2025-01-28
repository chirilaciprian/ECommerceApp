/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.css";
import LoginPage from "./components/authorization/LoginPage";
import SignUpPage from "./components/authorization/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";
import CartPage from "./components/pages/CartPage";
import OrderPage from "./components/pages/OrderPage";
import AboutPage from "./components/pages/AboutPage";
import MyOrdersPage from "./components/pages/MyOrdersPage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetail from "./components/pages/ProductOverview";
import WishlistPage from "./components/pages/WishlistPage";
import ReviewSection from "./components/pages/RatingsPage";


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/order" element={<OrderPage />}></Route>
            <Route path="/product/:productId" element={<ProductDetail />} key={window.location.pathname}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/myorders" element={<MyOrdersPage />}></Route>
            <Route path="/wishlist" element={<WishlistPage />}></Route>
            <Route path="/ratings/:productId" element={<ReviewSection/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
