/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { isAuthenticated } from "./authService";
import { sendOrderConfirmationEmail } from "./emailService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const res = await axios.post(`${API_BASE_URL}/api/orders`, {
        ...order,
        status: "pending",
      });      
      const user = await isAuthenticated(); 
      await sendOrderConfirmationEmail(user.email, res.data.id);
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
      const res = await axios.post(`${API_BASE_URL}/api/orderItems`, {
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

  export const getMyOrdersAndProducts = async () => {
    try {
      const user = await isAuthenticated();
      const userId = user.id;
      const res = await axios.get(`${API_BASE_URL}/api/orders`);
      const orders = res.data.filter((order: any) => order.userId === userId);
      const orderItemsRes = await axios.get(`${API_BASE_URL}/api/orderItems`);
      const productsRes = await axios.get(`${API_BASE_URL}/api/products`);
  
      // Combine order items and products with their respective orders
      const orderItems = orderItemsRes.data;
      const products = productsRes.data;
  
      // Associate order items and products with their respective orders
      orders.forEach((order: any) => {
        order.items = orderItems
          .filter((item: any) => item.orderId === order.id)
          .map((item: any) => {
            return {
              ...item,
              product: products.find(
                (product: any) => product.id === item.productId
              ),
            };
          });
      });
  
      return [orders, products, orderItems];
    } catch (err) {
      console.log(err);
      return false;
    }
  };