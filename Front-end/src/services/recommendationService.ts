import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRecommendedProducts = async (
    sku: string,
    productsNumber: number
  ) => {
    try {
      let res = await axios.get(
        `http://127.0.0.1:5001/recommend?sku=${sku}&top_n=${productsNumber}`
      );
      const recommendedSkus = res.data.recommendations.map(
        (product: { sku: string }) => product.sku
      );
      res = await axios.post(
        `${API_BASE_URL}/api/products/get-products-by-skus`,
        {
          skus: recommendedSkus,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };