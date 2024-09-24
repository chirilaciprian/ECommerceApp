// import React from "react";
// import { FaHeart } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";

import { FaCartPlus } from "react-icons/fa";
import { ProductProps } from "../../services/productService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";
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

const Watch = (product: ProductProps) => {
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

  const handleAddToCart = async () => {
    if (authenticated) {
      dispatch(
        addToCart({
          productId: product.id,
          cartId: cart.id,
          quantity: 1,
          price: 0,
          id: "",
        })
      );
    } else {
      navigate("/login");
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card glass w-auto cursor-pointer">
      {/* Whislist Icon */}
      {/* <label className="absolute swap swap-flip m-0 p-0 top-2 right-2">        
        <input type="checkbox" />
        <FaHeart className=" swap-on text-error text-2xl" />
        <FaRegHeart className="swap-off text-error text-2xl" />
      </label> */}

      <figure>
        <img
          src={product.images[0]}
          alt="car!"
          className="w-auto h-auto"
          onClick={handleClick}
        />
      </figure>
      <div className="card-body p-2 lg:p-5">
        <h2 className="card-title text-sm md:text-lg" onClick={handleClick}>
          {product.name}
        </h2>
        <div className="display flex flex-row justify-between">
          <span className="md:text-xl roboto font-bold">${product.price}</span>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${product.id}`}
                className={`mask mask-star w-4 h-4 md:w-6 md:h-6 bg-yellow-400`}
                defaultChecked={i + 1 === Math.round(product.rating)}
                disabled
              />
            ))}
          </div>
        </div>
        <div className="card-actions justify-center">
          <button
            className="btn btn-block btn-neutral"
            onClick={handleAddToCart}
          >
            Add To Cart
            <FaCartPlus className="md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Watch;
