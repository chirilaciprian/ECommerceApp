/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { createOrder, createOrderItem } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../../state/slices/cartSlice";
import { getProductsByCartId, ProductProps } from "../../services/productService";

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

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(true); // To manage loading state
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const fetchProducts = async (cartId: string) => {
    const res = await getProductsByCartId(cartId);
    setProducts(res);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createOrder({
      ...formData,
      userId: cart.userId,
      totalPrice: cart.totalPrice,
      status: "Pending",
    });
    cart.cartItems.map(async (cartItem: any) => {
      createOrderItem(res.id, cartItem.productId, cartItem.quantity);
    });
    alert("Order placed successfully!");
    dispatch(clearCart(cart));
    navigate("/products");
  };

  const getLocalImageUrl = (imageId: string) => {
    return `/images/${imageId}.jpg`;  // Images stored in public/images
  };

  useEffect(() => {
    try {
      dispatch(getCart());
      fetchProducts(cart.id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false once data fetching is complete
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-gray-100 pb-10 pt-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Order Summary</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.cartItems.map((cartItem: any) => {
            const product = products.find(
              (prod: any) => prod.id === cartItem.productId
            );
            if (!product) {
              console.warn(`Product with id ${cartItem.productId} not found`);
              return null;
            }

            return (
              <div key={cartItem.id} className="mb-4 flex justify-between gap-4 roboto shadow-md bg-white rounderd-xl p-4">
                <div className="flex items-center">
                  <img
                    src={getLocalImageUrl(product.images[0])}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-bold">{product.name}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">{cartItem.price}$</p>
                  <p className="ml-4 text-lg text-primary font-bold">Qt:{cartItem.quantity}</p>
                </div>
              </div>
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
              <p className="mb-1 text-lg font-bold">${cart.totalPrice}.00</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Zip</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-green-50 hover:bg-green-600"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
