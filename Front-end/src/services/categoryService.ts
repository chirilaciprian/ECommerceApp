import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Category {
    id: string;
    name: string;    
  }

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/categories`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getCategoryByName = async (categoryName: string) =>{
    try {
        const res = await axios.get(`${API_BASE_URL}/api/categories`);
        const filteredCategory = res.data.filter((category: Category) => category.name === categoryName);
        return filteredCategory[0].id;
    } catch (err) {
        console.log(err);
        return err;
    }
}