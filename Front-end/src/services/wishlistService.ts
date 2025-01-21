import axios from 'axios';
import { isAuthenticated } from './authService';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface WishlistItemProps {
    id: string;
    productId: string;
    wishlistId: string;    
}

export interface WishlistProps {
    id: string;
    userId: string;
    wishlistItems: WishlistItemProps[];    
}

export const fetchWishlist = async () => {
    const user = await isAuthenticated();
    const userId = user.id;
    try {        
        const res = await axios.get(`${API_BASE_URL}/api/wishlists/user/${userId}`);        
        return res.data;
    } catch (err: any) {
        if (err.response && err.response.status === 404) {
            console.log('Wishlist not found, creating a new one...');
            try {
                const createRes = await axios.post(`${API_BASE_URL}/api/wishlists`, { userId });
                return createRes.data;
            } catch (createErr) {
                console.error('Failed to create a new wishlist:', createErr);
                throw createErr;
            }
        }
        console.error('Failed to fetch wishlist:', err);
        throw err;
    }
};

export const fetchWishlistItems = async (wishlistId: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/wishlistItems/wishlist/${wishlistId}`);
        return res.data;
    } catch (err) {
        console.error('Failed to fetch wishlist items:', err);
        throw err;
    }
}

export const addWishlistItem = async (productId: string, wishlistId: string) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/wishlistItems`, { productId, wishlistId });
        return res.data;
    } catch (err) {
        console.error('Failed to add to wishlist:', err);
        throw err;
    }
}

export const deleteWishlistItem = async (id: string) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/api/wishlistItems/${id}`);
        return res.data;
    } catch (err) {
        console.error('Failed to remove from wishlist:', err);
        throw err;
    }
}