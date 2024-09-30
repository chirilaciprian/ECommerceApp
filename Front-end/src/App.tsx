/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.css";
import LoginPage from "./components/authorization/loginPage";
import SignUpPage from "./components/authorization/signUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";
import CartPage from "./components/pages/CartPage";
import OrderPage from "./components/pages/OrderPage";
import ProductPage from "./components/pages/ProductOverview";
import AboutPage from "./components/pages/AboutPage";
import MyOrdersPage from "./components/pages/MyOrdersPage";
import ProductsPage from "./components/pages/ProductsPage";


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/order" element={<OrderPage/>}></Route>
            <Route path="/product/:productId" element={<ProductPage/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
            <Route path="/myorders" element={<MyOrdersPage/>}></Route>      
               
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
