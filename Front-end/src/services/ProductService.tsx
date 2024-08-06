/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "universal-cookie";

export const CreateCart = async (userId: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/carts", {
      userId,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const CreateCartItem = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  try {
    const response = await axios.post("http://localhost:5000/api/cartItems", {
      cartId,
      productId,
      quantity,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const GetCartByUserId = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/carts/user/${userId}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const AddCartItem = async (productId: string, quantity: number) => {
  try {
    const userId = await GetUserId();
    console.log("User id:", userId);

    const res = await GetCartByUserId(userId);
    console.log("GetCartByUserID response: ", res);

    let cart;
    if (!res || res.length === 0) {
      cart = await CreateCart(userId);
    } else {
      cart = res;
    }
    const response = await CreateCartItem(cart.id, productId, quantity);
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const GetUserId = async () => {
  const cookie = new Cookies();
  const token = cookie.get("jwt_auth");
  if (token) {
    try {
      const res = await axios.get("http://localhost:5000/api/me", {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log("User Data",res.data)
      return res.data.id;
    } catch (err) {
      console.log(err);
      return;
    }
  } else {
    console.log("No token");
    return false;
  }
};

export const fetchCartItems = async () => {
  try {
    const userId = await GetUserId();

    const cart = await GetCartByUserId(userId);

    const response = await axios.get("http://localhost:5000/api/cartItems");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.data.filter((item: any) => item.cartId === cart.id);
    // console.log("CartItems from fetch CartItems : ",items)
    return items;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchCart = async () => {
  try {
    const userId = await GetUserId();
    const response = await axios.get(
      `http://localhost:5000/api/carts/user/${userId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    const products = res.data;

    const cartItems = await fetchCartItems();

    const filteredProducts = products.filter((product: any) =>
      cartItems.some((cartItem: any) => cartItem.productId === product.id)
    );

    return filteredProducts;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number
) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/cartItems/${cartItemId}/quantity`,
      { quantity }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteCartItem = async (cartItemId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/cartItems/${cartItemId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

interface OrderProps {
  userId: string;
  totalPrice: number;
  status: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

export const createOrder = async (order: OrderProps) => {
  try {
    const res = await axios.post("http://localhost:5000/api/orders", {
      ...order,
      status: "pending",
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createOrderItem = async (
  orderId: string,
  productId: string,
  quantity: number
) => {
  try {
    const res = await axios.post("http://localhost:5000/api/orderItems", {
      orderId,
      productId,
      quantity,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getProductById = async (productId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const clearCart = async () => {
  try {
    const cartItems = await fetchCartItems();
    cartItems.forEach(async (cartItem: any) => {
      await deleteCartItem(cartItem.id);
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getMyOrdersAndProducts = async () => {
  try {
    const userId = await GetUserId();
    const res = await axios.get(`http://localhost:5000/api/orders`);
    const orders = res.data.filter((order: any) => order.userId === userId);
    const orderItemsRes = await axios.get(`http://localhost:5000/api/orderItems`);
    const productsRes = await axios.get(`http://localhost:5000/api/products`);

    // Combine order items and products with their respective orders
    const orderItems = orderItemsRes.data;
    const products = productsRes.data;

    // Associate order items and products with their respective orders
    orders.forEach((order: any) => {
      order.items = orderItems.filter((item: any) => item.orderId === order.id).map((item: any) => {
        return {
          ...item,
          product: products.find((product: any) => product.id === item.productId),
        };
      });
    });

    return [orders, products, orderItems];
  } catch (err) {
    console.log(err);
    return false;
  }
};

