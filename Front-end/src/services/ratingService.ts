import axios from "axios";
import { isAuthenticated } from "./authService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export interface RatingProps {
    id: string;
    productId: string;
    rating: number;
    message: string;
    userId: string;
    userName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const getRatingsByProductId = async (productId: string) => {
    try {
        const res_ratings = await axios.get(`${API_BASE_URL}/api/ratings/product/${productId}`);
        const res_users = await axios.get(`${API_BASE_URL}/api/users`);
        const ratings = res_ratings.data;
        const users = res_users.data;
        const ratingsWithUsers = ratings.map((rating: RatingProps) => {
            const user = users.find((user: { id: string }) => user.id === rating.userId);
            return {
                ...rating,
                userName: user?.username || 'Unknown'
            };
        });
        return ratingsWithUsers;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const createRating = async (rating: number, message: string, productId: string) => {
    try {
        const user = await isAuthenticated();
        if (user) {
            const res = await axios.post(`${API_BASE_URL}/api/ratings`, {
                productId: productId,
                rating: rating,
                message: message,
                userId: user.id
            });
            return res.data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}