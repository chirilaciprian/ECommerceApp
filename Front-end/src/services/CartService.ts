import axios from "axios";
import { isAuthenticated } from "./authService";

const API_BASE_URL = "http://localhost:5000";

export interface CartItemProps {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface CartProps {
  id: string;
  userId: string;
  cartItems: CartItemProps[];
  totalPrice: number;
}

const checkIfCartExists = async (userId: string) => {
  try {
    const cart = await axios.get(`${API_BASE_URL}/api/carts/user/${userId}`);
    if (cart.data !== null) {
      return cart.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error checking if cart exists: ", err);
    return null;
  }
};

export const fetchCart = async () => {
  const user = await isAuthenticated();
  const userId = user.id;
  const cart = await checkIfCartExists(userId);
  if (cart != null) {
    return cart;
  } else {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/carts`, {
        userId: userId,
        totalPrice: 0,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

export const fetchCartItems = async () => {
  const cart = await fetchCart();
  try {
    const res = await axios.get(`${API_BASE_URL}/api/cartItems`);
    const cartItems = res.data.filter(
      (item: CartItemProps) => item.cartId === cart.id
    );
    return cartItems;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddCartItem = async (productId: string, cartId: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/cartItems`, {
      productId: productId,
      cartId: cartId,
      quantity: 1,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/cartItems/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const increaseCartItemQuantity = async (cartItem: CartItemProps) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/cartItems/${cartItem.id}/quantity`,
      { quantity: cartItem.quantity + 1 }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const decreaseCartItemQuantity = async (cartItem: CartItemProps) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/cartItems/${cartItem.id}/quantity`,
      { quantity: cartItem.quantity - 1 }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const ClearCart = async (cart: CartProps) => {
  try {
    const cartItems = await axios.get(`${API_BASE_URL}/api/cartItems`);
    cartItems.data.map(async (item: CartItemProps) => {
      if (item.cartId === cart.id) {
        await axios.delete(`${API_BASE_URL}/api/cartItems/${item.id}`);
      }
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
