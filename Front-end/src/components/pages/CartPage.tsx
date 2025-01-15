/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import CartItem from "../general/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { getCart } from "../../state/slices/cartSlice";
import { getProducts } from "../../state/slices/productsSlice";
import { createSelector } from "@reduxjs/toolkit";

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
const getLocalImageUrl = (imageId: string) => {
  return `/images/${imageId}.jpg`;  // Images stored in public/images
};
const CartPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state
  const cart = useSelector(selectCart);
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getCart());
      dispatch(getProducts());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-100 pt-20 flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(cart.cartItems) && cart.cartItems.length > 0 ? (
        <div className="h-full bg-gray-100 pt-20 min-h-screen">
          <h1 className="mb-10 text-center text-3xl font-bold merriweather">
            CART ITEMS
          </h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cart.cartItems.map((cartItem: any) => {
                const product = products.find(
                  (prod: any) => prod.id === cartItem.productId
                );
                if (!product) {
                  console.warn(
                    `Product with id ${cartItem.productId} not found`
                  );
                  return null;
                }
                return (
                  <CartItem
                    key={cartItem.id}
                    cartItemId={cartItem.id}
                    quantity={cartItem.quantity}
                    image={getLocalImageUrl(product.images[0])}
                    name={product.name}
                    description={product.description || ""}
                    price={parseFloat(cartItem.price)}
                  />
                );
              })}
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${cart.totalPrice}.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$0.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    ${cart.totalPrice}.00
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Link
                to="/order"
                className="mt-6 w-full flex justify-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Check out
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center h-full min-h-screen bg-base-200 py-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty cart"
            className="w-48 h-48 mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-gray-500">
            It looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products" className="mt-6 btn btn-primary px-6">
            Start Shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default CartPage;
