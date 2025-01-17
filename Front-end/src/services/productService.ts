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
  genre:string;
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

export const getRecommendedProducts = async (sku : string, productsNumber : number) => {
    try {
        let res = await axios.get(`http://127.0.0.1:5001/recommend?sku=${sku}&top_n=${productsNumber}`);
        const recommendedSkus = res.data.recommendations.map((product: { sku: string }) => product.sku);    
        res = await axios.post(`${API_BASE_URL}/api/products/get-products-by-skus`, {
            skus: recommendedSkus
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const getProductsByCartId = async (cartId: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/products/cartId/${cartId}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const getProductsByWishlistId = async (wishlistId: string) => {
    try{
        const res = await axios.get(`${API_BASE_URL}/api/products/wishlist/${wishlistId}`);
        return res.data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export const fetchPaginatedProducts = async (page:number, limit:number, categoryId:string, genre:string) => {
    try {
        const params = {
            page,
            limit,
            categoryId,
            genre
        };
        if (categoryId) params.categoryId = categoryId;
        if (genre) params.genre = genre;
        const response = await axios.get('/api/products/paginated', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching paginated products:', error);
        throw error;
    }
  };