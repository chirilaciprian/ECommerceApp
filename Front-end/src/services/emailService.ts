import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendWelcomeEmail = async (to:string , username:string) => {
    try{
        const res = await axios.post(`${API_BASE_URL}/api/emails/sendWelcomeEmail`, {
            to,
            username,
        });
        return res.data;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
export const sendOrderConfirmationEmail = async (to:string , orderId:string) => {
    try{
        const res = await axios.post(`${API_BASE_URL}/api/emails/sendOrderConfirmation`, {
            to,
            orderId,
        });
        return res.data;
    }
    catch(err){
        console.log(err);
        return false;
    }
}