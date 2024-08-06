/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  fetchCartItems,
  fetchCart,
  fetchProducts,
  updateCartItemQuantity,
} from "../../services/ProductService";
import CartItem from "../general/CartItem";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<any>(null);
  const [products, setProducts] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  const handleQuantityChange = async (id: string, quantity: number) => {
    if (quantity < 1) {
      console.error("Quantity cannot be less than 1");
      return;
    }

    // Update cart items state
    const updatedCartItems = cartItems.map((item: any) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);

    // Update quantity in the database
    const result = await updateCartItemQuantity(id, quantity);
    if (!result) {
      console.error("Failed to update quantity in the database");
      // Revert the change if the update fails
      setCartItems(cartItems);
    } else {
      // Re-fetch the cart and cart items to get the latest data
      const [updatedCart, updatedCartItems] = await Promise.all([
        fetchCart(),
        fetchCartItems(),
      ]);
      setCart(updatedCart);
      setCartItems(updatedCartItems);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cart, cartItems, products] = await Promise.all([
          fetchCart(),
          fetchCartItems(),
          fetchProducts(),
        ]);
        setCart(cart);
        setCartItems(cartItems);
        setProducts(products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((cartItem: any) => {
            const product = products.find(
              (prod: any) => prod.id === cartItem.productId
            );
            if (!product) {
              console.warn(`Product with id ${cartItem.productId} not found`);
              return null;
            }
            return (
              <CartItem
                key={cartItem.id}
                cartItemId={cartItem.id}
                quantity={cartItem.quantity}
                image={product.image}
                name={product.name}
                description={product.description || ""}
                price={`${cartItem.price} $`}
                onQuantityChange={handleQuantityChange}
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
              <p className="mb-1 text-lg font-bold">${cart.totalPrice}.00</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>          
          <Link to="/order" className="mt-6 w-full flex justify-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" >Check out</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
