import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { decreaseQuantity, getCart, increaseQuantity, removeFromCart } from "../../state/slices/cartSlice";
import { createSelector } from "@reduxjs/toolkit";

interface CartItemProps {
  cartItemId: string;
  quantity: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

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

const CartItem: React.FC<CartItemProps> = ({
  cartItemId,
  quantity,
  image,
  name,
  description,
  price,
}) => {

  
  const cart = useSelector(selectCart);
  useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={image}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          <p className="mt-1 text-xs text-gray-700">{description}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => {
                dispatch(decreaseQuantity({
                  id:cartItemId,
                  cartId:cart.id,
                  quantity:quantity,
                  price:price,
                  productId:""
                }))
              }}
            >
              -
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={quantity}
              min="1"
              
            />
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => {
                dispatch(increaseQuantity({
                  id:cartItemId,
                  cartId:cart.id,
                  quantity:quantity,
                  price:price,
                  productId:""
                }))
              }}
            >
              +
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">${price}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              onClick={() => {dispatch(removeFromCart(cartItemId))                
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
