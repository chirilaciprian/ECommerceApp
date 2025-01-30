import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ProductProps {
  id: string;
  sku: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  rating: number;
  onSale: boolean;
  salePrice: number;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/products`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const addProduct = async (product: ProductProps) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/products`, product);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getProductById = async (productId: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getProductsByCartId = async (cartId: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/products/cart/${cartId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getProductsByWishlistId = async (wishlistId: string) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/products/wishlist/${wishlistId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const fetchPaginatedProducts = async (
  page: number,
  limit: number,
  categoryIds?: string[], // Accept an array of category IDs
  genre?: string,
  sortBy?: string
) => {
  try {
    const params = {
      page,
      limit,
      ...(categoryIds && { category: categoryIds.join(",") }), // Join category IDs with commas
      ...(genre && { genre }),
      ...(sortBy && { sortBy }),
    };    
    const response = await axios.get(`${API_BASE_URL}/api/products/paginated`, { params });    
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

