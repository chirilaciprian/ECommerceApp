import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export interface ProductProps {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  manufacturer: string;
  onSale: boolean;
  salePrice: number;
}

export const fetchProducts = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        return res.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const addProduct = async (product: ProductProps) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/products`, product);
        return res.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const getProductById = async (productId: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
