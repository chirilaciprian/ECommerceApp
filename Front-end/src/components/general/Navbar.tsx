import { useEffect, useState } from "react";
import { FaShopify, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthHook } from "../../hooks/authHooks";
import { isAuthenticated, logout } from "../../services/authService";
import { createSelector } from "@reduxjs/toolkit";
import { RootState,AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../state/slices/cartSlice";

const selectCart = createSelector(
  [(state: RootState) => state.cart],
  (cart) => ({
    id: cart.id,
    userId: cart.userId,
    cartItems: cart.cartItems,
    totalPrice: cart.totalPrice,
    status: cart.status,
  })
);

export const Navbar = () => {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const authHook = AuthHook();
  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    const isAuth = async () => {
      const res = await isAuthenticated();
      if (res) {
        authHook.setIsAuthenticated(true);
      } else {
        authHook.setIsAuthenticated(false);
      }
    };
    isAuth();
    dispatch(getCart());
  }, [dispatch]);
  // Handle logout
  const handleLogout = () => {
    authHook.setIsAuthenticated(false);
    logout();
  };

  // Update cart item quantity

  return (
    <>
      <div className="playfair flex justify-between items-center p-5 pl-16 pr-16 font-semibold text-lg shadow-sm">
        <div className="flex gap-2">
          <FaShopify className="text-4xl" />
          <span className="merriweather text-3xl font-thin italic">C-Shop</span>
        </div>
        <div className="flex gap-14">
          <Link
            to="/"
            className="cursor-pointer link link-underline link-underline-black"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="cursor-pointer link link-underline link-underline-black"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="cursor-pointer link link-underline link-underline-black"
          >
            About Us
          </Link>
        </div>

        {authHook.isAuthenticated ? (
          <div className="flex flex-row text-3xl gap-6 relative">
            <div>
              <button
                className="cursor-pointer"
                onClick={() => setIsOpenUser(!isOpenUser)}
              >
                <FaUserCircle />
              </button>
              {isOpenUser && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white shadow-xl">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/myorders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My orders
                  </Link>
                  <Link
                    to=""
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
            <div className="relative flex">
              <Link className="cursor-pointer relative" to="/cart">
                <FaShoppingCart />
              </Link>
              <span>({cart.cartItems.length})</span>
            </div>
          </div>
        ) : (
          <div className="flex gap-6">
            <Link
              to="/signup"
              className="text-xl font-bold cursor-pointer link link-underline link-underline-black"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-xl font-bold cursor-pointer link link-underline link-underline-black"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
