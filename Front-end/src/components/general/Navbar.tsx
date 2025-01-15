import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthHook } from "../../hooks/authHooks";
import { isAuthenticated, logout } from "../../services/authService";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../../state/store";
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
      <div className="navbar text-neutral bg-base-200 merriweather ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content glass rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
              </li>
              <li>
                <Link to='/products'>MAN</Link>
              </li>
              <li>
                <Link to='/products'>WOMAN</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
            </ul>
          </div>
          {/* <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-thin italic ">WatchStore</Link> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to='/' className="btn btn-ghost">Home</Link>
            </li>
            <li>
              <Link to='/products' className="btn btn-ghost">Products</Link>
            </li>
            <li>
              <Link to='/products/?genre=MAN' className="btn btn-ghost">MAN</Link>
            </li>
            <li>
              <Link to='/products?genre=WOMAN' className="btn btn-ghost">WOMAN</Link>
            </li>
            <li>
              <Link to='/about' className="btn btn-ghost">About Us</Link>
            </li>
          </ul>
        </div>

        {authHook.isAuthenticated ? (
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cart.cartItems.length > 0 && (
                    <span className="badge badge-sm indicator-item bg-info text-neutral-content">
                      {cart.cartItems.length}
                    </span>)}
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content glass z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">{cart.cartItems.length} Items</span>
                  <span className="">Subtotal: ${cart.totalPrice}</span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 glass "
              >
                <li>
                  <Link to='/profile'>Account</Link>
                </li>
                <li>
                  <Link to='/myorders'>My Orders</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="join  glass bg-primary">
              <Link to='/login' className="btn btn-ghost join-item text-neutral-content md:text-lg font-bold">
                Log In
              </Link>
              <Link to='/signup' className="btn btn-ghost join-item text-neutral-content md:text-lg font-bold">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
