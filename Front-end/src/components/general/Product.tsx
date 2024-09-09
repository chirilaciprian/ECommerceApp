import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../index.css";
import { isAuthenticated } from "../../services/authService"
import { ProductProps } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../../state/store";
import { createSelector } from "@reduxjs/toolkit";
import { addToCart, getCart } from "../../state/slices/cartSlice";

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



export const Product: React.FC<ProductProps> = (product) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(!!authStatus); // Set authenticated to true if authStatus is not null
    };
    checkAuth();
    dispatch(getCart());    
  }, [dispatch]);

  const stars = [];
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  const handleAddToCart = async () => {
    if (authenticated) {
      dispatch(addToCart({
        productId: product.id,
        cartId: cart.id,
        quantity: 1,
        price: 0,
        id: ""
      }))
    } else {
      navigate('/login');
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-300 text-xl" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-300 text-xl" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-300 text-xl" />);
    }
  }

  return (
    <div className="roboto relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
        onClick={handleClick}
      >
        <img className="object-contain w-full h-full" src={product.image} alt={product.name} />
        {product.onSale && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-md font-medium text-white">
            {Math.round(
              ((product.price - (product.salePrice ?? 0)) / product.price) * 100
            )}
            % OFF
          </span>
        )}
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#" onClick={handleClick}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          {(product.onSale && (
            <div>
              <span className="merriweather text-3xl font-bold text-slate-900">
                ${product.salePrice}
              </span>
              <span className="merriweather text-sm text-slate-900 line-through">
                ${product.price}
              </span>
            </div>
          )) || (
            <span className="merriweather text-3xl font-bold text-slate-900">
              ${product.price}
            </span>
          )}
          <div className="flex items-center">
            {stars}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-lg font-semibold">
              {product.rating}
            </span>
          </div>
        </div>
        <button
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleAddToCart}
        >
          <FaCartPlus className="mr-5 h-6 w-6 text" />
          Add to cart
        </button>
      </div>
    </div>
  );
};