import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const changePassword = async (id:string,password:string,newPassword:string,confirmNewPassword:string) => {
    try{
        const res = await axios.put(`${API_BASE_URL}/api/users/${id}/change-password`,{
            id:id,
            password:password,
            newPassword:newPassword,
            confirmNewPassword:confirmNewPassword
        });
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
} 